import useSWR from "swr";
import {
  getAllCategories,
  getBrandsByCategory,
  getBrandsByCategoryId,
  getCategory
} from "../services/CategoryService";
import { getLoginUser } from "../services/UserService";

export function useCategory(slug?: string) {
  const { data, error, isLoading } = useSWR(
    ["/categories", slug],
    ([url, s]) => (s ? getCategory(s) : undefined),
    {
      revalidateOnFocus: false
    }
  );

  return {
    category: data,
    error: error,
    isLoading: isLoading
  };
}

export function useCategories(flat: boolean) {
  const { data, error, isLoading } = useSWR(
    ["/categories/structural", flat],
    ([url, f]) => getAllCategories(f),
    {
      revalidateOnFocus: false
    }
  );

  return {
    categories: data,
    error: error,
    isLoading: isLoading
  };
}

export function useBrands(categoryId?: number) {
  const { data, error, isLoading } = useSWR(
    "/brands",
    () => (categoryId ? getBrandsByCategoryId(categoryId) : undefined),
    {
      revalidateOnFocus: false
    }
  );

  return {
    brands: data,
    error: error,
    isLoading: isLoading
  };
}

export function useLoginUser() {
  const { data, error, isLoading } = useSWR("/login-user", getLoginUser, {
    revalidateOnFocus: false
  });

  return {
    user: data,
    error: error,
    isLoading: isLoading
  };
}
