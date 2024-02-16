"use client";
import { AuthenticationContext } from "@/common/contexts";
import { firebaseAuth } from "@/common/firebase.config";
import { parseErrorResponse } from "@/common/utils";
import Alert from "@/components/Alert";
import ProgressButton from "@/components/ProgressButton";
import { Input } from "@/components/forms";
import { sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function ForgotPasswordPage() {
  const { status } = useContext(AuthenticationContext);
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    register
  } = useForm<{
    email?: string;
  }>();

  useEffect(() => {
    if (status === "success") {
      router.push("/")
    }
  }, []);

  const executeSendEmail = async (email: string) => {
    try {
      setError(undefined);
      setSuccess(false);
      const auth = firebaseAuth;
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
      toast.success("Password reset email sent success");
    } catch (error) {
      setError(parseErrorResponse(error));
    }
  };

  if (status === "loading") {
    return null;
  }

  if (status === "success") {
    return null;
  }

  return (
    <div className="container py-4">
      <div className="row my-4 mb-5">
        <div className="col-md-6 offset-md-3 col-xxl-4 offset-xxl-4">
          <div className="card">
            <div className="card-body p-lg-4">
              <h4 className="card-title fw-bold mt-2 mb-4">Forgot password</h4>

              {success && (
                <Alert
                  message="Password reset email sent success"
                  variant="success"
                />
              )}

              {error && (
                <Alert
                  message={error}
                  variant="danger"
                />
              )}
              
              <form
                className="row g-3"
                onSubmit={(evt) => {
                  evt.preventDefault();
                  handleSubmit(async (values) => {
                    await executeSendEmail(values.email!);
                  })();
                }}
              >
                <div className="col-md-12">
                  <Input
                    label="Email"
                    id="emailInput"
                    type="email"
                    autoComplete="username"
                    placeholder="Enter email address"
                    {...register("email", {
                      required: true,
                      pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
                    })}
                    error={errors.email && "Please enter valid email address"}
                  />
                </div>
                <div className="col-md-12 mt-4">
                  <ProgressButton
                    type="submit"
                    className="w-100 py-2h"
                    loading={isSubmitting}
                  >
                    Request
                  </ProgressButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
