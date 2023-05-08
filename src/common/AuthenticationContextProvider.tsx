import { ReactNode, useCallback, useEffect, useState } from "react";
import { getLoginUser } from "../services/UserService";
import { AuthenticationContext, StateContext, Status } from "./contexts";
import { User } from "./models";
import { parseErrorResponse } from "./utils";

export const AuthenticationContextProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  // const { data, error, isLoading, mutate } = useSWR<User, Error>(
  //   "/login-user",
  //   getLoginUser,
  //   {
  //     revalidateOnFocus: false,
  //     errorRetryCount: 0,
  //     revalidateOnMount: false
  //   }
  // );

  const updateAuthState = useCallback((status?: Status, payload?: User) => {
    setAuthUser((old) => {
      return { ...old, status, payload };
    });
  }, []);

  const [authUser, setAuthUser] = useState<StateContext<User>>({
    payload: undefined,
    status: "loading",
    update: updateAuthState
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getLoginUser();
        setAuthUser({
          status: "success",
          payload: data,
          update: updateAuthState
        });
      } catch (error) {
        console.log(parseErrorResponse(error, true));
        setAuthUser({
          status: "failure",
          payload: undefined,
          update: updateAuthState
        });
      }
    };

    loadUser();
  }, [updateAuthState]);

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
