import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef } from "react";
import { AuthenticationContext } from "../common/contexts";
import { Input, PasswordInput } from "../components/forms";
import { login } from "../services/AuthService";

interface FormValues {
  phone?: string;
  password?: string;
}

function Login() {
  const mountedRef = useRef(true);
  const router = useRouter();
  const authContext = useContext(AuthenticationContext);

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    setSubmitting
  } = useFormik<FormValues>({
    initialValues: {
      phone: "",
      password: ""
    },
    validate: (values) => {
      let errors: FormValues = {};

      if (!values.phone || values.phone.trim().length === 0) {
        errors.phone = "Please enter valid phone number.";
      }

      if (!values.password || values.password.trim().length == 0) {
        errors.password = "Password enter password.";
      }

      return errors;
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      processLogin(values);
    }
  });

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (authContext.payload) {
      router.replace("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, authContext]);

  const processLogin = async (values: FormValues) => {
    try {
      const phone = `+95${values.phone!.substring(1)}`;

      const user = await login({
        username: phone,
        password: values.password!
      });
      mountedRef.current && router.push("/");
    } catch (error: any) {
      console.log("error signing in:", error.code);
    } finally {
      mountedRef.current && setSubmitting(false);
    }
  };

  if (authContext.payload || authContext.status === "loading") {
    return <div></div>;
  }

  return (
    <div className="container py-3">
      <div className="row my-4">
        <div className="col-md-6 offset-md-3 col-xxl-4 offset-xxl-4">
          <div className="card mb-5">
            <div className="card-body p-lg-4">
              <h4 className="card-title fw-bold mt-2 mb-4">Sign In</h4>

              {/* {loginState.error && (
                <div className="alert alert-danger" role="alert">
                  {parseError(loginState.error)}
                </div>
              )} */}

              <form className="row" onSubmit={handleSubmit}>
                <div className="col-md-12 mb-3">
                  <Input
                    label="Phone Number"
                    id="phoneInput"
                    type="tel"
                    name="phone"
                    placeholder="09xxxxxxxx"
                    value={values.phone}
                    onChange={handleChange}
                    error={errors.phone}
                  />
                </div>
                <div className="col-md-12 mb-2">
                  <PasswordInput
                    label="Password"
                    name="password"
                    placeholder=""
                    value={values.password}
                    onChange={handleChange}
                    error={errors.password}
                  />
                </div>
                <div className="col-md-12">
                  <Link href="/forgot-password">
                    <a className="text-primary-dark">Forgot password?</a>
                  </Link>
                </div>
                <div className="col-md-12 mt-4 mb-2">
                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2h"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && (
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    )}
                    Login
                  </button>
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
                </div>
              </form>
            </div>
            <div className="text-center p-3 card-footer">
              Don&apos;t have an account?
              <Link href="/sign-up">
                <a className="text-decoration-none fw-medium ms-1">Sign Up</a>
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
