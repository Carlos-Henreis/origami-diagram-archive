"use client";

import Link from "next/link";
import { Check, ChevronDown, Menu, Monitor, Moon, Settings, Sun, X } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/", label: "Diagrams" },
  { href: "/gallery", label: "Gallery" },
  { href: "/origami-symbols", label: "Origami Symbols" },
  { href: "/music", label: "Music" },
];

type ThemePreference = "dark" | "light" | "system";
type ResolvedTheme = "dark" | "light";

const THEME_STORAGE_KEY = "origami-diagram-archive-theme";

const themeOptions: Array<{
  value: ThemePreference;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  {
    value: "dark",
    label: "Dark",
    description: "Default high-contrast archive theme.",
    icon: Moon,
  },
  {
    value: "light",
    label: "Light",
    description: "Warmer paper-toned reading theme.",
    icon: Sun,
  },
  {
    value: "system",
    label: "System",
    description: "Follow this device when requested.",
    icon: Monitor,
  },
];

function getStoredPreference(): ThemePreference {
  if (typeof window === "undefined") return "dark";

  const storedPreference = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (
    storedPreference === "light" ||
    storedPreference === "dark" ||
    storedPreference === "system"
  ) {
    return storedPreference;
  }

  return "dark";
}

function resolveTheme(preference: ThemePreference): ResolvedTheme {
  if (preference !== "system") return preference;

  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function applyTheme(preference: ThemePreference) {
  const resolvedTheme = resolveTheme(preference);

  document.documentElement.dataset.theme = resolvedTheme;
  document.documentElement.dataset.themePreference = preference;
  window.localStorage.setItem(THEME_STORAGE_KEY, preference);
}

export function HeaderNav() {
  const [open, setOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [themePreference, setThemePreference] =
    useState<ThemePreference>(getStoredPreference);

  const openSettings = () => {
    setThemePreference(getStoredPreference());
    setSettingsOpen((prev) => !prev);
  };

  const selectTheme = (preference: ThemePreference) => {
    applyTheme(preference);
    setThemePreference(preference);
  };

  return (
    <div className="relative flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
      <div className="flex items-center gap-3 md:order-2">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
          onClick={openSettings}
          aria-expanded={settingsOpen}
          aria-controls="site-settings"
          aria-label="Open settings"
          title="Settings"
        >
          <Settings className="h-4 w-4" />
        </button>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-900 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="site-nav"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />} Menu
        </button>
      </div>

      <nav
        id="site-nav"
        className={`${open ? "flex" : "hidden"} flex-col gap-2 md:mt-0 md:flex md:flex-row md:items-center`}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
            onClick={() => setOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {settingsOpen && (
        <div
          id="site-settings"
          className="absolute right-0 top-12 z-[110] w-[min(20rem,calc(100vw-3rem))] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/40"
        >
          <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
            <div>
              <p className="text-base font-semibold text-white">Settings</p>
              <p className="text-xs text-zinc-400">Customize the archive.</p>
            </div>
            <button
              type="button"
              className="rounded-full p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
              onClick={() => setSettingsOpen(false)}
              aria-label="Close settings"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4 px-5 py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-medium text-zinc-100">Theme</h2>
                <p className="mt-1 text-xs leading-5 text-zinc-400">
                  Choose dark mode by default, light mode, or your device
                  preference.
                </p>
              </div>
              <ChevronDown className="h-4 w-4 text-zinc-500" />
            </div>

            <div className="space-y-2" role="radiogroup" aria-label="Theme">
              {themeOptions.map((option) => {
                const Icon = option.icon;
                const selected = themePreference === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    className={`flex w-full items-start gap-3 rounded-xl border px-3 py-3 text-left transition ${
                      selected
                        ? "border-amber-300/60 bg-amber-300/10 text-white"
                        : "border-transparent text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800/80"
                    }`}
                    onClick={() => selectTheme(option.value)}
                  >
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                        selected
                          ? "border-amber-300 bg-amber-300 text-zinc-950"
                          : "border-zinc-600"
                      }`}
                    >
                      {selected && <Check className="h-3 w-3" />}
                    </span>
                    <Icon className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>
                      <span className="block text-sm font-medium">
                        {option.label}
                      </span>
                      <span className="mt-0.5 block text-xs leading-5 text-zinc-400">
                        {option.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
