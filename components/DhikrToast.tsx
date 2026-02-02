import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { getAppSettings } from '../services/storage';

const DHIKR_LIST = [
  "سبحان الله",
  "الحمد لله",
  "لا إله إلا الله",
  "الله أكبر",
  "سبحان الله وبحمده",
  "أستغفر الله",
  "اللهم صل وسلم على نبينا محمد"
];

// 3 minutes in milliseconds
const INTERVAL_MS = 3 * 60 * 1000;

export const DhikrToast: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [currentDhikr, setCurrentDhikr] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Check if notifications are enabled
    const settings = getAppSettings();
    if (!settings.dhikrEnabled) return;

    const interval = setInterval(() => {
      // Do not show if user is on the Study page (to avoid interruption)
      if (location.pathname === '/study') return;

      const randomDhikr = DHIKR_LIST[Math.floor(Math.random() * DHIKR_LIST.length)];
      setCurrentDhikr(randomDhikr);
      setVisible(true);
      
      // Auto hide after 15 seconds if ignored
      setTimeout(() => {
        setVisible(false);
      }, 15000);

    }, INTERVAL_MS);

    return () => clearInterval(interval);
  }, [location.pathname]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 right-4 md:right-auto md:w-80 bg-white border-l-4 border-emerald-500 shadow-xl rounded-lg p-4 z-50 animate-fade-in-up flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-gray-500 text-xs font-bold mb-1">تذكير بالله</h4>
          <p className="text-lg font-bold text-gray-800">{currentDhikr}</p>
        </div>
        <button 
          onClick={() => setVisible(false)} 
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={16} />
        </button>
      </div>
      
      <div className="flex gap-2 mt-1">
        <button 
          onClick={() => setVisible(false)}
          className="flex-1 bg-emerald-50 text-emerald-700 text-sm font-bold py-1.5 px-3 rounded-md hover:bg-emerald-100 flex items-center justify-center gap-2 transition-colors"
        >
          <Check size={14} /> ذكرته
        </button>
      </div>
    </div>
  );
};