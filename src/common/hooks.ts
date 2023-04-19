import useSWR from "swr";
import {
  getAllCategories,
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

export function useCategories(tree: boolean) {
  const { data, error, isLoading } = useSWR(
    `/categories?tree=${tree}`,
    () => getAllCategories(tree),
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
