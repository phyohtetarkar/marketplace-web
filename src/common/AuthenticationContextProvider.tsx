import { HubCapsule } from "@aws-amplify/core";
import { Auth, Hub } from "aws-amplify";
import { ReactNode, useEffect, useState } from "react";
import { AuthenticationContext, StateContext } from "./contexts";
import { AuthUser } from "./models";

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

  const [authUser, setAuthUser] = useState<StateContext<AuthUser>>({
    payload: undefined,
    status: "loading"
  });

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log(user);
        const attributes = user.attributes;
        setAuthUser({
          status: "success",
          payload: {
            id: attributes.sub,
            name: attributes.name,
            phone: attributes.phone_number
          }
        });
      })
      .catch((error) => {
        console.log(error);
        setAuthUser({
          payload: undefined,
          status: "failure"
        });
      });
  }, []);

  useEffect(() => {
    const applyUser = (attributes: any) => {
      setAuthUser({
        status: "success",
        payload: {
          id: attributes.sub,
          name: attributes.name,
          phone: attributes.phone_number
        }
      });
    };
    const listener = (data: HubCapsule) => {
      switch (data.payload.event) {
        case "signIn": {
          console.log("signed in");
          //console.log(data.payload.data);
          const attributes = data.payload.data.attributes;
          applyUser(attributes);
          break;
        }
        case "autoSignIn": {
          console.log("auto signed in");
          //console.log(data.payload.data);
          const attributes = data.payload.data.attributes;
          applyUser(attributes);
          break;
        }
        case "signOut":
          // console.log("sign out");
          setAuthUser({
            payload: undefined,
            status: "failure"
          });
          break;
      }
    };

    const cancelAuth = Hub.listen("auth", listener);

    return () => {
      cancelAuth();
    };
  }, []);

  return (
    <AuthenticationContext.Provider value={authUser}>
      {children}
    </AuthenticationContext.Provider>
  );
};
