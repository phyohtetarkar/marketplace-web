import { PlusIcon, TrashIcon, XCircleIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { Input, TagInput, AutocompleteSelect, Select } from "../forms";
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
                        placeholder="Tags"
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
                      className="link-danger"
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
  const [editorHeight, setEditorHeight] = useState(300);
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
      <div className="header-bar">
        <div className="container py-4">
          <div className="hstack">
            <div>
              <h3 className="fw-bold">
                {create ? "Create" : "Update"} Product
              </h3>
              <nav aria-label="breadcrumb col-12">
                <ol className="breadcrumb mb-1">
                  <li className="breadcrumb-item">
                    <Link href="/profile/shops">
                      <a href="#" className="">
                        Shops
                      </a>
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link href="/profile/shops/1">
                      <a href="#" className="">
                        Shoes World
                      </a>
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {create ? "Create" : "Update"} Product
                  </li>
                </ol>
              </nav>
            </div>
            <div className="ms-auto">
              <button className="btn btn-accent py-2 px-3 ms-2">
                {create ? "Create" : "Update"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-4">
        <div className="vstack gap-3">
          <div className="card">
            <div className="card-header bg-white py-3 px-md-4">
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
                    <label className="form-label">Brand *</label>
                    <AutocompleteSelect<string, string>
                      options={groupList}
                      getOptionLabel={(v) => v}
                      getOptionValue={(v) => v}
                    />

                    <label className="form-label mt-3">Category *</label>
                    <AutocompleteSelect<string, string>
                      getOptionLabel={(v) => v}
                      getOptionValue={(v) => v}
                    />

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
                      getOptionLabel={(v) => v}
                      getOptionValue={(v) => v}
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

          <div className="card">
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
                  <thead className="table-light text-nowrap align-middle sticky-top">
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
                    {variants.map((v, i) => {
                      return (
                        <tr key={i}>
                          <td className="ps-3 py-3 w-100">
                            <span className="text-nowrap me-3">{v.name}</span>
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

          <div className="card">
            <div className="card-header bg-white py-3 px-md-4">
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

          <div className="card">
            <div className="card-header bg-white py-3 px-md-4">
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
        </div>
      </div>
    </div>
  );
}

export default ProductEdit;
