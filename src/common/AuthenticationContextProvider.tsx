import { ReactNode, useCallback, useEffect, useState } from "react";
import { getLoginUser } from "../services/UserService";
import { AuthenticationContext, StateContext, Status } from "./contexts";
import { UnauthorizeError } from "./customs";
import { User } from "./models";
import { getCookieValue, parseErrorResponse } from "./utils";

export const AuthenticationContextProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const updateAuthState = useCallback((status?: Status, payload?: User) => {
    setAuthUser((old) => {
      return { ...old, status, payload };
    });
  }, []);

  const reloadAuthUser = useCallback(async () => {
    try {
      setAuthUser((old) => {
        return { ...old, status: "loading" };
      });
      const data = await getLoginUser();
      setAuthUser((old) => {
        return { ...old, status: "success", payload: data };
      });
    } catch (error) {
      console.log(parseErrorResponse(error, true));
      if (error instanceof UnauthorizeError) {
        setAuthUser((old) => {
          return { ...old, status: "unauthorized", payload: undefined };
        });
      } else {
        setAuthUser((old) => {
          return { ...old, status: "failure", payload: undefined };
        });
      }
    }
  }, []);

  const [authUser, setAuthUser] = useState<StateContext<User>>({
    status: "loading",
    update: updateAuthState,
    reload: reloadAuthUser
  });

  useEffect(() => {
    if (getCookieValue("accessToken")) {
      reloadAuthUser();
    } else {
      setAuthUser((old) => {
        return { ...old, status: "unauthorized", payload: undefined };
      });
    }
  }, [reloadAuthUser]);

  // useEffect(() => {
  //   Auth.currentAuthenticatedUser()
  //     .then((user) => {
  //       console.log(user);
  //       const attributes = user.attributes;
  //       setAuthUser({
  //         status: "success",
  //         payload: {
  //           id: attributes.sub,
  //           name: attributes.name,
  //           phone: attributes.phone_number
  //         }
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setAuthUser({
  //         payload: undefined,
  //         status: "failure"
  //       });
  //     });
  // }, []);

  // useEffect(() => {
  //   const applyUser = (attributes: any) => {
  //     setAuthUser({
  //       status: "success",
  //       payload: {
  //         id: attributes.sub,
  //         name: attributes.name,
  //         phone: attributes.phone_number
  //       }
  //     });
  //   };
  //   const listener = (data: HubCapsule) => {
  //     switch (data.payload.event) {
  //       case "signIn": {
  //         //console.log("signed in");
  //         //console.log(data.payload.data);
  //         const attributes = data.payload.data.attributes;
  //         applyUser(attributes);
  //         break;
  //       }
  //       case "autoSignIn": {
  //         console.log("auto signed in");
  //         //console.log(data.payload.data);
  //         const attributes = data.payload.data.attributes;
  //         applyUser(attributes);
  //         break;
  //       }
  //       case "signOut":
  //         // console.log("sign out");
  //         setAuthUser({
  //           payload: undefined,
  //           status: "failure"
  //         });
  //         break;
  //     }
  //   };

  //   const cancelAuth = Hub.listen("auth", listener);

  //   return () => {
  //     cancelAuth();
  //   };
  // }, []);

  return (
    <AuthenticationContext.Provider value={authUser}>
      {children}
    </AuthenticationContext.Provider>
  );
};
