import { createContext } from "react";
import { Shop, User } from "./models";

type Status = "loading" | "success" | "failure";

export interface StateContext<T> {
  payload?: T;
  status: Status;
}

export const AuthenticationContext = createContext<StateContext<User>>({
  payload: undefined,
  status: "loading"
});

export const ShopDetailContext = createContext<Shop | undefined>(undefined);
