import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { formControlHeight } from "../common/app.config";
import { AuthenticationContext } from "../common/contexts";
import { setEmptyOrString } from "../common/utils";
import Alert from "../components/Alert";
import { Input, PasswordInput } from "../components/forms";
import ProgressButton from "../components/ProgressButton";

interface ResetPasswordProps {
  otp: string;
  phone: string;
}

const ResetPassword = (props: ResetPasswordProps) => {
  const { otp, phone } = props;

  const [error, setError] = useState<string>();

  const {
    register,
    control,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm({
    defaultValues: {
      otp: otp,
      phone: phone,
      password: "",
      confirmPassword: ""
    }
  });

  return (
    <div className="container py-3">
      <div className="row my-4 mb-5">
        <div className="col-md-6 offset-md-3 col-xxl-4 offset-xxl-4">
          <div className="card">
            <div className="card-body p-lg-4">
              <h4 className="card-title fw-bold mt-2 mb-4">Reset Password</h4>

              {error && <Alert message={error} variant="danger" />}

              <div className="vstack">
                <div className="mb-3">
                  <PasswordInput
                    label="New Password"
                    autoComplete="new-password"
                    placeholder="Minimum 8 characters"
                    {...register("password", {
                      required: true,
                      minLength: 8,
                      setValueAs: setEmptyOrString
                    })}
                    error={
                      errors.password &&
                      "Password must be at least 8 charachers"
                    }
                  />
                </div>

                <div className="mb-4">
                  <PasswordInput
                    label="Confirm Password"
                    autoComplete="new-password"
                    placeholder="Minimum 8 characters"
                    {...register("confirmPassword", {
                      setValueAs: setEmptyOrString,
                      validate: (v, fv) => v === fv.password
                    })}
                    error={errors.confirmPassword && "Password does not match"}
                  />
                </div>

                <ProgressButton
                  className="py-2h w-100"
                  loading={isSubmitting}
                  onClick={() => {
                    handleSubmit((data) => {})();
                  }}
                >
                  Reset password
                </ProgressButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function ForgotPassword() {
  const router = useRouter();

  const authContext = useContext(AuthenticationContext);

  const [showReset, setShowReset] = useState(false);

  const [timer, setTimer] = useState(0);

  const [error, setError] = useState<string>();

  const {
    register,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    trigger,
    getValues
  } = useForm({
    defaultValues: {
      otp: "",
      phone: ""
    }
  });

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (authContext.status === "success") {
      router.replace(authContext.payload?.verified ? "/" : "/confirm-otp");
    }
  }, [router, authContext]);

  useEffect(() => {
    if (timer === 0) {
      return;
    }
    const timeout = setTimeout(() => {
      setTimer((old) => old - 1);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [timer]);

  if (authContext.status === "success") {
    return null;
  }

  if (authContext.status === "loading") {
    return null;
  }

  if (showReset) {
    return <ResetPassword {...getValues()} />;
  }

  return (
    <div className="container py-3">
      <div className="row my-4 mb-5">
        <div className="col-md-6 offset-md-3 col-xxl-4 offset-xxl-4">
          <div className="card">
            <div className="card-body p-lg-4">
              <h4 className="card-title fw-bold mt-2 mb-4">Forgot Password</h4>

              {error && <Alert message={error} variant="danger" />}

              <div className="vstack">
                <div className="mb-3">
                  <Input
                    label="Phone Number"
                    id="phoneInput"
                    type="tel"
                    autoComplete="username"
                    placeholder="Enter your phone number"
                    {...register("phone", {
                      required: true,
                      pattern: /^(09)\d{7,12}$/
                    })}
                    error={errors.phone && "Please enter valid phone number"}
                  />
                </div>

                <div className="row g-0 mb-4">
                  <div className="col-12">
                    <label className="form-label">OTP Code</label>
                  </div>
                  <div className="col me-3">
                    <Input
                      id="otpInput"
                      type="text"
                      placeholder="Enter otp code"
                      {...register("otp", {
                        setValueAs: setEmptyOrString,
                        required: "Please enter otp code"
                      })}
                      error={errors.otp?.message}
                    />
                  </div>
                  <div className="col-auto">
                    <Controller
                      control={control}
                      name="phone"
                      render={({ field, fieldState: { invalid } }) => {
                        return (
                          <button
                            disabled={timer > 0 || invalid || !field.value}
                            className="btn btn-outline-primary"
                            style={{
                              height: formControlHeight
                            }}
                            onClick={() => {
                              trigger("phone").then((result) => {
                                result && setTimer(15);
                              });
                            }}
                          >
                            Send
                            {timer > 0 && (
                              <span className="ms-1">({timer})</span>
                            )}
                          </button>
                        );
                      }}
                    />
                  </div>
                </div>

                <ProgressButton
                  className="py-2h w-100"
                  loading={isSubmitting}
                  onClick={() => {
                    handleSubmit((data) => {
                      setShowReset(true);
                    })();
                  }}
                >
                  Confirm OTP
                </ProgressButton>
              </div>
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

export default ForgotPassword;
