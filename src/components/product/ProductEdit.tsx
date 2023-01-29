import { PlusIcon, TrashIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { FormikErrors, useFormik } from "formik";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { useCategories } from "../../common/hooks";
import {
  Category,
  Product,
  ProductOption,
  ProductVariant,
  ProductVariantOption,
  Shop
} from "../../common/models";
import { AutocompleteSelect, Input, TagInput } from "../forms";
import { RichTextEditorInputProps } from "../forms/RichTextEditor";
import Modal from "../Modal";

const groupList = ["Red", "Green", "Blue"];

const DynamicEditor = dynamic<RichTextEditorInputProps>(
  () => import("../forms").then((f) => f.RichTextEditor),
  {
    ssr: false
  }
);

interface Option {
  name: string;
  position: number;
  values: string[];
}

function OptionsEdit({
  data,
  updateOptions,
  hide
}: {
  data: Option[];
  updateOptions: (list: Option[]) => void;
  hide: () => void;
}) {
  const [errors, setErrors] = useState<
    ({ name: string; values: string } | undefined)[]
  >([]);

  const formik = useFormik<Option[]>({
    initialValues: data,
    enableReinitialize: true,
    validate: (values) => {
      const errors: ({ name: string; values: string } | undefined)[] = [];
      const len = values.length;
      for (let i = 0; i < len; i++) {
        const op = values[i];
        const error = {} as any;
        console.log(op.position);
        if (op.name.length === 0) {
          error["name"] = "Enter option name";
        } else if (
          values.find(
            (e, index) =>
              i !== index && e.name.toLowerCase() === op.name.toLowerCase()
          )
        ) {
          error["name"] = "Duplicate option name";
        }

        if (op.values.length === 0) {
          error["values"] = "Option values must not empty";
        }

        Object.keys(error).length > 0
          ? errors.push(error)
          : errors.push(undefined);
      }
      setErrors(errors);
      return undefined;
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      if (errors.filter((e) => !!e).length === 0) {
        updateOptions([...values]);
        setErrors([]);
      }

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
                    error={errors[i]?.name}
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
                        error={errors[i]?.values as string}
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
              className="btn btn-outline-primary hstack gap-1"
              onClick={() => {
                const old = formik.values;
                const op = {
                  name: "",
                  values: [],
                  position: old.length
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
          className="btn btn-default"
          disabled={formik.isSubmitting}
          onClick={() => hide()}
        >
          Cancel
        </button>
        <button
          className="btn btn-primary"
          disabled={formik.isSubmitting}
          onClick={() => {
            //updateOptions([...options]);
            formik.handleSubmit();
          }}
        >
          Save
        </button>
      </div>
    </>
  );
}

interface ProductEditProps {
  shop: Shop;
  productId?: number;
  onPopBack?: () => void;
}

function ProductEdit({ shop, productId, onPopBack }: ProductEditProps) {
  const [editorHeight, setEditorHeight] = useState(300);
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [withVariant, setWithVariant] = useState(false);

  const { data } = useCategories(false);

  const formik = useFormik<Product>({
    initialValues: {
      shopId: shop.id
    },
    enableReinitialize: true,
    validate: async (values) => {
      const errors: FormikErrors<Product> = {};

      return errors;
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      const data = { ...values };
      data.options = options.map((op) => {
        return { name: op.name, position: op.position };
      });
    }
  });

  function generateVariant(
    list: Option[],
    index: number,
    key: string,
    variantOptions?: ProductVariantOption[]
  ) {
    const result: ProductVariant[] = [];
    const option = list[index];
    for (const value of option.values) {
      if (index < list.length - 1) {
        const options = variantOptions ? variantOptions : [];
        options.push({
          option: option.name,
          value: value
        });
        result.push(
          ...generateVariant(
            list,
            index + 1,
            `${index > 0 ? key + " / " + value : value}`,
            options
          )
        );
      } else {
        result.push({
          title: `${index > 0 ? key + " / " + value : value}`,
          options: variantOptions ?? []
        });
      }
    }

    return result;
  }

  function generateVariants(ops: Option[]) {
    //setVariants(generateVariant(ops, 0, ""));
    formik.setFieldValue(
      "variants",
      ops.length > 0 ? generateVariant(ops, 0, "") : []
    );
  }

  return (
    <div>
      <div className="header-bar">
        <div className="container py-4">
          <div className="hstack">
            <div>
              <h3 className="fw-bold">Create Product</h3>
              <nav aria-label="breadcrumb col-12">
                <ol className="breadcrumb mb-1">
                  <li className="breadcrumb-item">
                    <Link href="/shops">
                      <a className="">Shops</a>
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <a
                      href="#"
                      className=""
                      onClick={(evt) => {
                        evt.preventDefault();
                        onPopBack?.();
                      }}
                    >
                      {shop.name}
                    </a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Create Product
                  </li>
                </ol>
              </nav>
            </div>
            <div className="ms-auto">
              <button className="btn btn-accent py-2 px-3 ms-2">Create</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-4">
        <div className="vstack gap-3">
          <div className="card shadow-sm">
            <div className="card-header bg-white py-3 px-md-4 border-bottom">
              <h5 className="mb-0">General</h5>
            </div>
            <div className="card-body p-md-4">
              <div className="row g-4 mb-4">
                <div className="col-lg-6">
                  <Input
                    label="Name *"
                    id="nameInput"
                    name="name"
                    type="text"
                    placeholder="Enter product name"
                  />
                </div>

                <div className="col-lg-6">
                  <Input
                    label="Slug *"
                    id="slugInput"
                    name="slug"
                    type="text"
                    placeholder="/slug"
                  />
                </div>
              </div>
              <div className="row g-4">
                <div className="col-lg-6 order-2 order-lg-1 vstack">
                  <label className="form-label">Description</label>
                  <div
                    className="flex-grow-1"
                    ref={(e) => {
                      const h = e?.clientHeight ?? 300;
                      setEditorHeight(h > 250 ? h : 300);
                    }}
                  >
                    <DynamicEditor
                      id="descriptionInput"
                      placeholder="Enter product description..."
                      minHeight={editorHeight}
                    />
                  </div>
                </div>

                <div className="col-lg-6 order-1 order-lg-2">
                  <div className="vstack">
                    <label className="form-label">Category *</label>
                    <AutocompleteSelect<Category, number>
                      options={data ?? []}
                      getOptionLabel={(v) => v.name}
                      getOptionKey={(v) => v.id}
                      getNestedData={(v) => v.children}
                      canSelect={(v) => !v.children || v.children?.length === 0}
                      onChange={(v) => {}}
                    />

                    <div className="mt-3">
                      <Input
                        label="Brand name"
                        id="brandInput"
                        name="brand"
                        type="text"
                        placeholder="Enter brand name"
                      />
                    </div>

                    {/* <div className="row g-3 mb-3">
                      <div className="col-lg-6">
                        <ReactSelect
                          id="mainCategorySelect"
                          instanceId="mainCategorySelect"
                          styles={reactSelectStyles}
                          theme={reactSelectTheme}
                          placeholder="Select main category"
                        />
                      </div>
                      <div className="col-lg-6">
                        <ReactSelect
                          id="subategorySelect"
                          instanceId="subCategorySelect"
                          styles={reactSelectStyles}
                          theme={reactSelectTheme}
                          placeholder="Select sub category"
                        />
                      </div>
                    </div>

                    <ReactSelect
                      id="childCategorySelect"
                      instanceId="childCategorySelect"
                      styles={reactSelectStyles}
                      theme={reactSelectTheme}
                      placeholder="Select child category"
                    /> */}

                    <label className="form-label mt-3">Country of origin</label>
                    <AutocompleteSelect<string, string>
                      options={[
                        "Myanmar",
                        "China",
                        "UK",
                        "India",
                        "Japan",
                        "Korea"
                      ].sort()}
                      getOptionLabel={(v) => v}
                      getOptionKey={(v) => v}
                    />
                  </div>
                </div>
              </div>

              <div className="row g-4 my-4">
                <div className="col-auto">
                  <div className="form-check form-switch">
                    <input
                      id="variantCheck"
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      checked={withVariant}
                      onChange={(evt) => {
                        setWithVariant(evt.target.checked);
                        if (!evt.target.checked) {
                          formik.setFieldValue("variants", undefined);
                          setOptions([]);
                        } else {
                          formik.setFieldValue("price", undefined);
                          formik.setFieldValue("sku", undefined);
                        }
                      }}
                    ></input>
                    <label
                      htmlFor="variantCheck"
                      className="form-check-label fw-medium"
                    >
                      With variants
                    </label>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="form-check form-switch">
                    <input
                      id="newArrivalCheck"
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                    ></input>
                    <label
                      htmlFor="newArrivalCheck"
                      className="form-check-label fw-medium"
                    >
                      New arrival
                    </label>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="form-check form-switch">
                    <input
                      id="outOfStockCheck"
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                    ></input>
                    <label
                      htmlFor="outOfStockCheck"
                      className="form-check-label fw-medium"
                    >
                      Out of stock
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {withVariant && (
            <div className="card shadow-sm">
              <div className="card-header bg-white py-3">
                <div className="hstack justify-content-between">
                  <h5 className="mb-0">Variants</h5>
                  <button
                    className="btn btn-primary ms-2"
                    onClick={() => {
                      setShowVariantModal(true);
                    }}
                  >
                    Edit Options
                  </button>
                </div>
              </div>
              <div className="card-body p-0">
                <div
                  className="table-responsive scrollbar-custom"
                  style={{ maxHeight: 360 }}
                >
                  <table className="table align-middle">
                    <thead className="table-light text-nowrap align-middle">
                      <tr style={{ height: 50 }}>
                        <th className="ps-3 fw-medium w-100">VARIANT</th>
                        <th className="fw-medium" style={{ minWidth: 200 }}>
                          PRICE
                        </th>
                        <th className="fw-medium" style={{ minWidth: 200 }}>
                          SKU
                        </th>
                        <th className="fw-medium" style={{ minWidth: 100 }}>
                          ACTION
                        </th>
                      </tr>
                    </thead>
                    <tbody className="border-top-0">
                      {formik.values.variants &&
                        formik.values.variants.map((v, i) => {
                          return (
                            <tr key={i}>
                              <td className="ps-3 py-3 w-100">
                                <span className="text-nowrap me-3">
                                  {v.title}
                                </span>
                              </td>
                              <td>
                                <Input
                                  name="price"
                                  type="text"
                                  placeholder="Enter price"
                                  defaultValue={0}
                                  height={40}
                                />
                              </td>
                              <td>
                                <Input
                                  name="sku"
                                  type="text"
                                  placeholder="Enter sku"
                                  height={40}
                                />
                              </td>
                              <td>
                                <div role="button" className="link-danger">
                                  <TrashIcon width={20} />
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
              <Modal
                id="varientEditModal"
                show={showVariantModal}
                variant="large"
              >
                {(isShown) =>
                  isShown && options ? (
                    <OptionsEdit
                      data={[...options]}
                      updateOptions={(list) => {
                        setOptions(list);
                        setShowVariantModal(false);
                        generateVariants(list);
                      }}
                      hide={() => setShowVariantModal(false)}
                    />
                  ) : (
                    <></>
                  )
                }
              </Modal>
            </div>
          )}

          {!withVariant && (
            <div className="card shadow-sm">
              <div className="card-header bg-white py-3 px-md-4 border-bottom">
                <h5 className="mb-0">Pricing</h5>
              </div>
              <div className="card-body p-md-4">
                <div className="row g-4">
                  <div className="col-lg-6">
                    <Input
                      label="Price *"
                      id="priceInput"
                      name="price"
                      type="text"
                      placeholder="Enter price"
                    />
                  </div>
                  <div className="col-lg-6">
                    <Input
                      label="SKU"
                      id="skuInput"
                      name="sku"
                      type="text"
                      placeholder="Enter product sku"
                    />
                  </div>
                  {/* <div className="col-lg-12">
                  <label className="form-label">Discount</label>
                  <div className="input-group">
                    <Input
                      id="discountInput"
                      name="discount"
                      type="text"
                      placeholder="Enter discount"
                    />
                    <div className="d-flex">
                      <select className="form-select rounded-0 border-start-0 bg-light">
                        <option value="fixed">.00</option>
                        <option value="percent">%</option>
                      </select>
                    </div>
                    <div className="input-group-text">
                      <div className="form-check mb-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                        ></input>
                        <label className="form-check-label">Apply</label>
                      </div>
                    </div>
                  </div>
                </div> */}
                </div>
              </div>
            </div>
          )}

          {/* <div className="card">
            <div className="card-header bg-white py-3 px-md-4">
              <h5 className="mb-0">Promotion</h5>
            </div>
            <div className="card-body p-md-4">
              <div className="row g-4">
                <div className="col-lg-6">
                  <label className="form-label">Discount</label>
                  <AutocompleteSelect<string, string>
                    placeholder="Choose discount"
                    getOptionLabel={(v) => v}
                    getOptionValue={(v) => v}
                  />
                </div>
              </div>
            </div>
          </div> */}

          <div className="card shadow-sm">
            <div className="card-header bg-white py-3 px-md-4 border-bottom">
              <h5 className="mb-0">Images</h5>
            </div>
            <div className="card-body p-md-4">
              <div className="d-flex flex-wrap gap-2">
                <button
                  className="btn btn-light-gray hstack justify-content-center"
                  style={{ width: 120, height: 120 }}
                >
                  <PlusIcon width={44} strokeWidth={2} className="text-muted" />
                </button>
              </div>
            </div>
            <div className="card-footer px-4 py-3">
              <span className="text-muted">
                Product image can upload up to <strong>5</strong> images with
                dimension constraint of at most <strong>600x600</strong> pixels.
              </span>
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-header bg-white py-3 px-md-4 border-bottom">
              <h5 className="mb-0">Video</h5>
            </div>
            <div className="card-body p-md-4">
              <div className="vstack gap-4">
                <Input
                  id="videoInput"
                  name="video"
                  type="text"
                  placeholder="Enter youtube ID"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductEdit;
