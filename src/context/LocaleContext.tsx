import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    ReactNode
} from "react";

export type ExchangeRates = Record<string, number>;

interface StoredRates {
    base: string;
    timestamp: number;
    rates: ExchangeRates;
    lastUpdatedText?: string;
}

interface StoredPreferences {
    currency: string;
    locale: string;
}

export interface LocaleContextValue {
    currency: string;
    locale: string;
    baseCurrency: string;
    availableCurrencies: string[];
    availableLocales: string[];
    exchangeRates: ExchangeRates;
    loadingRates: boolean;
    lastUpdated?: string;
    setCurrency: (currency: string) => void;
    setLocale: (locale: string) => void;
    refreshRates: () => Promise<void>;
    formatCurrency: (amount: number, options?: Intl.NumberFormatOptions) => string;
    formatWithCurrency: (
        amount: number,
        opts?: {
            currency?: string;
            locale?: string;
            numberOptions?: Intl.NumberFormatOptions;
            skipConversion?: boolean;
            rateOverride?: number;
        }
    ) => string;
    convertAmount: (amount: number, targetCurrency?: string) => number;
    getCurrencyRate: (currency: string) => number;
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

const DEFAULT_LOCALE = "en-US";
const DEFAULT_CURRENCY = "USD";
const BASE_CURRENCY = "USD";
const RATES_API_ENDPOINT = "https://open.er-api.com/v6/latest/USD";
const CACHE_DURATION_HOURS = 12;
const RATES_STORAGE_KEY = "skyflo_exchange_rates";
const PREFS_STORAGE_KEY = "skyflo_locale_preferences";

const FALLBACK_RATES: ExchangeRates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    CAD: 1.36,
    AUD: 1.49,
    NZD: 1.64,
    JPY: 153.71,
    CNY: 7.24,
    HKD: 7.82,
    SGD: 1.34,
    CHF: 0.9,
    SEK: 10.7,
    NOK: 10.85,
    DKK: 6.86,
    PLN: 3.94,
    CZK: 23.43,
    HUF: 364.37,
    RON: 4.57,
    ZAR: 18.95,
    BRL: 5.16,
    MXN: 16.53,
    INR: 83.25,
    AED: 3.67,
    SAR: 3.75,
    NGN: 1400,
    EGP: 48,
    KES: 129.5,
    GHS: 15.2
};

const LOCALE_TO_CURRENCY: Record<string, string> = {
    "en-US": "USD",
    "en-GB": "GBP",
    "en-CA": "CAD",
    "fr-CA": "CAD",
    "fr-FR": "EUR",
    "de-DE": "EUR",
    "es-ES": "EUR",
    "es-MX": "MXN",
    "it-IT": "EUR",
    "nl-NL": "EUR",
    "pt-PT": "EUR",
    "pt-BR": "BRL",
    "ja-JP": "JPY",
    "ko-KR": "KRW",
    "zh-CN": "CNY",
    "zh-TW": "TWD",
    "zh-HK": "HKD",
    "ar-AE": "AED",
    "ar-SA": "SAR",
    "hi-IN": "INR",
    "yo-NG": "NGN",
    "ig-NG": "NGN",
    "ha-NG": "NGN",
    "ru-RU": "RUB",
    "pl-PL": "PLN",
    "sv-SE": "SEK",
    "fi-FI": "EUR",
    "da-DK": "DKK",
    "no-NO": "NOK"
};

const SUPPORTED_LOCALES: string[] = [
    "en-US",
    "en-GB",
    "en-CA",
    "fr-FR",
    "fr-CA",
    "es-ES",
    "es-MX",
    "de-DE",
    "it-IT",
    "pt-BR",
    "pt-PT",
    "ja-JP",
    "zh-CN",
    "zh-TW",
    "zh-HK",
    "ko-KR",
    "ar-AE",
    "hi-IN",
    "yo-NG"
];

function normaliseLocale(locale: string): string {
    if (!locale) {
        return DEFAULT_LOCALE;
    }
    return locale.replace("_", "-");
}

