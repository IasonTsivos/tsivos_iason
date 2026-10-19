import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./DotOcean.css";

/*
 * DotOcean — an ocean drawn as a cloud of points.
 *
 * The surface is a sum of Gerstner waves evaluated on the GPU. Gerstner waves move points
 * sideways as well as up, so points bunch together at the crests; with additive blending
 * those bunched rows read as bright foam lines without any extra geometry. Fog fades the
 * water into a horizon, the pointer raises a swell under it and clicks send rings outward.
 */

const WAVES = 6;
const MAX_RIPPLES = 4;
const RIPPLE_SPEED = 5.5; // world units per second
const RIPPLE_LIFE = 3.6; // seconds
const FOV = 45;
const CAMERA_HEIGHT = 2.6;
const NEAR_DEPTH = 1.2;
const FAR_DEPTH = 60;
const BASE_COUNT = 260000;
const INTRO_SECONDS = 1.8;

// Wave set relative to the wind: wavelength factor, steepness and direction offset (degrees)
const WAVE_SET = [
  [1.0, 0.07, 0],
  [0.71, 0.06, 24],
  [0.52, 0.05, -31],
  [0.37, 0.045, 52],
  [0.26, 0.035, -14],
  [0.19, 0.03, 71],
];
const BASE_WAVELENGTH = 6.5;

const VERTEX = /* glsl */ `
  #define WAVES ${WAVES}
  #define MAX_RIPPLES ${MAX_RIPPLES}

  attribute float aRand;

  uniform float uTime;
  uniform float uClock;
  uniform float uIntro;
  uniform float uHalfTan;
  uniform float uSize;
  uniform float uDpr;
  uniform float uFar;
  uniform float uFog;
  uniform float uFoam;
  uniform float uChop;
  uniform float uAmpSum;
  uniform vec4 uWaves[WAVES];     // direction.xy, wavenumber k, amplitude
  uniform float uPhases[WAVES];
  uniform vec3 uPointer;          // world x, world z, swell strength
  uniform float uSwellRadius;
  uniform vec4 uRipples[MAX_RIPPLES]; // world x, world z, start time, strength

  varying float vAlpha;
  varying float vFoam;

  void main() {
    float depth = -position.z;
    // x is stored normalised (-1..1) and widened with depth so the field always fills the view
    vec2 p = vec2(position.x * ((depth + ${CAMERA_HEIGHT.toFixed(1)}) * uHalfTan * 1.25 + 1.5), position.z);

    vec3 disp = vec3(0.0);
    float crest = 0.0;
    for (int i = 0; i < WAVES; i++) {
      vec4 w = uWaves[i];
      float omega = sqrt(9.8 * w.z);
      float phase = w.z * dot(w.xy, p) - omega * uTime + uPhases[i];
      float s = sin(phase);
      float q = uChop / (w.z * w.w * float(WAVES) + 1e-4); // keeps sum(Q·A·k) = chop, so crests never loop
      disp.xz += q * w.w * w.xy * cos(phase);
      disp.y += w.w * s;
      crest += s * w.w;
    }
    crest /= uAmpSum + 1e-4;

    // Pointer swell
    vec2 toPointer = p - uPointer.xy;
    float swell = exp(-dot(toPointer, toPointer) / (uSwellRadius * uSwellRadius)) * uPointer.z;
    disp.y += swell * 0.45;

    // Click ripples: a ring travelling outward that fades with age
    float ring = 0.0;
    for (int i = 0; i < MAX_RIPPLES; i++) {
      vec4 r = uRipples[i];
      float age = uClock - r.z;
      if (r.w > 0.0 && age > 0.0 && age < ${RIPPLE_LIFE.toFixed(1)}) {
        float x = length(p - r.xy) - age * ${RIPPLE_SPEED.toFixed(1)};
        float envelope = exp(-x * x * 0.9) * (1.0 - age / ${RIPPLE_LIFE.toFixed(1)}) * r.w;
        disp.y += sin(x * 2.4) * envelope * 0.22;
        ring += envelope;
      }
    }

    vec3 world = vec3(p.x + disp.x, disp.y, p.y + disp.z);
    vec4 mv = modelViewMatrix * vec4(world, 1.0);
    gl_Position = projectionMatrix * mv;

    float size = uSize * uDpr * (0.75 + aRand * 0.5) * (12.0 / -mv.z);
    gl_PointSize = clamp(size, 1.0, 6.0 * uDpr);

    float dist = length(mv.xyz);

    // Brightness: body of the water, raised for high points and strongly for foam.
    // Foam only reads as a line at a grazing angle, so it fades in with distance;
    // close to the camera a crest would otherwise light up as a broad patch.
    float height = clamp(disp.y / (uAmpSum + 1e-4) * 0.5 + 0.5, 0.0, 1.0);
    float foam = smoothstep(0.55, 0.92, crest * (uChop + 0.2)) * smoothstep(4.0, 14.0, dist) * uFoam;
    vFoam = clamp(foam + ring * 0.9 + swell * 0.6, 0.0, 1.0);

    float fog = exp(-uFog * dist / uFar * 2.2) * (1.0 - smoothstep(uFar * 0.7, uFar, dist));
    float subPixel = min(1.0, size * size); // points smaller than a pixel give up brightness, not size
    float twinkle = 0.85 + 0.15 * sin(uClock * 1.7 + aRand * 43.0);

    vAlpha = (1.2 + 0.8 * height + 1.6 * vFoam) * fog * subPixel * twinkle * uIntro;
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uWater;
  uniform vec3 uCrest;
  uniform float uGlow;

  varying float vAlpha;
  varying float vFoam;

  void main() {
    float r = length(gl_PointCoord - 0.5) * 2.0;
    float core = 1.0 - smoothstep(0.35, 1.0, r);
    float halo = exp(-r * r * 2.5) * uGlow;
    float a = (core + halo) * vAlpha;
    if (a < 0.002) discard;
    vec3 color = mix(uWater, uCrest, vFoam);
    gl_FragColor = vec4(color * a, a); // premultiplied; blended additively
  }
`;

