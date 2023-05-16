import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthenticationContext } from "../common/contexts";
import { parseErrorResponse } from "../common/utils";
import Alert from "../components/Alert";
import { Input, PasswordInput } from "../components/forms";
import ProgressButton from "../components/ProgressButton";
import { login } from "../services/AuthService";

interface LoginInputs {
  phone?: string;
  password?: string;
}

function Login() {
  const router = useRouter();
  const authContext = useContext(AuthenticationContext);
  const [error, setError] = useState<string>();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<LoginInputs>();

  // const {
  //   values,
  //   errors,
  //   handleChange,
  //   handleSubmit,
  //   isSubmitting,
  //   setSubmitting
  // } = useFormik<LoginInputs>({
  //   initialValues: {
  //     phone: "",
  //     password: ""
  //   },
  //   validate: (values) => {
  //     let errors: LoginInputs = {};

  //     const phoneRegex = "^(09)\\d{7,12}$";

  //     if (!values.phone || !values.phone.match(phoneRegex)) {
  //       errors.phone = "Please enter valid phone number.";
  //     }

  //     if (!values.password || values.password.trim().length == 0) {
  //       errors.password = "Password enter password.";
  //     }

  //     return errors;
  //   },
  //   validateOnBlur: false,
  //   validateOnChange: false,
  //   onSubmit: (values) => {
  //     processLogin(values);
  //   }
  // });

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (authContext.status === "success") {
      router.replace(authContext.payload?.verified ? "/" : "/confirm-otp");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, authContext]);

  const processLogin = async (values: LoginInputs) => {
    try {
      setError(undefined);
      const phone = `+95${values.phone!.substring(1)}`;

      const result = await login({
        username: phone,
        password: values.password!
      });
      //sessionStorage.setItem("accessToken", result.accessToken);
      authContext.update("success", result.user);
    } catch (error: any) {
      setError(parseErrorResponse(error));
    }
  };

  if (authContext.payload || authContext.status === "loading") {
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
                <div className="col-md-12 mt-4">
                  <ProgressButton
                    type="submit"
                    className="w-100 py-2h"
                    loading={isSubmitting}
                  >
                    Login
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

// Login.getLayout = (page) => {
//   return <Layout hideAuth>{page}</Layout>;
// };

export default Login;
