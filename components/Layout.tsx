import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, BookOpen, Book, Wallet, CalendarCheck, ClipboardList, 
  Smartphone, Loader2, Moon, Sun, HeartPulse, Focus, Rocket, Settings, Star, FileText
} from 'lucide-react';
import { DhikrToast } from './DhikrToast';
import { AIChat } from './AIChat';
import { getAppSettings, saveAppSettings } from '../services/storage';

const navItems = [
  { to: '/', label: 'الرئيسية', icon: LayoutDashboard },
  { to: '/ramadan', label: 'رمضان 🌙', icon: Star },
  { to: '/prayers', label: 'الصلوات', icon: Moon },
  { to: '/study', label: 'المذاكرة', icon: BookOpen },
  { to: '/focus', label: 'التركيز', icon: Focus },
  { to: '/quran', label: 'القرآن (ورد)', icon: Book },
  { to: '/full-quran', label: 'المصحف كامل', icon: FileText }, // New Item
  { to: '/habits', label: 'صحة وعادات', icon: HeartPulse },
  { to: '/finance', label: 'المصروف', icon: Wallet },
  { to: '/screentime', label: 'موبايلي', icon: Smartphone },
  { to: '/tasbeeh', label: 'السبحة', icon: Loader2 },
  { to: '/daily', label: 'يوميات', icon: CalendarCheck },
  { to: '/weekly', label: 'أسبوعي', icon: ClipboardList },
];

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const settings = getAppSettings();
    setIsDark(settings.darkMode);
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    const settings = getAppSettings();
    saveAppSettings({ ...settings, darkMode: newMode });
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const getTitle = () => {
    const item = navItems.find(i => i.to === location.pathname);
    if (location.pathname === '/settings') return 'الإعدادات';
    return item ? item.label : 'إنجاز';
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans bg-gray-50 dark:bg-dark-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <DhikrToast />
      <AIChat />
      
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-dark-800 border-l border-gray-200 dark:border-gray-700 h-screen sticky top-0 p-6 shadow-sm overflow-y-auto custom-scrollbar">
        
        {/* Creative Logo */}
        <div className="mb-10 flex items-center gap-3">
          <div className="relative">
             <div className="absolute inset-0 bg-primary-500 blur-lg opacity-20 rounded-full"></div>
             <Rocket className="text-primary-600 dark:text-primary-400 relative z-10" size={32} strokeWidth={2.5} />
          </div>
          <div>
             <h1 className="text-2xl font-extrabold bg-gradient-to-r from-primary-600 to-teal-500 bg-clip-text text-transparent">
               إنجـاز
             </h1>
             <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold tracking-widest">NEXT LEVEL</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? item.to === '/ramadan' 
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold shadow-md' // Special style for Ramadan
                      : 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 font-bold shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200'
                }`
              }
            >
              <item.icon size={20} className={item.to === '/ramadan' ? 'text-amber-300' : ''} />
              {item.label}
            </NavLink>
          ))}
          
          <div className="my-2 border-t border-gray-100 dark:border-gray-700"></div>
          
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-bold'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`
            }
          >
            <Settings size={20} />
            الإعدادات
          </NavLink>
        </nav>

        <button 
          onClick={toggleTheme}
          className="mt-6 flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
          <span>{isDark ? 'الوضع النهاري' : 'الوضع الليلي'}</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pb-24 md:pb-0 overflow-y-auto">
        {/* Mobile Header */}
        <header className="md:hidden bg-white dark:bg-dark-800 p-4 sticky top-0 z-10 shadow-sm flex items-center justify-between border-b border-gray-100 dark:border-gray-700">
           <h1 className="text-xl font-bold text-gray-800 dark:text-white">{getTitle()}</h1>
           <div className="flex items-center gap-3">
             <button onClick={toggleTheme} className="p-2 text-gray-500 dark:text-gray-400">
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
             </button>
             <span className="text-primary-600 dark:text-primary-400 font-extrabold">إنجاز</span>
           </div>
        </header>

        <div className="p-4 md:p-8 max-w-5xl mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white dark:bg-dark-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2 flex justify-between items-center z-50 safe-area-bottom overflow-x-auto no-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 p-2 rounded-lg transition-colors min-w-[60px] ${
                isActive ? (item.to === '/ramadan' ? 'text-indigo-600 dark:text-indigo-400' : 'text-primary-600 dark:text-primary-400') : 'text-gray-400 dark:text-gray-500'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium whitespace-nowrap">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
         <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 p-2 rounded-lg transition-colors min-w-[60px] ${
                isActive ? 'text-gray-800 dark:text-white' : 'text-gray-400 dark:text-gray-500'
              }`
            }
          >
            <Settings size={24} strokeWidth={2} />
            <span className="text-[10px] font-medium whitespace-nowrap">الإعدادات</span>
          </NavLink>
      </nav>
    </div>
  );
};