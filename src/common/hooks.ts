import useSWR from "swr";
import { getAllCategories } from "../services/CategoryService";
import { getLoginUser } from "../services/UserService";
import { Category, User } from "./models";

export function useCategories(flat: boolean) {
  const { data, error, isLoading } = useSWR<Category[], Error>(
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
