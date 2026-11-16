import { useMemo } from 'react';
import * as THREE from 'three';

// Shared leaf geometry modelled on the leaves in the Topicks logo (base at origin, tip on +Y).
export function useLeafGeometry() {
  return useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.bezierCurveTo(0.42, 0.18, 0.5, 0.75, 0, 1);
    s.bezierCurveTo(-0.5, 0.75, -0.42, 0.18, 0, 0);
    const g = new THREE.ExtrudeGeometry(s, {
      depth: 0.04,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 4,
      curveSegments: 24,
    });
    g.translate(0, 0, -0.02);
    return g;
  }, []);
}

export default function Leaf({ color = '#0B6B1F', length = 1, ...props }) {
  const geometry = useLeafGeometry();
  return (
    <group {...props}>
      <mesh geometry={geometry} scale={[length, length, length]} castShadow>
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.1} />
      </mesh>
      {/* midrib */}
      <mesh position={[0, length * 0.45, length * 0.035]} scale={[1, length, 1]}>
        <boxGeometry args={[0.018, 0.6, 0.01]} />
        <meshStandardMaterial color="#e9f5e4" roughness={0.6} />
      </mesh>
    </group>
  );
}
