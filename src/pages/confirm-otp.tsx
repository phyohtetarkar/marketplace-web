import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { formControlHeight } from "../common/app.config";
import { AuthenticationContext } from "../common/contexts";
import { setEmptyOrString } from "../common/utils";
import { withAuthentication } from "../common/WithAuthentication";
import Alert from "../components/Alert";
import { Input } from "../components/forms";
import ProgressButton from "../components/ProgressButton";

function ConfirmOTP() {
  const router = useRouter();
  const authContext = useContext(AuthenticationContext);

  const [error, setError] = useState<string>();

  const [timer, setTimer] = useState(0);

  const [calledPush, setCalledPush] = useState(false);

  const {
    register,
    control,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm({
    defaultValues: {
      otp: ""
    }
  });

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (calledPush) {
      return;
    }

    if (authContext.status === "unauthorized") {
      setCalledPush(true);
      router.replace("/login");
      return;
    }

    if (authContext.payload?.verified) {
      setCalledPush(true);
      router.replace("/");
    }
  }, [router, authContext, calledPush]);

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

  if (authContext.payload?.verified || authContext.status !== "success") {
    return <div></div>;
  }

  return (
    <div className="container py-3">
      <div className="row my-4 mb-5">
        <div className="col-md-6 offset-md-3 col-xxl-4 offset-xxl-4">
          <div className="card">
            <div className="card-body p-lg-4">
              <h4 className="card-title fw-bold mt-2 mb-4">Confirm OTP</h4>

              {error && <Alert message={error} variant="danger" />}

              <div className={`alert alert-dark-gray py-2h`} role="alert">
                We have sent verification code to
                <span className="fw-semibold ms-1">
                  {authContext.payload?.phone?.replace("+95", "0")}
                </span>
                .
              </div>

              <div className="vstack">
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
                    <button
                      disabled={timer > 0}
                      className="btn btn-outline-primary"
                      style={{
                        height: formControlHeight
                      }}
                      onClick={() => {
                        setTimer(15);
                      }}
                    >
                      Resend
                      {timer > 0 && <span className="ms-1">({timer})</span>}
                    </button>
                  </div>
                </div>

                <ProgressButton
                  className="py-2h w-100"
                  loading={isSubmitting}
                  onClick={() => {}}
                >
                  Confirm
                </ProgressButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmOTP;
