import { useFormik } from "formik";
import { useContext } from "react";
import { ShopDetailContext } from "../../common/contexts";
import { ShopContact } from "../../common/models";
import { Input, TagInput } from "../forms";

function ShopContactEdit() {
  const shopContext = useContext(ShopDetailContext);

  const formik = useFormik<ShopContact>({
    initialValues: shopContext?.contact ?? {
      id: 0,
      shopId: shopContext?.id
    },
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
        <div className="card-header bg-white py-2h border-bottom">
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
              Update
            </button>
          </div>
        </div>
        {/* <div className="d-flex justify-content-start">
            <Link href="#">
              <a className="btn btn-primary">
                <div className="hstack">
                  <PlusIcon className="me-2" width={20} />
                  Add new
                </div>
              </a>
            </Link>
          </div>
          <div className="d-flex flex-wrap gap-3 py-3">
            {list.map((i) => (
              <div className="hstack bg-light rounded p-2" key={i}>
                <PhoneIcon width={15} className="flex-shrink-0" />
                <span className="text-dark ms-1 small">09-24442122</span>
                <div role="button" className="link-danger ms-2">
                  <XCircleIcon className="flex-shrink-0" width={20} />
                </div>
              </div>
            ))}
          </div> */}
      </div>
    </form>
  );
}

export default ShopContactEdit;
