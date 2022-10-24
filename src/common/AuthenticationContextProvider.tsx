import { HubCapsule } from "@aws-amplify/core";
import { Auth, Hub } from "aws-amplify";
import { ReactNode, useEffect, useState } from "react";
import { AuthenticationContext, StateContext } from "./contexts";

export interface AuthUser {
  id: string;
  name: string;
  phone: string;
  verified: boolean;
}

export const AuthenticationContextProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [authUser, setAuthUser] = useState<StateContext<AuthUser>>({
    payload: undefined,
    status: "loading"
  });

  useEffect(() => {
    let mounted = true;
    Auth.currentAuthenticatedUser()
      .then((user) => {
        if (mounted) {
          const attributes = user.attributes;
          setAuthUser({
            status: "success",
            payload: {
              id: attributes.sub,
              name: attributes.name,
              phone: attributes.phone_number,
              verified: attributes.phone_number_verified
            }
          });
        }
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
        setAuthUser({
          payload: undefined,
          status: "failure"
        });
      });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const listener = (data: HubCapsule) => {
      switch (data.payload.event) {
        case "signIn":
          //console.log("signed in");
          //console.log(data.payload.data);
          const attributes = data.payload.data.attributes;
          setAuthUser({
            status: "success",
            payload: {
              id: attributes.sub,
              name: attributes.name,
              phone: attributes.phone_number,
              verified: attributes.phone_number_verified
            }
          });
          break;
        case "autoSignIn":
          //console.log("auto signed in");
          //console.log(data.payload.data);
          setAuthUser({
            status: "success",
            payload: {
              id: attributes.sub,
              name: attributes.name,
              phone: attributes.phone_number,
              verified: attributes.phone_number_verified
            }
          });
          break;
        case "signOut":
          // console.log("sign out");
          setAuthUser({
            payload: undefined,
            status: "failure"
          });
          break;
      }
    };

    Hub.listen("auth", listener);

    return () => {
      Hub.remove("auth", listener);
    };
  }, []);

  return (
    <AuthenticationContext.Provider value={authUser}>
      {children}
    </AuthenticationContext.Provider>
  );
};
