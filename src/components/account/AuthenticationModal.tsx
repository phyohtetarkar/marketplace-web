import Link from "next/link";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthenticationContext } from "../../common/contexts";
import { parseErrorResponse } from "../../common/utils";
import { login } from "../../services/AuthService";
import Alert from "../Alert";
import { Input, PasswordInput } from "../forms";
import Modal from "../Modal";
import ProgressButton from "../ProgressButton";

interface AuthenticationModalProps {
  show: boolean;
  close?: () => void;
}

const LoginForm = () => {
  const [error, setError] = useState<string>();
  const authContext = useContext(AuthenticationContext);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm({
    defaultValues: {
      phone: "",
      password: ""
    }
  });

  return (
    <>
      {error && <Alert message={error} variant="danger" />}
      <form
        className="row g-3"
        onSubmit={(evt) => {
          evt.preventDefault();
          handleSubmit(async (data) => {
            try {
              setError(undefined);
              const phone = `+95${data.phone!.substring(1)}`;

              const result = await login({
                username: phone,
                password: data.password!
              });
              sessionStorage.setItem("accessToken", result.accessToken);
              authContext.update("success", result.user);
              close?.();
            } catch (error: any) {
              console.log("error signing in:", error.code);
              setError(parseErrorResponse(error));
            }
          })();
        }}
      >
        <div className="col-12">
          <Input
            label="Phone Number"
            id="phoneInput"
            type="tel"
            autoComplete="username"
            placeholder="09xxxxxxxx"
            {...register("phone", {
              required: true,
              pattern: /^(09)\d{7,12}$/
            })}
            error={errors.phone && "Please enter valid phone number"}
          />
        </div>
        <div className="col-12">
          <PasswordInput
            label="Password"
            placeholder=""
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
        <div className="col-12 mt-4">
          <ProgressButton
            type="submit"
            className="py-2h"
            loading={isSubmitting}
          >
            Login
          </ProgressButton>
        </div>
        <div className="col-12">
          <div className="text-center p-3">
            Don&apos;t have an account?
            <div className="text-decoration-none fw-medium link-anchor ms-1">
              Sign Up
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

function AuthenticationModal(props: AuthenticationModalProps) {
  const { show, close } = props;

  return (
    <Modal show={show}>
      {(isShown) => {
        if (!isShown) {
          return <></>;
        }

        return (
          <>
            <div className="modal-header">
              <h4 className="modal-title">Login</h4>
              <button
                type="button"
                className="btn-close shadow-none"
                aria-label="Close"
                onClick={close}
              ></button>
            </div>
            <div className="modal-body">
              <LoginForm />
            </div>
          </>
        );
      }}
    </Modal>
  );
}

export default AuthenticationModal;
