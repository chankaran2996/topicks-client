// Global, allocation-free mouse tracker shared by 3D scenes.
// Values are normalised to -1..1 relative to the viewport.
export const mouse = { x: 0, y: 0 };

if (typeof window !== 'undefined') {
  window.addEventListener(
    'mousemove',
    (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
    },
    { passive: true }
  );
}
