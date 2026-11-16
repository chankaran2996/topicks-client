import { Canvas, useThree } from '@react-three/fiber';
import { Float, Sparkles, ContactShadows } from '@react-three/drei';
import LogoFigure from './LogoFigure';
import FallingLeaves from './FallingLeaves';

// Scales and centres the figure so it always fits the canvas (phones are narrow).
function ResponsiveFigure() {
  const { viewport } = useThree();
  const narrow = viewport.width < 6;
  const scale = Math.min(0.82, (viewport.width / 6.2) * 0.82, (viewport.height / 6) * 0.82);
  return <LogoFigure scale={scale} position={[narrow ? 0 : 0.7, -0.15, 0]} />;
}

// Home hero: the Topicks figure, rebuilt in 3D, surrounded by drifting leaves.
export default function HeroScene() {
  return (
    <Canvas className="hero-canvas" dpr={[1, 1.75]} camera={{ position: [0, 0, 7.5], fov: 42 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 5]} intensity={2.2} color="#fff4ec" />
      <pointLight position={[-5, -2, 3]} intensity={30} color="#ff8fa3" />
      <pointLight position={[4, -3, -2]} intensity={20} color="#7dd38b" />

      <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.8}>
        <ResponsiveFigure />
      </Float>

      <FallingLeaves />
      <Sparkles count={70} scale={[11, 7, 4]} size={3} speed={0.35} color="#E3121B" opacity={0.6} />
      <ContactShadows position={[0, -2.9, 0]} opacity={0.25} scale={10} blur={2.6} far={4} color="#7a0c12" />
    </Canvas>
  );
}
