import { createContext } from "react";
import { Shop, User } from "./models";

export type Status = "loading" | "success" | "unauthorized" | "failure";

export interface StateContext<T> {
  payload?: T;
  status?: Status;
  update: (status?: Status, payload?: User) => void;
}

export const AuthenticationContext = createContext<StateContext<User>>({
  update: (status, payload) => {}
});

export const ShopDetailContext = createContext<Shop | undefined>(undefined);

export const ProgressContext = createContext({
  show: false,
  update: (show: boolean) => {}
});
