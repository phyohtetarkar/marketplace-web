"use client";
import Alert from "@/components/Alert";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "./contexts";

export function withAuthentication<P extends {}>(
  Component: React.ComponentType<P>
) {
  return function AuthenticatedComponent(props: P) {
    const router = useRouter();
    const { status, user } = useContext(AuthenticationContext);
    const [calledPush, setCalledPush] = useState(false);

    useEffect(() => {
      if (calledPush) {
        return;
      }

      if (status === "loading") {
        return;
      }

      if (status === "failure") {
        return;
      }

      if (status === "unauthorized") {
        router.push("/login");
        setCalledPush(true);
      } else if (status === "success" && !user?.emailVerified) {
        // router.push("/verify-email");
        // setCalledPush(true);
      }
    }, [calledPush, router, status, user]);

    if (status === "loading") {
      return (
        <div className="h-100">
          <div className="container h-100">
            <div className="hstack h-100">
              <div className="m-auto hstack gap-2">
                <div
                  className="spinner-grow spinner-grow-sm text-primary"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div
                  className="spinner-grow spinner-grow-sm text-primary"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div
                  className="spinner-grow spinner-grow-sm text-primary"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

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

    if (status !== "success" || !user) {
      return null;
    }

    // if (!payload.verified) {
    //   return null;
    // }

    return <Component {...props} />;
  };
}
