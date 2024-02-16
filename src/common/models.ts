export type OrderStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

export type PaymentMethod = "COD" | "BANK_TRANSFER";

export type ShopStatus = "PENDING" | "APPROVED" | "DISABLED";

export type ProductStatus = "DRAFT" | "PUBLISHED";

export type ValueType = "PERCENTAGE" | "FIXED_AMOUNT";

export type ShopSubscriptionStatus = "PENDING" | "SUCCESS" | "FAILED";

export type UserRole = "USER" | "ADMIN" | "OWNER";

export type Permission =
  | "DASHBOARD_READ"
  | "BANNER_READ"
  | "BANNER_WRITE"
  | "CATEGORY_READ"
  | "CATEGORY_WRITE"
  | "CITY_READ"
  | "CITY_WRITE"
  | "SHOP_READ"
  | "SHOP_WRITE"
  | "PRODUCT_READ"
  | "PRODUCT_WRITE"
  | "USER_READ"
  | "USER_WRITE"
  | "SUBSCRIPTION_PLAN_READ"
  | "SUBSCRIPTION_PLAN_WRITE"
  | "PROMO_CODE_READ"
  | "PROMO_CODE_WRITE"
  | "SUBSCRIPTION_HISTORY_READ"
  | "SITE_SETTING_WRITE";

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
}

export interface Audit {
  createdAt: number;
  createdBy?: string;
  modifiedAt: number;
  modifiedBy?: string;
}

export interface User {
  id: number;
  name?: string;
  phone?: string;
  role?: UserRole;
  email?: string;
  image?: string;
  disabled?: boolean;
  emailVerified?: boolean;
  permissions?: Permission[];
  audit?: Audit;
}

export interface UserEdit {
  name?: string;
  phone?: string;
}

export interface UserStatistic {
  totalOrder: number;
  totalFavorite: number;
  totalShop: number;
}

export interface HomeData {
  banners?: Banner[];
  featuredShops?: Shop[];
  mainCategories?: Category[];
  featuredProducts?: Product[];
  discountProducts?: Product[];
}

export interface Banner {
  id: number;
  link: string;
  image: string;
  position: number;
}

export interface BannerForm {
  id?: number;
  link?: string;
  position?: number;
  image?: string;
  file?: File;
}


export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  category?: Category;
  children?: Category[];
  names?: CategoryName[];
  audit?: Audit;
}

export interface CategoryName {
  lang: string;
  name?: string;
}

export interface CategoryForm {
  id?: number;
  slug?: string;
  image?: string;
  featured?: boolean;
  category?: Category;
  categoryId?: number;
  names?: CategoryName[];
  file?: File;
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
  id: number;
  name?: string;
  slug?: string;
  headline?: string;
  rating?: number;
  featured?: boolean;
  status?: ShopStatus;
  city?: City;
  expiredAt?: number;
  logo?: string;
  cover?: string;
  about?: string;
  contact?: ShopContact;
  audit?: Audit;
}

export interface ShopContact {
  shopId?: number;
  address?: string;
  phones?: string[];
  latitude?: number;
  longitude?: number;
  city?: City;
}

export interface ShopUpdate {
  shopId: number;
  name?: string;
  slug?: string;
  headline?: string;
  about?: string;
}

export interface ShopContactUpdate {
  shopId: number;
  address?: string;
  phones?: string[];
  latitude?: number;
  longitude?: number;
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
  invoiceNo: number;
  title: string;
  totalPrice: number;
  discount: number;
  subTotalPrice: number;
  status?: ShopSubscriptionStatus;
  duration: number;
  startAt: number;
  endAt: number;
  promoCode?: string;
  shop?: Shop;
  audit?: Audit;
}

export interface ShopSubscriptionTransaction {
  invoiceNo: number;
  merchantId: string;
  cardNo?: string;
  amount: number;
  currencyCode?: string;
  tranRef?: string;
  referenceNo?: string;
  agentCode?: string;
  channelCode?: string;
  approvalCode?: string;
  eci?: string;
  transactionDateTime?: string;
  respCode?: string;
  respDesc?: string;
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
  id: number;
  name: string;
  slug: string;
  sku?: string;
  price: number;
  brand?: string;
  thumbnail?: string;
  videoEmbed?: string;
  available?: boolean;
  featured?: boolean;
  newArrival?: boolean;
  withVariant?: boolean;
  description?: string;
  status?: ProductStatus;
  discount?: Discount;
  category: Category;
  shop: Shop;
  images?: ProductImage[];
  attributes?: ProductAttribute[];
  variants?: ProductVariant[];
  audit?: Audit;
}

export interface ProductCreate {
  id?: number;
  name?: string;
  slug?: string;
  sku?: string;
  price?: number;
  brand?: string;
  videoEmbed?: string;
  available?: boolean;
  newArrival?: boolean;
  withVariant?: boolean;
  draft?: boolean;
  description?: string;
  status?: ProductStatus;
  discount?: Discount;
  images?: ProductImage[];
  attributes?: ProductAttributeEdit[];
  variants?: ProductVariant[];
  categoryId?: number;
  shopId: number;
  discountId?: number;
}

export interface ProductUpdate {
  id: number;
  shopId: number;
  name?: string;
  slug?: string;
  sku?: string;
  price?: number;
  brand?: string;
  available?: boolean;
  newArrival?: boolean;
  categoryId?: number;
  discountId?: number | null;
  discount?: Discount | null;
}

export interface ProductImage {
  id?: number;
  name?: string | null;
  thumbnail?: boolean;
  file?: File;
  deleted?: boolean;
}

export interface ProductAttribute {
  name: string;
  sort: number;
}

export interface ProductAttributeEdit {
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
  available?: boolean;
  attributes: ProductVariantAttribute[];
  deleted?: boolean;
}

export interface ProductVariantAttribute {
  attribute: string;
  value: string;
  sort: number;
  vSort: number;
}

export interface Discount {
  id?: number;
  title?: string;
  value?: number;
  type?: ValueType;
  audit?: Audit;
}

export interface CartItem {
  quantity: number;
  product: Product;
  variant?: ProductVariant;
}

export interface CartItemID {
  productId: number;
  variantId?: number;
}

export interface CartItemForm {
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
  customer?: User;
  shop?: Shop;
  audit?: Audit;
}

export interface OrderItem {
  id: number;
  unitPrice: number;
  discountPrice: number;
  quantity: number;
  cancelled: boolean;
  product: Product;
  productVariant?: ProductVariant;
}

export interface DeliveryDetail {
  name: string;
  phone: string;
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
  id?: number;
  title?: string;
  duration?: number;
  price?: number;
  promoUsable?: boolean;
  audit?: Audit;
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
  id?: number;
  code?: string;
  value?: number;
  minConstraint?: number;
  valueType?: ValueType;
  expiredAt?: number;
  used?: boolean;
  audit?: Audit;
}

export interface StaffUserUpdate {
  phone?: string;
  role?: UserRole;
  permissions?: Set<string>;
}

export interface SiteSetting {
  favicon?: string;
  logo?: string;
  cover?: string;
  aboutUs?: string;
  termsAndConditions?: string;
  privacyPolicy?: string;
}

export interface SiteAssets {
  favicon?: string;
  logo?: string;
  cover?: string;
}

export interface DashboardData {
  totalSubscription: number;
  totalShop: number;
  totalProduct: number;
  totalUser: number;
  recentSubscriptions: ShopSubscription[];
}