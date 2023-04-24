import makeApiRequest from "../common/makeApiRequest";
import { PageData, Product } from "../common/models";
import { buildQueryParams, validateResponse } from "../common/utils";

const basePath = "products";

export interface ProductQuery {
  q?: String;
  "category-slug"?: string | string[];
  "category-id"?: number;
  "shop-id"?: number;
  "discount-id"?: number;
  "max-price"?: number;
  brand?: string | string[];
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
  form.append("hidden", value.hidden ? "true" : "false");
  value.description && form.append("description", value.description);
  value.categoryId && form.append("categoryId", value.categoryId.toPrecision());
  value.shopId && form.append("shopId", value.shopId.toPrecision());
  value.discountId && form.append("discountId", value.discountId.toPrecision());
  value.brand && form.append("brand", value.brand);
  value.thumbnail && form.append("thumbnail", value.thumbnail);

  value.images?.forEach((v, i) => {
    v.id && form.append(`images[${i}].id`, v.id.toPrecision());
    v.name && form.append(`images[${i}].name`, v.name);
    // if (v.id && v.id > 0) {
    //   const imageName = v.name?.split("/").pop();
    //   imageName && form.append(`images[${i}].name`, imageName);
    // } else {
    //   v.name && form.append(`images[${i}].name`, v.name);
    // }
    //!v.id && v.name && form.append(`images[${i}].name`, v.name);
    form.append(`images[${i}].thumbnail`, v.thumbnail ? "true" : "false");
    form.append(`images[${i}].deleted`, v.deleted ? "true" : "false");
    v.file && form.append(`images[${i}].file`, v.file);
  });

  value.options?.forEach((v, i) => {
    v.id && form.append(`options[${i}].id`, v.id.toPrecision());
    v.name && form.append(`options[${i}].name`, v.name);
    v.position &&
      form.append(`options[${i}].position`, v.position.toPrecision());
  });

  value.variants?.forEach((v, i) => {
    v.id && form.append(`variants[${i}].id`, v.id.toPrecision());
    v.title && form.append(`variants[${i}].title`, v.title);
    v.price && form.append(`variants[${i}].price`, v.price.toPrecision());
    v.sku && form.append(`variants[${i}].sku`, v.sku);
    v.stockLeft &&
      form.append(`variants[${i}].stockLeft`, v.stockLeft.toPrecision());
    form.append(`variants[${i}].deleted`, v.deleted ? "true" : "false");
    v.options?.forEach((op, j) => {
      op.option &&
        form.append(`variants[${i}].options[${j}].option`, op.option);
      op.value && form.append(`variants[${i}].options[${j}].value`, op.value);
    });
  });

  const url = `${basePath}`;

  // const resp = await fetch(url, {
  //   method: !value.id ? "POST" : "PUT",
  //   body: form,
  //   headers: {
  //     Authorization: await getAuthHeader()
  //   }
  // });

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
  const url = `${basePath}/${productId}`;
  // const resp = await fetch(url, {
  //   headers: {
  //     Authorization: await getAuthHeader()
  //   }
  // });

  const resp = await makeApiRequest(url, {}, true);

  await validateResponse(resp);

  return resp
    .json()
    .then((json) => json as Product)
    .catch((e) => null);
}

export async function getProductBySlug(slug: String) {
  const url = `${basePath}/${slug}`;
  //const resp = await fetch(url);

  const resp = await makeApiRequest(url);

  await validateResponse(resp);

  return resp
    .json()
    .then((json) => json as Product)
    .catch((e) => null);
}

export async function existsProductBySlug(slug: String) {
  const url = `${basePath}/${slug}/exists`;
  //const resp = await fetch(url);

  const resp = await makeApiRequest(url);

  await validateResponse(resp);

  return resp.json() as Promise<boolean>;
}

export async function deleteProduct(id: number) {
  const url = `${basePath}/${id}`;
  // const resp = await fetch(url, {
  //   method: "DELETE",
  //   headers: {
  //     Authorization: await getAuthHeader()
  //   }
  // });

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

  const url = `shops/${shopId}/products${query}`;
  // const resp = await fetch(url, {
  //   headers: {
  //     Authorization: await getAuthHeader()
  //   }
  // });

  const resp = await makeApiRequest(url, {}, true);

  await validateResponse(resp);

  return resp.json() as Promise<PageData<Product>>;
}
