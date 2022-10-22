import { Auth } from "aws-amplify";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Input, PasswordInput } from "../components/forms";

interface FormValues {
  fullName: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      fullName: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validate: (values) => {
      const errors: any = {};
      const regex =
        '/^(([^<>()[].,;:s@"]+(.[^<>()[].,;:s@"]+)*)|(".+"))@(([^<>()[].,;:s@"]+.)+[^<>()[].,;:s@"]{2,})$/i';
      if (!values.fullName || values.fullName.trim().length === 0) {
        errors.fullName = "Please enter your fullname.";
      }

      if (!values.phone || values.phone.trim().length === 0) {
        errors.phone = "Please enter your phone number.";
      }

      if (!values.password || values.password.trim().length < 8) {
        errors.password = "Password must be at least 8 characters.";
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Password does not match.";
      }

      return errors;
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      // invokeSignUp({
      //   fullName: values.fullName,
      //   email: values.email,
      //   password: values.password,
      // });
      processSignUp(values);
    },
  });

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const processSignUp = async (values: FormValues) => {
    try {
      setLoading(true);
      const { user } = await Auth.signUp({
        username: values.phone,
        password: values.password,
        attributes: {
          name: values.fullName,
          phone_number: values.phone, // optional - E.164 number convention
          // other custom attributes
        },
        autoSignIn: {
          // optional - enables auto sign in after user is confirmed
          enabled: true,
        },
      });
      console.log(user);
    } catch (error) {
      console.log("error signing up:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-3">
      <div className="row my-4">
        <div className="col-md-6 offset-md-3 col-xxl-4 offset-xxl-4">
          <div className="card mb-5">
            <div className="card-body p-lg-4">
              <h4 className="card-title fw-bold mt-2 mb-4">Sign Up</h4>

              {/* {signUpState.error && (
                <div className="alert alert-danger" role="alert">
                  {parseError(signUpState.error)}
                </div>
              )} */}

              <form className="row g-2" onSubmit={formik.handleSubmit}>
                <div className="col-md-12 mb-2">
                  <Input
                    label="Full Name"
                    id="nameInput"
                    type="text"
                    name="fullName"
                    placeholder="Your full name"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    error={formik.errors.fullName}
                  />
                </div>
                <div className="col-md-12 mb-2">
                  <Input
                    label="Phone Number"
                    id="phoneInput"
                    type="tel"
                    name="phone"
                    placeholder="09xxxxxxxx"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.errors.phone}
                  />
                </div>
                <div className="col-md-12 mb-2">
                  <PasswordInput
                    label="Password"
                    name="password"
                    placeholder="Minimum 8 characters"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.errors.password}
                  />
                </div>
                <div className="col-md-12 mb-2">
                  <PasswordInput
                    label="Confirm Password"
                    name="confirmPassword"
                    placeholder="Minimum 8 characters"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={formik.errors.confirmPassword}
                  />
                </div>
                <div className="col-md-12 mt-4 mb-2">
                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2h"
                    disabled={loading}
                  >
                    {loading && (
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    )}
                    Sign up
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
                      disabled={loading}
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
                      disabled={loading}
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
              Already have an account?
              <Link href="/login">
                <a className="text-decoration-none fw-medium ms-1">Login</a>
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
