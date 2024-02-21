"use client";
import { withAuthentication } from "@/common/WithAuthentication";
import { AuthenticationContext } from "@/common/contexts";
import { firebaseAuth } from "@/common/firebase.config";
import { debounce } from "@/common/utils";
import { sendVerifyEmail } from "@/services/AuthService";
import { RiCheckLine } from "@remixicon/react";
import { reload } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

function VerifyEmailPage() {
  const [resend, setResend] = useState(true);
  const [timer, setTimer] = useState(0);
  const authContext = useContext(AuthenticationContext);

  useEffect(() => {
    if (resend) {
      return;
    }

    setTimer(30);

    const interval = setInterval(() => {
      setTimer((old) => {
        if (old > 1) {
          return old - 1;
        }

        setResend(true);

        return 0;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [resend]);

  const invokeResend = debounce(async () => {
    if (firebaseAuth.currentUser) {
      await reload(firebaseAuth.currentUser);
    }

    if (firebaseAuth.currentUser?.emailVerified) {
      authContext.reload();
    } else {
      sendVerifyEmail();
    }
  });

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <AuthenticationContext.Consumer>
                {({ status, user }) => {
                  if (status !== "success") {
                    return null;
                  }

                  if (user?.emailVerified) {
                    return (
                      <div className="vstack align-items-center">
                        <div className="mt-4 mb-3">
                          <div className="rounded-circle bg-success p-2h">
                            <RiCheckLine
                              size={64}
                              className="text-light"
                            />
                          </div>
                        </div>

                        <h3 className="text-center mb-4">
                          Your email has been verified
                        </h3>

                        <div className="d-flex justify-content-center gap-2 flex-wrap mb-3">
                          <Link
                            href={"/shops"}
                            className="btn btn-primary py-2 shadow-none"
                          >
                            Browse shops
                          </Link>
                          <Link
                            href={"/profile"}
                            className="btn btn-outline-primary py-2 shadow-none"
                          >
                            Go to profile
                          </Link>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div className="vstack align-items-center">
                      <h2 className="text-center mt-5">Verify your email</h2>
                      <p className="text-muted text-center">
                        Check your email &amp; click the link to activate your
                        account.
                      </p>

                      <div
                        className="ratio ratio-1x1 mb-3"
                        style={{ maxWidth: 300 }}
                      >
                        <Image
                          src={"/images/mail-sent.jpg"}
                          alt=""
                          fill
                          sizes="100vh"
                          priority
                        />
                      </div>

                      <div className="mb-1">
                        <button
                          className="btn btn-primary py-2 px-3 shadow-none"
                          disabled={!resend}
                          onClick={() => {
                            try {
                              setResend(false);
                              invokeResend();
                            } catch (error) {
                              
                            }
                          }}
                        >
                          Resend confirmation email
                          {timer > 0 && <span className="ms-1">({timer})</span>}
                        </button>
                      </div>
                      <div className="small text-muted mb-4">
                        Didn&apos;t get confirmation email?
                      </div>
                    </div>
                  );
                }}
              </AuthenticationContext.Consumer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuthentication(VerifyEmailPage);
