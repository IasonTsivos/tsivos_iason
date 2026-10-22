import { Component, lazy, Suspense, useEffect, useState } from "react";
import "./Badge.css";
import Card from "../Card";
import loadBadgeImages, { CARD_COLOR } from "./badgeImages";

// three.js is heavy, keep it out of the main bundle
const Lanyard = lazy(() => import("./Lanyard"));

const supportsWebGL = () => {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
};

// Falls back to the old card if anything in the 3D scene throws
class FallbackBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

const Badge = ({ anchor = "center" }) => {
  const [webgl] = useState(supportsWebGL);
  const [images, setImages] = useState(null);

  useEffect(() => {
    if (webgl) loadBadgeImages().then(setImages);
  }, [webgl]);

  if (!webgl) return <Card />;

  return (
    <div className="badge">
      <FallbackBoundary fallback={<Card />}>
        <Suspense fallback={null}>
          {images && (
            <Lanyard
              frontImage={images.front}
              backImage={images.back}
              strapImage={images.strap}
              cardColor={CARD_COLOR}
              finish="glossy"
              metal="graphite"
              anchor={anchor}
              size={0.52}
              strapLength={0.35}
              strapWidth={0.8}
              breeze={1}
            />
          )}
        </Suspense>
      </FallbackBoundary>
    </div>
  );
};

export default Badge;
