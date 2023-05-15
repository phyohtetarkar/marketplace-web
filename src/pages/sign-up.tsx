import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthenticationContext } from "../common/contexts";
import { parseErrorResponse, setEmptyOrString } from "../common/utils";
import Alert from "../components/Alert";
import { Input, PasswordInput } from "../components/forms";
import ProgressButton from "../components/ProgressButton";
import { signUp } from "../services/AuthService";

interface SignUpInputs {
  fullName?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

function Register() {
  const router = useRouter();
  const authContext = useContext(AuthenticationContext);
  const [error, setError] = useState<string>();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<SignUpInputs>();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (authContext.payload && authContext.status === "success") {
      router.replace("/");
    }
  }, [router, authContext]);

  const processSignUp = async (values: SignUpInputs) => {
    try {
      setError(undefined);
      const phone = `+95${values.phone!.substring(1)}`;
      const result = await signUp({
        otp: "",
        name: values.fullName!,
        phone: phone,
        password: values.password!
      });

      //sessionStorage.setItem("accessToken", result.accessToken);
      authContext.update("success", result.user);

      // if (process.env.NEXT_PUBLIC_PROFILE === "dev") {
      //   await createUser({
      //     id: userSub,
      //     name: values.fullName,
      //     phone: phone
      //   });
      //   await login({
      //     username: phone,
      //     password: values.password!
      //   });
      // }
    } catch (error) {
      setError(parseErrorResponse(error));
    } finally {
    }
  };

  if (authContext.payload || authContext.status === "loading") {
    return <div></div>;
  }

  return (
    <div className="container py-3">
      <div className="row my-4 mb-5">
        <div className=" col-lg-6 offset-lg-3">
          <div className="card">
            <div className="card-body p-lg-4">
              <h4 className="card-title fw-bold mt-2 mb-4">Sign Up</h4>

              {/* {signUpState.error && (
                <div className="alert alert-danger" role="alert">
                  {parseError(signUpState.error)}
                </div>
              )} */}

              {error && <Alert message={error} variant="danger" />}

              <form
                className="row g-3"
                onSubmit={(evt) => {
                  evt.preventDefault();
                  handleSubmit(async (data) => await processSignUp(data))();
                }}
              >
                <div className="col-lg-6">
                  <Input
                    label="Full Name"
                    id="nameInput"
                    type="text"
                    placeholder="Your full name"
                    {...register("fullName", {
                      required: true,
                      setValueAs: setEmptyOrString
                    })}
                    error={errors.fullName && "Please enter full name"}
                  />
                </div>
                <div className="col-lg-6">
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
                <div className="col-md-12">
                  <PasswordInput
                    label="Password"
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
                <div className="col-md-12">
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
                <div className="col-md-12 mt-4">
                  <ProgressButton
                    type="submit"
                    className="w-100 py-2h"
                    loading={isSubmitting}
                  >
                    Sign up
                  </ProgressButton>
                </div>
                {/* <div className="col-md-12 mb-2">
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
                </div> */}

                {/* <div className="col-md-12">
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
                      <span className="text-dark ms-1">Facebook</span>
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
                      <span className="text-dark ms-1">Google</span>
                    </button>
                  </div>
                </div> */}
              </form>
            </div>
            <div className="text-center p-3 card-footer">
              Already have an account?
              <Link
                href="/login"
                className="text-decoration-none fw-medium link-anchor ms-1"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Register.getLayout = (page) => {
//   return <Layout hideAuth>{page}</Layout>;
// };

export default Register;
