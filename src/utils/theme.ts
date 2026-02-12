import { ZoneColor } from '../data/mockData';

export interface ThemeColors {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  secondary: string;
  accent: string;
  gradient: string;
  text: string;
  badge: string;
}

export const getThemeColors = (color: ZoneColor): ThemeColors => {
  const themes: Record<ZoneColor, ThemeColors> = {
    red: {
      primary: 'rgb(220, 38, 38)',
      primaryDark: 'rgb(185, 28, 28)',
      primaryLight: 'rgb(254, 226, 226)',
      secondary: 'rgb(248, 113, 113)',
      accent: 'rgb(239, 68, 68)',
      gradient: 'linear-gradient(135deg, rgb(220, 38, 38) 0%, rgb(239, 68, 68) 100%)',
      text: 'rgb(127, 29, 29)',
      badge: 'bg-red-100 text-red-700 border-red-300'
    },
    green: {
      primary: 'rgb(22, 163, 74)',
      primaryDark: 'rgb(21, 128, 61)',
      primaryLight: 'rgb(220, 252, 231)',
      secondary: 'rgb(74, 222, 128)',
      accent: 'rgb(34, 197, 94)',
      gradient: 'linear-gradient(135deg, rgb(22, 163, 74) 0%, rgb(34, 197, 94) 100%)',
      text: 'rgb(20, 83, 45)',
      badge: 'bg-green-100 text-green-700 border-green-300'
    },
    saffron: {
      primary: 'rgb(234, 88, 12)',
      primaryDark: 'rgb(194, 65, 12)',
      primaryLight: 'rgb(255, 237, 213)',
      secondary: 'rgb(251, 146, 60)',
      accent: 'rgb(249, 115, 22)',
      gradient: 'linear-gradient(135deg, rgb(234, 88, 12) 0%, rgb(249, 115, 22) 100%)',
      text: 'rgb(124, 45, 18)',
      badge: 'bg-orange-100 text-orange-700 border-orange-300'
    },
    blue: {
      primary: 'rgb(37, 99, 235)',
      primaryDark: 'rgb(29, 78, 216)',
      primaryLight: 'rgb(219, 234, 254)',
      secondary: 'rgb(96, 165, 250)',
      accent: 'rgb(59, 130, 246)',
      gradient: 'linear-gradient(135deg, rgb(37, 99, 235) 0%, rgb(59, 130, 246) 100%)',
      text: 'rgb(30, 58, 138)',
      badge: 'bg-blue-100 text-blue-700 border-blue-300'
    },
    yellow: {
      primary: 'rgb(202, 138, 4)',
      primaryDark: 'rgb(161, 98, 7)',
      primaryLight: 'rgb(254, 249, 195)',
      secondary: 'rgb(250, 204, 21)',
      accent: 'rgb(234, 179, 8)',
      gradient: 'linear-gradient(135deg, rgb(202, 138, 4) 0%, rgb(234, 179, 8) 100%)',
      text: 'rgb(113, 63, 18)',
      badge: 'bg-yellow-100 text-yellow-700 border-yellow-300'
    },
    violet: {
      primary: 'rgb(124, 58, 237)',
      primaryDark: 'rgb(109, 40, 217)',
      primaryLight: 'rgb(237, 233, 254)',
      secondary: 'rgb(167, 139, 250)',
      accent: 'rgb(139, 92, 246)',
      gradient: 'linear-gradient(135deg, rgb(124, 58, 237) 0%, rgb(139, 92, 246) 100%)',
      text: 'rgb(76, 29, 149)',
      badge: 'bg-violet-100 text-violet-700 border-violet-300'
    },
    pink: {
      primary: 'rgb(219, 39, 119)',
      primaryDark: 'rgb(190, 24, 93)',
      primaryLight: 'rgb(252, 231, 243)',
      secondary: 'rgb(244, 114, 182)',
      accent: 'rgb(236, 72, 153)',
      gradient: 'linear-gradient(135deg, rgb(219, 39, 119) 0%, rgb(236, 72, 153) 100%)',
      text: 'rgb(131, 24, 67)',
      badge: 'bg-pink-100 text-pink-700 border-pink-300'
    }
  };

  return themes[color];
};
