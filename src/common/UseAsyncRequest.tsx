import { useCallback, useEffect, useReducer, useRef } from "react";

type Actions = "initial" | "loading" | "success" | "failure";

export interface State<T> {
  payload?: T;
  error?: Error;
}

export interface RequestState<T> extends State<T> {
  status: Actions;
}

export interface RequestAction<T> extends State<T> {
  type: Actions;
}

export type Reducer<T> = (
  state: RequestState<T>,
  action: RequestAction<T>
) => RequestState<T>;

const initialState = {
  status: "initial" as Actions
};

export function reducer<T>(
  state: RequestState<T>,
  action: RequestAction<T>
): RequestState<T> {
  switch (action.type) {
    case "loading":
      return { status: "loading" };
    case "success":
      return { status: "success", payload: action.payload };
    case "failure":
      return { status: "failure", error: action.error };
    default:
      return { ...initialState };
  }
}

export function useAsyncRequest<I, R>(invoker: (args: I) => Promise<R>) {
  const [state, dispatch] = useReducer<Reducer<R>>(reducer, initialState);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const request = useCallback(
    (params: I) => {
      mountedRef.current && dispatch({ type: "loading" });

      const promise = invoker(params);

      promise
        .then((payload) => {
          mountedRef.current && dispatch({ type: "success", payload: payload });
        })
        .catch((error) => {
          console.log(error);
          mountedRef.current && dispatch({ type: "failure", error: error });
        });
    },
    [invoker]
  );

  const reset = () => {
    dispatch({ type: "initial" });
  };

  return [state, request, reset] as const;
}
