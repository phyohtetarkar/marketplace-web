import { createContext } from "react";
import { AuthUser, Shop, User } from "./models";

export type Status = "loading" | "success" | "failure";

export interface StateContext<T> {
  payload?: T;
  status: Status;
  update: (status: Status, payload: User | undefined) => void;
}

export const AuthenticationContext = createContext<StateContext<User>>({
  payload: undefined,
  status: "loading",
  update: (status, payload) => {}
});

export const ShopDetailContext = createContext<Shop | undefined>(undefined);
