import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useSWR, { useSWRConfig } from "swr";
import { AuthenticationContext } from "../../common/contexts";
import {
  CartItem,
  City,
  OrderCreateForm,
  ShopAcceptedPayment
} from "../../common/models";
import {
  formatNumber,
  parseErrorResponse,
  setEmptyOrString,
  transformDiscount
} from "../../common/utils";
import { withAuthentication } from "../../common/WithAuthentication";
import ConfirmModal from "../../components/ConfirmModal";
import Dropdown from "../../components/Dropdown";
import { AutocompleteSelect, Input, Textarea } from "../../components/forms";
import { getShopDeliveryCities } from "../../services/CityService";
import { createOrder } from "../../services/OrderService";
import {
  getShopAcceptedPayments,
  getShopSetting
} from "../../services/ShopService";

function Checkout() {
  const router = useRouter();

  const authContext = useContext(AuthenticationContext);

  const { mutate } = useSWRConfig();

  const [shopId, setShopId] = useState<number>(0);

  const [cartItems, setCartItems] = useState<CartItem[]>();

  const [payment, setPayment] = useState<ShopAcceptedPayment>();

  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

  const [orderCode, setOrderCode] = useState<string>();

  const receiptFileRef = useRef<HTMLInputElement | null>(null);

  const deliveryCitiesState = useSWR(
    `/shops/${shopId}/delivery-cities`,
    () => (shopId > 0 ? getShopDeliveryCities(shopId) : []),
    {
      revalidateOnFocus: false
    }
  );

  const acceptedPaymentsState = useSWR(
    `/shops/${shopId}/accepted-payments`,
    () => (shopId > 0 ? getShopAcceptedPayments(shopId) : []),
    {
      revalidateOnFocus: false
    }
  );

  const shopSettingState = useSWR(
    `/shops/${shopId}/setting`,
    () => (shopId > 0 ? getShopSetting(shopId) : undefined),
    { revalidateOnFocus: false }
  );

  const {
    control,
    register,
    formState: { errors, isSubmitting },
    setValue,
    handleSubmit,
    getValues
  } = useForm<OrderCreateForm>({
    defaultValues: {
      paymentMethod: "COD",
      cartItems: cartItems
    }
  });

  const summary = useMemo(() => {
    let quantity = 0;
    let subTotalPrice = 0;
    let totalPrice = 0;
    let discount = 0;

    const list = cartItems ?? [];

    for (const item of list) {
      quantity += item.quantity;

      const price = item.variant?.price ?? item.product.price ?? 0;
      subTotalPrice += price * item.quantity;

      if (item.product.discount) {
        totalPrice += transformDiscount(
          item.product.discount,
          price,
          item.quantity
        );
      } else {
        totalPrice += price * item.quantity;
      }
    }

    discount = subTotalPrice - totalPrice;

    return { quantity, subTotalPrice, totalPrice, discount };
  }, [cartItems]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    try {
      const rawItems = sessionStorage.getItem("cartItems");
      const rawShopId = sessionStorage.getItem("shopId");
      if (!rawItems || !rawShopId) {
        throw "failed to parse";
      }
      const shopId = parseInt(rawShopId);
      if (shopId <= 0) {
        throw "failed to parse";
      }
      const cartItems = JSON.parse(rawItems) as CartItem[];

      setCartItems(cartItems);
      setShopId(shopId);
      setValue("shopId", shopId);
      setValue("cartItems", cartItems);
    } catch (error) {
      router.replace("/shopping-cart");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const executeSubmitOrder = (data: OrderCreateForm) => {
    try {
      if (
        data.paymentMethod === "BANK_TRANSFER" &&
        !data.payment?.accountType
      ) {
        throw "Please select transfer account";
      }
      setShowConfirmSubmit(true);
    } catch (error) {
      const msg = parseErrorResponse(error);
      toast.error(msg);
    }
  };

  if (orderCode) {
    return (
      <div className="container py-3 mb-5">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body px-4 py-5">
                <div className="vstack align-items-center">
                  <CheckCircleIcon width="8rem" className="text-success mb-4" />
                  <h3>Order submit success</h3>
                  <div>
                    You can track order status in your
                    <Link href={"/account/orders"} className="link-anchor ms-1">
                      order listing
                    </Link>
                    .
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return <></>;
  }

  return (
    <>
      <div className="header-bar">
        <div className="container">
          <div className="row py-4 px-2">
            <nav aria-label="breadcrumb col-12">
              <ol className="breadcrumb mb-1">
                <li className="breadcrumb-item">
                  <Link href={`/`} className="">
                    Home
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link href={`/shopping-cart`} className="">
                    Shopping cart
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Checkout
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="container py-3 mb-5">
        <div className="row">
          <div className="col-lg-8 mb-3">
            <h4 className="fw-semibold border-bottom pb-3 mb-3">
              Delivery info
            </h4>
            <div className="row g-3 mb-4">
              <div className="col-lg-6">
                <Input
                  label="Name *"
                  id="nameInput"
                  type="text"
                  placeholder="Enter full name"
                  {...register("delivery.name", {
                    setValueAs: setEmptyOrString,
                    required: "Please enter full name"
                  })}
                  error={errors.delivery?.name?.message}
                />
              </div>
              <div className="col-lg-6">
                <Input
                  label="Phone *"
                  id="phoneInput"
                  type="text"
                  placeholder="Enter phone number"
                  {...register("delivery.phone", {
                    setValueAs: setEmptyOrString,
                    required: true,
                    pattern: /^(09)\d{7,12}$/
                  })}
                  error={
                    errors.delivery?.phone && "Please enter valid phone number"
                  }
                />
              </div>
              <div className="col-12">
                <label className="form-label">City *</label>
                <div className="flex-grow-1">
                  <Controller
                    control={control}
                    name="delivery.city"
                    rules={{
                      validate: (v) =>
                        (v?.length ?? 0) > 0 || "Please select city"
                    }}
                    render={({ field }) => {
                      return (
                        <AutocompleteSelect<City, number>
                          options={deliveryCitiesState.data?.sort((f, s) =>
                            f.name.localeCompare(s.name)
                          )}
                          placeholder="Select city"
                          getOptionKey={(c) => c.id}
                          getOptionLabel={(c) => c.name}
                          onChange={(c) => {
                            setValue("delivery.city", c.name, {
                              shouldValidate: true
                            });
                          }}
                          error={errors.delivery?.city?.message}
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <div className="col-12">
                <Input
                  label="Address *"
                  id="addressInput"
                  type="text"
                  placeholder="Enter delivery address"
                  {...register("delivery.address", {
                    setValueAs: setEmptyOrString,
                    required: "Please enter delivery address"
                  })}
                  error={errors.delivery?.address?.message}
                />
              </div>

              <div className="col-12">
                <Textarea
                  label="Note"
                  id="noteInput"
                  type="text"
                  placeholder="Your order note..."
                  {...register("note", {
                    setValueAs: setEmptyOrString
                  })}
                />
              </div>
            </div>
            <h4 className="fw-semibold border-bottom pb-3 mb-3">
              Payment option
            </h4>
            <div className="row g-3">
              <div className="col-12">
                <div className="d-flex flex-wrap gap-3">
                  <Controller
                    control={control}
                    name="paymentMethod"
                    render={({ field }) => {
                      return (
                        <>
                          <div className="form-check">
                            <input
                              id={`codCheck`}
                              className="form-check-input"
                              type="radio"
                              disabled={
                                shopSettingState.data?.cashOnDelivery !== true
                              }
                              checked={field.value === "COD"}
                              onChange={(evt) => {
                                evt.target.checked &&
                                  setValue("paymentMethod", "COD");

                                if (evt.target.checked) {
                                  setValue("payment", undefined);
                                  setPayment(undefined);
                                }
                              }}
                            ></input>
                            <label
                              htmlFor="codCheck"
                              className="form-check-label fw-medium"
                            >
                              Cash on delivery
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              id={`bankTransferCheck`}
                              className="form-check-input"
                              type="radio"
                              disabled={
                                shopSettingState.data?.bankTransfer !== true
                              }
                              checked={field.value === "BANK_TRANSFER"}
                              onChange={(evt) => {
                                evt.target.checked &&
                                  setValue("paymentMethod", "BANK_TRANSFER");
                                acceptedPaymentsState.mutate();
                              }}
                            ></input>
                            <label
                              htmlFor="bankTransferCheck"
                              className="form-check-label fw-medium"
                            >
                              Bank transfer
                            </label>
                          </div>
                        </>
                      );
                    }}
                  />
                </div>
              </div>
              <Controller
                control={control}
                name="paymentMethod"
                render={({ field }) => {
                  if (field.value !== "BANK_TRANSFER") {
                    return <></>;
                  }
                  return (
                    <div className="col-12">
                      <label className="form-label">Transfer to *</label>
                      <Dropdown
                        toggle={
                          !payment ? (
                            <span className="flex-grow-1 text-muted text-start">
                              Select account type
                            </span>
                          ) : (
                            <div className="flex-grow-1 fw-medium text-dark text-start">
                              {payment.accountType}
                            </div>
                          )
                        }
                        toggleClassName="btn btn-outline-light rounded text-muted py-2h px-3 border dropdown-toggle hstack"
                        menuClassName="w-100 shadow"
                      >
                        {acceptedPaymentsState.data?.map((ap, i) => {
                          return (
                            <li
                              key={i}
                              className="vstack dropdown-item"
                              role={"button"}
                              onClick={(evt) => {
                                setValue("payment.accountType", ap.accountType);
                                setPayment(ap);
                              }}
                            >
                              <h6 className="mb-0">{ap.accountType}</h6>
                            </li>
                          );
                        })}
                      </Dropdown>

                      {payment && (
                        <div className="mt-3 card">
                          <div className="card-body">
                            <h6 className="fw-bold">{payment.accountType}</h6>
                            <div>{payment.accountName}</div>
                            <div className="text-muted">
                              {payment.accountNumber}
                            </div>
                          </div>
                        </div>
                      )}

                      <label htmlFor="receiptFile" className="form-label mt-3">
                        Receipt image
                        <span className="text-muted ms-1">(optional)</span>
                      </label>
                      <input
                        ref={receiptFileRef}
                        className="form-control"
                        type="file"
                        id="receiptFile"
                        accept="image/x-png,image/jpeg"
                        onChange={(evt) => {
                          const files = evt.target.files;
                          if (files && files.length > 0) {
                            setValue("payment.file", files[0]);
                          }
                        }}
                      ></input>
                    </div>
                  );
                }}
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card mb-3">
              <div className="card-body px-0">
                <div className="mb-4 px-3 hstack">
                  <h4 className="mb-0 fw-semibold">Order summary</h4>
                  <div className="flex-grow-1"></div>
                  <Link
                    href={"/shopping-cart"}
                    className="link-anchor text-decoration-none ms-2"
                  >
                    Edit cart
                  </Link>
                </div>

                <div className="vstack">
                  {cartItems?.map((f, i) => {
                    const last = i === cartItems.length - 1;
                    const price = f.variant?.price ?? f.product.price ?? 0;
                    return (
                      <React.Fragment key={i}>
                        <div className="hstack gap-3 px-3">
                          <div
                            className="position-relative bg-light rounded"
                            onContextMenu={(e) => e.preventDefault()}
                            style={{
                              minWidth: 100,
                              height: 100
                            }}
                          >
                            <Image
                              className="rounded border"
                              src={
                                f.product.thumbnail ??
                                "/images/placeholder.jpeg"
                              }
                              alt="Product image."
                              fill
                              sizes="33vw"
                              style={{
                                objectFit: "contain"
                              }}
                            />
                          </div>
                          <div className="vstack">
                            <h6 className="mb-0 fw-semibold">
                              {f.product.name}
                            </h6>
                            {f.variant && (
                              <small className="text-muted">
                                {f.variant.attributes
                                  .sort((f, s) => f.sort - s.sort)
                                  .map((va) => `${va.attribute}: ${va.value}`)
                                  .join(", ")}
                              </small>
                            )}
                            <div className="flex-grow-1"></div>
                            <div className="mt-2">
                              <span>{formatNumber(price)}</span>
                              <span className="text-muted ms-1">
                                &times; {f.quantity}
                              </span>
                            </div>
                          </div>
                        </div>
                        {!last && <hr className="text-muted" />}
                      </React.Fragment>
                    );
                  })}
                </div>
                <hr className="text-muted" />

                {cartItems.length > 0 && (
                  <div className="d-flex justify-content-between px-3">
                    <div className="text-muted">Seller</div>
                    <Link
                      href={`/shops/${cartItems[0].product.shop?.slug}`}
                      className="link-anchor"
                    >
                      {cartItems[0].product.shop?.name}
                    </Link>
                  </div>
                )}
                <hr className="text-muted" />

                <div className="vstack px-3">
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Quantity</span>
                    <span>{summary.quantity}</span>
                  </div>
                  <hr className="text-muted" />
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Subtotal</span>
                    <span>{formatNumber(summary.subTotalPrice)} Ks</span>
                  </div>
                  <hr className="text-muted" />
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Discount</span>
                    <span className="text-danger">
                      -{formatNumber(summary.discount)} Ks
                    </span>
                  </div>
                  <hr className="text-muted" />
                  <div className="d-flex justify-content-between">
                    <h5 className="fw-semibold mb-0">Total Price</h5>
                    <h5 className="fw-semibold mb-0">
                      {formatNumber(summary.totalPrice)} Ks
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="btn btn-danger py-2h w-100"
              onClick={() => {
                handleSubmit(executeSubmitOrder)();
              }}
            >
              Place order
            </button>
          </div>
        </div>
      </div>
      <ConfirmModal
        show={showConfirmSubmit}
        message="Are you sure to submit order"
        close={() => setShowConfirmSubmit(false)}
        onConfirm={async () => {
          try {
            const values = getValues();
            console.log(values);
            const result = await createOrder(values);
            console.log(result);
            setOrderCode(result);
            mutate(["/profile/cart-count", authContext.payload?.id]);
            sessionStorage.removeItem("shopId");
            sessionStorage.removeItem("cartItems");
          } catch (error) {
            const msg = parseErrorResponse(error);
            toast.error(msg);
          }
        }}
      />
    </>
  );
}

export default withAuthentication(Checkout);
