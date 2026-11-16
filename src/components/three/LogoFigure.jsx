import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Leaf from './Leaf';
import { mouse } from '../../hooks/useMouse';

// Image-space coordinates traced from the Topicks logo (1300×1200 artwork).
const toV = ([x, y]) => new THREE.Vector3((x - 750) / 200, -(y - 610) / 200, 0);

const STROKES = [
  { pts: [[475, 290], [560, 380], [620, 520], [636, 660]], r: 0.11 },
  { pts: [[1070, 350], [900, 470], [720, 580], [640, 700], [620, 850], [580, 970], [515, 1065]], r: 0.15 },
  { pts: [[712, 700], [800, 830], [950, 980], [1090, 1100]], r: 0.12 },
];

const LEAVES = [
  { base: [490, 275], tip: [290, 180] },
  { base: [665, 275], tip: [617, 45] },
  { base: [870, 365], tip: [1010, 180] },
  { base: [480, 520], tip: [245, 507] },
  { base: [545, 690], tip: [345, 805] },
];

// Tube whose radius swells in the middle and tapers to fine points like a brush stroke.
function taperedTube(points, maxR) {
  const curve = new THREE.CatmullRomCurve3(points.map(toV), false, 'centripetal');
  const seg = 120;
  const rad = 20;
  const geo = new THREE.TubeGeometry(curve, seg, 1, rad, false);
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i <= seg; i++) {
    const t = i / seg;
    const c = curve.getPointAt(t);
    const scale = maxR * (0.12 + 0.88 * Math.pow(Math.sin(Math.PI * t), 0.7));
    for (let j = 0; j <= rad; j++) {
      const idx = i * (rad + 1) + j;
      v.fromBufferAttribute(pos, idx).sub(c).multiplyScalar(scale).add(c);
      pos.setXYZ(idx, v.x, v.y, v.z);
    }
  }
  geo.computeVertexNormals();
  return geo;
}

export default function LogoFigure({ scale = 1, ...props }) {
  const group = useRef();
  const leafRefs = useRef([]);
  const head = useRef();

  const tubes = useMemo(() => STROKES.map((s) => taperedTube(s.pts, s.r)), []);
  const leaves = useMemo(
    () =>
      LEAVES.map(({ base, tip }) => {
        const b = toV(base);
        const t = toV(tip);
        const d = t.clone().sub(b);
        return { position: b, rotation: Math.atan2(d.y, d.x) - Math.PI / 2, length: d.length() };
      }),
    []
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mouse.x * 0.6, 0.05);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -mouse.y * 0.25, 0.05);
    }
    leafRefs.current.forEach((l, i) => {
      if (!l) return;
      l.rotation.y = Math.sin(t * 1.4 + i) * 0.45;
      l.rotation.x = Math.cos(t * 1.1 + i * 2) * 0.15;
    });
    if (head.current) head.current.position.y = toV([748, 455]).y + Math.sin(t * 2) * 0.04;
  });

  return (
    <group ref={group} scale={scale} {...props}>
      {tubes.map((g, i) => (
        <mesh key={i} geometry={g} castShadow>
          <meshPhysicalMaterial color="#E3121B" roughness={0.25} metalness={0.15} clearcoat={1} clearcoatRoughness={0.15} />
        </mesh>
      ))}
      <mesh ref={head} position={toV([748, 455])} castShadow>
        <sphereGeometry args={[0.33, 64, 64]} />
        <meshPhysicalMaterial color="#E3121B" roughness={0.2} clearcoat={1} clearcoatRoughness={0.1} />
      </mesh>
      {leaves.map((l, i) => (
        <group key={i} position={l.position} rotation={[0, 0, l.rotation]}>
          <group ref={(el) => (leafRefs.current[i] = el)}>
            <Leaf length={l.length} />
          </group>
        </group>
      ))}
    </group>
  );
}
