import {
  PencilSquareIcon,
  PlusCircleIcon,
  TrashIcon
} from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useSWR from "swr";
import { ShopDetailContext } from "../../common/contexts";
import {
  Shop,
  ShopAcceptedPayment,
  ShopContact,
  ShopGeneral,
  ShopSetting
} from "../../common/models";
import {
  parseErrorResponse,
  setEmptyOrNumber,
  setEmptyOrString,
  setStringToSlug
} from "../../common/utils";
import {
  deleteShopAcceptedPayment,
  getShopAcceptedPayments,
  saveShopAcceptedPayment
} from "../../services/AcceptedPaymentService";
import {
  getShopDeliveryCities,
  saveShopDeliveryCities
} from "../../services/CityService";
import {
  getShopSetting,
  updateShopContact,
  updateShopGeneral,
  updateShopSetting
} from "../../services/ShopService";
import Alert from "../Alert";
import ConfirmModal from "../ConfirmModal";
import { Input, TagInput } from "../forms";
import { RichTextEditorInputProps } from "../forms/RichTextEditor";
import Loading from "../Loading";
import Modal from "../Modal";
import ProgressButton from "../ProgressButton";
import { AcceptedPaymentEdit, DeliveryCityChoice } from "../shop";
import Tooltip from "../Tooltip";

const DynamicEditor = dynamic<RichTextEditorInputProps>(
  () => import("../../components/forms").then((f) => f.RichTextEditor),
  {
    ssr: false
  }
);

interface ShopSettingProps {
  shop: Shop;
}

const ShopGeneralForm = (props: ShopSettingProps) => {
  const { shop } = props;
  const router = useRouter();
  const shopContext = useContext(ShopDetailContext);
  const {
    control,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue
  } = useForm<ShopGeneral>({
    values: {
      shopId: shop?.id,
      name: shop?.name,
      slug: shop?.slug,
      about: shop?.about,
      headline: shop?.headline
    }
  });

  const executeSave = async (values: ShopGeneral) => {
    try {
      const shop = await updateShopGeneral(values);
      router.replace({
        pathname: `/account/shops/[slug]`,
        query: { slug: shop.slug, tab: "setting" }
      });
    } catch (error) {
      const msg = parseErrorResponse(error);
      toast.error(msg);
    }
  };

  return (
    <div className="card">
      <div className="card-header py-3">
        <h5 className="mb-0">Basic information</h5>
      </div>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-lg-6">
            <Input
              label="Name *"
              id="nameInput"
              type="text"
              placeholder="Enter shop name"
              {...register("name", {
                setValueAs: setEmptyOrString,
                required: "Please enter shop name",
                onChange: (evt) => {
                  setValue("slug", setStringToSlug(evt.target.value), {
                    shouldValidate: !!errors.slug?.message
                  });
                }
              })}
              error={errors.name?.message}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Slug *"
              id="slugInput"
              type="text"
              placeholder="your-shop-name"
              {...register("slug", {
                setValueAs: setEmptyOrString,
                required: "Please enter slug"
              })}
              error={errors.slug?.message}
            />
          </div>
          <div className="col-12">
            <Input
              label="Headline"
              id="headlineInput"
              type="text"
              placeholder="Enter shop headline"
              {...register("headline")}
            />
          </div>
          <div className="col-12">
            <label className="form-label">About us</label>
            <Controller
              control={control}
              name="about"
              render={({ field }) => {
                return (
                  <DynamicEditor
                    id="aboutInput"
                    placeholder="Enter about us..."
                    minHeight={300}
                    value={field.value ?? ""}
                    onEditorChange={(value) => {
                      setValue("about", value);
                    }}
                  />
                );
              }}
            />
          </div>
        </div>
      </div>
      <div className="card-footer border-top-0 py-2h">
        <ProgressButton
          loading={isSubmitting}
          onClick={() => {
            handleSubmit(async (data) => {
              await executeSave(data);
            })();
          }}
        >
          Update
        </ProgressButton>
      </div>
    </div>
  );
};

