"use client";
import { ProgressContext } from "@/common/contexts";
import { useCities, useShop } from "@/common/hooks";
import {
  City,
  Shop,
  ShopAcceptedPayment,
  ShopContact,
  ShopSetting,
  ShopUpdate
} from "@/common/models";
import {
  parseErrorResponse,
  setEmptyOrNumber,
  setEmptyOrString,
  setStringToSlug
} from "@/common/utils";
import Alert from "@/components/Alert";
import ConfirmModal from "@/components/ConfirmModal";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";
import ProgressButton from "@/components/ProgressButton";
import Tooltip from "@/components/Tooltip";
import { AutocompleteSelect, Input, TagInput } from "@/components/forms";
import { RichTextEditorInputProps } from "@/components/forms/RichTextEditor";
import { AcceptedPaymentEdit } from "@/components/shop";
import {
  deleteShopAcceptedPayment,
  getShopAcceptedPayments,
  saveShopAcceptedPayment
} from "@/services/AcceptedPaymentService";
import {
  getShopSetting,
  updateShop,
  updateShopContact,
  updateShopSetting
} from "@/services/ShopService";
import {
  RiAddCircleLine,
  RiDeleteBinLine,
  RiPencilFill
} from "@remixicon/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useSWR, { useSWRConfig } from "swr";

const DynamicEditor = dynamic<RichTextEditorInputProps>(
  () => import("@/components/forms").then((f) => f.RichTextEditor),
  {
    ssr: false
  }
);

