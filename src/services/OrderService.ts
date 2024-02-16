import makeApiRequest from "@/common/makeApiRequest";
import { Order, OrderCreateForm, OrderStatus, PageData } from "@/common/models";
import { buildQueryParams, validateResponse } from "@/common/utils";

export interface OrderQuery {
  date?: string;
  status?: OrderStatus;
  code?: string;
  page?: number;
}

export async function createOrder(value: OrderCreateForm) {
  const url = "/orders";

  const form = new FormData();
  value.shopId && form.append("shopId", value.shopId.toString());
  value.note && form.append("note", value.note);
  value.paymentMethod && form.append("paymentMethod", value.paymentMethod);

  if (value.delivery) {
    value.delivery.name && form.append("delivery.name", value.delivery.name);
    value.delivery.phone && form.append("delivery.phone", value.delivery.phone);
    value.delivery.address &&
      form.append("delivery.address", value.delivery.address);
  }

  if (value.payment) {
    value.payment.accountType &&
      form.append("payment.accountType", value.payment.accountType);
    value.payment.file && form.append("payment.file", value.payment.file);
  }

  value.cartItems?.forEach((item, i) => {
    item.product && form.append(`cartItems[${i}].productId`, item.product.id.toString());
    item.variant?.id && form.append(`cartItems[${i}].variantId`, item.variant.id.toString());
    item.quantity && form.append(`cartItems[${i}].quantity`, item.quantity.toString());
  });

  const resp = await makeApiRequest({
    url,
    options: {
      method: "POST",
      body: form
    },
    authenticated: true
  });

  await validateResponse(resp);

  return resp.text() as Promise<string>;
}

export async function getOrderById(shopId: number, orderId: number) {
  const url = `/vendor/shops/${shopId}/orders/${orderId}`;

  const resp = await makeApiRequest({ url, authenticated: true });

  await validateResponse(resp, true);

  return resp
    .json()
    .then((json) => json as Order)
    .catch((e) => null);
}

export async function getOrderByCode(orderCode: string) {
  const url = `/orders/${orderCode}`;

  const resp = await makeApiRequest({ url, authenticated: true });

  await validateResponse(resp, true);

  return resp
    .json()
    .then((json) => json as Order)
    .catch((e) => null);
}

export async function cancelOrderByBuyer(orderId: number) {
  const url = `/orders/${orderId}/cancel`;

  const resp = await makeApiRequest({
    url,
    options: {
      method: "PUT"
    },
    authenticated: true
  });

  await validateResponse(resp);
}

export async function cancelOrderBySeller(shopId: number, orderId: number) {
  const url = `/vendor/shops/${shopId}/orders/${orderId}/cancel`;

  const resp = await makeApiRequest({
    url,
    options: {
      method: "PUT"
    },
    authenticated: true
  });

  await validateResponse(resp);
}

export async function cancelOrderItem(
  shopId: number,
  orderId: number,
  itemId: number
) {
  const url = `/vendor/shops/${shopId}/orders/${orderId}/items/${itemId}/cancel`;

  const resp = await makeApiRequest({
    url,
    options: {
      method: "PUT"
    },
    authenticated: true
  });

  await validateResponse(resp);
}

export async function confirmOrder(shopId: number, orderId: number) {
  const url = `/vendor/shops/${shopId}/orders/${orderId}/confirm`;

  const resp = await makeApiRequest({
    url,
    options: {
      method: "PUT"
    },
    authenticated: true
  });

  await validateResponse(resp);
}

export async function completeOrder(shopId: number, orderId: number) {
  const url = `/vendor/shops/${shopId}/orders/${orderId}/complete`;

  const resp = await makeApiRequest(
    {
      url,
      options: {
        method: "PUT"
      },
      authenticated: true
    }
  );

  await validateResponse(resp);
}

export async function uploadPayslip(orderId: number, file: File) {
  const url = `/orders/${orderId}/upload-receipt`;

  const form = new FormData();
  form.append("file", file);

  const resp = await makeApiRequest(
    {
      url,
    options: {
      method: "PUT",
      body: form
    },
    authenticated: true
    }
  );

  await validateResponse(resp);
}

export async function getMyOrders(query: OrderQuery) {
  const params = buildQueryParams({
    ...query,
    "time-zone": Intl.DateTimeFormat().resolvedOptions().timeZone
  });

  const url = `/profile/orders${params}`;

  const resp = await makeApiRequest({url, authenticated: true});

  await validateResponse(resp);

  return resp.json() as Promise<PageData<Order>>;
}

export async function getShopOrders(shopId: number, query: OrderQuery) {
  const params = buildQueryParams({
    ...query,
    "time-zone": Intl.DateTimeFormat().resolvedOptions().timeZone
  });

  const url = `/vendor/shops/${shopId}/orders${params}`;

  const resp = await makeApiRequest({url, authenticated: true});

  await validateResponse(resp);

  return resp.json() as Promise<PageData<Order>>;
}
