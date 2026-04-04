import './globals.css';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMap,
	faMapMarkerAlt,
	faUser,
	faDatabase,
    faChartLine
} from "@fortawesome/free-solid-svg-icons";

export const metadata = {
  title: 'Traffic SensAI',
  description: 'Predictive Traffic Accident Analysis Tool',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
          {/* Glassmorphic Navbar */}
          <nav className="glass-panel" style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: '1200px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 30px',
            zIndex: 1000,
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
          }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
                <h2 style={{
                  margin: 0,
                  fontSize: '24px',
                  fontWeight: 700,
                  background: 'linear-gradient(to right, #3b82f6, #06b6d4)',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  letterSpacing: '1px'
                }}>
                  Traffic SensAI
                </h2>
            </Link>

            <div style={{ display: 'flex', gap: '30px' }}>
              <Link href="/" style={{
                color: 'var(--text-primary)',
                fontSize: '16px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.3s'
              }}>
                <FontAwesomeIcon icon={faMap} style={{ marginRight: '8px', color: 'var(--accent-cyan)' }} />
                Map
              </Link>
              <Link href="/hotspot" style={{
                color: 'var(--text-primary)',
                fontSize: '16px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.3s'
              }}>
                <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: '8px', color: 'var(--accent-cyan)' }} />
                Hotspot
              </Link>
              <Link href="/methodology" style={{
                color: 'var(--text-primary)',
                fontSize: '16px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.3s'
              }}>
                <FontAwesomeIcon icon={faChartLine} style={{ marginRight: '8px', color: 'var(--accent-cyan)' }} />
                Methodology
              </Link>
              <Link href="/methods" style={{
                color: 'var(--text-primary)',
                fontSize: '16px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.3s'
              }}>
                <FontAwesomeIcon icon={faDatabase} style={{ marginRight: '8px', color: 'var(--accent-cyan)' }} />
                Datasets
              </Link>
              <Link href="/profiles" style={{
                color: 'var(--text-primary)',
                fontSize: '16px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.3s'
              }}>
                <FontAwesomeIcon icon={faUser} style={{ marginRight: '8px', color: 'var(--accent-cyan)' }} />
                Profiles
              </Link>
            </div>
          </nav>

          {/* Main Content Area */}
          <main style={{ flex: 1, position: 'relative', overflowY: 'auto', overflowX: 'hidden' }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
