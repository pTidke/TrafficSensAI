'use client';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('./components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-color)', color: 'var(--accent-cyan)', fontSize: '24px' }}>
      Loading Traffic SensAI...
    </div>
  )
});

export default function Home() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <DynamicMap />
    </div>
  );
}
