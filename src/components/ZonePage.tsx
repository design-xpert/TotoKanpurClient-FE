import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Search, MapPin, ChevronDown, Sparkles, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getThemeColors } from '../utils/theme';
import { RouteData, SearchResponse } from '../types/api';
import NotFound from './NotFound';
import Header from './Header';

export default function ZonePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showAllThanas, setShowAllThanas] = useState(false);
  
  const [routeData, setRouteData] = useState<RouteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Parse zoneId from slug
  const zoneId = slug ? slug.split('-')[1] : null;

  useEffect(() => {
    if (!slug) {
       // Home route case
       navigate(`/route-1`, { replace: true });
       return;
    }

    if (!slug.startsWith('route-') || !zoneId) {
      setLoading(false);
      return;
    }

    const fetchRouteData = async () => {
      try {
        setLoading(true);
        setError(null);
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://totoapi.kvtmedia.com';
        const response = await fetch(`${baseUrl}/color-details/${zoneId}`);
        const data = await response.json();

        if (data.error) {
          setError(data.error);
          setRouteData(null);
        } else {
          setRouteData(data);
        }
      } catch (err) {
        console.error("Failed to fetch route data", err);
        setError("Failed to load route data");
      } finally {
        setLoading(false);
      }
    };

    fetchRouteData();
  }, [slug, zoneId, navigate]);

  // If slug is invalid (e.g. not starting with 'route-'), show NotFound
  // But wait for effect to run for home redirect
  if (slug && (!slug.startsWith('route-') || !zoneId)) {
     return <NotFound />;
  }


  useEffect(() => {
    setShowAllThanas(false);
  }, [zoneId]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError(null);
    if (!searchQuery.trim()) return;

    setSearchLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://totoapi.kvtmedia.com';
      const response = await fetch(`${baseUrl}/search-toto-public?query=${searchQuery}`);
      const data: SearchResponse = await response.json();

      if (data.error || !data.registration_no) {
         setSearchError(data.error || 'No record found');
         return;
      }

      // Color Validation
      if (routeData && routeData.color_name.toLowerCase() !== data.route_color.toLowerCase()) {
        setSearchError('This vehicle does not belong to this route');
        return;
      }

      // Success
      navigate('/vehicle', { state: { vehicle: data } });

    } catch (err) {
      console.error("Search failed", err);
      setSearchError("An error occurred while searching");
    } finally {
      setSearchLoading(false);
    }
  };

  const theme = routeData ? getThemeColors(routeData.color_name.toLowerCase() as any) || getThemeColors('blue') : getThemeColors('blue');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !routeData) {
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
          <Header theme={theme} showZoneSelector={true} currentZoneId={zoneId || undefined} />
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center backdrop-blur-xl bg-white/80 rounded-3xl p-12 shadow-2xl max-w-2xl mx-auto mt-6">
              <div className="text-6xl mb-4">🚫</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Route Not Matched</h2>
              {/* <p className="text-gray-600 mb-6">{error || 'The requested route could not be found.'}</p> */}
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

  const thanasPrimary = routeData.thanas.slice(0, 8);
  const thanasExtra = routeData.thanas.slice(8).filter((t: any) => (t?.name || t?.thanaName));
  const hasMoreThanas = thanasExtra.length > 0;

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
        <Header theme={theme} showZoneSelector={true} currentZoneId={zoneId || undefined} />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Hero Zone Card */}
          <div className="relative">
            <div 
              className="rounded-[2.5rem] p-8 sm:p-12 overflow-hidden shadow-2xl backdrop-blur-xl border border-white/30"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))' }}
            >
              <div 
                className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20"
                style={{ background: theme.primary }}
              />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl"
                    style={{ background: theme.gradient }}
                  >
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Current Zone</p>
                    <h2 className="text-4xl sm:text-5xl font-bold" style={{ color: theme.text }}>
                      Route-{zoneId} {routeData.color_name} Zone
                    </h2>
                  </div>
                </div>
                
                <div className="mt-6">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Covered Thanas</p>
                  <div className="flex flex-wrap gap-2">
                    {thanasPrimary.map((thana, idx) => (
                      <span
                        key={String((thana as any).id ?? (thana as any).thana_id ?? `primary-${idx}`)}
                        className="px-4 py-2 rounded-full text-sm font-medium backdrop-blur-xl bg-white/60 border border-white/80 shadow-md hover:scale-105 transition-transform"
                        style={{ color: theme.text }}
                      >
                        {(thana as any).name ?? (thana as any).thanaName}
                      </span>
                    ))}
                    
                    {/* Expandable thanas (beyond 8) with smooth animation */}
                    <AnimatePresence>
                      {showAllThanas && thanasExtra.map((thana, index) => (
                        <motion.span
                          key={String((thana as any).id ?? (thana as any).thana_id ?? `extra-${index}`)}
                          initial={{ opacity: 0, scale: 0.8, height: 0 }}
                          animate={{ 
                            opacity: 1, 
                            scale: 1,
                            height: 'auto',
                            transition: {
                              duration: 0.3,
                              delay: index * 0.05,
                              ease: "easeOut"
                            }
                          }}
                          exit={{ 
                            opacity: 0, 
                            scale: 0.8,
                            transition: {
                              duration: 0.2,
                              ease: "easeIn"
                            }
                          }}
                          className="px-4 py-2 rounded-full text-sm font-medium backdrop-blur-xl bg-white/60 border border-white/80 shadow-md hover:scale-105 transition-transform"
                          style={{ color: theme.text }}
                        >
                          {(thana as any).name ?? (thana as any).thanaName}
                        </motion.span>
                      ))}
                    </AnimatePresence>
                    
                    {hasMoreThanas && (
                      <motion.button
                        onClick={() => setShowAllThanas(!showAllThanas)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 rounded-full text-sm font-bold backdrop-blur-xl border-2 shadow-lg transition-all"
                        style={{ 
                          color: theme.primary,
                          borderColor: theme.primary,
                          background: 'rgba(255, 255, 255, 0.9)'
                        }}
                      >
                        {showAllThanas ? '▲ Show Less' : `▼ Show More (${thanasExtra.length})`}
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search Section */}
          <div 
            className="rounded-[2.5rem] p-8 sm:p-12 backdrop-blur-2xl shadow-2xl border border-white/30"
            style={{ background: 'rgba(255, 255, 255, 0.8)' }}
          >
            <div className="text-center mb-8">
              <div className="inline-block">
                <div 
                  className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-xl mb-4 mx-auto"
                  style={{ background: theme.gradient }}
                >
                  <Search className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
                Find Your E-Rickshaw/E-Auto
              </h3>
              <p className="text-gray-600 text-lg">
                Search by Registration or Serial Number
              </p>
            </div>

            <form onSubmit={handleSearch} className="max-w-3xl mx-auto space-y-4">
              <div 
                className={`relative rounded-3xl overflow-hidden transition-all border-2 ${
                  isSearchFocused ? 'scale-[1.02] shadow-2xl' : 'shadow-xl'
                }`}
                style={{ 
                  borderColor: isSearchFocused ? theme.primary : 'transparent'
                }}
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="UP78AB1234 or SN001234"
                  className="w-full px-6 py-6 text-lg bg-white/90 backdrop-blur-xl focus:outline-none"
                />
              </div>

              {/* Search Error Message */}
              <AnimatePresence>
                {searchError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 text-red-600 px-4"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <p className="text-sm font-semibold">{searchError}</p>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <button
                type="submit"
                disabled={searchLoading}
                className="w-full py-6 rounded-3xl text-white text-lg font-bold shadow-2xl transition-all hover:scale-[1.02] hover:shadow-3xl flex items-center justify-center gap-3 group cursor-pointer"
                style={{ background: theme.gradient }}
              >
                {searchLoading ? 'Searching...' : 'Search Vehicle'}
                {!searchLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>

            <div className="mt-8 max-w-3xl mx-auto p-6 rounded-2xl backdrop-blur-xl bg-white/50 border border-white/60">
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong className="text-gray-800">💡 Quick Tip:</strong> Enter your vehicle's registration number or serial number to instantly check your zone assignment and compliance status.
              </p>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Zone Management',
                desc: 'Smart zone allocation based on registered address',
                icon: '🗺️'
              },
              {
                title: 'Quick Verification',
                desc: 'Instant access to vehicle details and status',
                icon: '⚡'
              },
              {
                title: 'Security',
                desc: 'Passengers are requested to click the photo of the QR Sticker bearing Serial Number, before boarding the E-rikshaw/E-Auto for safety reasons',
                icon: '🛡️'   // icon: '✅'
              }
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-3xl p-6 backdrop-blur-xl bg-white/60 border border-white/80 shadow-xl hover:scale-[1.02] transition-all cursor-pointer"
              >
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="text-4xl">{item.icon}</div>
                  <h4 className="text-lg font-bold text-gray-800">{item.title}</h4>
                </div>
                <p className="text-sm text-gray-600 text-center">{item.desc}</p>
              </div>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-16 py-6 backdrop-blur-xl bg-white/40 border-t border-white/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center gap-4">
            <p className="text-left text-gray-600 text-sm">
              © 2026 Traffic Police Commissionerate Kanpur • All Rights Reserved
            </p>
            <p className="text-right text-gray-500 text-sm">
              Developed by <a href="https://kvtmedia.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-bold cursor-pointer transition-colors decoration-none">KV Tech Media Pvt. Ltd.</a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
