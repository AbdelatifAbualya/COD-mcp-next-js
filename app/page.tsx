'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import MainContent from '@/components/MainContent';
import SettingsModal from '@/components/SettingsModal';

export default function Page() {
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);

  return (
    <div className="flex h-screen bg-dark-800 text-white">
      <Sidebar />
      <MainContent onOpenSettings={() => setSettingsModalOpen(true)} />
      <SettingsModal 
        isOpen={isSettingsModalOpen} 
        onClose={() => setSettingsModalOpen(false)} 
      />
    </div>
  );
}
