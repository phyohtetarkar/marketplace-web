import { FormikErrors, useFormik } from "formik";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ShopDetailContext } from "../../common/contexts";
import { ShopGeneral } from "../../common/models";
import { parseErrorResponse } from "../../common/utils";
import {
  existsShopBySlug,
  updateShopGeneral
} from "../../services/ShopService";
import { Input } from "../forms";
import { RichTextEditorInputProps } from "../forms/RichTextEditor";

const DynamicEditor = dynamic<RichTextEditorInputProps>(
  () => import("../../components/forms").then((f) => f.RichTextEditor),
  {
    ssr: false
  }
);

function ShopGeneralEdit() {
  const shopContext = useContext(ShopDetailContext);
  const router = useRouter();

  const formik = useFormik<ShopGeneral>({
    initialValues: {
      shopId: shopContext?.id,
      name: shopContext?.name,
      slug: shopContext?.slug,
      about: shopContext?.about,
      headline: shopContext?.headline
    },
    enableReinitialize: true,
    validate: async (values) => {
      const errors: FormikErrors<ShopGeneral> = {};

      if (!values.name || values.name.trim().length === 0) {
        errors.name = "Please enter shop name";
      }

      if (!values.slug || values.slug.trim().length === 0) {
        errors.slug = "Please enter shop slug";
      } else {
        try {
          if (await existsShopBySlug(values.slug, values.shopId ?? 0)) {
            errors.slug = "Shop slug already in use";
          }
        } catch (error: any) {
          if (error?.status !== 404) {
            errors.slug = "Error checking, please try again";
          }
        }
      }

      return errors;
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      save(values);
    }
  });

  const save = async (values: ShopGeneral) => {
    try {
      await updateShopGeneral(values);
      router.replace({
        href: `/shops/[slug]`,
        query: { slug: values.slug, tab: "settings" }
      });
    } catch (error) {
      const msg = parseErrorResponse(error);
    } finally {
      formik.setSubmitting(false);
    }
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="card shadow-sm">
        <div className="card-header py-3 bg-white border-bottom">
          <h4 className="mb-0">General</h4>
        </div>
        <div className="card-body">
          <div className="row g-3 mb-3">
            <div className="col-lg-6">
              <Input
                label="Name *"
                id="shopNameInput"
                name="name"
                type="text"
                placeholder="Enter shop name"
                value={formik.values.name}
                onChange={(evt) => {
                  // const slug = evt.target.value
                  //   .replace(/\s+/g, "-")
                  //   .toLowerCase();
                  // formik.setFieldValue("slug", slug);
                  formik.handleChange(evt);
                }}
                error={formik.errors.name}
              />
            </div>
            <div className="col-lg-6">
              <Input
                label="Slug *"
                id="slugInput"
                name="slug"
                type="text"
                placeholder="https://shoppingcenter.com/page/slug"
                value={formik.values.slug}
                onChange={formik.handleChange}
                error={formik.errors.slug}
              />
            </div>
          </div>
          <div className="row g-3 mb-3">
            <div className="order-5 order-lg-3 order-md-5 col-lg-6">
              <label className="form-label">About us</label>
              <DynamicEditor
                id="aboutInput"
                placeholder="Enter about us..."
                minHeight={300}
                value={formik.values.about ?? ""}
                onEditorChange={(value) => {
                  formik.setFieldValue("about", value);
                }}
              />
            </div>
            <div className="order-3 order-lg-4 order-md-3 order-1 col-lg-6">
              <Input
                label="Headline"
                id="headlineInput"
                name="headline"
                type="text"
                className="mb-3"
                placeholder="Enter shop headline"
                value={formik.values.headline ?? ""}
                onChange={formik.handleChange}
              />
            </div>
          </div>
        </div>
        <div className="card-footer py-2h">
          <div className="clearfix">
            <button
              type="submit"
              className="btn btn-primary float-end"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              Update
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ShopGeneralEdit;
