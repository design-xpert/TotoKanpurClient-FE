import { useState } from 'react';
import { Sparkles, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router';
import { getThemeColors } from '../utils/theme';
import kpcLogo from '../assets/logo/Kanpur-Police-Commission-logo.jpg';

const zonesList = [
  { id: '1', name: 'Red Zone', color: 'red' },
  { id: '2', name: 'Green Zone', color: 'green' },
  { id: '3', name: 'Saffron Zone', color: 'saffron' },
  { id: '4', name: 'Blue Zone', color: 'blue' },
  { id: '5', name: 'Yellow Zone', color: 'yellow' },
  { id: '6', name: 'Violet Zone', color: 'violet' },
  { id: '7', name: 'Pink Zone', color: 'pink' },
];

interface HeaderProps {
  theme: any;
  showZoneSelector?: boolean;
  currentZoneId?: string;
}

export default function Header({ theme, showZoneSelector = true, currentZoneId }: HeaderProps) {
  const navigate = useNavigate();
  const [showZoneDropdown, setShowZoneDropdown] = useState(false);

  const handleZoneChange = (newZoneId: string) => {
    navigate(`/route-${newZoneId}`);
    setShowZoneDropdown(false);
  };

  return (
    <header className="backdrop-blur-xl bg-white/40 border-b border-white/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
            <div 
              className="h-14 w-14 rounded-2xl p-2 backdrop-blur-xl shadow-lg flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
            >
              <img
                src={kpcLogo}
                alt="KPC"
                className="h-full w-full object-cover rounded-xl"
              />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-800">Traffic Police Commissionerate Kanpur </h1>
              <p className="text-xs sm:text-sm text-gray-600">E-Rickshaw Zone System</p>
            </div>
          </div>
          
          {showZoneSelector && (
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
                <div className="absolute right-0 mt-3 w-64 backdrop-blur-2xl bg-white/90 rounded-3xl shadow-2xl border border-white/50 overflow-hidden z-50">
                  <div className="p-2 space-y-1">
                    {zonesList.map(zone => {
                      const zoneTheme = getThemeColors(zone.color as any) || getThemeColors('blue');
                      return (
                        <button
                          key={zone.id}
                          onClick={() => handleZoneChange(zone.id)}
                          className="w-full px-4 py-3 text-left rounded-2xl transition-all hover:scale-[1.02] flex items-center gap-3 group"
                          style={{ 
                            background: currentZoneId === zone.id ? `${zoneTheme.primary}20` : 'transparent'
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
          )}
        </div>
      </div>
    </header>
  );
}
