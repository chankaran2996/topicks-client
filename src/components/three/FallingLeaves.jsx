import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useLeafGeometry } from './Leaf';

const AREA = [12, 9, 5];
const COLORS = ['#0B6B1F', '#2E8B3A', '#E3121B', '#F6B7C1'];

// Instanced leaves and petals that drift and tumble through the scene.
export default function FallingLeaves({ count = 28, area = AREA, colors = COLORS }) {
  const geometry = useLeafGeometry();
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const items = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * area[0],
        y: (Math.random() - 0.5) * area[1],
        z: (Math.random() - 0.5) * area[2] - 1,
        speed: 0.25 + Math.random() * 0.45,
        spin: Math.random() * Math.PI * 2,
        sway: 0.5 + Math.random(),
        scale: 0.14 + Math.random() * 0.22,
      })),
    [count, area]
  );

  const colorArray = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      c.set(colors[i % colors.length]);
      c.toArray(arr, i * 3);
    }
    return arr;
  }, [count, colors]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    items.forEach((it, i) => {
      it.y -= it.speed * delta;
      if (it.y < -area[1] / 2) it.y = area[1] / 2;
      dummy.position.set(it.x + Math.sin(t * it.sway + i) * 0.6, it.y, it.z);
      dummy.rotation.set(t * it.sway + it.spin, Math.sin(t + i) * 1.2, t * 0.6 + it.spin);
      dummy.scale.setScalar(it.scale);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[geometry, undefined, count]}>
      <instancedBufferAttribute attach="instanceColor" args={[colorArray, 3]} />
      <meshStandardMaterial roughness={0.45} side={THREE.DoubleSide} />
    </instancedMesh>
  );
}
