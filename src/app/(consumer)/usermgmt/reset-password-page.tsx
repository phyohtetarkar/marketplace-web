"use client";

import { firebaseAuth } from "@/common/firebase.config";
import { parseErrorResponse, setEmptyOrString } from "@/common/utils";
import Alert from "@/components/Alert";
import Loading from "@/components/Loading";
import ProgressButton from "@/components/ProgressButton";
import { PasswordInput } from "@/components/forms";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface ResetPasswordForm {
  newPassword?: string;
  confirmPassoword?: string;
}

export default function ResetPasswordPage({ oobCode }: { oobCode: string }) {
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string>();
  const router = useRouter();

  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    register
  } = useForm<ResetPasswordForm>();

  const verifyCode = useCallback(async () => {
    if (verified) {
      return;
    }
    try {
      setError(undefined);
      const auth = firebaseAuth;
      const email = await verifyPasswordResetCode(auth, oobCode);
      setVerified(true);
    } catch (error) {
      setError(parseErrorResponse(error));
    }
  }, [oobCode, verified]);

  useEffect(() => {
    verifyCode();
  }, [oobCode, verifyCode]);

  const resetPassword = async (values: ResetPasswordForm) => {
    try {
      const auth = firebaseAuth;
      await confirmPasswordReset(auth, oobCode, values.newPassword!);
      toast.success("Reset password success");
      router.push("/login");
    } catch (error) {
      toast.error(parseErrorResponse(error));
    }
  };

  const content = () => {
    if (error) {
      return <Alert message={error} variant="danger" />;
    }

    if (!verified) {
      return <Loading />;
    }

    return (
      <>
        <h4 className="card-title fw-bold mt-2 mb-4">Reset Password</h4>
        <form
          className="row g-3"
          onSubmit={(evt) => {
            evt.preventDefault();
            handleSubmit(async (values) => {
              await resetPassword(values);
            })();
          }}
        >
          <div className="col-12">
            <PasswordInput
              label="New password"
              placeholder="Enter new password"
              {...register("newPassword", {
                required: true,
                minLength: 8,
                setValueAs: setEmptyOrString
              })}
              error={
                errors.newPassword && "Password must be at least 8 charachers"
              }
            />
          </div>
          <div className="col-12">
            <PasswordInput
              label="Confirm password"
              placeholder="Re-enter new password"
              {...register("confirmPassoword", {
                required: "Please re-enter new password",
                setValueAs: setEmptyOrString,
                validate: (v, fv) => {
                  if (v !== fv.newPassword) {
                    return "Password does not match";
                  }
                  return undefined;
                }
              })}
              error={errors.confirmPassoword?.message}
            />
          </div>

          <div className="col-12 mt-4">
            <ProgressButton
              type="submit"
              className="w-100 py-2h"
              loading={isSubmitting}
            >
              Reset
            </ProgressButton>
          </div>
        </form>
      </>
    );
  };

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xxl-4 offset-xxl-4">
          <div className="card">
            <div className="card-body p-lg-4">{content()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