function clampCurrency(code: string): string {
    return code ? code.trim().toUpperCase() : DEFAULT_CURRENCY;
}

function getSystemLocale(): string {
    if (typeof navigator !== "undefined" && navigator.language) {
        return normaliseLocale(navigator.language);
    }
    return DEFAULT_LOCALE;
}

function getDefaultCurrencyForLocale(locale: string): string {
    return LOCALE_TO_CURRENCY[locale] ?? DEFAULT_CURRENCY;
}

function getSupportedCurrencyCodes(): string[] {
    if (typeof Intl !== "undefined" && "supportedValuesOf" in Intl) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const values = (Intl as any).supportedValuesOf?.("currency");
            if (Array.isArray(values) && values.length) {
                return values as string[];
            }
        } catch (error) {
            console.warn("Unable to read Intl.supportedValuesOf", error);
        }
    }
    return Array.from(new Set([DEFAULT_CURRENCY, ...Object.keys(FALLBACK_RATES)])).sort();
}

async function fetchRates(): Promise<StoredRates | null> {
    try {
        const response = await fetch(RATES_API_ENDPOINT);
        if (!response.ok) {
            throw new Error(`Exchange rate request failed (${response.status})`);
        }
        const payload = await response.json();
        if (payload.result !== "success" || !payload.rates) {
            throw new Error("Exchange API returned an invalid response");
        }
        return {
            base: payload.base_code ?? BASE_CURRENCY,
            rates: payload.rates as ExchangeRates,
            timestamp: Date.now(),
            lastUpdatedText: payload.time_last_update_utc ?? undefined
        };
    } catch (error) {
        console.error("Failed to fetch exchange rates", error);
        return null;
    }
}

function loadStoredRates(): StoredRates | null {
    if (typeof window === "undefined") {
        return null;
    }
    try {
        const raw = window.localStorage.getItem(RATES_STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as StoredRates;
        if (!parsed || !parsed.rates) return null;
        return parsed;
    } catch (error) {
        console.warn("Failed to parse stored rates", error);
        return null;
    }
}

function saveStoredRates(rates: StoredRates) {
    if (typeof window === "undefined") {
        return;
    }
    try {
        window.localStorage.setItem(RATES_STORAGE_KEY, JSON.stringify(rates));
    } catch (error) {
        console.warn("Unable to persist exchange rates", error);
    }
}

function loadPreferences(): StoredPreferences | null {
    if (typeof window === "undefined") {
        return null;
    }
    try {
        const raw = window.localStorage.getItem(PREFS_STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw) as StoredPreferences;
    } catch (error) {
        console.warn("Failed to parse stored locale preferences", error);
        return null;
    }
}

function savePreferences(preferences: StoredPreferences) {
    if (typeof window === "undefined") {
        return;
    }
    try {
        window.localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify(preferences));
    } catch (error) {
        console.warn("Unable to persist locale preferences", error);
    }
}

