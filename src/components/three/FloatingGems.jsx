import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Sparkles, Torus, Icosahedron, Sphere, TorusKnot } from '@react-three/drei';
import * as THREE from 'three';
import Leaf from './Leaf';
import { mouse } from '../../hooks/useMouse';

function Rig({ children }) {
  const g = useRef();
  useFrame(() => {
    g.current.rotation.y = THREE.MathUtils.lerp(g.current.rotation.y, mouse.x * 0.35, 0.04);
    g.current.rotation.x = THREE.MathUtils.lerp(g.current.rotation.x, -mouse.y * 0.2, 0.04);
  });
  return <group ref={g}>{children}</group>;
}

// Floating brand-coloured objects: a pearl, a silk blob, rings and leaves.
export default function FloatingGems({ variant = 'about' }) {
  const isContact = variant === 'contact';
  return (
    <Canvas className="gems-canvas" dpr={[1, 1.75]} camera={{ position: [0, 0, 8], fov: 45 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={2.4} />
      <pointLight position={[-4, 2, 2]} intensity={25} color="#ff9db0" />
      <Rig>
        <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5}>
          <Sphere args={[1.15, 96, 96]} position={isContact ? [2.2, 0.4, 0] : [2.4, 0.2, 0]}>
            <MeshDistortMaterial color="#E3121B" distort={0.38} speed={2.2} roughness={0.15} metalness={0.1} />
          </Sphere>
        </Float>
        <Float speed={1.4} rotationIntensity={2} floatIntensity={1.2}>
          <Torus args={[0.85, 0.06, 32, 128]} position={[2.4, 0.2, 0]} rotation={[1.1, 0.3, 0]}>
            <meshStandardMaterial color="#D4A017" metalness={0.9} roughness={0.2} />
          </Torus>
        </Float>
        <Float speed={2.4} rotationIntensity={1} floatIntensity={2}>
          <Sphere args={[0.38, 64, 64]} position={[-2.8, 1.6, -1]}>
            <meshPhysicalMaterial color="#fff6ef" roughness={0.05} clearcoat={1} sheen={1} sheenColor="#ffd6e0" />
          </Sphere>
        </Float>
        <Float speed={1.8} rotationIntensity={1.6} floatIntensity={1.6}>
          <Icosahedron args={[0.5, 0]} position={[-3.2, -1.4, 0]}>
            <meshStandardMaterial color="#0B6B1F" flatShading roughness={0.3} />
          </Icosahedron>
        </Float>
        <Float speed={1.2} rotationIntensity={1.4} floatIntensity={1}>
          <TorusKnot args={[0.32, 0.1, 160, 24]} position={[0.6, -2, -1.5]}>
            <MeshWobbleMaterial color="#F6B7C1" factor={0.4} speed={1.5} roughness={0.2} />
          </TorusKnot>
        </Float>
        {[[-1.2, 2.2, -0.5, 0.6], [3.8, -1.8, -0.5, -0.8], [-4, 0.2, -2, 1.9], [1.2, 2.6, -2, -2.2]].map(([x, y, z, r], i) => (
          <Float key={i} speed={2 + i * 0.3} rotationIntensity={2} floatIntensity={1.4}>
            <Leaf position={[x, y, z]} rotation={[0.3, 0.4, r]} length={0.75} />
          </Float>
        ))}
      </Rig>
      <Sparkles count={50} scale={[12, 7, 3]} size={2.6} speed={0.3} color="#D4A017" />
    </Canvas>
  );
}
