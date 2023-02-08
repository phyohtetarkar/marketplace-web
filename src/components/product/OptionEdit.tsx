import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { FormikErrors, useFormik } from "formik";
import { useState } from "react";
import { Input, TagInput } from "../forms";

export interface Option {
  name: string;
  position: number;
  values: string[];
}

interface OptionEditProps {
  data: Option[];
  handleClose: (list?: Option[]) => void;
}

function OptionEdit(props: OptionEditProps) {
  const { data, handleClose } = props;

  const [errors, setErrors] =
    useState<({ name: string; values: string } | undefined)[]>();

  const formik = useFormik<Option[]>({
    initialValues: data,
    enableReinitialize: true,
    validate: (values) => {
      const error: FormikErrors<Option> = {};

      const errors: ({ name: string; values: string } | undefined)[] = [];
      const len = values.length;
      let hasError = false;
      for (let i = 0; i < len; i++) {
        const op = values[i];
        const error = {} as any;
        if (op.name.length === 0) {
          error["name"] = "Enter option name";
        } else if (
          values.find(
            (e, index) =>
              i !== index &&
              e.name.toLowerCase().trim() === op.name.toLowerCase().trim()
          )
        ) {
          error["name"] = "Duplicate option name";
        }

        if (op.values.length === 0) {
          error["values"] = "Option values must not empty";
        }

        if (Object.keys(error).length > 0) {
          errors.push(error);
          hasError = true;
        } else {
          errors.push(undefined);
        }
      }

      if (hasError) {
        setErrors(errors);
        error.name = "Option input errors";
      } else {
        setErrors(undefined);
      }

      return error;
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      handleClose?.([...values]);
      formik.setSubmitting(false);
    }
  });

  return (
    <>
      <div className="modal-header">
        <h5 className="modal-title">Edit Options</h5>
      </div>

      <div className="modal-body">
        <>
          {formik.values.map((o, i) => {
            return (
              <div key={i} className="row g-3 mb-3">
                <div className="col-auto">
                  <Input
                    name="name"
                    value={formik.values[i].name}
                    placeholder="Name"
                    onChange={(evt) => {
                      formik.setFieldValue(`[${i}].name`, evt.target.value);
                    }}
                    error={errors?.[i]?.name}
                  />
                </div>
                <div className="col-12 col-md">
                  <div className="hstack gap-2 align-items-start">
                    <div className="flex-grow-1">
                      <TagInput
                        data={formik.values[i].values ?? []}
                        placeholder="Add value"
                        onTagsChange={(tags) => {
                          formik.setFieldValue(`[${i}].values`, tags);
                        }}
                        error={errors?.[i]?.values}
                      />
                    </div>
                    <div
                      role="button"
                      className="link-danger mt-2h"
                      onClick={() => {
                        const list = [...formik.values];
                        list.splice(i, 1);
                        formik.setValues(list);
                      }}
                    >
                      <TrashIcon width={24} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div>
            <button
              type="button"
              className="btn btn-outline-primary hstack gap-1"
              onClick={() => {
                const old = formik.values;
                const op = {
                  name: "",
                  values: [],
                  position: 0
                };
                formik.setValues([...old, op]);
                // setOptions((old) => {
                //   const v = {
                //     name: "",
                //     values: [],
                //     position: data.length
                //   };
                //   return [...old, v];
                // });
              }}
            >
              <PlusIcon width={20} strokeWidth={2} />
              Add option
            </button>
          </div>
        </>
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
          Save
        </button>
      </div>
    </>
  );
}

export default OptionEdit;
