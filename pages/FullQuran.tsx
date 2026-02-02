import React, { useState } from 'react';
import { BookOpen, Download, ExternalLink, Search, FileText, ChevronLeft, Menu } from 'lucide-react';

// قائمة السور
const SURAHS = [
  "الفاتحة", "البقرة", "آل عمران", "النساء", "المائدة", "الأنعام", "الأعراف", "الأنفال", "التوبة", "يونس",
  "هود", "يوسف", "الرعد", "إبراهيم", "الحجر", "النحل", "الإسراء", "الكهف", "مريم", "طه",
  "الأنبياء", "الحج", "المؤمنون", "النور", "الفرقان", "الشعراء", "النمل", "القصص", "العنكبوت", "الروم",
  "لقمان", "السجدة", "الأحزاب", "سبأ", "فاطر", "يس", "الصافات", "ص", "الزمر", "غافر",
  "فصلت", "الشورى", "الزخرف", "الدخان", "الجاثية", "الأحقاف", "محمد", "الفتح", "الحجرات", "ق",
  "الذاريات", "الطور", "النجم", "القمر", "الرحمن", "الواقعة", "الحديد", "المجادلة", "الحشر", "الممتحنة",
  "الصف", "الجمعة", "المنافقون", "التغابن", "الطلاق", "التحريم", "الملك", "القلم", "الحاقة", "المعارج",
  "نوح", "الجن", "المزمل", "المدثر", "القيامة", "الإنسان", "المرسلات", "النبأ", "النازعات", "عبس",
  "التكوير", "الإنفطار", "المطففين", "الإنشقاق", "البروج", "الطارق", "الأعلى", "الغاشية", "الفجر", "البلد",
  "الشمس", "الليل", "الضحى", "الشرح", "التين", "العلق", "القدر", "البينة", "الزلزلة", "العاديات",
  "القارعة", "التكاثر", "العصر", "الهمزة", "الفيل", "قريش", "الماعون", "الكوثر", "الكافرون", "النصر",
  "المسد", "الإخلاص", "الفلق", "الناس"
];

// ✅ تعديل وحيد هنا فقط
// الملفات موجودة داخل: public/quran/001.pdf ... 114.pdf
const BASE_URL = "/quran/";

export const FullQuran: React.FC = () => {
  const [selectedSurahIndex, setSelectedSurahIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  // Helper to format ID (e.g., 1 -> "001")
  const getFormattedId = (index: number) =>
    String(index + 1).padStart(3, '0');

  // Current PDF URL (local)
  const currentPdfUrl = `${BASE_URL}${getFormattedId(selectedSurahIndex)}.pdf`;

  // Filter Surahs
  const filteredSurahs = SURAHS
    .map((name, index) => ({ name, index }))
    .filter(
      item =>
        item.name.includes(searchQuery) ||
        String(item.index + 1).includes(searchQuery)
    );

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] animate-fade-in gap-4">

      {/* Header Bar */}
      <div className="bg-white dark:bg-dark-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="md:hidden p-2 bg-gray-100 dark:bg-dark-700 rounded-lg text-gray-600 dark:text-gray-300"
          >
            <Menu size={20} />
          </button>
          <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-xl text-emerald-600 dark:text-emerald-400">
            <BookOpen size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              المصحف (سور منفصلة)
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              سورة {SURAHS[selectedSurahIndex]}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <a
            href={currentPdfUrl}
            download={`Surah_${getFormattedId(selectedSurahIndex)}.pdf`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-xl font-bold hover:bg-indigo-100 transition-colors text-sm"
          >
            <Download size={16} />
            <span className="hidden sm:inline">تحميل السورة</span>
          </a>

          <a
            href={currentPdfUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-emerald-700 transition-colors text-sm"
          >
            <ExternalLink size={16} />
            <span className="hidden sm:inline">فتح خارجي</span>
          </a>
        </div>
      </div>

      <div className="flex flex-1 gap-4 overflow-hidden relative">

        {/* Sidebar */}
        <div
          className={`
            absolute md:static top-0 right-0 h-full w-72
            bg-white dark:bg-dark-800 rounded-2xl shadow-lg md:shadow-sm
            border border-gray-100 dark:border-gray-700
            flex flex-col z-20 transition-transform duration-300
            ${showMenu ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
          `}
        >
          {/* Search */}
          <div className="p-4 border-b border-gray-100 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute right-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="ابحث عن سورة..."
                className="w-full bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-gray-700 rounded-xl py-2.5 pr-10 pl-4 outline-none focus:border-emerald-500 text-sm dark:text-white"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
            {filteredSurahs.map(item => (
              <button
                key={item.index}
                onClick={() => {
                  setSelectedSurahIndex(item.index);
                  setShowMenu(false);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-right transition-colors ${
                  selectedSurahIndex === item.index
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-100 dark:border-emerald-800'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-xs w-6 h-6 flex items-center justify-center rounded-full ${
                    selectedSurahIndex === item.index
                      ? 'bg-emerald-200 dark:bg-emerald-800 text-emerald-800'
                      : 'bg-gray-100 dark:bg-dark-700 text-gray-500'
                  }`}>
                    {item.index + 1}
                  </span>
                  <span>{item.name}</span>
                </div>
                {selectedSurahIndex === item.index && <ChevronLeft size={16} />}
              </button>
            ))}

            {filteredSurahs.length === 0 && (
              <div className="text-center py-8 text-gray-400 text-sm">
                لا توجد نتائج
              </div>
            )}
          </div>
        </div>

        {/* Overlay */}
        {showMenu && (
          <div
            className="absolute inset-0 bg-black/50 z-10 md:hidden backdrop-blur-sm"
            onClick={() => setShowMenu(false)}
          />
        )}

        {/* PDF Viewer */}
        <div className="flex-1 bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden relative flex flex-col">
          <iframe
            key={currentPdfUrl}
            src={`${currentPdfUrl}#view=FitH`}
            className="w-full h-full"
            title={`Surah ${SURAHS[selectedSurahIndex]}`}
          >
            <div className="flex flex-col items-center justify-center h-full text-center p-8 space-y-4">
              <FileText size={48} className="text-gray-300" />
              <p className="text-gray-500">
                المتصفح لا يدعم عرض PDF مباشرة.
              </p>
              <a
                href={currentPdfUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold shadow-lg hover:bg-emerald-700"
              >
                اضغط هنا لتحميل/عرض سورة {SURAHS[selectedSurahIndex]}
              </a>
            </div>
          </iframe>
        </div>
      </div>
    </div>
  );
};