const ShopContactForm = (props: ShopSettingProps) => {
  const { shop } = props;
  const router = useRouter();
  const shopContext = useContext(ShopDetailContext);
  const {
    control,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue
  } = useForm<ShopContact>({
    values: {
      shopId: shop?.id,
      phones: shop?.contact?.phones,
      address: shop?.contact?.address,
      latitude: shop?.contact?.latitude,
      longitude: shop?.contact?.longitude
    }
  });

  const executeSave = async (values: ShopContact) => {
    try {
      if (!values.phones || values.phones.length === 0) {
        throw "At least one phone number required";
      }
      await updateShopContact(values);
      router.replace(router.asPath);
    } catch (error) {
      const msg = parseErrorResponse(error);
      toast.error(msg);
    }
  };

  return (
    <div className="card">
      <div className="card-header py-3">
        <h5 className="mb-0">Contact information</h5>
      </div>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-12">
            <label className="form-label">Phones</label>
            <Controller
              control={control}
              name="phones"
              render={({ field }) => {
                return (
                  <TagInput
                    data={field.value ?? []}
                    placeholder="Add phone"
                    onTagsChange={(tags) => {
                      setValue("phones", tags);
                    }}
                  />
                );
              }}
            />
          </div>

          <div className="col-12">
            <Input
              label="Address"
              placeholder="Enter shop address"
              {...register("address")}
            />
          </div>

          <div className="col-lg-6">
            <Input
              label="Latitude"
              placeholder="Enter latitude"
              error={errors.latitude?.message}
              {...register("latitude", {
                setValueAs: setEmptyOrNumber,
                validate: (v) => {
                  if (v) {
                    const floatRegex = "^([0-9]*[.])?[0-9]+$";
                    if (!`${v}`.match(floatRegex)) {
                      return "Invalid value";
                    }
                  }
                  return true;
                }
              })}
            />
          </div>

          <div className="col-lg-6">
            <Input
              label="Longitude"
              placeholder="Enter longitude"
              error={errors.longitude?.message}
              {...register("longitude", {
                setValueAs: setEmptyOrNumber,
                validate: (v) => {
                  if (v) {
                    const floatRegex = "^([0-9]*[.])?[0-9]+$";
                    if (!`${v}`.match(floatRegex)) {
                      return "Invalid value";
                    }
                  }
                  return true;
                }
              })}
            />
          </div>
        </div>
      </div>
      <div className="card-footer border-top-0 py-2h">
        <ProgressButton
          loading={isSubmitting}
          onClick={() => {
            handleSubmit(async (data) => {
              await executeSave(data);
            })();
          }}
        >
          Update
        </ProgressButton>
      </div>
    </div>
  );
};

