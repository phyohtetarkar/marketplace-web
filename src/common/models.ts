export interface PageData<T> {
  contents: T[];
  currentPage: number;
  totalPage: number;
  pageSize: number;
}

export interface AuthUser {
  id: string;
  name: string;
  phone: string;
  email?: string;
}

export interface User {
  id?: string;
  name?: string;
  phone?: string;
  role?: string;
  email?: string;
  image?: string;
  disabled?: boolean;
}

export interface HomeData {
  banners?: Banner[];
  mainCategories?: Category[];
  featuredShops?: Shop[];
}

export interface Banner {
  id: number;
  link: string;
  image: string;
  position: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  category?: Category;
  children?: Category[];
}

export interface ShopMember {
  id: number;
  role: string;
  member: User;
}

export interface Shop {
  id?: number;
  name?: string;
  slug?: string;
  headline?: string;
  rating?: number;
  featured?: boolean;
  createdAt?: number;
  status?: "PENDING" | "ACTIVE" | "SUBSCRIPTION_EXPIRED" | "DENIED";
  logo?: string | null;
  cover?: string | null;
  about?: string;
  contact?: ShopContact;
  logoImage?: File;
  coverImage?: File;
}

export interface ShopContact {
  id?: number;
  shopId?: number;
  address?: string;
  phones?: [string];
  latitude?: number;
  longitude?: number;
}

export interface ShopGeneral {
  shopId?: number;
  name?: string;
  slug?: string;
  headline?: string;
  about?: string;
}

export interface ShopReview {
  id?: number;
  shopId?: number;
  rating?: number;
  description?: string;
  reviewer?: User;
  createdAt?: number;
}

export interface Product {
  id?: number;
  name?: string;
  slug?: string;
  sku?: string;
  price?: number;
  brand?: string;
  thumbnail?: string;
  videoId?: string;
  stockLeft?: number;
  featured?: boolean;
  newArrival?: boolean;
  withVariant?: boolean;
  description?: string;
  status?: "DRAFT" | "ARCHIVED" | "PUBLISHED" | "DENIED";
  discount?: Discount;
  category?: Category;
  shop?: Shop;
  images?: ProductImage[];
  options?: ProductOption[];
  variants?: ProductVariant[];
  categoryId?: number;
  shopId?: number;
  discountId?: number;
}

export interface ProductImage {
  id?: number;
  productId?: number;
  name?: string | null;
  thumbnail?: boolean;
  file?: File;
  deleted?: boolean;
}

export interface ProductOption {
  id?: number;
  name?: string;
  position?: number;
}

export interface ProductVariant {
  id?: number;
  title?: string;
  sku?: string;
  price?: number;
  stockLeft?: number;
  options: ProductVariantOption[];
  deleted?: boolean;
}

export interface ProductVariantOption {
  option: string;
  value: string;
}

export interface Discount {
  id?: number;
  shopId?: number;
  title?: string;
  value?: number;
  type?: string;
  createdAt?: number;
}

export interface CartItem {
  id?: number;
  productId: number;
  variantId?: number;
  quantity: number;
  product?: Product;
  variant?: ProductVariant;
}
