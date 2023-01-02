export interface PageData<T> {
  contents: [T];
  currentPage: number;
  totalPage: number;
  pageSize: number;
}

export interface AuthUser {
  id: string;
  name: string;
  phone: string;
  verified: boolean;
  accessToken?: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
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
  level: number;
  category?: Category | null;
  children?: [Category] | null;
}

export interface Shop {
  id: number;
  name: string;
  slug: string;
  headline: string;
  rating: number;
  recommended: boolean;
  createdAt: number;
  logo?: string | null;
  cover?: string | null;
  about?: string | null;
  contact?: ShopContact | null;
}

export interface ShopContact {
  id: number;
  address?: string | null;
  phones?: [string] | null;
  latitude?: number | null;
  longitude?: number | null;
}

export interface ShopGeneral {
  id: number;
  name: string;
  slug: string;
  headline?: string | null;
  about?: string | null;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  brand?: string | null;
  thumbnail?: string | null;
  outOfStock?: boolean | null;
  description?: string | null;
  discount?: Discount | null;
  category: Category;
  shop: Shop;
  images?: [ProductImage] | null;
  options?: [ProductOption] | null;
  variants?: [ProductVariant] | null;
}

export interface ProductImage {}

export interface ProductOption {}

export interface ProductVariant {}

export interface ProductVariantOption {}

export interface Discount {}

export interface CartItem {
  id: CartItemId;
  quantity: number;
  product: Product;
  variant?: ProductVariant | null;
}

export interface CartItemId {
  productId: number;
  variantId?: string | null;
}
