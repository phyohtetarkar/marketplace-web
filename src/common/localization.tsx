import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState
} from "react";

type Locale = "mm" | "en";

interface LocaleContextType {
  locale: Locale;
  setLocale?: (value: Locale) => void;
}

export const LocalizationContext = createContext<LocaleContextType>({
  locale: "en"
});

export const useLocalization = () => {
  const ctx = useContext(LocalizationContext);

  const localize = useCallback(
    (key: string) => {
      if (ctx.locale === "mm") {
        return key;
      }

      return key;
    },
    [ctx]
  );

  const change = useCallback(
    (locale: Locale) => {
      ctx.setLocale?.(locale);
      localStorage.setItem("lang", locale);
    },
    [ctx]
  );

  return { localize, change, locale: ctx.locale };
};

export const LocalizationContextProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const changeLocale = (value: Locale) => {
    setLocale((old) => ({ ...old, locale: value }));
  };

  const [locale, setLocale] = useState<LocaleContextType>({
    locale: "en",
    setLocale: changeLocale
  });

  return (
    <LocalizationContext.Provider value={locale}>
      {children}
    </LocalizationContext.Provider>
  );
};
