import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { CartItem, City, OrderCreateForm } from "../../common/models";
import { formatNumber, transformDiscount } from "../../common/utils";
import { withAuthentication } from "../../common/WithAuthentication";
import { AutocompleteSelect, Input, Select } from "../../components/forms";
import useSWR from "swr";
import { getShopAcceptedPayments } from "../../services/ShopService";

function Checkout() {
  const router = useRouter();

  const [shopId, setShopId] = useState<number>(0);

  const [cartItems, setCartItems] = useState<CartItem[]>();

  const acceptedPaymentsState = useSWR(
    [`/shops/${shopId}/accepted-payments`, shopId],
    ([url, id]) => (id > 0 ? getShopAcceptedPayments(id) : []),
    {
      revalidateOnFocus: false
    }
  );

  const {
    control,
    register,
    formState: { errors, isSubmitting },
    setValue,
    handleSubmit
  } = useForm<OrderCreateForm>({
    values: {
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
        discount += transformDiscount(
          item.product.discount,
          price,
          item.quantity
        );
      }
    }

    totalPrice = subTotalPrice - discount;

    return { quantity, subTotalPrice, totalPrice, discount };
  }, [cartItems]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const rawItems = sessionStorage.getItem("cartItems");
    const rawShopId = sessionStorage.getItem("shopId");
    if (!rawItems || !rawShopId) {
      router.replace("/shopping-cart");
      return;
    }

    try {
      const shopId = parseInt(rawShopId);
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

  if (!cartItems || cartItems.length === 0) {
    return <></>;
  }

  return (
    <div className="container py-3 mb-5">
      <div className="row">
        <div className="col-lg-8 mb-3">
          <h4 className="fw-semibold border-bottom pb-3 mb-3">Delivery info</h4>
          <div className="row g-3 mb-4">
            <div className="col-lg-6">
              <Input
                label="Name *"
                id="nameInput"
                type="text"
                placeholder="Enter full name"
              />
            </div>
            <div className="col-lg-6">
              <Input
                label="Phone *"
                id="phoneInput"
                type="text"
                placeholder="Enter phone number"
              />
            </div>
            <div className="col-12">
              <label className="form-label">City *</label>
              <div className="flex-grow-1">
                <Controller
                  control={control}
                  name="delivery.city"
                  render={({ field }) => {
                    return (
                      <AutocompleteSelect<City, number>
                        options={[]}
                        placeholder="Select city"
                        getOptionKey={(c) => c.id}
                        getOptionLabel={(c) => c.name}
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
                {...register("delivery.address")}
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
                            checked={field.value === "COD"}
                            onChange={(evt) => {
                              evt.target.checked &&
                                setValue("paymentMethod", "COD");
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
                            checked={field.value === "BANK_TRANSFER"}
                            onChange={(evt) => {
                              evt.target.checked &&
                                setValue("paymentMethod", "BANK_TRANSFER");
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
                return <div className="col-12"></div>;
              }}
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card mb-3">
            <div className="card-body px-0">
              <h4 className="mb-4 px-3 fw-semibold">Order summary</h4>

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
                              f.product.thumbnail ?? "/images/placeholder.jpeg"
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
                          <h6 className="mb-1 fw-semibold">{f.product.name}</h6>
                          <div className="mb-2">{formatNumber(price)} Ks</div>
                          <div className="text-muted">Qty: {f.quantity}</div>
                        </div>
                      </div>
                      {!last && <hr className="text-muted" />}
                    </React.Fragment>
                  );
                })}
              </div>
              <hr className="text-muted" />

              <div className="vstack px-3">
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Total Products</span>
                  <span>{summary.quantity}</span>
                </div>
                <hr className="text-muted" />
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Subtotal</span>
                  <span>{formatNumber(summary.subTotalPrice)}</span>
                </div>
                <hr className="text-muted" />
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Discount</span>
                  <span className="text-danger">
                    -{formatNumber(summary.discount)}
                  </span>
                </div>
                <hr className="text-muted" />
                <div className="d-flex justify-content-between">
                  <span className="fw-semibold">Total Price</span>
                  <span className="fw-semibold">
                    {formatNumber(summary.totalPrice)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <button className="btn btn-danger py-2h w-100">Place order</button>
        </div>
      </div>
    </div>
  );
}

export default withAuthentication(Checkout);
