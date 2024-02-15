"use client";
import { LocaleContextType, LocalizationContext } from "@/common/contexts";
import { ReactNode, useState } from "react";

export const LocalizationContextProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const changeLocale = (value: string) => {
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
