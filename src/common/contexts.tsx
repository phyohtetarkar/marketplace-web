import { createContext } from "react";
import { AuthUser } from "./AuthenticationContextProvider";

type Status = "loading" | "success" | "failure";

export interface StateContext<T> {
  payload?: T;
  status: Status;
}

export const AuthenticationContext = createContext<StateContext<AuthUser>>({
  payload: undefined,
  status: "loading",
});
