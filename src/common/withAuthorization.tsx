import Alert from "@/components/Alert";
import React, { useContext } from "react";
import { Permission, User } from "./models";
import { AuthenticationContext } from "./contexts";

export const hasAccess = (permissions: Permission[], user?: User) => {
  if (!user) {
    return false;
  }

  if (user.role === "OWNER") {
    return true;
  }

  if (!user.permissions) {
    return false;
  }

  return !!user.permissions.find((p) => permissions.includes(p));
};

export function withAuthorization<P extends {}>(
  Component: React.ComponentType<P>,
  permissions: Permission[]
) {
  return function AuthorizedComponent(props: P) {
    const { user } = useContext(AuthenticationContext);

    if (!user) {
      return null;
    }

    if (user.role === "OWNER") {
      return <Component {...props} />;
    }

    if (permissions.length === 0 || !hasAccess(permissions, user)) {
      return (
        <Alert
          message="FORBIDDEN: You don't have permission to this resource"
          variant="danger"
        />
      );
    }

    return <Component {...props} />;
  };
}
