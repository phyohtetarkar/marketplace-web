import useSWR from "swr";
import {
  getAllCategories,
  getBrandsByCategory,
  getCategory
} from "../services/CategoryService";
import { getLoginUser } from "../services/UserService";
import { Category, User } from "./models";

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

export function useBrands(categorySlug?: string) {
  const { data, error, isLoading } = useSWR(
    ["/brands", categorySlug],
    ([url, slug]) => (slug ? getBrandsByCategory(slug) : undefined),
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
  const { data, error, isLoading } = useSWR<User, Error>(
    "/login-user",
    getLoginUser,
    {
      revalidateOnFocus: false
    }
  );

  return {
    user: data,
    error: error,
    isLoading: isLoading
  };
}
