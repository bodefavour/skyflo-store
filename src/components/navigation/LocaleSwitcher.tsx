import React, { useEffect, useMemo, useRef, useState } from "react";
import { GlobeAltIcon, RefreshIcon } from "@heroicons/react/outline";
import { useLocale } from "../../context/LocaleContext";

const LOCALE_LABELS: Record<string, string> = {
  "en-US": "English (United States)",
  "en-GB": "English (United Kingdom)",
  "en-CA": "English (Canada)",
  "fr-FR": "Français (France)",
  "fr-CA": "Français (Canada)",
  "es-ES": "Español (España)",
  "es-MX": "Español (México)",
  "de-DE": "Deutsch",
  "it-IT": "Italiano",
  "pt-BR": "Português (Brasil)",
  "pt-PT": "Português (Portugal)",
  "ja-JP": "日本語",
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
  "zh-HK": "繁體中文 (香港)",
  "ko-KR": "한국어",
  "ar-AE": "العربية (الإمارات)",
  "hi-IN": "हिन्दी",
  "yo-NG": "Yorùbá"
};

const getCurrencyLabel = (code: string) => {
  if (typeof Intl !== "undefined" && "DisplayNames" in Intl) {
    try {
      const displayNames = new Intl.DisplayNames(["en"], { type: "currency" });
      return displayNames.of(code) ?? code;
    } catch (error) {
      console.warn("DisplayNames not supported for currency", error);
    }
  }
  return code;
};

const LocaleSwitcher: React.FC = () => {
  const {
    currency,
    locale,
    availableCurrencies,
    availableLocales,
    setCurrency,
    setLocale,
    formatCurrency,
    refreshRates,
    loadingRates,
    lastUpdated,
    getCurrencyRate
  } = useLocale();

  const [isOpen, setIsOpen] = useState(false);
  const [currencyQuery, setCurrencyQuery] = useState("");
  const [localeQuery, setLocaleQuery] = useState("");
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const filteredCurrencies = useMemo(() => {
    const query = currencyQuery.trim().toLowerCase();
    const items = query.length
      ? availableCurrencies.filter((code) => code.toLowerCase().includes(query))
      : availableCurrencies;
    return items.slice(0, 80);
  }, [currencyQuery, availableCurrencies]);

  const filteredLocales = useMemo(() => {
    const query = localeQuery.trim().toLowerCase();
    return availableLocales.filter((item) => {
      const label = LOCALE_LABELS[item] ?? item;
      return item.toLowerCase().includes(query) || label.toLowerCase().includes(query);
    });
  }, [localeQuery, availableLocales]);

  const handleCurrencyChange = (code: string) => {
    setCurrency(code);
  };

  const handleLocaleChange = (code: string) => {
    setLocale(code);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-2 rounded-full hover:bg-white/10 transition"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label="Change language or currency"
      >
        <GlobeAltIcon className="w-6 h-6" />
      </button>

      {isOpen && (
        <div
          ref={panelRef}
          className="absolute right-0 mt-3 w-[320px] sm:w-[360px] bg-[#111111] border border-white/10 rounded-2xl shadow-2xl p-5 text-left z-[999]"
        >
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <p className="text-sm font-semibold text-white">International preferences</p>
              <p className="text-xs text-white/60">Choose your shopping language and currency.</p>
            </div>
            <button
              type="button"
              onClick={() => refreshRates()}
              className="p-1.5 rounded-full border border-white/10 hover:border-[#d4af37] hover:text-[#d4af37] transition"
              title="Refresh exchange rates"
            >
              <RefreshIcon className={`w-4 h-4 ${loadingRates ? "animate-spin" : ""}`} />
            </button>
          </div>

          <div className="space-y-6">
            <section>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-2">Currency</p>
              <input
                type="text"
                value={currencyQuery}
                onChange={(event) => setCurrencyQuery(event.target.value)}
                placeholder="Search currency"
                className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#d4af37]"
              />
              <div className="mt-3 max-h-44 overflow-y-auto pr-1 space-y-1">
                {filteredCurrencies.map((code) => {
                  const selected = code === currency;
                  return (
                    <button
                      type="button"
                      key={code}
                      onClick={() => handleCurrencyChange(code)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition ${
                        selected ? "bg-[#d4af37]/20 text-[#d4af37]" : "hover:bg-white/5"
                      }`}
                    >
                      <span className="font-medium">{code}</span>
                      <span className="text-xs text-white/50">{getCurrencyLabel(code)}</span>
                    </button>
                  );
                })}
                {!filteredCurrencies.length && (
                  <p className="text-xs text-white/50 py-2 text-center">No matches</p>
                )}
              </div>
              <p className="text-[11px] text-white/40 mt-2">
                1 USD ≈ {formatCurrency(1, { currencyDisplay: "code" })}
              </p>
            </section>

            <section>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-2">Language</p>
              <input
                type="text"
                value={localeQuery}
                onChange={(event) => setLocaleQuery(event.target.value)}
                placeholder="Search language"
                className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#d4af37]"
              />
              <div className="mt-3 max-h-40 overflow-y-auto pr-1 space-y-1">
                {filteredLocales.map((code) => {
                  const selected = code === locale;
                  const label = LOCALE_LABELS[code] ?? code;
                  return (
                    <button
                      type="button"
                      key={code}
                      onClick={() => handleLocaleChange(code)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition ${
                        selected ? "bg-[#d4af37]/20 text-[#d4af37]" : "hover:bg-white/5"
                      }`}
                    >
                      <span className="font-medium">{label}</span>
                      <span className="text-xs text-white/40">{code}</span>
                    </button>
                  );
                })}
                {!filteredLocales.length && (
                  <p className="text-xs text-white/50 py-2 text-center">No matches</p>
                )}
              </div>
            </section>

            <div className="text-[11px] text-white/40">
              {!loadingRates && lastUpdated && <p>Rates updated {lastUpdated}</p>}
              <p>
                1 USD ≈ {formatCurrency(1)} ({getCurrencyRate(currency).toFixed(4)} {currency} per USD)
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocaleSwitcher;
