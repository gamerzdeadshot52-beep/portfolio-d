import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, MeshDistortMaterial, RoundedBox, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const VIOLET = "#8b5cf6";
const ICE = "#7dd3fc";

function Rig({ children }: { children: React.ReactNode }) {
  const g = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!g.current) return;
    const k = 1 - Math.exp(-3 * Math.min(delta, 0.05));
    g.current.rotation.y += (state.pointer.x * 0.35 - g.current.rotation.y) * k;
    g.current.rotation.x += (-state.pointer.y * 0.2 - g.current.rotation.x) * k;
  });
  return <group ref={g}>{children}</group>;
}

function Rings() {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    const dt = Math.min(d, 0.05);
    if (a.current) a.current.rotation.z += dt * 0.25;
    if (b.current) b.current.rotation.z -= dt * 0.18;
  });
  return (
    <>
      <mesh ref={a} rotation={[Math.PI / 2.4, 0.2, 0]}>
        <torusGeometry args={[2.3, 0.012, 16, 160]} />
        <meshBasicMaterial color={VIOLET} toneMapped={false} />
      </mesh>
      <mesh ref={b} rotation={[Math.PI / 1.8, -0.4, 0]}>
        <torusGeometry args={[2.8, 0.008, 16, 160]} />
        <meshBasicMaterial color={ICE} toneMapped={false} />
      </mesh>
    </>
  );
}

function Panel({ position, rotation, size }: { position: [number, number, number]; rotation: [number, number, number]; size: [number, number] }) {
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
      <RoundedBox args={[size[0], size[1], 0.04]} radius={0.04} position={position} rotation={rotation}>
        <meshPhysicalMaterial transmission={1} roughness={0.15} thickness={0.4} ior={1.4} color="#c4b5fd" transparent opacity={0.6} />
      </RoundedBox>
    </Float>
  );
}

export function SculptureScene({ variant = "hero" }: { variant?: "hero" | "about" | "contact" }) {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 8.5], fov: 42 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.4} />
      <pointLight position={[-4, -2, 3]} intensity={30} color={VIOLET} />
      <pointLight position={[4, 2, 2]} intensity={20} color={ICE} />
      <Environment resolution={256}>
        <Lightformer intensity={3} position={[0, 5, -2]} scale={[10, 2, 1]} />
        <Lightformer intensity={2} color={VIOLET} position={[-5, 0, 0]} rotation-y={Math.PI / 2} scale={[10, 4, 1]} />
        <Lightformer intensity={2} color={ICE} position={[5, 0, 0]} rotation-y={-Math.PI / 2} scale={[10, 4, 1]} />
        <Lightformer intensity={1} position={[0, -4, 2]} scale={[8, 1, 1]} />
      </Environment>
      <Rig>
        {variant === "hero" && (
          <>
            <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.6}>
              <mesh>
                <sphereGeometry args={[1.35, 128, 128]} />
                <MeshDistortMaterial color="#d9d6ff" metalness={1} roughness={0.08} distort={0.35} speed={1.6} />
              </mesh>
            </Float>
            <Rings />
            <Panel position={[-2.6, 1.1, -0.6]} rotation={[0.1, 0.5, 0.1]} size={[1.1, 1.5]} />
            <Panel position={[2.5, -1.2, -0.3]} rotation={[-0.1, -0.5, -0.1]} size={[1.3, 0.9]} />
            <Float speed={2} floatIntensity={1.4}>
              <mesh position={[2.1, 1.5, 0.4]}>
                <icosahedronGeometry args={[0.28, 0]} />
                <meshStandardMaterial color={ICE} metalness={0.9} roughness={0.2} />
              </mesh>
            </Float>
            <Float speed={2.4} floatIntensity={1.2}>
              <mesh position={[-1.9, -1.6, 0.6]}>
                <torusKnotGeometry args={[0.2, 0.07, 96, 12]} />
                <meshStandardMaterial color={VIOLET} metalness={1} roughness={0.15} />
              </mesh>
            </Float>
          </>
        )}
        {variant === "about" && (
          <Float speed={1.2} rotationIntensity={1} floatIntensity={0.6}>
            <mesh>
              <torusKnotGeometry args={[1.1, 0.36, 220, 32]} />
              <meshStandardMaterial color="#e2e0ff" metalness={1} roughness={0.12} />
            </mesh>
            <mesh position={[1.9, 1.3, -1]}>
              <octahedronGeometry args={[0.4]} />
              <meshStandardMaterial color={ICE} metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[-1.8, -1.4, -0.5]}>
              <boxGeometry args={[0.5, 0.5, 0.5]} />
              <meshStandardMaterial color={VIOLET} metalness={0.9} roughness={0.2} />
            </mesh>
          </Float>
        )}
        {variant === "contact" && (
          <>
            <Panel position={[-1.4, 0.4, 0]} rotation={[0.2, 0.6, 0]} size={[1.6, 2.2]} />
            <Panel position={[0.6, -0.3, 0.6]} rotation={[-0.1, -0.3, 0.1]} size={[1.8, 1.2]} />
            <Panel position={[1.8, 1, -0.8]} rotation={[0, -0.6, 0.1]} size={[1, 1.4]} />
            <Float speed={1.6}>
              <mesh position={[0, 0.2, -1.4]}>
                <sphereGeometry args={[0.9, 64, 64]} />
                <meshStandardMaterial color={VIOLET} metalness={1} roughness={0.1} />
              </mesh>
            </Float>
          </>
        )}
      </Rig>
      <Sparkles count={80} scale={[12, 7, 6]} size={2} speed={0.3} color={ICE} opacity={0.6} />
    </Canvas>
  );
}

export function MiniShape({ shape }: { shape: string }) {
  const m = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (m.current) {
      m.current.rotation.y += Math.min(d, 0.05) * 0.6;
      m.current.rotation.x += Math.min(d, 0.05) * 0.25;
    }
  });
  const geo = {
    box: <boxGeometry args={[1.1, 1.1, 1.1]} />,
    cone: <coneGeometry args={[0.8, 1.4, 3]} />,
    torus: <torusGeometry args={[0.7, 0.26, 32, 80]} />,
    ico: <icosahedronGeometry args={[0.9, 0]} />,
    oct: <octahedronGeometry args={[0.95]} />,
    knot: <torusKnotGeometry args={[0.55, 0.18, 120, 16]} />,
  }[shape];
  return <mesh ref={m}>{geo}<meshStandardMaterial color="#d9d6ff" metalness={1} roughness={0.15} /></mesh>;
}

export function ServiceIconsScene({ shape }: { shape: string }) {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 3.4], fov: 40 }} gl={{ alpha: true }} frameloop="always">
      <ambientLight intensity={0.4} />
      <pointLight position={[-2, 1, 2]} intensity={12} color={VIOLET} />
      <pointLight position={[2, -1, 2]} intensity={10} color={ICE} />
      <Environment resolution={64}>
        <Lightformer intensity={2} position={[0, 3, 1]} scale={[5, 1, 1]} />
        <Lightformer intensity={2} color={VIOLET} position={[-3, 0, 0]} rotation-y={Math.PI / 2} scale={[5, 3, 1]} />
        <Lightformer intensity={2} color={ICE} position={[3, 0, 0]} rotation-y={-Math.PI / 2} scale={[5, 3, 1]} />
      </Environment>
      <MiniShape shape={shape} />
    </Canvas>
  );
}
