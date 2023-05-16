import makeApiRequest from "../common/makeApiRequest";
import {
  Order,
  OrderCreateForm,
  OrderStatus,
  PageData
} from "../common/models";
import { buildQueryParams, validateResponse } from "../common/utils";

const basePath = "orders";

export interface OrderQuery {
  date?: string;
  status?: OrderStatus;
  code?: string;
  page?: number;
}

export async function createOrder(value: OrderCreateForm) {
  const url = basePath;

  const form = new FormData();
  value.shopId && form.append("shopId", value.shopId.toString());
  value.note && form.append("note", value.note);
  value.paymentMethod && form.append("paymentMethod", value.paymentMethod);

  if (value.delivery) {
    value.delivery.name && form.append("delivery.name", value.delivery.name);
    value.delivery.phone && form.append("delivery.phone", value.delivery.phone);
    value.delivery.city && form.append("delivery.city", value.delivery.city);
    value.delivery.address &&
      form.append("delivery.address", value.delivery.address);
  }

  if (value.payment) {
    value.payment.accountType &&
      form.append("payment.accountType", value.payment.accountType);
    value.payment.file && form.append("payment.file", value.payment.file);
  }

  value.cartItems?.forEach((item, i) => {
    item.id && form.append(`cartItems[${i}]`, item.id.toString());
  });

  const resp = await makeApiRequest(
    url,
    {
      method: "POST",
      body: form
    },
    true
  );

  await validateResponse(resp);

  return resp.text() as Promise<string>;
}

export async function getOrderByCode(orderCode: string) {
  const url = `${basePath}/${orderCode}`;

  const resp = await makeApiRequest(url, {}, true);

  await validateResponse(resp);

  return resp
    .json()
    .then((json) => json as Order)
    .catch((e) => null);
}

export async function cancelOrder(orderId: number) {
  const url = `${basePath}/${orderId}/cancel`;

  const resp = await makeApiRequest(
    url,
    {
      method: "PUT"
    },
    true
  );

  await validateResponse(resp);
}

export async function confirmOrder(orderId: number) {
  const url = `${basePath}/${orderId}/confirm`;

  const resp = await makeApiRequest(
    url,
    {
      method: "PUT"
    },
    true
  );

  await validateResponse(resp);
}

export async function completeOrder(orderId: number) {
  const url = `${basePath}/${orderId}/complete`;

  const resp = await makeApiRequest(
    url,
    {
      method: "PUT"
    },
    true
  );

  await validateResponse(resp);
}

export async function uploadPayslip(orderId: number, file: File) {
  const url = `${basePath}/${orderId}/upload-receipt`;

  const form = new FormData();
  form.append("file", file);

  const resp = await makeApiRequest(
    url,
    {
      method: "PUT",
      body: form
    },
    true
  );

  await validateResponse(resp);
}

export async function getMyOrders(query: OrderQuery) {
  const params = buildQueryParams({
    ...query,
    "time-zone": Intl.DateTimeFormat().resolvedOptions().timeZone
  });

  const url = `profile/orders${params}`;

  const resp = await makeApiRequest(url, {}, true);

  await validateResponse(resp);

  return resp.json() as Promise<PageData<Order>>;
}

export async function getShopOrders(shopId: number, query: OrderQuery) {
  const params = buildQueryParams({
    ...query,
    "shop-id": shopId,
    "time-zone": Intl.DateTimeFormat().resolvedOptions().timeZone
  });

  const url = `${basePath}${params}`;

  const resp = await makeApiRequest(url, {}, true);

  await validateResponse(resp);

  return resp.json() as Promise<PageData<Order>>;
}
