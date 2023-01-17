import { useFormik } from "formik";
import { ShopGeneral } from "../../common/models";
import { existsShopBySlug } from "../../services/ShopService";
import { Input, Textarea } from "../forms";

function ShopGeneralForm() {
  const formik = useFormik<ShopGeneral>({
    initialValues: {
      shopId: 0,
      name: "",
      slug: ""
    },
    validate: async (values) => {
      const errors: ShopGeneral = {
        shopId: 0,
        name: "",
        slug: ""
      };

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

  const save = (values: ShopGeneral) => {
    console.log(values);
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="card">
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
                  const slug = evt.target.value
                    .replace(/\s+/g, "-")
                    .toLowerCase();
                  formik.setFieldValue("slug", slug);
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
              <Textarea
                id="aboutUsInput"
                placeholder="Enter about shop"
                height={200}
                value={formik.values.about ?? ""}
                onChange={formik.handleChange}
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
            <button type="submit" className="float-end btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ShopGeneralForm;
