import { FormikErrors, useFormik } from "formik";
import { useState } from "react";
import { Product, ProductVariant } from "../../common/models";
import { Input } from "../forms";

interface VaraintEditProps {
  product: Product;
  handleClose?: (value?: ProductVariant) => void;
}

function VaraintEdit(props: VaraintEditProps) {
  const { product, handleClose } = props;

  const [optionErrors, setOptionErrors] =
    useState<({ value: string } | undefined)[]>();

  const [duplicateError, setDuplicateError] = useState<string>();

  const formik = useFormik<ProductVariant>({
    initialValues: {
      options:
        product.options?.map((pop) => ({
          option: pop.name ?? "",
          value: ""
        })) ?? []
    },
    enableReinitialize: true,
    validate: (values) => {
      const errors: FormikErrors<ProductVariant> = {};

      const floatRegex = "^([0-9]*[.])?[0-9]+$";

      if (!values.price || !`${values.price}`.match(floatRegex)) {
        errors.price = "Invalid price input";
      }

      const optionErrors = [] as ({ value: string } | undefined)[];
      let hasOptionErrors = false;
      values.options.forEach((op, i) => {
        if (!op.value || op.value.trim().length === 0) {
          optionErrors.push({ value: `Please enter ${op.option}` });
          hasOptionErrors = true;
        } else {
          optionErrors.push(undefined);
        }
      });

      if (hasOptionErrors) {
        setOptionErrors(optionErrors);
        errors.options = "Option input errors";
      } else {
        setOptionErrors(undefined);
      }

      if (
        !hasOptionErrors &&
        product.variants
          ?.map((v) =>
            v.options.map((op) => op.value.trim().toLowerCase()).join("-")
          )
          .find((key) => {
            return (
              key ===
              values.options
                .map((op) => op.value.trim().toLowerCase())
                .join("-")
            );
          })
      ) {
        errors.options = "Option input errors";
        setDuplicateError("Duplicate variant");
      } else {
        setDuplicateError(undefined);
      }

      return errors;
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      const variant = { ...values };
      variant.title = variant.options.map((op) => op.value).join(" / ");
      handleClose?.(variant);
      formik.setSubmitting(false);
    }
  });

  if (!product.options || product.options.length === 0) {
    return null;
  }

  return (
    <>
      <div className="modal-header">
        <h5 className="modal-title">Add Variant</h5>
      </div>

      <div className="modal-body">
        {duplicateError && (
          <div className="alert alert-danger mb-2h py-2h" role="alert">
            {duplicateError}
          </div>
        )}
        <div className="row g-3">
          {formik.values.options.map((op, i) => {
            return (
              <div key={i} className="col-12">
                <Input
                  label={op.option}
                  name={`options[${i}].value`}
                  value={formik.values.options[i].value}
                  placeholder={`Enter ${op.option.toLowerCase()}`}
                  onChange={formik.handleChange}
                  error={optionErrors?.[i]?.value}
                />
              </div>
            );
          })}
          <div className="col-lg-6">
            <Input
              label="Price"
              name="price"
              value={formik.values.price ?? ""}
              placeholder="Enter variant price"
              onChange={formik.handleChange}
              error={formik.errors.price}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="SKU"
              name="sku"
              value={formik.values.sku ?? ""}
              placeholder="Enter variant sku"
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-12">
            <Input
              label="Stock amount"
              name="stockLeft"
              type="text"
              placeholder="Enter stock amount"
              value={formik.values.stockLeft ?? ""}
              onChange={(evt) => {
                const value = evt.target.value;
                if (value.trim().length > 0 && !isNaN(parseInt(value))) {
                  formik.setFieldValue(
                    evt.target.name,
                    parseInt(evt.target.value)
                  );
                } else {
                  formik.setFieldValue(evt.target.name, undefined);
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-default"
          disabled={formik.isSubmitting}
          onClick={() => handleClose?.()}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-primary"
          disabled={formik.isSubmitting}
          onClick={() => {
            formik.handleSubmit();
          }}
        >
          Add
        </button>
      </div>
    </>
  );
}

export default VaraintEdit;
