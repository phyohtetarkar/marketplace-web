import makeApiRequest from "@/common/makeApiRequest";
import {
  PageData,
  Product,
  ProductCreate,
  ProductFilter,
  ProductImage,
  ProductStatus,
  ProductUpdate,
  ProductVariant
} from "@/common/models";
import { buildQueryParams, validateResponse } from "@/common/utils";

export interface ProductQuery {
  q?: string;
  "category-id"?: number;
  "shop-id"?: number;
  "max-price"?: number;
  "discount-id"?: number;
  discount?: boolean;
  brand?: string | string[];
  status?: ProductStatus;
  page?: number;
}

export async function createProduct(values: ProductCreate) {
  const form = new FormData();
  values.id && form.append("id", values.id.toPrecision());
  values.name && form.append("name", values.name);
  values.slug && form.append("slug", values.slug);
  values.sku && form.append("sku", values.sku);
  values.price && form.append("price", values.price.toPrecision());
  form.append("available", values.available ? "true" : "false");
  form.append("newArrival", values.newArrival ? "true" : "false");
  form.append("withVariant", values.withVariant ? "true" : "false");
  form.append("draft", values.draft ? "true" : "false");
  values.description && form.append("description", values.description);
  values.categoryId &&
    form.append("categoryId", values.categoryId.toPrecision());
  values.discount?.id &&
    form.append("discountId", values.discount.id.toString());
  values.brand && form.append("brand", values.brand);

  values.images?.forEach((v, i) => {
    v.id && form.append(`images[${i}].id`, v.id.toPrecision());
    v.name && form.append(`images[${i}].name`, v.name);
    form.append(`images[${i}].thumbnail`, v.thumbnail ? "true" : "false");
    form.append(`images[${i}].deleted`, v.deleted ? "true" : "false");
    v.file && form.append(`images[${i}].file`, v.file);
  });

  values.attributes?.forEach((a, i) => {
    a.name && form.append(`attributes[${i}].name`, a.name);
    form.append(`attributes[${i}].sort`, a.sort.toString());
  });

  values.variants?.forEach((v, i) => {
    v.id && form.append(`variants[${i}].id`, v.id.toPrecision());
    v.price && form.append(`variants[${i}].price`, v.price.toPrecision());
    v.sku && form.append(`variants[${i}].sku`, v.sku);
    form.append(`variants[${i}].available`, v.available ? "true" : "false");
    form.append(`variants[${i}].deleted`, v.deleted ? "true" : "false");
    v.attributes?.forEach((a, j) => {
      a.attribute &&
        form.append(`variants[${i}].attributes[${j}].attribute`, a.attribute);
      a.value && form.append(`variants[${i}].attributes[${j}].value`, a.value);
      form.append(`variants[${i}].attributes[${j}].sort`, a.sort.toString());
      form.append(`variants[${i}].attributes[${j}].vSort`, a.vSort.toString());
    });
  });

  const url = `/vendor/shops/${values.shopId}/products`;

  const resp = await makeApiRequest({
    url,
    options: {
      method: "POST",
      body: form
    },
    authenticated: true
  });

  await validateResponse(resp);
}

export async function updateProduct(values: ProductUpdate) {
  const url = `/vendor/shops/${values.shopId}/products`;

  const resp = await makeApiRequest({
    url,
    options: {
      method: "PUT",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json"
      }
    },
    authenticated: true
  });

  await validateResponse(resp);
}

export async function updateProductDescription(
  shopId: number,
  productId: number,
  value: string
) {
  const url = `/vendor/shops/${shopId}/products/${productId}/description`;

  var form = new FormData();
  form.append("value", value);

  const resp = await makeApiRequest({
    url,
    options: {
      method: "PUT",
      body: form
    },
    authenticated: true
  });

  await validateResponse(resp);
}

