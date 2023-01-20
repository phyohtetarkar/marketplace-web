import { NextRouter, withRouter } from "next/router";
import React from "react";
import { AuthenticationContext } from "./contexts";

interface WithRouterProps {
  router: NextRouter;
}

interface AuthComponentProps extends WithRouterProps {}

export const withAuthentication = (Component: React.ComponentType<any>) => {
  return withRouter(
    class AuthenticatedRoute extends React.Component<AuthComponentProps> {
      static contextType = AuthenticationContext;
      declare context: React.ContextType<typeof AuthenticationContext>;

      constructor(props: AuthComponentProps) {
        super(props);
        this.handleAuthState = this.handleAuthState.bind(this);
      }

      componentDidMount() {
        this.handleAuthState();
      }

      componentDidUpdate() {
        this.handleAuthState();
      }

      handleAuthState() {
        const { payload, status } = this.context;

        if (status === "loading") {
          return;
        }

        if (status === "failure" || !payload) {
          this.props.router.push("/login");
        }
      }

      render(): React.ReactNode {
        const { payload, status } = this.context;

        if (status !== "success" || !payload) {
          return null;
        }

        return <Component />;
      }
    }
  );
};
