import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";

const Scenes = () => import("@/components/three/HeroScene");
const Sculpture = lazy(() => Scenes().then((m) => ({ default: m.SculptureScene })));
const ServiceIcon = lazy(() => Scenes().then((m) => ({ default: m.ServiceIconsScene })));

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Mounts a WebGL canvas only while near the viewport, with a CSS fallback. */
function InView({ children, fallback, className }: { children: ReactNode; fallback: ReactNode; className?: string | undefined }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [gl, setGl] = useState<boolean | null>(null);
  useEffect(() => {
    setGl(hasWebGL());
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(!!e?.isIntersecting), { rootMargin: "200px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} aria-hidden>
      {gl && visible ? <Suspense fallback={fallback}>{children}</Suspense> : fallback}
    </div>
  );
}

const Orb = () => (
  <div className="flex h-full w-full items-center justify-center">
    <div className="h-1/2 aspect-square rounded-full bg-brand opacity-40 blur-3xl" />
  </div>
);

export function Sculpture3D({ variant, className }: { variant: "hero" | "about" | "contact"; className?: string | undefined }) {
  return (
    <InView className={className} fallback={<Orb />}>
      <Sculpture variant={variant} />
    </InView>
  );
}

export function ServiceIcon3D({ shape, className }: { shape: string; className?: string | undefined }) {
  return (
    <InView className={className} fallback={<Orb />}>
      <ServiceIcon shape={shape} />
    </InView>
  );
}
