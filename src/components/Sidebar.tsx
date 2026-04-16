"use client";

import { X, Settings } from "lucide-react";
import { useState } from "react";
import { useSettings } from "@/context/SettingsContext";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const { settings, updateSettings } = useSettings();

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open settings"
        className="p-2 rounded-lg hover:bg-emerald-50 text-slate-700 hover:text-emerald-600 transition-colors"
      >
        <Settings size={20} />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">Settings</h2>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close settings"
            className="p-1 rounded hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Arabic Font */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Arabic Font
            </label>
            <select
              value={settings.arabicFont}
              onChange={(e) =>
                updateSettings({
                  arabicFont: e.target.value as "Amiri" | "Scheherazade",
                })
              }
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Amiri">Amiri</option>
              <option value="Scheherazade">Scheherazade New</option>
            </select>
          </div>

          {/* Arabic Font Size */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Arabic Text Size:{" "}
              <span className="text-emerald-600">{settings.arabicSize}px</span>
            </label>
            <input
              type="range"
              min={18}
              max={48}
              value={settings.arabicSize}
              onChange={(e) =>
                updateSettings({ arabicSize: Number(e.target.value) })
              }
              className="w-full accent-emerald-600"
            />
          </div>

          {/* Translation Font Size */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Translation Size:{" "}
              <span className="text-emerald-600">
                {settings.translationSize}px
              </span>
            </label>
            <input
              type="range"
              min={12}
              max={24}
              value={settings.translationSize}
              onChange={(e) =>
                updateSettings({ translationSize: Number(e.target.value) })
              }
              className="w-full accent-emerald-600"
            />
          </div>

          <div className="border border-slate-100 rounded-lg p-3 bg-slate-50">
            <p
              className={settings.arabicFont === "Amiri" ? "font-amiri" : "font-scheherazade"}
              style={{ fontSize: settings.arabicSize, direction: "rtl" }}
            >
              {"\u0628\u0650\u0633\u0652\u0645\u0650 \u0627\u0644\u0644\u0651\u064e\u0647\u0650"}
            </p>
            <p
              className="text-slate-500 mt-1"
              style={{ fontSize: settings.translationSize }}
            >
              In the name of Allah
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