const ShopGeneralForm = ({ shop }: { shop: Shop }) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const {
    control,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue
  } = useForm<ShopUpdate>({
    values: {
      shopId: shop?.id,
      name: shop?.name,
      slug: shop?.slug,
      about: shop?.about,
      headline: shop?.headline
    }
  });

  const executeSave = async (values: ShopUpdate) => {
    try {
      await updateShop(values);
      mutate<Shop>(`/vendor/shops/${values.shopId}`).then((s) => {
        setValue("slug", s?.slug);
      });
      toast.success("Update success");
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
            <Controller
              control={control}
              name="slug"
              rules={{
                validate: (v) => {
                  if (!setStringToSlug(v)) {
                    return "Please enter valid slug";
                  }
                  return true;
                }
              }}
              render={({ field, fieldState: { error } }) => {
                return (
                  <>
                    <Input
                      label="Slug *"
                      value={field.value ?? ""}
                      onChange={(evt) => {
                        setValue("slug", setStringToSlug(evt.target.value), {
                          shouldValidate: true
                        });
                      }}
                      error={error?.message}
                    />
                    {/* {!error?.message && (
                      <small className="text-muted">{`${
                        window.location.origin
                      }/shops/${field.value ?? ""}`}</small>
                    )} */}
                  </>
                );
              }}
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

const ShopContactForm = ({ shop }: { shop: Shop }) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const citiesState = useCities();

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
      longitude: shop?.contact?.longitude,
      city: shop.city
    }
  });

  const executeSave = async (values: ShopContact) => {
    try {
      if (!values.phones || values.phones.length === 0) {
        throw "At least one phone number required";
      }
      await updateShopContact(values);
      mutate<Shop>(`/vendor/shops/${values.shopId}`);
      toast.success("Update success");
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
              rules={{
                validate: (phones) => {
                  if (!phones || phones.length === 0) {
                    return "At least one phone number required";
                  }

                  return true;
                }
              }}
              render={({ field }) => {
                return (
                  <TagInput
                    data={field.value ?? []}
                    placeholder="Add phone"
                    onTagsChange={(tags) => {
                      setValue("phones", tags, { shouldValidate: true });
                    }}
                    error={errors.phones?.message}
                  />
                );
              }}
            />
            {!errors.phones?.message && (
              <small className="text-muted">
                Click enter to add multiple values
              </small>
            )}
          </div>

          <div className="col-12">
            <label className="form-label">City</label>
            <div className="flex-grow-1">
              <Controller
                control={control}
                name="city"
                rules={{
                  validate: (v) => !!v || "Please select city"
                }}
                render={({ field }) => {
                  return (
                    <AutocompleteSelect<City, number>
                      options={citiesState.cities?.sort((f, s) =>
                        f.name.localeCompare(s.name)
                      )}
                      defaultValue={field.value}
                      placeholder="Select city"
                      getOptionKey={(c) => c.id}
                      getOptionLabel={(c) => c.name}
                      onChange={(c) => {
                        setValue("city", c, {
                          shouldValidate: true
                        });
                      }}
                      error={errors.city?.message}
                    />
                  );
                }}
              />
            </div>
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

const ShopPaymentForm = ({ shopId }: { shopId: number }) => {
  const [acceptedPayment, setAcceptedPayment] = useState<ShopAcceptedPayment>();

  const [showEdit, setShowEdit] = useState(false);

  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const progressContext = useContext(ProgressContext);

  const settingState = useSWR(
    `/vendor/shops/${shopId}/setting`,
    () => getShopSetting(shopId),
    { revalidateOnFocus: false }
  );

  const acceptedPaymentsState = useSWR(
    `/vendor/shops/${shopId}/accepted-payments`,
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
    settingState.data && setSetting({ ...settingState.data, shopId: shopId });
  }, [shopId, settingState.data, setSetting]);

  useEffect(() => {
    if (settingState.error) {
      const msg = parseErrorResponse(settingState.error);
      toast.error(msg);
    }
  }, [settingState.error]);

  const handleSettingChange = async (evt: ChangeEvent<HTMLInputElement>) => {
    try {
      if (
        evt.target.name === "bankTransfer" &&
        evt.target.checked &&
        !acceptedPaymentsState.data?.length
      ) {
        throw "Required at least one accepted payment";
      }
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
                  disabled={settingState.isLoading}
                  checked={setting?.cashOnDelivery ?? false}
                  onChange={(evt) => {
                    handleSettingChange(evt);
                  }}
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
                  onChange={(evt) => {
                    // if (
                    //   evt.target.checked &&
                    //   (acceptedPaymentsState.data?.length ?? 0) === 0
                    // ) {
                    //   toast.error(
                    //     "At least one accepted payment require to enable bank transfer payment"
                    //   );

                    //   return;
                    // }

                    handleSettingChange(evt);
                  }}
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

          <div className="hstack border-bottom pb-2 gap-1 mb-3">
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
                <RiAddCircleLine size={20} />
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
                        <RiPencilFill size={18} />
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => {
                          setAcceptedPayment(p);
                          setDeleteConfirm(true);
                        }}
                      >
                        <RiDeleteBinLine size={18} />
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
        onConfirm={async (result) => {
          if (!result) {
            return;
          }
          try {
            progressContext.update(true);
            acceptedPayment?.id &&
              (await deleteShopAcceptedPayment(shopId, acceptedPayment.id));
            acceptedPaymentsState.mutate();
            setAcceptedPayment(undefined);
            setDeleteConfirm(false);
          } catch (error) {
            const msg = parseErrorResponse(error);
            toast.error(msg);
          } finally {
            progressContext.update(false);
          }
        }}
      />
    </div>
  );
};

function SettingPage({ shopId }: { shopId: number }) {
  const { shop, error, isLoading } = useShop(shopId);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Alert message={parseErrorResponse(error)} variant="danger" />;
  }

  if (!shop) {
    return null;
  }

  return (
    <div className="row g-3">
      <div className="col-12">
        <ShopGeneralForm shop={shop} />
      </div>
      <div className="col-12">
        <ShopContactForm shop={shop} />
      </div>
      <div className="col-12">
        <ShopPaymentForm shopId={shopId} />
      </div>
    </div>
  );
}

export default SettingPage;
