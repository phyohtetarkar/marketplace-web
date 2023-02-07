import { FormikErrors, useFormik } from "formik";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, CSSProperties, useRef, useState } from "react";
import { Shop } from "../../../common/models";
import { debounce, parseErrorResponse } from "../../../common/utils";
import { withAuthentication } from "../../../common/WithAuthentication";
import { Input } from "../../../components/forms";
import { RichTextEditorInputProps } from "../../../components/forms/RichTextEditor";
import StepView from "../../../components/order/StepView";
import { createShop } from "../../../services/ShopService";

const _steps = [
  { step: 1, title: "Basic information" },
  { step: 2, title: "Shop media" },
  { step: 3, title: "Select package", end: true }
];

const DynamicEditor = dynamic<RichTextEditorInputProps>(
  () => import("../../../components/forms").then((f) => f.RichTextEditor),
  {
    ssr: false
  }
);

interface FormProps {
  values: Shop;
  errors: FormikErrors<Shop>;
  handleChange?: (e: ChangeEvent<any>) => void;
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
}

const BasicInformation = (props: FormProps) => {
  return (
    <div className="card shadow-sm">
      <div className="card-header bg-white py-3 px-md-4 border-bottom">
        <h5 className="mb-0">Basic information</h5>
      </div>
      <div className="card-body px-md-4">
        <div className="vstack">
          <div className="row g-4 mb-3">
            <div className="col-lg-6">
              <Input
                label="Name *"
                id="shopNameInput"
                name="name"
                type="text"
                placeholder="Enter shop name"
                value={props.values.name ?? ""}
                onChange={(evt) => {
                  // const slug = evt.target.value
                  //   .replace(/\s+/g, "-")
                  //   .toLowerCase();
                  // props.setFieldValue?.("slug", slug);
                  props.handleChange?.(evt);
                }}
                error={props.errors.name}
              />
            </div>
            <div className="col-lg-6">
              <Input
                label="Headline"
                id="headlineInput"
                name="headline"
                type="text"
                className="mb-3"
                placeholder="Enter shop headline"
                value={props.values.headline ?? ""}
                onChange={props.handleChange}
              />
              {/* <Input
                label="Slug *"
                id="slugInput"
                name="slug"
                type="text"
                placeholder="your-shop-name"
                value={props.values.slug ?? ""}
                onChange={props.handleChange}
                error={props.errors.slug}
              /> */}
            </div>
          </div>
          <div className="row g-4">
            <div className="order-5 order-lg-3 order-md-5 col-lg-6">
              <label className="form-label">About Us</label>
              <div className="flex-grow-1">
                <DynamicEditor
                  id="aboutInput"
                  placeholder="Enter about us..."
                  minHeight={300}
                  value={props.values.about ?? ""}
                  onEditorChange={(value) => {
                    props.setFieldValue?.("about", value);
                  }}
                />
              </div>
            </div>
            <div className="order-3 order-lg-4 order-md-3 order-1 col-lg-6">
              <Input
                label="Address"
                id="addressInput"
                name="contact.address"
                type="text"
                placeholder="Enter shop address"
                value={props.values.contact?.address ?? ""}
                onChange={props.handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShopMedia = (props: FormProps) => {
  const logoRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    let files = event.target.files;
    const name = event.target.name;
    if (files && files.length > 0) {
      let file = files[0];
      props.setFieldValue?.(`${name}Image`, file);

      var reader = new FileReader();
      reader.onload = function (e) {
        props.setFieldValue?.(name, e.target?.result);
      };
      reader.readAsDataURL(file);

      if (name === "logo" && logoRef.current) {
        logoRef.current.value = "";
      } else if (name === "cover" && coverRef.current) {
        coverRef.current.value = "";
      }
    }
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-white py-3 px-md-4 border-bottom">
        <h5 className="mb-0">Shop media</h5>
      </div>
      <div className="card-body px-md-4">
        <div className="vstack">
          <div className="row g-4">
            <div className="col-lg-3 col-12">
              <label htmlFor="logoInput" className="form-label">
                Logo image
              </label>
              <div
                role="button"
                className="ratio ratio-1x1 border rounded"
                style={{ width: 80 }}
                onClick={() => {
                  logoRef.current?.click();
                }}
              >
                <Image
                  src={props.values.logo ?? "/images/placeholder.jpeg"}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-1"
                  alt=""
                />
                <input
                  ref={logoRef}
                  onChange={handleImageChange}
                  name="logo"
                  className="form-control d-none"
                  type="file"
                  accept="image/x-png,image/jpeg"
                />
              </div>
            </div>
            <div className="col-lg-12">
              <label className="form-label">Cover image</label>
              <div
                role="button"
                className="ratio rounded border position-relative bg-light"
                style={{ "--bs-aspect-ratio": "20%" } as CSSProperties}
                onClick={() => {
                  coverRef.current?.click();
                }}
              >
                <div className="position-absolute text-muted top-50 start-50 translate-middle h-auto w-auto fw-medium">
                  Click here to upload
                </div>
                {props.values.cover && (
                  <Image
                    src={props.values.cover}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-1"
                    alt=""
                  />
                )}
                <input
                  ref={coverRef}
                  onChange={handleImageChange}
                  name="cover"
                  className="d-none"
                  type="file"
                  accept="image/x-png,image/jpeg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function CreateShop() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [validating, setValidating] = useState(false);

  const formik = useFormik<Shop>({
    initialValues: {
      contact: {}
    },
    validate: async (values) => {
      const errors: FormikErrors<Shop> = {};

      if (!values.name || values.name.length === 0) {
        errors.name = "Please enter shop name";
      }

      // if (!values.slug || values.slug.length === 0) {
      //   errors.slug = "Please enter shop slug";
      // } else {
      //   try {
      //     if (await existsShopBySlug(values.slug, values.id ?? 0)) {
      //       errors.slug = "Shop slug already in use";
      //     }
      //   } catch (error: any) {
      //     errors.slug = "Error checking, please try again";
      //   }
      // }

      return errors;
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      executeCreate(values);
    }
  });

  const getStepView = (step: number, title: String, end: boolean = false) => {
    const active = step === currentStep;

    return (
      <div className="row gx-2 align-items-center" onClick={() => {}}>
        <div
          className={`col-auto rounded-circle d-flex align-items-center justify-content-center ${
            active ? "bg-primary text-light" : "bg-light-gray"
          }`}
          style={{ width: 40, height: 40 }}
        >
          {step}
        </div>
        <span className={`col-auto ${active ? "text-primary" : "text-dark"}`}>
          {title}
        </span>
        {!end && (
          <>
            <hr className="col my-0 d-none d-md-block" />
            <div className="col-12 b-block d-md-none px-0">
              <div
                className="d-flex justify-content-center py-1"
                style={{ width: 40 }}
              >
                <div className="vr"></div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  const getBodyView = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInformation
            values={formik.values}
            errors={formik.errors}
            handleChange={formik.handleChange}
            setFieldValue={formik.setFieldValue}
          />
        );
      case 2:
        return (
          <ShopMedia
            values={formik.values}
            errors={formik.errors}
            handleChange={formik.handleChange}
            setFieldValue={formik.setFieldValue}
          />
        );
    }

    return null;
  };

  const executeCreate = async (shop: Shop) => {
    try {
      await createShop(shop);
      router.replace("/profile/shops");
    } catch (error) {
      const msg = parseErrorResponse(error);
    } finally {
      formik.setSubmitting(false);
    }
  };

  return (
    <div className="pb-5">
      <div className="header-bar mb-3">
        <div className="container py-4">
          <div className="row g-3">
            <div className="col-lg-6">
              <h3 className="text-light text-lg-start">Create Shop</h3>
              <nav aria-label="breadcrumb col-12">
                <ol className="breadcrumb mb-1">
                  <li className="breadcrumb-item">
                    <Link href="/profile/shops">
                      <a href="#" className="text-light">
                        Shops
                      </a>
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Create Shop
                  </li>
                </ol>
              </nav>
            </div>
            <div className="col-lg-6">
              <div className="hstack h-100">
                <Link href="/profile/shops">
                  <a className="btn btn-light py-2 px-3 ms-lg-auto">
                    Back to shops
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row mt-3">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-body px-md-4">
                <div className="row gx-3">
                  {_steps.map((s, i) => {
                    return (
                      <div className={s.end ? "col-auto" : "col-md"} key={i}>
                        {/* {getStepView(s.step, s.title, s.end)} */}
                        <StepView
                          step={s.step}
                          title={s.title}
                          active={currentStep === s.step}
                          end={s.end}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-12">{getBodyView()}</div>
        </div>

        {currentStep === _steps.length && (
          <div className="row">
            <div className="col-12">
              <div className="form-check">
                <input
                  id="termsAndConditions"
                  type="checkbox"
                  name="level"
                  className="form-check-input"
                />
                <label className="form-check-label text-muted">
                  By checking, you have read and agree to the&nbsp;
                  <Link href={"/"}>
                    <a
                      target="_blank"
                      className="text-decoration-none fw-medium"
                    >
                      terms of service
                    </a>
                  </Link>
                  .
                </label>
              </div>
            </div>
          </div>
        )}

        <div className="row mt-3">
          <div className="col">
            {currentStep > 1 && (
              <button
                className="btn btn-default px-3 py-2"
                disabled={formik.isSubmitting}
                onClick={() => setCurrentStep((s) => s - 1)}
              >
                Previous
              </button>
            )}
          </div>
          <div className="col-auto">
            {currentStep < _steps.length && (
              <button
                className="btn btn-primary px-3 py-2"
                disabled={validating}
                onClick={async () => {
                  setValidating(true);
                  const errors = await formik.validateForm();
                  if (Object.keys(errors).length === 0) {
                    setCurrentStep((s) => s + 1);
                  }
                  setValidating(false);
                }}
              >
                {validating && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                Next
              </button>
            )}
            {currentStep === _steps.length && (
              <button
                className="btn btn-danger px-3 py-2"
                disabled={formik.isSubmitting}
                onClick={() => {
                  debounce(() => {
                    formik.setSubmitting(true);
                    formik.submitForm();
                  }, 500)();
                }}
              >
                {formik.isSubmitting && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                Create shop
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuthentication(CreateShop);
