import { PhoneIcon, TrashIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/solid";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { AutocompleteSelect, Input, Textarea } from "../forms";
import { RichTextEditorInputProps } from "../forms/RichTextEditor";

const groupList = ["Electronic", "Stationary", "Health & Beauty"];

const DynamicEditor = dynamic<RichTextEditorInputProps>(
  () => import("../forms").then((f) => f.RichTextEditor),
  {
    ssr: false,
  }
);

function ContactChip() {
  return (
    <div className="hstack border rounded p-2">
      <PhoneIcon width={15} className="flex-shrink-0" />
      <span className="text-dark ms-1 small">09-24442122</span>
      <div role="button" className="link-danger ms-2">
        <XCircleIcon className="flex-shrink-0" width={20} />
      </div>
    </div>
  );
}

function SocialChip() {
  return (
    <div className="hstack rounded border p-2">
      <Image
        className="flex-shrink-0"
        src="/images/icons8-facebook-48.png"
        alt="facebook"
        width={28}
        height={28}
      />
      <span className="text-dark ms-1 small">Shopping Center</span>
      <div role="button" className="link-danger ms-2">
        <XCircleIcon className="flex-shrink-0" width={20} />
      </div>
    </div>
  );
}

function ShopEdit({ create = {} }) {
  const list = [1, 2, 3];

  return (
    <div className="pb-5">
      <div className="bg-primary">
        <div className="container py-4">
          <div className="hstack">
            <div>
              <div className="px-2">
                {create ? (
                  <h3 className="text-light text-lg-start">Create Shop</h3>
                ) : (
                  <h3 className="text-light text-lg-start">Edit Shop</h3>
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
                    {create ? (
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Create Shop
                      </li>
                    ) : (
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Edit Shop
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
        <div className="row g-4">
          <div className="col-md-12 col-lg-12">
            <div className="card">
              <div className="card-header bg-white py-3 px-md-4">
                <h5 className="mb-0">General</h5>
              </div>
              <div className="card-body px-md-4">
                <div className="vstack">
                  <div className="row g-4 mb-3">
                    <div className="col-lg-6">
                      <Input
                        label="Name *"
                        id="shopNameInput"
                        name="name"
                        type="text"
                        placeholder="Enter shop name"
                      />
                    </div>
                    <div className="col-lg-6">
                      <Input
                        label="Slug *"
                        id="slugInput"
                        name="slug"
                        type="text"
                        placeholder="https://shoppingcenter.com/page/slug"
                      />
                    </div>
                  </div>
                  <div className="row g-4">
                    <div className="order-5 order-lg-3 order-md-5 col-lg-6">
                      <label className="form-label">About</label>
                      <Textarea
                        id="descriptionInput"
                        placeholder="Enter about shop..."
                        height={250}
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
                      />
                      <Input
                        label="Address *"
                        id="addressInput"
                        name="address"
                        type="text"
                        placeholder="Enter shop address"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-12">
            <div className="card">
              <div className="card-header bg-white py-3 px-md-4">
                <div className="hstack">
                  <h5 className="mb-0">Contacts</h5>
                  <div className="ms-auto">
                    <Link href="#">
                      <a className="btn btn-primary">Add new</a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="card-body px-md-4">
                <div className="d-flex flex-wrap gap-3">
                  {list.map((i) => (
                    <ContactChip key={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-12">
            <div className="card">
              <div className="card-header bg-white py-3 px-md-4">
                <div className="hstack">
                  <h5 className="mb-0">Location</h5>
                </div>
              </div>
              <div className="card-body px-md-4">
                <div className="vstack">
                  <div className="row g-3">
                    <div className="col-lg-6">
                      <Input
                        label="Latitude"
                        id="latitudeInput"
                        name="latitude"
                        type="text"
                        placeholder="Enter latitude"
                      />
                    </div>
                    <div className="col-lg-6">
                      <Input
                        label="Longitude"
                        id="logitudeInput"
                        name="Longitude"
                        type="text"
                        placeholder="Enter longitude"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-12">
            <div className="card">
              <div className="card-header bg-white py-3 px-md-4">
                <h5 className="mb-0">Images</h5>
              </div>
              <div className="card-body px-md-4">
                <div className="vstack">
                  <div className="row g-4">
                    <div className="col-lg-3 col-12">
                      <label htmlFor="avatarInput" className="form-label">
                        Shop Logo
                      </label>
                      <div
                        className="d-flex align-items-center justify-content-center border rounded position-relative"
                        style={{ height: 75, width: 75 }}
                      >
                        <span className="position-absolute">
                          <PhotoIcon
                            className="text-muted"
                            strokeWidth={2}
                            width={25}
                          />
                        </span>
                        <input
                          className="form-control border-0 opacity-0"
                          type="file"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <label className="form-label">Cover Image</label>
                      <div className="card" style={{ borderStyle: "dashed" }}>
                        <div className="card-body p-0 m-0">
                          <div className="d-flex justify-content-center m-5">
                            <span className="position-absolute text-decoration-none text-muted">
                              Drop file here to upload
                            </span>
                            <input
                              className="form-control border-0 opacity-0 stretched-link"
                              type="file"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-12">
            <div className="card">
              <div className="card-header bg-white py-3 px-md-4">
                <div className="hstack">
                  <h5 className="mb-0">Social</h5>
                  <div className="ms-auto">
                    <Link href="/profile/shops/create">
                      <a className="btn btn-primary">Add new</a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="card-body px-md-4">
                <div className="d-flex flex-wrap gap-3">
                  {list.map((i) => (
                    <SocialChip key={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopEdit;
