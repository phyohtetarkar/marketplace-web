import { NextRouter, withRouter } from "next/router";
import React from "react";
import Alert from "../components/Alert";
import { AuthenticationContext } from "./contexts";

interface WithRouterProps {
  router: NextRouter;
}

interface AuthComponentProps extends WithRouterProps {}

export const withAuthentication = (Component: React.ComponentType<any>) => {
  return withRouter(
    class AuthenticatedRoute extends React.Component<
      AuthComponentProps,
      { calledPush: boolean }
    > {
      static contextType = AuthenticationContext;
      declare context: React.ContextType<typeof AuthenticationContext>;

      constructor(props: AuthComponentProps) {
        super(props);
        this.handleAuthState = this.handleAuthState.bind(this);
        this.state = {
          calledPush: false
        };
      }

      componentDidMount() {
        this.handleAuthState();
      }

      componentDidUpdate() {
        this.handleAuthState();
      }

      handleAuthState() {
        const { payload, status } = this.context;

        if (this.state.calledPush) {
          return;
        }

        if (!status) {
          this.props.router.push("/");
          this.setState({
            calledPush: true
          });
          return;
        }

        if (status === "loading") {
          return;
        }

        if (status === "failure") {
          return;
        }

        if (status === "unauthorized" || !payload) {
          this.props.router.push("/login");
          this.setState({
            calledPush: true
          });
          return;
        }

        if (!payload?.verified) {
          this.props.router.push("/confirm-otp");
          this.setState({
            calledPush: true
          });
        }
      }

      render(): React.ReactNode {
        const { payload, status } = this.context;

        if (status === "failure") {
          return (
            <div className="container py-3">
              <Alert
                message="Something went wrong. Please try again"
                variant="danger"
              />
            </div>
          );
        }

        if (status !== "success" || !payload) {
          return null;
        }

        if (!payload.verified) {
          return null;
        }

        return <Component />;
      }
    }
  );
};
