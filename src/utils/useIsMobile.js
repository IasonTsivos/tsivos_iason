import { useEffect, useState } from "react";

const MOBILE_QUERY = "(max-width: 768px)";

/** True on phone-sized screens (the same 768px breakpoint as the CSS), updating on resize. */
export default function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const onChange = (e) => setMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return mobile;
}
