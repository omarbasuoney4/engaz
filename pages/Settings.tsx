import React, { useRef } from 'react';
import { Download, Upload, AlertTriangle, Settings as SettingsIcon } from 'lucide-react';

export const Settings: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data: Record<string, any> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('injaz_')) {
        data[key] = localStorage.getItem(key);
      }
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `injaz_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (confirm('هل أنت متأكد؟ سيتم استبدال البيانات الحالية بالبيانات الموجودة في الملف.')) {
           Object.entries(json).forEach(([key, value]) => {
             if (typeof value === 'string') {
               localStorage.setItem(key, value);
             }
           });
           alert('تم استعادة البيانات بنجاح! سيتم تحديث الصفحة.');
           window.location.reload();
        }
      } catch (err) {
        alert('حدث خطأ في قراءة الملف. تأكد أنه ملف نسخ احتياطي صحيح.');
      }
    };
    reader.readAsText(file);
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleClearData = () => {
    if (confirm('تحذير نهائي: هل تريد حذف جميع بيانات التطبيق؟ لا يمكن التراجع عن هذا الإجراء.')) {
       localStorage.clear();
       window.location.reload();
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
       <div className="text-center">
         <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center justify-center gap-2">
           <SettingsIcon className="text-gray-600 dark:text-gray-400" /> الإعدادات والبيانات
         </h2>
         <p className="text-gray-500 dark:text-gray-400">تحكم في بياناتك واحفظها من الضياع</p>
       </div>

       <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
             <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">النسخ الاحتياطي والاستعادة</h3>
             <p className="text-sm text-gray-500 dark:text-gray-400">
               بياناتك محفوظة حالياً على هذا المتصفح فقط. قم بتحميل نسخة احتياطية بشكل دوري لضمان عدم ضياعها.
             </p>
          </div>
          
          <div className="p-6 grid gap-4 md:grid-cols-2">
             <button 
               onClick={handleExport}
               className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-900/10 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors gap-3 group"
             >
               <div className="bg-primary-100 dark:bg-primary-800 p-3 rounded-full text-primary-600 dark:text-primary-300 group-hover:scale-110 transition-transform">
                 <Download size={24} />
               </div>
               <div className="text-center">
                 <span className="block font-bold text-primary-700 dark:text-primary-300">تحميل نسخة احتياطية</span>
                 <span className="text-xs text-primary-500 dark:text-primary-400">حفظ ملف JSON على جهازك</span>
               </div>
             </button>

             <button 
               onClick={handleImportClick}
               className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/10 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors gap-3 group"
             >
               <div className="bg-indigo-100 dark:bg-indigo-800 p-3 rounded-full text-indigo-600 dark:text-indigo-300 group-hover:scale-110 transition-transform">
                 <Upload size={24} />
               </div>
               <div className="text-center">
                 <span className="block font-bold text-indigo-700 dark:text-indigo-300">استعادة بيانات</span>
                 <span className="text-xs text-indigo-500 dark:text-indigo-400">رفع ملف JSON لاسترجاع التقدم</span>
               </div>
               <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".json" className="hidden" />
             </button>
          </div>
       </div>

       <div className="bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900 p-6 flex items-start gap-4">
          <AlertTriangle className="text-red-500 shrink-0" />
          <div className="flex-1">
             <h3 className="font-bold text-red-700 dark:text-red-400">منطقة الخطر</h3>
             <p className="text-sm text-red-600 dark:text-red-500 mb-4">
               هذا الإجراء سيقوم بمسح جميع بيانات التطبيق والعودة لنقطة الصفر.
             </p>
             <button 
               onClick={handleClearData}
               className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-700 transition-colors"
             >
               حذف جميع البيانات
             </button>
          </div>
       </div>
    </div>
  );
};