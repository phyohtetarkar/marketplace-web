import { Category, PageData } from "../common/models";

const basePath = "categories";

export async function getCategories(page?: number) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${basePath}`;
  return fetch(url).then((res) => res.json() as Promise<PageData<Category>>);
}

export async function getAllCategories() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${basePath}/structural?flat=true`;
  return fetch(url).then((res) => res.json() as Promise<[Category]>);
}

export async function getCategoryBySlug(slug: String) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${basePath}/${slug}`;
  return fetch(url).then((res) => res.json() as Promise<Category>);
}

export async function existsBySlug(slug: String) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${basePath}/${slug}/exists`;
  return fetch(url).then((res) => res.json() as Promise<boolean>);
}
