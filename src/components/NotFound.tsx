import { useNavigate } from 'react-router';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="text-center backdrop-blur-xl bg-white/80 rounded-3xl p-12 shadow-2xl">
        <div className="text-6xl mb-4">🚫</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-6">The page you are looking for does not exist.</p>
        <button
          onClick={() => navigate('/')}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:scale-105 transition-all shadow-xl"
        >
          Return Home
        </button>
      </div>
    </div>
  );
}
