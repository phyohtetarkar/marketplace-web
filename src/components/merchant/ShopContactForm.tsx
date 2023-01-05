import { useFormik } from "formik";
import { ShopContact } from "../../common/models";
import { Input, TagInput } from "../forms";

function ShopContactForm() {
  const formik = useFormik<ShopContact>({
    initialValues: {
      id: 0
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
      <div className="card">
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
          <div>
            <label className="form-label">Location</label>
            <div className="row g-3">
              <div className="col-md-6">
                <Input
                  name="latitude"
                  placeholder="Enter latitude"
                  value={formik.values.latitude ?? ""}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-md-6">
                <Input
                  name="longitude"
                  placeholder="Enter longitude"
                  value={formik.values.longitude ?? ""}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer py-2h">
          <div className="clearfix">
            <button type="submit" className="btn btn-primary float-end">
              Save
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

export default ShopContactForm;
