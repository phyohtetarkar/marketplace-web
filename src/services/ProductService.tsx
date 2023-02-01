import { PageData, Product } from "../common/models";
import {
  buildQueryParams,
  getAPIBasePath,
  getAuthHeader,
  validateResponse
} from "../common/utils";

const basePath = "products";

export interface ProductQuery {
  q?: String;
  "category-slug"?: number;
  "shop-id"?: number;
  "max-price"?: number;
  status?: "PUBLISHED";
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
  value.description && form.append("description", value.description);
  value.status && form.append("status", value.status);
  value.categoryId && form.append("categoryId", value.categoryId.toPrecision());
  value.shopId && form.append("shopId", value.shopId.toPrecision());
  value.discountId && form.append("discountId", value.discountId.toPrecision());
  value.brand && form.append("brand", value.brand);

  //value.images && form.append("images", JSON.stringify(value.images));

  value.images?.forEach((v, i) => {
    v.id && form.append(`images[${i}].id`, v.id.toPrecision());
    !v.id && v.name && form.append(`images[${i}].name`, v.name);
    form.append(`images[${i}].thumbnail`, v.thumbnail ? "true" : "false");
    form.append(`images[${i}].deleted`, v.deleted ? "true" : "false");
    v.file && form.append(`images[${i}].file`, v.file);
  });

  //value.options && form.append("options", JSON.stringify(value.options));

  value.options?.forEach((v, i) => {
    v.id && form.append(`options[${i}].id`, v.id.toPrecision());
    v.name && form.append(`options[${i}].name`, v.name);
    v.position &&
      form.append(`options[${i}].position`, v.position.toPrecision());
  });

  //value.variants && form.append("variants", JSON.stringify(value.variants));

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

  const url = `${getAPIBasePath()}${basePath}`;

  const resp = await fetch(url, {
    method: !value.id ? "POST" : "PUT",
    body: form,
    headers: {
      Authorization: await getAuthHeader()
    }
  });

  await validateResponse(resp);
}

export async function getProductBySlug(slug: String) {
  const url = `${getAPIBasePath()}${basePath}/${slug}`;
  const resp = await fetch(url, {
    headers: {
      Authorization: await getAuthHeader()
    }
  });

  await validateResponse(resp);

  return resp.json() as Promise<Product>;
}

export async function existsProductBySlug(slug: String) {
  const url = `${getAPIBasePath()}${basePath}/${slug}/exists`;
  const resp = await fetch(url);

  await validateResponse(resp);

  return resp.json() as Promise<boolean>;
}

export async function deleteProduct(id: number) {
  const url = `${getAPIBasePath()}${basePath}/${id}`;
  const resp = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: await getAuthHeader()
    }
  });

  await validateResponse(resp);
}

export async function getProductHints(q: string) {
  const query = buildQueryParams({ q: q });
  const url = `${getAPIBasePath()}${basePath}/hints${query}`;
  const resp = await fetch(url);

  await validateResponse(resp);

  return resp.json() as Promise<Product[]>;
}

export async function findProducts(value: ProductQuery) {
  const query = buildQueryParams(value);

  const url = `${getAPIBasePath()}${basePath}${query}`;
  const resp = await fetch(url);

  await validateResponse(resp);

  return resp.json() as Promise<PageData<Product>>;
}
