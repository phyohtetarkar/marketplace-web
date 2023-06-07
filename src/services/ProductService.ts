import makeApiRequest from "../common/makeApiRequest";
import { PageData, Product, ProductStatus } from "../common/models";
import { buildQueryParams, validateResponse } from "../common/utils";

const basePath = "products";

export interface ProductQuery {
  q?: string;
  "category-id"?: number;
  "shop-id"?: number;
  "discount-id"?: number;
  "max-price"?: number;
  brand?: string | string[];
  status?: ProductStatus;
  page?: number;
}

export async function saveProduct(value: Product) {
  const form = new FormData();
  value.id && form.append("id", value.id.toPrecision());
  value.name && form.append("name", value.name);
  value.slug && form.append("slug", value.slug);
  value.sku && form.append("sku", value.sku);
  value.price && form.append("price", value.price.toPrecision());
  value.stockLeft && form.append("stockLeft", value.stockLeft.toPrecision());
  form.append("featured", value.featured ? "true" : "false");
  form.append("newArrival", value.newArrival ? "true" : "false");
  form.append("withVariant", value.withVariant ? "true" : "false");
  value.status && form.append("status", value.status);
  value.description && form.append("description", value.description);
  value.categoryId && form.append("categoryId", value.categoryId.toPrecision());
  value.shopId && form.append("shopId", value.shopId.toPrecision());
  value.discount?.id && form.append("discountId", value.discount.id.toString());
  value.brand && form.append("brand", value.brand);
  value.thumbnail && form.append("thumbnail", value.thumbnail);

  value.images?.forEach((v, i) => {
    v.id && form.append(`images[${i}].id`, v.id.toPrecision());
    v.name && form.append(`images[${i}].name`, v.name);
    form.append(`images[${i}].thumbnail`, v.thumbnail ? "true" : "false");
    form.append(`images[${i}].deleted`, v.deleted ? "true" : "false");
    v.file && form.append(`images[${i}].file`, v.file);
  });

  value.attributes?.forEach((a, i) => {
    a.id && form.append(`attributes[${i}].id`, a.id.toPrecision());
    a.name && form.append(`attributes[${i}].name`, a.name);
    a.sort && form.append(`attributes[${i}].sort`, a.sort.toString());
  });

  value.variants?.forEach((v, i) => {
    v.id && form.append(`variants[${i}].id`, v.id.toPrecision());
    // v.title && form.append(`variants[${i}].title`, v.title);
    v.price && form.append(`variants[${i}].price`, v.price.toPrecision());
    v.sku && form.append(`variants[${i}].sku`, v.sku);
    v.stockLeft &&
      form.append(`variants[${i}].stockLeft`, v.stockLeft.toPrecision());
    form.append(`variants[${i}].deleted`, v.deleted ? "true" : "false");
    v.attributes?.forEach((a, j) => {
      a.attributeId &&
        form.append(
          `variants[${i}].attributes[${j}].attributeId`,
          a.attributeId.toString()
        );
      a.attribute &&
        form.append(`variants[${i}].attributes[${j}].attribute`, a.attribute);
      a.value && form.append(`variants[${i}].attributes[${j}].value`, a.value);
      a.sort &&
        form.append(`variants[${i}].attributes[${j}].sort`, a.sort.toString());
    });
  });

  const url = `private/${basePath}`;

  const resp = await makeApiRequest(
    url,
    {
      method: !value.id ? "POST" : "PUT",
      body: form
    },
    true
  );

  await validateResponse(resp);
}

export async function getProductById(productId: number) {
  const url = `private/${basePath}/${productId}`;

  const resp = await makeApiRequest(url, {}, true);

  await validateResponse(resp);

  return resp
    .json()
    .then((json) => json as Product)
    .catch((e) => null);
}

export async function getProductBySlug(slug: String) {
  const url = `${basePath}/${slug}`;

  const resp = await makeApiRequest(url);

  await validateResponse(resp);

  return resp
    .json()
    .then((json) => json as Product)
    .catch((e) => null);
}

export async function deleteProduct(id: number) {
  const url = `private/${basePath}/${id}`;
  const resp = await makeApiRequest(url, { method: "DELETE" }, true);

  await validateResponse(resp);
}

export async function getProductHints(q: string) {
  const query = buildQueryParams({ q: q });
  const url = `search/product-hints${query}`;
  //const resp = await fetch(url);

  const resp = await makeApiRequest(url);

  await validateResponse(resp);

  return resp.json() as Promise<string[]>;
}

export async function getRelatedProducts(productId: number) {
  const url = `${basePath}/${productId}/related`;
  //const resp = await fetch(url);

  const resp = await makeApiRequest(url);

  await validateResponse(resp);

  return resp.json() as Promise<Product[]>;
}

export async function findProducts(value: ProductQuery) {
  const query = buildQueryParams(value);

  const url = `${basePath}${query}`;
  //const resp = await fetch(url);

  const resp = await makeApiRequest(url);

  await validateResponse(resp);

  return resp.json() as Promise<PageData<Product>>;
}

export async function findShopProducts(shopId: number, value: ProductQuery) {
  const query = buildQueryParams(value);

  const url = `private/shops/${shopId}/products${query}`;

  const resp = await makeApiRequest(url, {}, true);

  await validateResponse(resp);

  return resp.json() as Promise<PageData<Product>>;
}

export async function getProductBrandsByNameLike(q: string) {
  const url = `${basePath}/${q}/brands`;

  const resp = await makeApiRequest(url);

  await validateResponse(resp);

  return resp.json() as Promise<string[]>;
}