const ShopDeliveryCitiesForm = (props: ShopSettingProps) => {
  const { shop } = props;

  const shopId = shop.id ?? 0;

  const [showSelect, setShowSelect] = useState(false);

  const { data, error, isLoading, mutate } = useSWR(
    `/shops/${shopId}/delivery-cities`,
    () => getShopDeliveryCities(shopId),
    {
      revalidateOnFocus: false
    }
  );

  const content = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (error) {
      return <Alert message={parseErrorResponse(error)} variant="danger" />;
    }

    if (!data || data.length === 0) {
      return <div className="text-muted">No cities selected</div>;
    }

    return (
      <div className="row row-cols-1 row-cols-md-2 g-3">
        {data?.map((c) => {
          return (
            <div key={c.id} className="col">
              <div className="fw-semibold">{c.name}</div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="card">
      <div className="card-header py-3">
        <div className="hstack gap-2">
          <h5 className="mb-0">Delivery cities</h5>
          <div className="flex-grow-1"></div>
          <div
            role="button"
            className="btn btn-primary"
            onClick={() => {
              if (!isLoading && !error) {
                setShowSelect(true);
              }
            }}
          >
            Select
          </div>
        </div>
      </div>
      <div className="card-body">{content()}</div>

      <Modal id="deliveryCityChoice" show={showSelect}>
        {(isShown) => {
          return isShown ? (
            <DeliveryCityChoice
              cities={data ?? []}
              close={() => setShowSelect(false)}
              handleChoose={async (cities) => {
                try {
                  await saveShopDeliveryCities(shopId, cities);
                  mutate();
                  setShowSelect(false);
                } catch (error) {
                  const msg = parseErrorResponse(error);
                  toast.error(msg);
                }
              }}
            />
          ) : (
            <></>
          );
        }}
      </Modal>
    </div>
  );
};

const ShopPaymentForm = (props: ShopSettingProps) => {
  const { shop } = props;

  const shopId = shop.id ?? 0;

  const [acceptedPayment, setAcceptedPayment] = useState<ShopAcceptedPayment>();

  const [showEdit, setShowEdit] = useState(false);

  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const settingState = useSWR(
    `/shops/${shopId}/setting`,
    () => getShopSetting(shopId),
    { revalidateOnFocus: false }
  );

  const acceptedPaymentsState = useSWR(
    `/shops/${shopId}/accepted-payments`,
    () => getShopAcceptedPayments(shopId),
    {
      revalidateOnFocus: false
    }
  );

  const [setting, setSetting] = useState<ShopSetting>({
    shopId: shopId,
    cashOnDelivery: false,
    bankTransfer: false
  });

  useEffect(() => {
    settingState.data && setSetting(settingState.data);
  }, [settingState.data]);

  useEffect(() => {
    if (settingState.error) {
      const msg = parseErrorResponse(settingState.error);
      toast.error(msg);
    }
  }, [settingState.error]);

  const handleSettingChange = async (evt: ChangeEvent<HTMLInputElement>) => {
    try {
      setSetting((old) => ({
        ...old,
        [evt.target.name]: evt.target.checked
      }));
      await updateShopSetting({
        ...setting,
        [evt.target.name]: evt.target.checked
      });
    } catch (error) {
      var msg = parseErrorResponse(error);
      toast.error(msg);
      setSetting((old) => ({ ...old, [evt.target.name]: !evt.target.checked }));
    }
  };

  const saveAcceptedPayment = async (value: ShopAcceptedPayment) => {
    try {
      await saveShopAcceptedPayment({ ...value, shopId: shopId });
      setAcceptedPayment(undefined);
      setShowEdit(false);
      acceptedPaymentsState.mutate();
    } catch (error) {
      const msg = parseErrorResponse(error);
      toast.error(msg);
    }
  };

  return (
    <div className="card">
      <div className="card-header py-3">
        <h5 className="mb-0">Payment</h5>
      </div>
      <div className="card-body">
        <div className="vstack">
          <h6 className="fw-semibold border-bottom pb-2 mb-3">
            Payment method
          </h6>
          <div className="row mb-4 g-3">
            <div className="col-md-6">
              <div className="form-check form-switch">
                <input
                  id="codCheck"
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  name="cashOnDelivery"
                  disabled={true}
                  checked={setting?.cashOnDelivery ?? false}
                  onChange={() => {}}
                ></input>
                <label
                  htmlFor="codCheck"
                  className="form-check-label fw-medium"
                >
                  Cash on delivery
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-check form-switch">
                <input
                  id="bankTransferCheck"
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  name="bankTransfer"
                  disabled={settingState.isLoading}
                  checked={setting?.bankTransfer ?? false}
                  onChange={handleSettingChange}
                ></input>
                <label
                  htmlFor="bankTransferCheck"
                  className="form-check-label fw-medium"
                >
                  Bank transfer
                </label>
              </div>
            </div>
          </div>

          <div className="hstack border-bottom pb-2 gap-2 mb-3">
            <h6 className="fw-semibold mb-0">Accepted payments</h6>
            <Tooltip title="Add new">
              <div
                role="button"
                className="link-anchor"
                onClick={() => {
                  setAcceptedPayment({});
                  setShowEdit(true);
                }}
              >
                <PlusCircleIcon width={20} strokeWidth={2} />
              </div>
            </Tooltip>
          </div>
          <div className="row row-cols-1 row-cols-md-2 rol-cols-lg-3 g-3">
            {(acceptedPaymentsState.data?.length ?? 0) === 0 && (
              <div className="text-muted">No payment added</div>
            )}
            {acceptedPaymentsState.data?.map((p, i) => {
              return (
                <div key={i} className="col">
                  <div className="card bg-light border-0 position-relative">
                    <div className="card-body">
                      <h6 className="fw-bold">{p.accountType}</h6>
                      <div>{p.accountName}</div>
                      <div className="text-muted">{p.accountNumber}</div>
                    </div>

                    <div className="position-absolute hstack gap-2 top-0 end-0 m-2h">
                      <button
                        className="btn btn-sm btn-outline-anchor"
                        onClick={() => {
                          setAcceptedPayment(p);
                          setShowEdit(true);
                        }}
                      >
                        <PencilSquareIcon width={18} />
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => {
                          setAcceptedPayment(p);
                          setDeleteConfirm(true);
                        }}
                      >
                        <TrashIcon width={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Modal id="editAcceptedPaymentModal" show={showEdit}>
        {(isShown) =>
          isShown ? (
            <AcceptedPaymentEdit
              value={acceptedPayment}
              submit={async (value) => {
                await saveAcceptedPayment(value);
              }}
              handleClose={() => {
                setAcceptedPayment(undefined);
                setShowEdit(false);
              }}
            />
          ) : (
            <></>
          )
        }
      </Modal>

      <ConfirmModal
        message="Are you sure to delete?"
        show={deleteConfirm}
        close={() => {
          setAcceptedPayment(undefined);
          setDeleteConfirm(false);
        }}
        onConfirm={async () => {
          try {
            acceptedPayment?.id &&
              (await deleteShopAcceptedPayment(acceptedPayment.id));
            acceptedPaymentsState.mutate();
            setAcceptedPayment(undefined);
            setDeleteConfirm(false);
          } catch (error) {
            const msg = parseErrorResponse(error);
            toast.error(msg);
          }
        }}
      />
    </div>
  );
};

function ShopSetting(props: ShopSettingProps) {
  return (
    <div className="row g-3">
      <div className="col-12">
        <ShopGeneralForm {...props} />
      </div>
      <div className="col-12">
        <ShopContactForm {...props} />
      </div>
      <div className="col-12">
        <ShopPaymentForm {...props} />
      </div>
      <div className="col-12">
        <ShopDeliveryCitiesForm {...props} />
      </div>
    </div>
  );
}

export default ShopSetting;
