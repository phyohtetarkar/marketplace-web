"use client";
import {
  AuthenticationContext,
  AuthenticationState,
  Status
} from "@/common/contexts";
import { UnauthorizeError } from "@/common/customs";
import { firebaseAuth } from "@/common/firebase.config";
import { getLoginUser } from "@/services/UserService";
import dayjs from "dayjs";
import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, useCallback, useEffect, useState } from "react";

export const AuthenticationContextProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const updateStatus = useCallback((status?: Status) => {
    setAuthState((old) => {
      if (status === "unauthorized") {
        return { ...old, status: status, user: undefined };
      }
      return { ...old, status: status };
    });
  }, []);

  const reloadLoginUser = useCallback(async () => {
    try {
      // await firebaseAuth.authStateReady();
      const user = firebaseAuth.currentUser;
      if (!user) {
        throw new UnauthorizeError();
      }

      setAuthState((old) => {
        return { ...old, status: "loading" };
      });
      const data = await getLoginUser();
      setAuthState((old) => {
        return {
          ...old,
          status: "success",
          user: { ...data, emailVerified: user.emailVerified }
        };
      });
    } catch (error) {
      // console.log(parseErrorResponse(error, true));
      if (error instanceof UnauthorizeError) {
        setAuthState((old) => {
          return { ...old, status: "unauthorized", user: undefined };
        });
      } else {
        setAuthState((old) => {
          return { ...old, status: "failure", user: undefined };
        });
      }
    }
  }, []);

  const [authState, setAuthState] = useState<AuthenticationState>({
    status: "loading",
    update: updateStatus,
    reload: reloadLoginUser
  });

  useEffect(() => {
    const auth = firebaseAuth;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const diff = 600000; // 10 min
      if (!user) {
        setAuthState((old) => {
          return { ...old, status: "unauthorized", user: undefined };
        });
      } else if (user.emailVerified || !!user.displayName) {
        reloadLoginUser();
      } else if (Math.abs(dayjs(user.metadata.creationTime).diff()) > diff) {
        reloadLoginUser();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [reloadLoginUser]);

  return (
    <AuthenticationContext.Provider value={authState}>
      {children}
    </AuthenticationContext.Provider>
  );
};