// Small deterministic PRNG so a seed always gives the same water
const mulberry32 = (seed) => () => {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/*
 * Points on a jittered grid between the near edge and the horizon. Spacing grows with depth
 * so distant water isn't wasted on sub-pixel points; x is normalised and widened in the shader.
 */
const buildField = (target, seed) => {
  const random = mulberry32(seed * 9973 + 17);
  const spacing = (d) => 1 + d / 22;
  const rowCount = (d, cell) => Math.max(8, Math.round((2 * (d + CAMERA_HEIGHT)) / (cell * spacing(d))));

  // Estimate the count for a unit cell, then scale the cell to hit the target
  let estimate = 0;
  for (let d = NEAR_DEPTH; d < FAR_DEPTH; d += spacing(d)) estimate += rowCount(d, 1);
  const cell = Math.sqrt(estimate / target);

  const positions = [];
  const randoms = [];
  for (let d = NEAR_DEPTH; d < FAR_DEPTH; d += cell * spacing(d)) {
    const n = rowCount(d, cell);
    const step = cell * spacing(d);
    for (let i = 0; i < n; i++) {
      const u = ((i + 0.5 + (random() - 0.5) * 0.7) / n) * 2 - 1;
      const z = -(d + (random() - 0.5) * 0.7 * step);
      positions.push(u, 0, z);
      randoms.push(random());
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("aRand", new THREE.Float32BufferAttribute(randoms, 1));
  // Vertices are displaced on the GPU, so skip frustum culling against the flat bounds
  geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), Infinity);
  return geometry;
};

const DotOcean = ({
  colors = ["#6E6E80", "#FFFFFF"],
  backgroundColor = "#000000",
  density = 1,
  particleSize = 1,
  waveHeight = 1,
  choppiness = 0.8,
  wavelength = 1,
  windAngle = 0,
  horizon = 0.1,
  fog = 1,
  glow = 0.35,
  foam = 1,
  speed = 1,
  interactive = true,
  parallax = 1,
  swell = 1,
  swellRadius = 0.9,
  clickRipples = true,
  seed = 0,
  paused = false,
  dpr = 1.5,
  className = "",
  style,
  children,
}) => {
  const rootRef = useRef(null);
  const canvasHostRef = useRef(null);
  const settings = {
    colors, backgroundColor, particleSize, waveHeight, choppiness, wavelength, windAngle, horizon,
    fog, glow, foam, speed, interactive, parallax, swell, swellRadius, clickRipples, paused, dpr,
  };
  const settingsRef = useRef(settings);
  settingsRef.current = settings;
  const wakeRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const host = canvasHostRef.current;
    if (!root || !host) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: "high-performance" });
    } catch {
      return undefined; // no WebGL: the background colour alone still looks right
    }
    host.appendChild(renderer.domElement);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 200);
    camera.position.set(0, CAMERA_HEIGHT, 0);

    // Fewer points on small screens; the field is built once per mount
    const box = root.getBoundingClientRect();
    const areaScale = Math.min(1, Math.max(0.35, (box.width * box.height) / (1440 * 800)));
    const geometry = buildField(Math.round(BASE_COUNT * density * areaScale), seed);

    const waves = Array.from({ length: WAVES }, () => new THREE.Vector4());
    const random = mulberry32(seed * 7919 + 3);
    const phases = Array.from({ length: WAVES }, () => random() * Math.PI * 2);
    const ripples = Array.from({ length: MAX_RIPPLES }, () => new THREE.Vector4(0, 0, -100, 0));

    const uniforms = {
      uTime: { value: 0 },
      uClock: { value: 0 },
      uIntro: { value: reduce ? 1 : 0 },
      uHalfTan: { value: 1 },
      uSize: { value: 1 },
      uDpr: { value: 1 },
      uFar: { value: FAR_DEPTH },
      uFog: { value: 1 },
      uFoam: { value: 1 },
      uChop: { value: 0.8 },
      uAmpSum: { value: 1 },
      uWaves: { value: waves },
      uPhases: { value: phases },
      uPointer: { value: new THREE.Vector3(0, 0, 0) },
      uSwellRadius: { value: 1 },
      uRipples: { value: ripples },
      uWater: { value: new THREE.Color() },
      uCrest: { value: new THREE.Color() },
      uGlow: { value: 0.35 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      uniforms,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.CustomBlending,
      blendEquation: THREE.AddEquation,
      blendSrc: THREE.OneFactor,
      blendDst: THREE.OneFactor,
    });
    const points = new THREE.Points(geometry, material);
    points.frustumCulled = false;
    scene.add(points);

    // Pointer state, in normalised device coordinates of this element
    const pointer = { ndc: new THREE.Vector2(), inside: false };
    const swellState = { x: 0, z: 0, strength: 0 };
    const view = { x: 0, yaw: 0 };
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const hit = new THREE.Vector3();
    let rippleIndex = 0;

    let width = 0;
    let height = 0;
    const resize = () => {
      const s = settingsRef.current;
      const rect = root.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      const ratio = Math.min(window.devicePixelRatio || 1, s.dpr);
      renderer.setPixelRatio(ratio);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      uniforms.uDpr.value = ratio;
      uniforms.uHalfTan.value = camera.aspect * Math.tan(THREE.MathUtils.degToRad(FOV / 2));
      wake();
    };

    const applySettings = () => {
      const s = settingsRef.current;
      uniforms.uWater.value.set(s.colors[0]);
      uniforms.uCrest.value.set(s.colors[1]);
      uniforms.uSize.value = s.particleSize;
      uniforms.uFog.value = s.fog;
      uniforms.uFoam.value = s.foam;
      uniforms.uGlow.value = s.glow;
      uniforms.uChop.value = THREE.MathUtils.clamp(s.choppiness, 0, 1);
      uniforms.uSwellRadius.value = Math.max(0.2, s.swellRadius * 2.4);
      renderer.setClearColor(s.backgroundColor === "transparent" ? "#000000" : s.backgroundColor, 1);

      let ampSum = 0;
      const wind = THREE.MathUtils.degToRad(s.windAngle);
      WAVE_SET.forEach(([lengthFactor, steepness, offset], i) => {
        const length = BASE_WAVELENGTH * lengthFactor * Math.max(0.2, s.wavelength);
        const k = (Math.PI * 2) / length;
        const amplitude = (steepness * length * s.waveHeight) / Math.PI;
        const angle = wind + THREE.MathUtils.degToRad(offset);
        // Waves roll toward the viewer (+z) when the wind angle is 0
        waves[i].set(Math.sin(angle), Math.cos(angle), k, amplitude);
        ampSum += amplitude;
      });
      uniforms.uAmpSum.value = ampSum;

      // Tilt the camera so the horizon sits `horizon` of the way down from the top
      const tanHalf = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
      const pitch = Math.atan((1 - 2 * THREE.MathUtils.clamp(s.horizon, 0, 0.9)) * tanHalf);
      camera.rotation.set(-pitch, view.yaw, 0, "YXZ");
      camera.position.x = view.x;
    };

    let raf = 0;
    let last = 0;
    let time = 12; // start mid-swell rather than on a flat sea
    let clock = 0;
    let intro = reduce ? 1 : 0;
    let visible = true;

    const frame = (now) => {
      raf = 0;
      const s = settingsRef.current;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;

      const moving = !s.paused && !reduce;
      if (moving) time += dt * 0.42 * s.speed;
      clock += dt;
      intro = Math.min(1, intro + dt / INTRO_SECONDS);

      applySettings();

      // Pointer: find where it meets the water and ease the swell and view toward it
      const live = s.interactive && pointer.inside && !reduce;
      let goalStrength = 0;
      if (live) {
        raycaster.setFromCamera(pointer.ndc, camera);
        if (raycaster.ray.intersectPlane(plane, hit) && hit.z > -FAR_DEPTH * 0.6) {
          swellState.x += (hit.x - swellState.x) * (1 - Math.exp(-dt * 8));
          swellState.z += (hit.z - swellState.z) * (1 - Math.exp(-dt * 8));
          goalStrength = s.swell;
        }
      }
      swellState.strength += (goalStrength - swellState.strength) * (1 - Math.exp(-dt * 3));
      uniforms.uPointer.value.set(swellState.x, swellState.z, swellState.strength);

      const viewGoal = live ? pointer.ndc.x : 0;
      view.x += (viewGoal * 0.5 * s.parallax - view.x) * (1 - Math.exp(-dt * 1.5));
      view.yaw += (-viewGoal * 0.025 * s.parallax - view.yaw) * (1 - Math.exp(-dt * 1.5));

      uniforms.uTime.value = time;
      uniforms.uClock.value = clock;
      uniforms.uIntro.value = intro * intro * (3 - 2 * intro);

      renderer.render(scene, camera);

      const ripplesAlive = ripples.some((r) => r.w > 0 && clock - r.z < RIPPLE_LIFE);
      const settling = intro < 1 || Math.abs(swellState.strength - goalStrength) > 0.001 || Math.abs(view.x - viewGoal * 0.5 * s.parallax) > 0.001;
      if (visible && !document.hidden && (moving || ripplesAlive || settling)) raf = requestAnimationFrame(frame);
      else last = 0;
    };

    const wake = () => {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame);
    };
    wakeRef.current = wake;

    // Pointer events come from the window so content layered on top doesn't block them
    const locate = (event) => {
      const rect = root.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      pointer.inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      pointer.ndc.set((x / rect.width) * 2 - 1, -(y / rect.height) * 2 + 1);
    };

    const onPointerMove = (event) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      locate(event);
      wake();
    };

    const onPointerDown = (event) => {
      const s = settingsRef.current;
      if (!s.clickRipples || reduce) return;
      if (event.target.closest?.("a, button, input, textarea, select")) return;
      locate(event);
      if (!pointer.inside) return;
      raycaster.setFromCamera(pointer.ndc, camera);
      if (!raycaster.ray.intersectPlane(plane, hit)) return;
      ripples[rippleIndex].set(hit.x, hit.z, clock, 1);
      rippleIndex = (rippleIndex + 1) % MAX_RIPPLES;
      wake();
    };

    const onLeave = () => {
      pointer.inside = false;
      wake();
    };

    const onVisibility = () => {
      if (!document.hidden) {
        last = 0;
        wake();
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(root);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        last = 0;
        wake();
      }
    });
    intersection.observe(root);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    applySettings();
    resize();

    return () => {
      cancelAnimationFrame(raf);
      wakeRef.current = null;
      resizeObserver.disconnect();
      intersection.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
    // The point field is rebuilt only when its size or pattern changes; everything else is live
  }, [density, seed]);

  // Props changed: draw a fresh frame even if the water is paused
  useEffect(() => {
    wakeRef.current?.();
  });

  return (
    <div
      ref={rootRef}
      className={`dot-ocean ${className}`}
      style={{ backgroundColor: backgroundColor === "transparent" ? undefined : backgroundColor, ...style }}
    >
      <div ref={canvasHostRef} className="dot-ocean-canvas" aria-hidden="true" />
      {children && <div className="dot-ocean-content">{children}</div>}
    </div>
  );
};

export default DotOcean;
