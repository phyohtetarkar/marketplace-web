import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { ProductAttribute, ProductAttributeValue } from "../../common/models";
import { setEmptyOrString } from "../../common/utils";
import { Input, TagInput } from "../forms";

interface OptionEditProps {
  attributes: ProductAttribute[];
  handleClose: (attributes?: ProductAttribute[]) => void;
}

function OptionEdit(props: OptionEditProps) {
  const { attributes, handleClose } = props;

  const {
    control,
    register,
    formState: { errors, isSubmitting },
    setValue,
    handleSubmit
  } = useForm({
    defaultValues: {
      attributes: attributes
    }
  });
  const { fields, append, prepend, remove, swap, move, insert, update } =
    useFieldArray({ control, name: "attributes", keyName: "vId" });

  return (
    <>
      <div className="modal-header">
        <h5 className="modal-title">Edit Options</h5>
      </div>

      <div className="modal-body">
        <>
          {fields.map((f, index) => {
            return (
              <div key={index} className="row g-3 mb-3">
                <div className="col-auto">
                  <Input
                    placeholder="Name"
                    {...register(`attributes.${index}.name`, {
                      setValueAs: setEmptyOrString,
                      validate: (v, fv) => {
                        if (!v) {
                          return "Enter option name";
                        }
                        if (
                          fv.attributes.find(
                            (e, j) =>
                              j !== index &&
                              e.name?.toLowerCase()?.trim() ===
                                v?.toLowerCase()?.trim()
                          )
                        ) {
                          return "Duplicate option name";
                        }
                        return true;
                      }
                    })}
                    error={errors.attributes?.[index]?.name?.message}
                  />
                </div>
                <div className="col-12 col-md">
                  <div className="hstack gap-2 align-items-start">
                    <div className="flex-grow-1">
                      <Controller
                        name={`attributes.${index}.values`}
                        control={control}
                        rules={{
                          validate: (v) =>
                            (v?.length ?? 0) > 0 ||
                            "Option values must not empty"
                        }}
                        render={({ field, fieldState: { error } }) => {
                          return (
                            <TagInput
                              data={
                                field.value
                                  ?.sort((f, s) => f.sort - s.sort)
                                  .map((v) => v.value) ?? []
                              }
                              placeholder="Add value"
                              onTagsChange={(tags) => {
                                if (tags.length === 0) {
                                  return;
                                }

                                const values = tags.map((t, i) => {
                                  return {
                                    value: t,
                                    sort: i
                                  } as ProductAttributeValue;
                                });
                                setValue(`attributes.${index}.values`, values, {
                                  shouldValidate: true
                                });
                              }}
                              error={error?.message}
                            />
                          );
                        }}
                      />
                    </div>
                    <div
                      role="button"
                      className="link-danger mt-2h"
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      <TrashIcon width={24} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {/* {formik.values.map((o, i) => {
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
          })} */}
          <div>
            <button
              type="button"
              className="btn btn-outline-primary hstack gap-1"
              onClick={() => {
                // const old = formik.values;
                // const op = {
                //   name: "",
                //   values: [],
                //   position: 0
                // };
                // formik.setValues([...old, op]);

                append({
                  name: "",
                  sort: 0,
                  values: []
                });
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
          onClick={() => handleClose?.()}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-primary"
          disabled={isSubmitting || fields.length === 0}
          onClick={() => {
            handleSubmit((data) => {
              handleClose?.(data.attributes.map((a, i) => ({ ...a, sort: i })));
            })();
          }}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default OptionEdit;
