import { useFormik } from "formik";
import { useContext } from "react";
import { ShopDetailContext } from "../../common/contexts";
import { ShopContact } from "../../common/models";
import { Input, TagInput } from "../forms";

function ShopContactEdit() {
  const shopContext = useContext(ShopDetailContext);

  const formik = useFormik<ShopContact>({
    initialValues: {
      id: shopContext?.contact?.id ?? 0,
      shopId: shopContext?.id,
      phones: shopContext?.contact?.phones,
      address: shopContext?.contact?.address,
      latitude: shopContext?.contact?.latitude,
      longitude: shopContext?.contact?.longitude
    },
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      save(values);
    }
  });

  const save = (values: ShopContact) => {
    console.log(values);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="card shadow-sm">
        <div className="card-header bg-white py-3 border-bottom">
          <h4 className="mb-0">Contact</h4>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Phones</label>
            <TagInput
              data={formik.values.phones ?? []}
              placeholder="Add phone"
            />
          </div>

          <div className="mb-3">
            <Input
              label="Address"
              name="address"
              placeholder="Enter shop address"
              value={formik.values.address ?? ""}
              onChange={formik.handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Location</label>
            <div className="row g-3">
              <div className="col-md-6">
                <Input
                  name="latitude"
                  placeholder="Enter latitude"
                  value={formik.values.latitude ?? ""}
                  onChange={(evt) => {
                    const value = evt.target.value;
                    if (value.length === 0 || !isNaN(parseInt(value))) {
                      formik.handleChange(evt);
                    }
                  }}
                />
              </div>
              <div className="col-md-6">
                <Input
                  name="longitude"
                  placeholder="Enter longitude"
                  value={formik.values.longitude ?? ""}
                  onChange={(evt) => {
                    const value = evt.target.value;
                    if (value.length === 0 || !isNaN(parseInt(value))) {
                      formik.handleChange(evt);
                    }
                  }}
                />
              </div>
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

export default ShopContactEdit;
