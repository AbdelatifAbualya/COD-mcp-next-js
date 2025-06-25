'use client';

import React, { createContext, useState, ReactNode } from 'react';
import { Settings } from '@/types';

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
}

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<Settings>({
    reasoningEnhancement: 'adaptive',
    verificationDepth: 'standard',
    wordLimit: 500,
    temperature: 0.7,
    maxTokens: 4096,
    topP: 1,
  });

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prevSettings: Settings) => ({ ...prevSettings, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