export const LocaleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const supportedCurrencies = useMemo(() => getSupportedCurrencyCodes(), []);

    const [exchangeRates, setExchangeRates] = useState<ExchangeRates>(FALLBACK_RATES);
    const [currency, setCurrencyState] = useState<string>(DEFAULT_CURRENCY);
    const [locale, setLocaleState] = useState<string>(DEFAULT_LOCALE);
    const [loadingRates, setLoadingRates] = useState<boolean>(false);
    const [lastUpdated, setLastUpdated] = useState<string | undefined>();

    useEffect(() => {
        const prefs = loadPreferences();
        const systemLocale = getSystemLocale();

        if (prefs) {
            const preferredLocale = normaliseLocale(prefs.locale) || systemLocale;
            const preferredCurrency = clampCurrency(prefs.currency);
            setLocaleState(preferredLocale);
            setCurrencyState(preferredCurrency);
        } else {
            const initialLocale = normaliseLocale(systemLocale);
            setLocaleState(initialLocale);
            setCurrencyState(getDefaultCurrencyForLocale(initialLocale));
        }

        const storedRates = loadStoredRates();
        if (storedRates) {
            setExchangeRates({ ...FALLBACK_RATES, ...storedRates.rates });
            setLastUpdated(storedRates.lastUpdatedText);
        }

        const shouldRefresh = !storedRates || Date.now() - storedRates.timestamp > CACHE_DURATION_HOURS * 60 * 60 * 1000;
        if (shouldRefresh) {
            void handleRefreshRates();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleRefreshRates = async () => {
        setLoadingRates(true);
        const freshRates = await fetchRates();
        if (freshRates) {
            setExchangeRates({ ...FALLBACK_RATES, ...freshRates.rates });
            setLastUpdated(freshRates.lastUpdatedText);
            saveStoredRates(freshRates);
        }
        setLoadingRates(false);
    };

    const changeLocale = (value: string) => {
        const nextLocale = normaliseLocale(value) || DEFAULT_LOCALE;
        setLocaleState(nextLocale);
        setCurrencyState((prevCurrency) => {
            if (prevCurrency && prevCurrency !== DEFAULT_CURRENCY) {
                savePreferences({ locale: nextLocale, currency: prevCurrency });
                return prevCurrency;
            }
            const derived = getDefaultCurrencyForLocale(nextLocale);
            savePreferences({ locale: nextLocale, currency: derived });
            return derived;
        });
    };

    const changeCurrency = (value: string) => {
        const nextCurrency = clampCurrency(value);
        setCurrencyState(nextCurrency);
        savePreferences({ locale, currency: nextCurrency });
        if (!exchangeRates[nextCurrency]) {
            void handleRefreshRates();
        }
    };

    const getCurrencyRate = (code: string): number => {
        const normalised = clampCurrency(code);
        const rate = exchangeRates[normalised];
        if (!rate || Number.isNaN(rate) || rate <= 0) {
            return 1;
        }
        return rate;
    };

    const convertAmount = (amount: number, targetCurrency = currency): number => {
        const rate = getCurrencyRate(targetCurrency);
        return amount * rate;
    };

    const formatAmount = (
        amount: number,
        {
            currency: currencyOverride,
            locale: localeOverride,
            numberOptions,
            skipConversion = false,
            rateOverride
        }: {
            currency?: string;
            locale?: string;
            numberOptions?: Intl.NumberFormatOptions;
            skipConversion?: boolean;
            rateOverride?: number;
        } = {}
    ) => {
        const targetCurrency = clampCurrency(currencyOverride ?? currency);
        const targetLocale = normaliseLocale(localeOverride ?? locale);
        const rate = rateOverride ?? getCurrencyRate(targetCurrency);
        const value = skipConversion ? amount : amount * rate;
        return new Intl.NumberFormat(targetLocale, {
            style: "currency",
            currency: targetCurrency,
            ...numberOptions
        }).format(value);
    };

    const contextValue: LocaleContextValue = useMemo(
        () => ({
            currency,
            locale,
            baseCurrency: BASE_CURRENCY,
            availableCurrencies: supportedCurrencies,
            availableLocales: SUPPORTED_LOCALES,
            exchangeRates,
            loadingRates,
            lastUpdated,
            setCurrency: changeCurrency,
            setLocale: changeLocale,
            refreshRates: handleRefreshRates,
            formatCurrency: (amount: number, options?: Intl.NumberFormatOptions) =>
                formatAmount(amount, { numberOptions: options }),
            formatWithCurrency: formatAmount,
            convertAmount,
            getCurrencyRate
        }),
        [currency, locale, exchangeRates, loadingRates, lastUpdated, supportedCurrencies]
    );

    return <LocaleContext.Provider value={contextValue}>{children}</LocaleContext.Provider>;
};

export const useLocale = (): LocaleContextValue => {
    const context = useContext(LocaleContext);
    if (!context) {
        throw new Error("useLocale must be used within a LocaleProvider");
    }
    return context;
};
