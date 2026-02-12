import { useNavigate } from 'react-router';
import Header from './Header';
import { getThemeColors } from '../utils/theme';

export default function NotFound() {
  const navigate = useNavigate();
  const theme = getThemeColors('blue'); // Default theme

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: theme.primaryLight }}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-0 -left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 animate-pulse"
          style={{ background: theme.primary }}
        />
        <div 
          className="absolute bottom-0 -right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ background: theme.secondary, animationDelay: '1s' }}
        />
      </div>

      <div className="relative z-10">
        <Header theme={theme} showZoneSelector={false} />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center backdrop-blur-xl bg-white/80 rounded-3xl p-12 shadow-2xl max-w-2xl mx-auto mt-6">
              <div className="text-6xl mb-4">🚫</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h2>
              <p className="text-gray-600 mb-6">The page you are looking for does not exist.</p>
              <button
                onClick={() => navigate('/route-1')}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:scale-105 transition-all shadow-xl"
              >
                Return Home
              </button>
            </div>
        </main>
      </div>
    </div>
  );
}

