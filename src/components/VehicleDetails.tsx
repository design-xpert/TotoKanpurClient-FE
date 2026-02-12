import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { ChevronLeft, User, CreditCard, Phone, FileText, MapPin, AlertCircle } from 'lucide-react';
import { getThemeColors } from '../utils/theme';
import { Vehicle } from '../types/api';
import kpcLogo from '../assets/logo/Kanpur-Police-Commission-logo.jpg';

export default function VehicleDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const vehicle = location.state?.vehicle as Vehicle | undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center backdrop-blur-xl bg-white/80 rounded-3xl p-12 shadow-2xl">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Vehicle Data Not Found</h2>
          <p className="text-gray-600 mb-6">Please search for the vehicle from the home page.</p>
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

  const theme = getThemeColors(vehicle.route_color.toLowerCase() as any) || getThemeColors('blue');

  // Map API fields to display format if needed, or use directly
  // Date formatting helper
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const isExpired = (dateString: string) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: theme.primaryLight }}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ background: theme.primary }}
        />
        <div 
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ background: theme.secondary, animationDelay: '1.5s' }}
        />
      </div>

      <div className="relative z-10">
        {/* Fluid Header */}
        <header className="backdrop-blur-xl bg-white/40 border-b border-white/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
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
                <h1 className="text-lg sm:text-xl font-bold text-gray-800">Vehicle Details</h1>
                <p className="text-xs sm:text-sm text-gray-600">{vehicle.registration_no}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          {/* Breadcrumb */}
          <button
            onClick={() => navigate(-1)} // Go back to previous page (likely ZonePage)
            className="flex items-center gap-2 px-6 py-3 rounded-2xl backdrop-blur-xl bg-white/70 border border-white/80 shadow-lg hover:scale-105 transition-all group"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold text-gray-800">Back</span>
          </button>

          {/* Zone Badge Hero */}
          <div 
            className="rounded-[2.5rem] p-8 sm:p-10 overflow-hidden shadow-2xl backdrop-blur-xl border border-white/30"
            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))' }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div 
                  className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-xl"
                  style={{ background: theme.gradient }}
                >
                  <MapPin className="w-10 h-10 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Assigned Zone</p>
                  <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: theme.text }}>
                    {vehicle.zone_name}
                  </h2>
                  <p className="text-gray-600 mt-1">📍 {vehicle.thana_name} Thana</p>
                </div>
              </div>
              
              <div className="text-center sm:text-right">
                <p className="text-sm text-gray-600 mb-1">Registration Number</p>
                <p className="text-2xl font-bold text-gray-800">{vehicle.registration_no}</p>
              </div>
            </div>
          </div>

          {/* Owner Information */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ background: theme.gradient }}
              >
                <User className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Owner Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                className="rounded-3xl p-6 backdrop-blur-xl bg-white/70 border border-white/80 shadow-xl hover:scale-[1.02] transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: theme.primaryLight }}
                  >
                    <User className="w-5 h-5" style={{ color: theme.primary }} />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Owner Name</p>
                </div>
                <p className="text-xl font-bold text-gray-800">{vehicle.owner_name}</p>
              </div>

              <div 
                className="rounded-3xl p-6 backdrop-blur-xl bg-white/70 border border-white/80 shadow-xl hover:scale-[1.02] transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: theme.primaryLight }}
                  >
                    <CreditCard className="w-5 h-5" style={{ color: theme.primary }} />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Aadhar Number</p>
                </div>
                <p className="text-xl font-bold text-gray-800">{vehicle.owner_aadhar}</p>
              </div>

              <div 
                className="rounded-3xl p-6 backdrop-blur-xl bg-white/70 border border-white/80 shadow-xl hover:scale-[1.02] transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: theme.primaryLight }}
                  >
                    <Phone className="w-5 h-5" style={{ color: theme.primary }} />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Mobile Number</p>
                </div>
                <p className="text-xl font-bold text-gray-800">{vehicle.owner_phone}</p>
              </div>
            </div>
          </div>

          {/* Vehicle Information */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ background: theme.gradient }}
              >
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Vehicle Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                className="rounded-3xl p-6 backdrop-blur-xl bg-white/70 border border-white/80 shadow-xl hover:scale-[1.02] transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: theme.primaryLight }}
                  >
                    <FileText className="w-5 h-5" style={{ color: theme.primary }} />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Registration Number</p>
                </div>
                <p className="text-xl font-bold text-gray-800">{vehicle.registration_no}</p>
              </div>

               <div 
                className="rounded-3xl p-6 backdrop-blur-xl bg-white/70 border border-white/80 shadow-xl hover:scale-[1.02] transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: theme.primaryLight }}
                  >
                    <FileText className="w-5 h-5" style={{ color: theme.primary }} />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Serial Number</p>
                </div>
                <p className="text-xl font-bold text-gray-800">{vehicle.serial_number}</p>
              </div>

               <div 
                className="rounded-3xl p-6 backdrop-blur-xl bg-white/70 border border-white/80 shadow-xl hover:scale-[1.02] transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: theme.primaryLight }}
                  >
                    <FileText className="w-5 h-5" style={{ color: theme.primary }} />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Chassis Number</p>
                </div>
                <p className="text-xl font-bold text-gray-800">{vehicle.chasis_no}</p>
              </div>
            </div>
            
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div 
                className={`rounded-3xl p-6 backdrop-blur-xl border shadow-xl hover:scale-[1.02] transition-all relative ${
                  isExpired(vehicle.insurance_upto) ? 'bg-red-50/90 border-red-200' : 'bg-white/70 border-white/80'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: isExpired(vehicle.insurance_upto) ? '#FEE2E2' : theme.primaryLight }}
                    >
                      <CheckCircle className={`w-5 h-5 ${isExpired(vehicle.insurance_upto) ? 'text-red-500' : ''}`} style={{ color: isExpired(vehicle.insurance_upto) ? undefined : theme.primary }} />
                    </div>
                    <p className={`text-sm font-medium ${isExpired(vehicle.insurance_upto) ? 'text-red-700' : 'text-gray-600'}`}>Insurance Valid Upto</p>
                  </div>
                  {isExpired(vehicle.insurance_upto) && (
                    <div className="bg-gray-200 text-black text-[8px] md:text-[10px] font-bold px-4 py-1 md:px-4 md:py-2 rounded-full shadow-lg flex items-center gap-2">
                      <AlertCircle className="w-3 h-3 md:w-4 md:h-4" />
                      Expired
                    </div>
                  )}
                </div>
                <p className={`text-xl font-bold ${isExpired(vehicle.insurance_upto) ? 'text-red-800' : 'text-gray-800'}`}>{formatDate(vehicle.insurance_upto)}</p>
              </div>

               <div 
                className={`rounded-3xl p-6 backdrop-blur-xl border shadow-xl hover:scale-[1.02] transition-all relative ${
                  isExpired(vehicle.fitness_upto) ? 'bg-red-50/90 border-red-200' : 'bg-white/70 border-white/80'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: isExpired(vehicle.fitness_upto) ? '#FEE2E2' : theme.primaryLight }}
                    >
                      <CheckCircle className={`w-5 h-5 ${isExpired(vehicle.fitness_upto) ? 'text-red-500' : ''}`} style={{ color: isExpired(vehicle.fitness_upto) ? undefined : theme.primary }} />
                    </div>
                    <p className={`text-sm font-medium ${isExpired(vehicle.fitness_upto) ? 'text-red-700' : 'text-gray-600'}`}>Fitness Valid Upto</p>
                  </div>
                  {isExpired(vehicle.fitness_upto) && (
                    <div className="bg-gray-200 text-black text-[8px] md:text-[10px] font-bold px-4 py-1 md:px-4 md:py-2 rounded-full shadow-lg flex items-center gap-2">
                      <AlertCircle className="w-3 h-3 md:w-4 md:h-4" />
                      Expired
                    </div>
                  )}
                </div>
                <p className={`text-xl font-bold ${isExpired(vehicle.fitness_upto) ? 'text-red-800' : 'text-gray-800'}`}>{formatDate(vehicle.fitness_upto)}</p>
              </div>

               <div 
                className={`rounded-3xl p-6 backdrop-blur-xl border shadow-xl hover:scale-[1.02] transition-all relative ${
                  isExpired(vehicle.tax_upto) ? 'bg-red-50/90 border-red-200' : 'bg-white/70 border-white/80'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: isExpired(vehicle.tax_upto) ? '#FEE2E2' : theme.primaryLight }}
                    >
                      <CheckCircle className={`w-5 h-5 ${isExpired(vehicle.tax_upto) ? 'text-red-500' : ''}`} style={{ color: isExpired(vehicle.tax_upto) ? undefined : theme.primary }} />
                    </div>
                    <p className={`text-sm font-medium ${isExpired(vehicle.tax_upto) ? 'text-red-700' : 'text-gray-600'}`}>Tax Valid Upto</p>
                  </div>
                  {isExpired(vehicle.tax_upto) && (
                    <div className="bg-gray-200 text-black text-[8px] md:text-[10px] font-bold px-4 py-1 md:px-4 md:py-2 rounded-full shadow-lg flex items-center gap-2">
                      <AlertCircle className="w-3 h-3 md:w-4 md:h-4" />
                      Expired
                    </div>
                  )}
                </div>
                <p className={`text-xl font-bold ${isExpired(vehicle.tax_upto) ? 'text-red-800' : 'text-gray-800'}`}>{formatDate(vehicle.tax_upto)}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Icon component
function CheckCircle({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      style={style}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
}
