type OrderStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

type PaymentMethod = "COD" | "BANK_TRANSFER";

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

export interface AuthUser {
  id: string;
  name: string;
  phone: string;
  email?: string;
}

export interface User {
  id?: number;
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
  imageUrl: string;
  category?: Category;
  children?: Category[];
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
  status?: "PENDING" | "ACTIVE" | "EXPIRED" | "DISABLED";
  pendingOrderCount?: number;
  logo?: string | null;
  cover?: string | null;
  about?: string;
  deliveryNote?: string;
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
}

export interface ShopGeneral {
  shopId?: number;
  name?: string;
  slug?: string;
  headline?: string;
  about?: string;
  deliveryNote?: string;
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
  userId?: number;
  rating?: number;
  description?: string;
  reviewer?: User;
  createdAt?: number;
  updatedAt?: number;
}

export interface ShopAcceptedPayment {
  id?: number;
  accountType?: string;
  accountNumber?: string;
}

export interface ShopCreateForm {
  name?: string;
  slug?: string;
  headline?: string;
  address?: string;
  about?: string;
  deliveryNote?: string;
  cashOnDelivery?: boolean;
  bankTransfer?: boolean;
  acceptedPayments?: ShopAcceptedPayment[];
  logo?: string;
  cover?: string;
  subscriptionPlanId?: number;
  logoImage?: File;
  coverImage?: File;
}

export interface SaleHistory {
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
  hidden?: boolean;
  disabled?: boolean;
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
  url?: string | null;
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
  productId?: number;
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
  type?: "PERCENTAGE" | "FIXED_AMOUNT";
  createdAt?: number;
}

export interface CartItem {
  userId?: number;
  productId?: number;
  variantId?: number;
  quantity: number;
  product?: Product;
  variant?: ProductVariant;
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
  productId: number;
  productName: string;
  productSlug: string;
  productImage: string;
  variant?: string;
  unitPrice: number;
  discount: number;
  quantity: number;
  removed: boolean;
}

export interface DeliveryDetail {
  name: string;
  phone: string;
  city: string;
  address: string;
}

export interface PaymentDetail {
  accountType?: string;
  paySlipImage?: string;
  file?: File;
}

export interface OrderCreateForm {
  shopId: number;
  note?: string;
  paymentMethod: PaymentMethod;
  cartItems?: [CartItem];
  delivery?: DeliveryDetail;
  payment?: PaymentDetail;
}
