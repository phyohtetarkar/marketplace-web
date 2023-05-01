import {
  PencilSquareIcon,
  PlusCircleIcon,
  TrashIcon
} from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
import { Input, TagInput, Textarea } from "../forms";
import { RichTextEditorInputProps } from "../forms/RichTextEditor";
import ProgressButton from "../ProgressButton";
import Tooltip from "../Tooltip";
import useSWR from "swr";
import {
  getShopAcceptedPayments,
  getShopSetting,
  saveShopAcceptedPayment,
  updateShopContact,
  updateShopGeneral,
  updateShopSetting
} from "../../services/ShopService";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Modal from "../Modal";
import AcceptedPaymentEdit from "./AcceptedPaymentEdit";

const DynamicEditor = dynamic<RichTextEditorInputProps>(
  () => import("../../components/forms").then((f) => f.RichTextEditor),
  {
    ssr: false
  }
);

interface ShopSettingProps {
  shopId: number;
}

const ShopGeneralForm = () => {
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
      shopId: shopContext?.id,
      name: shopContext?.name,
      slug: shopContext?.slug,
      about: shopContext?.about,
      headline: shopContext?.headline,
      deliveryNote: shopContext?.deliveryNote
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
            <Textarea
              label="Delivery note"
              id="deliveryNoteInput"
              type="text"
              placeholder="Enter delivery note"
              {...register("deliveryNote")}
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

const ShopContactForm = () => {
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
      shopId: shopContext?.id,
      phones: shopContext?.contact?.phones,
      address: shopContext?.contact?.address,
      latitude: shopContext?.contact?.latitude,
      longitude: shopContext?.contact?.longitude
    }
  });

  const executeSave = async (values: ShopContact) => {
    try {
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

const ShopPaymentForm = (props: ShopSettingProps) => {
  const { shopId } = props;

  const [acceptedPayment, setAcceptedPayment] = useState<ShopAcceptedPayment>();

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
      await saveShopAcceptedPayment(shopId, value);
      setAcceptedPayment(undefined);
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
                  disabled={settingState.isLoading}
                  checked={setting?.cashOnDelivery ?? false}
                  onChange={handleSettingChange}
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
                }}
              >
                <PlusCircleIcon width={20} strokeWidth={2} />
              </div>
            </Tooltip>
          </div>
          <div className="row row-cols-1 row-cols-md-2 rol-cols-lg-3 g-3">
            {acceptedPaymentsState.data?.map((p, i) => {
              return (
                <div key={i} className="col">
                  <div className="card bg-light border-0 position-relative">
                    <div className="card-body">
                      <h6>{p.accountType}</h6>
                      <div className="text-muted">{p.accountNumber}</div>
                    </div>

                    <div className="position-absolute hstack gap-2 top-0 end-0 m-2h">
                      <button
                        className="btn btn-sm btn-outline-anchor"
                        onClick={() => {
                          setAcceptedPayment(p);
                        }}
                      >
                        <PencilSquareIcon width={18} />
                      </button>
                      <button className="btn btn-sm btn-danger">
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

      <Modal id="editAcceptedPaymentModal" show={!!acceptedPayment}>
        {(isShown) =>
          isShown ? (
            <AcceptedPaymentEdit
              value={acceptedPayment}
              submit={async (value) => {
                await saveAcceptedPayment(value);
              }}
              handleClose={() => {
                setAcceptedPayment(undefined);
              }}
            />
          ) : (
            <></>
          )
        }
      </Modal>
    </div>
  );
};

function ShopSetting(props: ShopSettingProps) {
  return (
    <div className="row g-3">
      <div className="col-12">
        <ShopGeneralForm />
      </div>
      <div className="col-12">
        <ShopContactForm />
      </div>
      <div className="col-12">
        <ShopPaymentForm {...props} />
      </div>
    </div>
  );
}

export default ShopSetting;
