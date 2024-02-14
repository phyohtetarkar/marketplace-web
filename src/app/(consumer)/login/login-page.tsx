"use client"
import { AuthenticationContext } from "@/common/contexts";
import { parseErrorResponse } from "@/common/utils";
import Alert from "@/components/Alert";
import ProgressButton from "@/components/ProgressButton";
import { Input, PasswordInput } from "@/components/forms";
import { login } from "@/services/AuthService";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface LoginInputs {
  username?: string;
  password?: string;
}

function LoginPage() {
  const router = useRouter();
  const authContext = useContext(AuthenticationContext);
  const [error, setError] = useState<string>();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<LoginInputs>();

  useEffect(() => {
    if (authContext.status === "success") {
      router.replace(authContext.user?.emailVerified ? "/" : "/verify-email");
    }

  }, [authContext]);

  const processLogin = async (values: LoginInputs) => {
    try {
      setError(undefined);
      const result = await login({
        username: values.username!,
        password: values.password!
      });
    } catch (error: any) {
      setError(parseErrorResponse(error));
    }
  };

  if (authContext.status === "success" || authContext.status === "loading") {
    return <div></div>;
  }

  return (
    <div className="container py-3">
      <div className="row my-4 mb-5">
        <div className="col-md-6 offset-md-3 col-xxl-4 offset-xxl-4">
          <div className="card">
            <div className="card-body p-lg-4">
              <h4 className="card-title fw-bold mt-2 mb-4">Sign In</h4>

              {error && <Alert message={error} variant="danger" />}

              <form
                className="row g-3"
                onSubmit={(evt) => {
                  evt.preventDefault();
                  handleSubmit(async (data) => await processLogin(data))();
                }}
              >
                <div className="col-md-12">
                  <Input
                    label="Email"
                    id="emailInput"
                    type="email"
                    autoComplete="username"
                    placeholder="Enter email address"
                    {...register("username", {
                      required: true,
                      pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
                    })}
                    error={errors.username && "Please enter valid email address"}
                  />
                </div>
                <div className="col-md-12">
                  <PasswordInput
                    label="Password"
                    placeholder="Enter password"
                    autoComplete="current-password"
                    {...register("password", {
                      required: "Please enter password"
                    })}
                    error={errors.password?.message}
                  />
                  <div className="mt-1">
                    <Link href="/forgot-password" className="link-anchor">
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="col-md-12 mt-4">
                  <ProgressButton
                    type="submit"
                    className="w-100 py-2h"
                    loading={isSubmitting}
                  >
                    Login
                  </ProgressButton>
                </div>
                <div className="col-md-12 mb-2">
                  <div className="row g-2">
                    <div className="col">
                      <hr className="text-muted" />
                    </div>
                    <div className="col-auto align-self-center text-muted">
                      or continue with
                    </div>
                    <div className="col">
                      <hr className="text-muted" />
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="hstack gap-2 align-items-center">
                    <button
                      type="button"
                      className="btn btn-outline-light border w-50 d-flex align-items-center"
                      disabled={isSubmitting}
                    >
                      <Image
                        src="/images/icons8-facebook-48.png"
                        alt="facebook"
                        width={28}
                        height={28}
                      />
                      <span className="text-dark ms-1 text-truncate">Facebook</span>
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-light border w-50 d-flex align-items-center"
                      disabled={isSubmitting}
                    >
                      <Image
                        src="/images/icons8-google-48.png"
                        alt="google"
                        width={28}
                        height={28}
                      />
                      <span className="text-dark ms-1 text-truncate">Google</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="text-center p-3 card-footer">
              Don&apos;t have an account?
              <Link
                href="/sign-up"
                className="text-decoration-none fw-medium link-anchor ms-1"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