export async function updateProductVariants(
  shopId: number,
  productId: number,
  values: ProductVariant[]
) {
  const url = `/vendor/shops/${shopId}/products/${productId}/variants`;

  // var form = new FormData();
  // values.forEach((v, i) => {
  //   v.id && form.append(`variants[${i}].id`, v.id.toPrecision());
  //   v.price && form.append(`variants[${i}].price`, v.price.toPrecision());
  //   v.sku && form.append(`variants[${i}].sku`, v.sku);
  //   form.append(`variants[${i}].available`, v.available ? "true" : "false");
  //   form.append(`variants[${i}].deleted`, v.deleted ? "true" : "false");
  //   v.attributes?.forEach((a, j) => {
  //     a.attribute &&
  //       form.append(`variants[${i}].attributes[${j}].attribute`, a.attribute);
  //     a.value && form.append(`variants[${i}].attributes[${j}].value`, a.value);
  //     form.append(`variants[${i}].attributes[${j}].sort`, a.sort.toString());
  //     form.append(
  //         `variants[${i}].attributes[${j}].vSort`,
  //         a.vSort.toString()
  //       );
  //   });
  // });

  const resp = await makeApiRequest({
    url,
    options: {
      method: "PUT",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json"
      }
    },
    authenticated: true
  });

  await validateResponse(resp);
}

export async function updateProductImages(
  shopId: number,
  productId: number,
  values: ProductImage[]
) {
  const url = `/vendor/shops/${shopId}/products/${productId}/images`;

  var form = new FormData();
  values.forEach((v, i) => {
    v.id && form.append(`images[${i}].id`, v.id.toPrecision());
    v.name && form.append(`images[${i}].name`, v.name);
    form.append(`images[${i}].thumbnail`, v.thumbnail ? "true" : "false");
    form.append(`images[${i}].deleted`, v.deleted ? "true" : "false");
    v.file && form.append(`images[${i}].file`, v.file);
  });

  const resp = await makeApiRequest({
    url,
    options: {
      method: "PUT",
      body: form
    },
    authenticated: true
  });

  await validateResponse(resp);
}

export async function draftProduct(shopId: number, productId: number) {
  const url = `/vendor/shops/${shopId}/products/${productId}/draft`;

  const resp = await makeApiRequest({
    url,
    options: {
      method: "PUT"
    },
    authenticated: true
  });

  await validateResponse(resp);
}

export async function publishProduct(shopId: number, productId: number) {
  const url = `/vendor/shops/${shopId}/products/${productId}/publish`;

  const resp = await makeApiRequest({
    url,
    options: {
      method: "PUT"
    },
    authenticated: true
  });

  await validateResponse(resp);
}

export async function getProductById(shopId: number, productId: number) {
  const url = `/vendor/shops/${shopId}/products/${productId}`;

  const resp = await makeApiRequest({ url, authenticated: true });

  await validateResponse(resp);

  return resp
    .json()
    .then((json) => json as Product)
    .catch((e) => null);
}

export async function getProductBySlug(slug: String) {
  const url = `/content/products/${slug}`;

  const resp = await makeApiRequest({ url, options: { cache: "no-store" } });

  await validateResponse(resp, true);

  return resp
    .json()
    .then((json) => json as Product)
    .catch((e) => null);
}

export async function deleteProduct(shopId: number, productId: number) {
  const url = `/vendor/shops/${shopId}/products/${productId}`;
  const resp = await makeApiRequest({
    url,
    options: { method: "DELETE" },
    authenticated: true
  });

  await validateResponse(resp);
}

export async function getRelatedProducts(productId: number) {
  const url = `/content/products/${productId}/related`;

  const resp = await makeApiRequest({ url });

  await validateResponse(resp);

  return resp.json() as Promise<Product[]>;
}

export async function findProducts(value: ProductQuery) {
  const query = buildQueryParams(value);

  const url = `/content/products${query}`;

  const resp = await makeApiRequest({ url });

  await validateResponse(resp);

  return resp.json() as Promise<PageData<Product>>;
}

export async function findShopProducts(shopId: number, value: ProductQuery) {
  const query = buildQueryParams(value);

  const url = `/vendor/shops/${shopId}/products${query}`;

  const resp = await makeApiRequest({ url, authenticated: true });

  await validateResponse(resp);

  return resp.json() as Promise<PageData<Product>>;
}

export async function getProductFilterByNameLike(q: string) {
  const url = `/content/products/${q}/product-filter`;

  const resp = await makeApiRequest({ url });

  await validateResponse(resp);

  return (await resp.json()) as ProductFilter;
}
