import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { mouse } from '../../hooks/useMouse';

// A sheet of silk that ripples continuously and bunches toward the mouse.
function Cloth({ color }) {
  const mesh = useRef();
  const geometry = useMemo(() => new THREE.PlaneGeometry(9, 6, 110, 75), []);
  const base = useMemo(() => Float32Array.from(geometry.attributes.position.array), [geometry]);
  const m = useRef(new THREE.Vector2());

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    m.current.lerp({ x: mouse.x * 4.5, y: mouse.y * 3 }, 0.06);
    const pos = geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = base[i * 3];
      const y = base[i * 3 + 1];
      const dx = x - m.current.x;
      const dy = y - m.current.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      const ripple = Math.sin(d * 3 - t * 4) * 0.22 * Math.exp(-d * 0.6);
      const z = Math.sin(x * 0.9 + t * 1.2) * 0.35 + Math.sin(y * 1.4 + t * 0.9) * 0.25 + Math.cos((x + y) * 0.6 + t) * 0.15 + ripple;
      pos.setZ(i, z);
    }
    pos.needsUpdate = true;
    geometry.computeVertexNormals();
    mesh.current.rotation.z = Math.sin(t * 0.2) * 0.05;
  });

  return (
    <mesh ref={mesh} geometry={geometry} rotation={[-0.35, 0, -0.12]}>
      <meshPhysicalMaterial color={color} roughness={0.38} metalness={0.05} sheen={1} sheenRoughness={0.3} sheenColor="#ffd1dc" clearcoat={0.5} side={THREE.DoubleSide} />
    </mesh>
  );
}

export default function SilkCloth({ color = '#C10F17' }) {
  return (
    <Canvas className="silk-canvas" dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 50 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={2.6} />
      <directionalLight position={[-4, -2, 2]} intensity={1.2} color="#ffb3c1" />
      <pointLight position={[0, 0, 3]} intensity={8} color="#ffe2b8" />
      <Cloth color={color} />
    </Canvas>
  );
}
