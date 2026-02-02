import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Study } from './pages/Study';
import { Quran } from './pages/Quran';
import { FullQuran } from './pages/FullQuran';
import { Finance } from './pages/Finance';
import { DailyReview } from './pages/DailyReview';
import { WeeklyReview } from './pages/WeeklyReview';
import { ScreenTime } from './pages/ScreenTime';
import { Tasbeeh } from './pages/Tasbeeh';
import { Prayers } from './pages/Prayers';
import { Habits } from './pages/Habits';
import { Focus } from './pages/Focus';
import { Settings } from './pages/Settings';
import { Ramadan } from './pages/Ramadan';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ramadan" element={<Ramadan />} />
          <Route path="/prayers" element={<Prayers />} />
          <Route path="/study" element={<Study />} />
          <Route path="/focus" element={<Focus />} />
          <Route path="/quran" element={<Quran />} />
          <Route path="/full-quran" element={<FullQuran />} />
          <Route path="/habits" element={<Habits />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/screentime" element={<ScreenTime />} />
          <Route path="/tasbeeh" element={<Tasbeeh />} />
          <Route path="/daily" element={<DailyReview />} />
          <Route path="/weekly" element={<WeeklyReview />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;