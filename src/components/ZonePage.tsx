import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Search, MapPin, ChevronDown, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getThemeColors } from '../utils/theme';
import { RouteData, SearchResponse } from '../types/api';

const zonesList = [
  { id: '1', name: 'Red Zone', color: 'red' },
  { id: '2', name: 'Green Zone', color: 'green' },
  { id: '3', name: 'Saffron Zone', color: 'saffron' },
  { id: '4', name: 'Blue Zone', color: 'blue' },
  { id: '5', name: 'Yellow Zone', color: 'yellow' },
  { id: '6', name: 'Violet Zone', color: 'violet' },
  { id: '7', name: 'Pink Zone', color: 'pink' },
];

import NotFound from './NotFound';

export default function ZonePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showZoneDropdown, setShowZoneDropdown] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showAllThanas, setShowAllThanas] = useState(false);
  
  const [routeData, setRouteData] = useState<RouteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);

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
    if (!searchQuery.trim()) return;

    setSearchLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://totoapi.kvtmedia.com';
      const response = await fetch(`${baseUrl}/search-toto-public?query=${searchQuery}`);
      const data: SearchResponse = await response.json();

      if (data.error || !data.registration_no) {
         alert(data.error || 'No record found');
         return;
      }

      // Color Validation
      if (routeData && routeData.color_name.toLowerCase() !== data.route_color.toLowerCase()) {
        alert('This vehicle does not belong to this route');
        return;
      }

      // Success
      navigate('/vehicle', { state: { vehicle: data } });

    } catch (err) {
      console.error("Search failed", err);
      alert("An error occurred while searching");
    } finally {
      setSearchLoading(false);
    }
  };

  const handleZoneChange = (newZoneId: string) => {
    navigate(`/route-${newZoneId}`);
    setShowZoneDropdown(false);
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-3xl shadow-xl">
           <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
           <p className="text-gray-600">{error || 'Route not found'}</p>
        </div>
      </div>
    );
  }

  const thanasToShow = showAllThanas ? routeData.thanas : routeData.thanas.slice(0, 8);
  const hasMoreThanas = routeData.thanas.length > 8;

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
        {/* Fluid Header */}
        <header className="backdrop-blur-xl bg-white/40 border-b border-white/30 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div 
                  className="h-14 w-14 rounded-2xl p-2 backdrop-blur-xl shadow-lg flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1601958983069-7ba15c2e1c6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2xpY2UlMjBlbWJsZW0lMjBpbmRpYXxlbnwxfHx8fDE3NzA4ODY1ODl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="KPC"
                    className="h-full w-full object-cover rounded-xl"
                  />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold text-gray-800">Kanpur Police Commission</h1>
                  <p className="text-xs sm:text-sm text-gray-600">Toto Zone System</p>
                </div>
              </div>
              
              {/* Floating Zone Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowZoneDropdown(!showZoneDropdown)}
                  className="px-4 py-2 rounded-2xl text-white font-semibold flex items-center gap-2 transition-all hover:scale-105 shadow-lg"
                  style={{ background: theme.gradient }}
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="hidden sm:inline">Switch Zone</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showZoneDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                {showZoneDropdown && (
                  <div className="absolute right-0 mt-3 w-64 backdrop-blur-2xl bg-white/90 rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
                    <div className="p-2 space-y-1">
                      {zonesList.map(zone => {
                        const zoneTheme = getThemeColors(zone.color as any) || getThemeColors('blue');
                        return (
                          <button
                            key={zone.id}
                            onClick={() => handleZoneChange(zone.id)}
                            className="w-full px-4 py-3 text-left rounded-2xl transition-all hover:scale-[1.02] flex items-center gap-3 group"
                            style={{ 
                              background: zoneId === zone.id ? `${zoneTheme.primary}20` : 'transparent'
                            }}
                          >
                            <div 
                              className="w-3 h-3 rounded-full shadow-lg group-hover:scale-125 transition-transform"
                              style={{ background: zoneTheme.gradient }}
                            />
                            <span className="font-medium text-gray-800">{zone.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

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
                      {routeData.color_name} Zone
                    </h2>
                  </div>
                </div>
                
                <div className="mt-6">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Covered Thanas</p>
                  <div className="flex flex-wrap gap-2">
                    {/* Always visible thanas (first 8) */}
                    {thanasToShow.map((thana) => (
                      <span
                        key={thana.thana_id}
                        className="px-4 py-2 rounded-full text-sm font-medium backdrop-blur-xl bg-white/60 border border-white/80 shadow-md hover:scale-105 transition-transform"
                        style={{ color: theme.text }}
                      >
                        {thana.thanaName}
                      </span>
                    ))}
                    
                    {/* Expandable thanas (beyond 8) with smooth animation */}
                    <AnimatePresence>
                      {showAllThanas && routeData.thanas.slice(8).map((thana, index) => (
                        <motion.span
                          key={thana.id}
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
                          {thana.name}
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
                        {showAllThanas ? '▲ Show Less' : `▼ Show More (${routeData.thanas.length - 8})`}
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
                Find Your Toto
              </h3>
              <p className="text-gray-600 text-lg">
                Search by Registration or Serial Number
              </p>
            </div>

            <form onSubmit={handleSearch} className="max-w-3xl mx-auto space-y-4">
              <div 
                className={`relative rounded-3xl overflow-hidden transition-all ${
                  isSearchFocused ? 'scale-[1.02] shadow-2xl' : 'shadow-xl'
                }`}
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="UP78AB1234 or SN001234"
                  className="w-full px-6 py-6 text-lg bg-white/90 backdrop-blur-xl border-2 focus:outline-none transition-all"
                  style={{ 
                    borderColor: isSearchFocused ? theme.primary : 'transparent'
                  }}
                />
              </div>
              
              <button
                type="submit"
                disabled={searchLoading}
                className="w-full py-6 rounded-3xl text-white text-lg font-bold shadow-2xl transition-all hover:scale-[1.02] hover:shadow-3xl flex items-center justify-center gap-3 group"
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
                title: 'Stay Compliant',
                desc: 'Check insurance, fitness & tax validity',
                icon: '✅'
              }
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-3xl p-6 backdrop-blur-xl bg-white/60 border border-white/80 shadow-xl hover:scale-[1.02] transition-all cursor-pointer"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-16 py-6 backdrop-blur-xl bg-white/40 border-t border-white/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-600 text-sm">
              © 2026 Kanpur Police Commission • All Rights Reserved
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
