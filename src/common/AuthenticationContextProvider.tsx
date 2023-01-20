import { HubCapsule } from "@aws-amplify/core";
import { Auth, Hub } from "aws-amplify";
import { ReactNode, useEffect, useState } from "react";
import { getLoginUser } from "../services/UserService";
import { AuthenticationContext, StateContext } from "./contexts";
import { User } from "./models";

export const AuthenticationContextProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [authUser, setAuthUser] = useState<StateContext<User>>({
    payload: undefined,
    status: "loading"
  });

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log(user);

        return getLoginUser();
      })
      .then((user) => {
        setAuthUser({
          status: "success",
          payload: user
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
    const applyUser = async (attributes: any) => {
      try {
        const user = await getLoginUser();
        setAuthUser({
          status: "success",
          payload: user
        });
      } catch (error) {
        console.log(error);
      }
    };
    const listener = (data: HubCapsule) => {
      switch (data.payload.event) {
        case "signIn": {
          //console.log("signed in");
          //console.log(data.payload.data);
          const attributes = data.payload.data.attributes;
          applyUser(attributes);
          break;
        }
        case "autoSignIn": {
          //console.log("auto signed in");
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
