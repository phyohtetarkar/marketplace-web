export type OrderStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

export type PaymentMethod = "COD" | "BANK_TRANSFER";

export type ShopStatus = "PENDING" | "APPROVED" | "DISABLED";

export type ProductStatus = "DRAFT" | "PUBLISHED";

export type DiscountType = "PERCENTAGE" | "FIXED_AMOUNT";

export type ShopSubscriptionStatus = "PENDING" | "SUCCESS" | "FAILED";

export interface PageData<T> {
  contents: T[];
  currentPage: number;
  totalPage: number;
  pageSize: number;
  totalElements: number;
}

export interface AuthResult {
  accessToken: string;
  refreshToken: string;
  user?: User;
}

export interface User {
  id?: number;
  name?: string;
  phone?: string;
  role?: string;
  email?: string;
  image?: string;
  disabled?: boolean;
  verified?: boolean;
}

export interface UserStatistic {
  totalOrder: number;
  totalFavorite: number;
  totalShop: number;
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

export interface City {
  id: number;
  name: string;
}

export interface ShopMember {
  userId: number;
  shopId: number;
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
  pendingOrderCount?: number;
  status?: ShopStatus;
  expiredAt?: number;
  logo?: string;
  cover?: string;
  about?: string;
  contact?: ShopContact;
  logoImage?: File;
  coverImage?: File;
}

export interface ShopContact {
  shopId?: number;
  address?: string;
  phones?: string[];
  latitude?: number;
  longitude?: number;
  city?: City;
}

export interface ShopGeneral {
  shopId?: number;
  name?: string;
  slug?: string;
  headline?: string;
  about?: string;
}

export interface ShopSetting {
  shopId: number;
  cashOnDelivery: boolean;
  bankTransfer: boolean;
}

export interface ShopStatistic {
  shopId: number;
  pendingOrder: number;
  totalOrder: number;
  totalProduct: number;
  totalSale: number;
}

export interface ShopReview {
  shopId?: number;
  rating?: number;
  description?: string;
  reviewer?: User;
  createdAt?: number;
  updatedAt?: number;
}

export interface ShopAcceptedPayment {
  id?: number;
  shopId?: number;
  accountType?: string;
  accountName?: string;
  accountNumber?: string;
}

export interface ShopSubscription {
  id: number;
  title: string;
  totalPrice: number;
  discount: number;
  subTotalPrice: number;
  status?: ShopSubscriptionStatus;
  duration: number;
  startAt: number;
  endAt: number;
  preSubscription: boolean;
  shop?: Shop;
  createdAt?: number;
}

export interface ShopCreateForm {
  name?: string;
  slug?: string;
  headline?: string;
  address?: string;
  about?: string;
  phone?: string;
  cashOnDelivery?: boolean;
  bankTransfer?: boolean;
  acceptedPayments?: ShopAcceptedPayment[];
  deliveryCities?: City[];
  logo?: string;
  cover?: string;
  cityId?: number;
  logoImage?: File;
  coverImage?: File;
}

export interface ShopMonthlySale {
  year: number;
  month: number;
  totalSale: number;
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
  disabled?: boolean;
  status?: ProductStatus;
  discount?: Discount;
  category?: Category;
  shop?: Shop;
  images?: ProductImage[];
  attributes?: ProductAttribute[];
  variants?: ProductVariant[];
  createdAt?: number;
  categoryId?: number;
  shopId?: number;
  discountId?: number;
}

export interface ProductImage {
  id?: number;
  productId?: number;
  name?: string | null;
  url?: string | null;
  thumbnail?: boolean;
  file?: File;
  deleted?: boolean;
}

export interface ProductAttribute {
  id?: number;
  name?: string;
  sort: number;
  values?: ProductAttributeValue[];
}

export interface ProductAttributeValue {
  value: string;
  sort: number;
}

export interface ProductVariant {
  id?: number;
  sku?: string;
  price?: number;
  stockLeft?: number;
  attributes: ProductVariantAttribute[];
  deleted?: boolean;
}

export interface ProductVariantAttribute {
  attributeId: number;
  attribute: string;
  value: string;
  sort: number;
  vSort: number;
}

export interface Discount {
  id?: number;
  shopId?: number;
  title?: string;
  value?: number;
  type?: DiscountType;
  createdAt?: number;
}

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
  variant?: ProductVariant;
}

export interface AddToCartForm {
  productId: number;
  variantId?: number;
  quantity: number;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface Order {
  id: number;
  orderCode: string;
  subTotalPrice: number;
  totalPrice: number;
  discount: number;
  quantity: number;
  note?: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  delivery: DeliveryDetail;
  payment: PaymentDetail;
  items: [OrderItem];
  user?: User;
  shop?: Shop;
  createdAt: number;
}

export interface OrderItem {
  id: number;
  productName: string;
  productSlug: string;
  productThumbnail?: string;
  unitPrice: number;
  discount: number;
  quantity: number;
  cancelled: boolean;
  product?: Product;
  attributes?: ProductVariantAttribute[];
}

export interface DeliveryDetail {
  name: string;
  phone: string;
  city: string;
  address: string;
}

export interface PaymentDetail {
  accountType?: string;
  receiptImage?: string;
  file?: File;
}

export interface OrderCreateForm {
  shopId?: number;
  note?: string;
  paymentMethod?: PaymentMethod;
  cartItems?: CartItem[];
  delivery?: DeliveryDetail;
  payment?: PaymentDetail;
}

export interface SubscriptionPlan {
  id: number;
  title: string;
  duration: number;
  price: number;
  promoUsable: boolean;
}

export interface PaymentTokenResult {
  webPaymentUrl: string;
  paymentToken: string;
  respCode: string;
  respDesc: string;
}

export interface ProductFilter {
  brands: string[];
  maxPrice: number;
}

export interface SubscriptionPromo {
  id: number;
  code: string;
  value: number;
  minConstraint: number;
  valueType: DiscountType;
  expiredAt: number;
  used: boolean;
}
