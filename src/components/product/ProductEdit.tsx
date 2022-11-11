import { PlusIcon, TrashIcon, XCircleIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReactSelect from "react-select";
import { Input, TagInput } from "../forms";
import { RichTextEditorInputProps } from "../forms/RichTextEditor";
import Modal from "../Modal";
import { reactSelectStyles, reactSelectTheme } from "../themes";

const DynamicEditor = dynamic<RichTextEditorInputProps>(
  () => import("../forms").then((f) => f.RichTextEditor),
  {
    ssr: false
  }
);

interface Option {
  name: string;
  values: string[];
}

interface Variant {
  name: string;
  options?: { name: string; value: string }[];
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
  const [options, setOptions] = useState<Option[]>(data);

  function updateOption(option: Option, i: number) {
    const list = [...options];
    list[i] = option;
    setOptions(list);
  }

  return (
    <>
      <div className="modal-header">
        <h5 className="modal-title">Edit Options</h5>
      </div>

      <div className="modal-body">
        <>
          {options.map((o, i) => {
            return (
              <div key={i} className="row g-3 mb-3">
                <div className="col-auto">
                  <Input
                    value={o.name}
                    placeholder="Name"
                    onChange={(e) => {
                      const option = {
                        name: e.target.value,
                        values: options[i].values
                      };
                      updateOption(option, i);
                    }}
                  />
                </div>
                <div className="col-12 col-md">
                  <div className="hstack gap-2">
                    <div className="flex-grow-1">
                      <TagInput
                        data={o.values ?? []}
                        placeholder="Value"
                        onTagsChange={(tags) => {
                          const option = {
                            name: options[i].name,
                            values: tags
                          };
                          updateOption(option, i);
                        }}
                      />
                    </div>
                    <div
                      role="button"
                      className="text-danger"
                      onClick={() => {
                        const list = [...options];
                        list.splice(i, 1);
                        setOptions(list);
                      }}
                    >
                      <XCircleIcon width={24} />
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
                setOptions((old) => {
                  const v = {
                    name: "",
                    values: []
                  };
                  return [...old, v];
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
        <button className="btn btn-default" onClick={() => hide()}>
          Cancel
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            updateOptions([...options]);
          }}
        >
          Save
        </button>
      </div>
    </>
  );
}

function ProductEdit({ create = {} }) {
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);

  function generateVariant(list: Option[], index: number, key: string) {
    const result: Variant[] = [];
    const option = list[index];
    for (const value of option.values) {
      if (index < list.length - 1) {
        result.push(
          ...generateVariant(
            list,
            index + 1,
            `${index > 0 ? key + " / " + value : value}`
          )
        );
      } else {
        result.push({ name: `${index > 0 ? key + " / " + value : value}` });
      }
    }

    return result;
  }

  function generateVariants(ops: Option[]) {
    setVariants(generateVariant(ops, 0, ""));
  }

  return (
    <div className="pb-5">
      <div className="bg-primary">
        <div className="container py-4">
          <div className="hstack">
            <div>
              <div className="px-2">
                {create ? (
                  <h3 className="text-light text-lg-start">Create Product</h3>
                ) : (
                  <h3 className="text-light text-lg-start">Edit Product</h3>
                )}
              </div>
              <div className="row px-2">
                <nav aria-label="breadcrumb col-12">
                  <ol className="breadcrumb mb-1">
                    <li className="breadcrumb-item">
                      <Link href="/profile/shops">
                        <a href="#" className="text-light">
                          Shops
                        </a>
                      </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link href="/profile/shops/1">
                        <a href="#" className="text-light">
                          Shoes World
                        </a>
                      </Link>
                    </li>
                    {create ? (
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Create Product
                      </li>
                    ) : (
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Edit Product
                      </li>
                    )}
                  </ol>
                </nav>
              </div>
            </div>
            <div className="ms-auto">
              {create ? (
                <button className="btn btn-accent py-2 px-3 ms-2">
                  Create
                </button>
              ) : (
                <button className="btn btn-accent py-2 px-3 ms-2">
                  Update
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container py-4">
        <div className="row g-3">
          <div className="col-lg-8 order-2 order-lg-1">
            <div className="vstack gap-3">
              <div className="card">
                <div className="card-header bg-white py-3">
                  <h5 className="mb-0">Product Images</h5>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-wrap gap-2">
                    <button
                      className="btn btn-light-gray hstack justify-content-center"
                      style={{ width: 120, height: 120 }}
                    >
                      <PlusIcon width={44} strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header bg-white py-3">
                  <h5 className="mb-0">Product Description</h5>
                </div>
                <div className="card-body p-0">
                  <DynamicEditor
                    id="descriptionInput"
                    placeholder="Enter product description..."
                    minHeight={300}
                    noBorder
                  />
                </div>
              </div>
              <div className="card">
                <div className="card-header bg-white py-3">
                  <h5 className="mb-0">Product Video</h5>
                </div>
                <div className="card-body">
                  <Input
                    id="videoInput"
                    name="video"
                    type="text"
                    placeholder="Enter youtube video URL"
                  />
                </div>
              </div>

              <div className="card">
                <div className="card-header bg-white py-3">
                  <div className="hstack justify-content-between">
                    <h5 className="mb-0">Product Variants</h5>
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
                      <thead className="table-light text-nowrap align-middle sticky-top">
                        <tr style={{ height: 50 }}>
                          <th className="ps-3 fw-medium w-100">VARIANT</th>
                          <th className="pe-5 fw-medium">PRICE</th>
                          <th className="pe-5 fw-medium"></th>
                        </tr>
                      </thead>
                      <tbody className="border-top-0">
                        {variants.map((v, i) => {
                          return (
                            <tr key={i}>
                              <td className="ps-3 py-3 w-100">
                                <span className="text-nowrap me-3">
                                  {v.name}
                                </span>
                              </td>
                              <td className="pe-5">0</td>
                              <td className="pe-5">
                                <button className="btn btn-outline-danger">
                                  <TrashIcon width={20} />
                                </button>
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
                    isShown ? (
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
            </div>
          </div>
          <div className="col-lg-4 order-1 order-lg-2">
            <div className="card">
              <div className="card-header bg-white py-3">
                <h5 className="mb-0">Product Info</h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-lg-12">
                    <Input
                      label="Name *"
                      id="nameInput"
                      name="name"
                      type="text"
                      placeholder="Enter product name"
                    />
                  </div>
                  <div className="col-lg-12">
                    <Input
                      label="Slug *"
                      id="slugInput"
                      name="slug"
                      type="text"
                      placeholder="https://shopping/create/slug"
                    />
                    <span className="form-text">
                      Field must contain an unique value.
                    </span>
                  </div>
                  <div className="col-lg-12">
                    <Input
                      label="Code"
                      id="codeInput"
                      name="code"
                      type="text"
                      placeholder="Enter product code"
                    />
                  </div>
                  <div className="col-lg-12">
                    <Input
                      label="Price *"
                      id="priceInput"
                      name="price"
                      type="text"
                      placeholder="Enter price"
                    />
                  </div>
                  <div className="col-lg-12">
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
                  </div>
                </div>
                <div className="col-lg-12 mt-3">
                  <label className="form-label">Category *</label>
                  <ReactSelect
                    id="mainCategorySelect"
                    instanceId="mainCategorySelect"
                    styles={reactSelectStyles}
                    theme={reactSelectTheme}
                    placeholder="Select main category"
                    className="mb-2"
                  />
                  <ReactSelect
                    id="subategorySelect"
                    instanceId="subCategorySelect"
                    styles={reactSelectStyles}
                    theme={reactSelectTheme}
                    placeholder="Select sub category"
                    className="mb-2"
                  />
                  <ReactSelect
                    id="childCategorySelect"
                    instanceId="childCategorySelect"
                    styles={reactSelectStyles}
                    theme={reactSelectTheme}
                    placeholder="Select child category"
                  />
                </div>
                <div className="col-lg-12 mt-3">
                  <label className="form-label">Brand *</label>
                  <ReactSelect
                    id="brandSelect"
                    instanceId="brandSelect"
                    styles={reactSelectStyles}
                    theme={reactSelectTheme}
                    placeholder="Select brand"
                  />
                </div>
                <div className="col-lg-12 mt-3">
                  <label className="form-label">Made in</label>
                  <ReactSelect
                    id="madeInSelect"
                    instanceId="madeInSelect"
                    styles={reactSelectStyles}
                    theme={reactSelectTheme}
                    placeholder="Select country"
                  />
                </div>

                <hr className="bg-dark-gray my-4" />

                <div className="row g-3">
                  <div className="col-6">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                      ></input>
                      <label className="form-check-label">Out of stock</label>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                      ></input>
                      <label className="form-check-label">New arrival</label>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                      ></input>
                      <label className="form-check-label">Hidden</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductEdit;
