import { createContext } from "react";
import { User } from "./models";

export type Status = "loading" | "success" | "unauthorized" | "failure";

export interface AuthenticationState {
  user?: User;
  status?: Status;
  update: (status?: Status) => void;
  reload: () => void;
}

export interface LocaleContextType {
  locale: string;
  setLocale?: (value: string) => void;
}

export const AuthenticationContext = createContext<AuthenticationState>({
  update: (status) => {},
  reload: () => {},
});

export const ProgressContext = createContext({
  show: false,
  update: (show: boolean) => {}
});

export const LocalizationContext = createContext<LocaleContextType>({
  locale: "en"
});