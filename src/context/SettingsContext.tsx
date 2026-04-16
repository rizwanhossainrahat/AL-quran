"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Settings } from "@/types/quran";

const DEFAULT: Settings = {
  arabicFont: "Amiri",
  arabicSize: 28,
  translationSize: 16,
};

const STORAGE_KEY = "quran_settings";

interface SettingsContextValue {
  settings: Settings;
  updateSettings: (patch: Partial<Settings>) => void;
}

const SettingsContext = createContext<SettingsContextValue>({
  settings: DEFAULT,
  updateSettings: () => {},
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULT);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount to prevent hydration mismatch
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setSettings(JSON.parse(stored));
    } catch {}
    setMounted(true);
  }, []);

  function updateSettings(patch: Partial<Settings>) {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  // Avoid rendering children until settings are loaded to prevent mismatch
  if (!mounted) return null;

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
