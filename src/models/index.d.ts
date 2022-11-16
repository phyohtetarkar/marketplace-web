import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";

export enum UserRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  CONSUMER = "CONSUMER"
}

export enum MemberRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN"
}

export enum DiscountType {
  PERCENTAGE = "PERCENTAGE",
  FIXED_AMOUNT = "FIXED_AMOUNT"
}

export enum ProductStatus {
  PUBLISHED = "PUBLISHED",
  DRAFT = "DRAFT",
  ARCHIVED = "ARCHIVED",
  DENIED = "DENIED"
}

export enum ShopStatus {
  LIVE = "LIVE",
  PENDING = "PENDING",
  DENIED = "DENIED"
}

type EagerProductOption = {
  readonly key: string;
  readonly name: string;
}

type LazyProductOption = {
  readonly key: string;
  readonly name: string;
}

export declare type ProductOption = LazyLoading extends LazyLoadingDisabled ? EagerProductOption : LazyProductOption

export declare const ProductOption: (new (init: ModelInit<ProductOption>) => ProductOption)

type EagerProductOptionValue = {
  readonly option: string;
  readonly value: string;
}

type LazyProductOptionValue = {
  readonly option: string;
  readonly value: string;
}

export declare type ProductOptionValue = LazyLoading extends LazyLoadingDisabled ? EagerProductOptionValue : LazyProductOptionValue

export declare const ProductOptionValue: (new (init: ModelInit<ProductOptionValue>) => ProductOptionValue)

type EagerProductVariant = {
  readonly key: string;
  readonly title: string;
  readonly price?: number | null;
  readonly sku?: string | null;
  readonly options?: (ProductOptionValue | null)[] | null;
}

type LazyProductVariant = {
  readonly key: string;
  readonly title: string;
  readonly price?: number | null;
  readonly sku?: string | null;
  readonly options?: (ProductOptionValue | null)[] | null;
}

export declare type ProductVariant = LazyLoading extends LazyLoadingDisabled ? EagerProductVariant : LazyProductVariant

export declare const ProductVariant: (new (init: ModelInit<ProductVariant>) => ProductVariant)

type EagerLocation = {
  readonly lat: string;
  readonly long: string;
}

type LazyLocation = {
  readonly lat: string;
  readonly long: string;
}

export declare type Location = LazyLoading extends LazyLoadingDisabled ? EagerLocation : LazyLocation

export declare const Location: (new (init: ModelInit<Location>) => Location)

type BannerMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CategoryMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ProductMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type DiscountMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ShopMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ShopCategoryMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ShopMemberMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserAddressMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CartItemMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type FavoriteProductMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerBanner = {
  readonly id: string;
  readonly image?: string | null;
  readonly link?: string | null;
  readonly position: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyBanner = {
  readonly id: string;
  readonly image?: string | null;
  readonly link?: string | null;
  readonly position: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Banner = LazyLoading extends LazyLoadingDisabled ? EagerBanner : LazyBanner

export declare const Banner: (new (init: ModelInit<Banner, BannerMetaData>) => Banner) & {
  copyOf(source: Banner, mutator: (draft: MutableModel<Banner, BannerMetaData>) => MutableModel<Banner, BannerMetaData> | void): Banner;
}

type EagerCategory = {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly image?: string | null;
  readonly isMain?: boolean | null;
  readonly category?: Category | null;
  readonly products?: (Product | null)[] | null;
  readonly categories?: (Category | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCategory = {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly image?: string | null;
  readonly isMain?: boolean | null;
  readonly category: AsyncItem<Category | undefined>;
  readonly products: AsyncCollection<Product>;
  readonly categories: AsyncCollection<Category>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Category = LazyLoading extends LazyLoadingDisabled ? EagerCategory : LazyCategory

export declare const Category: (new (init: ModelInit<Category, CategoryMetaData>) => Category) & {
  copyOf(source: Category, mutator: (draft: MutableModel<Category, CategoryMetaData>) => MutableModel<Category, CategoryMetaData> | void): Category;
}

type EagerProduct = {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly thumbnail?: string | null;
  readonly images?: (string | null)[] | null;
  readonly price?: number | null;
  readonly sku?: string | null;
  readonly description?: string | null;
  readonly hasVariant?: boolean | null;
  readonly newArrival?: boolean | null;
  readonly outOfStock?: boolean | null;
  readonly deleted?: boolean | null;
  readonly featured?: boolean | null;
  readonly status?: ProductStatus | keyof typeof ProductStatus | null;
  readonly createdBy?: string | null;
  readonly updatedBy?: string | null;
  readonly options?: (ProductOption | null)[] | null;
  readonly variants?: (ProductVariant | null)[] | null;
  readonly discount?: Discount | null;
  readonly category?: Category | null;
  readonly shop?: Shop | null;
  readonly favoriteUsers?: (FavoriteProduct | null)[] | null;
  readonly cartItems?: (CartItem | null)[] | null;
  readonly type?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProduct = {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly thumbnail?: string | null;
  readonly images?: (string | null)[] | null;
  readonly price?: number | null;
  readonly sku?: string | null;
  readonly description?: string | null;
  readonly hasVariant?: boolean | null;
  readonly newArrival?: boolean | null;
  readonly outOfStock?: boolean | null;
  readonly deleted?: boolean | null;
  readonly featured?: boolean | null;
  readonly status?: ProductStatus | keyof typeof ProductStatus | null;
  readonly createdBy?: string | null;
  readonly updatedBy?: string | null;
  readonly options?: (ProductOption | null)[] | null;
  readonly variants?: (ProductVariant | null)[] | null;
  readonly discount: AsyncItem<Discount | undefined>;
  readonly category: AsyncItem<Category | undefined>;
  readonly shop: AsyncItem<Shop | undefined>;
  readonly favoriteUsers: AsyncCollection<FavoriteProduct>;
  readonly cartItems: AsyncCollection<CartItem>;
  readonly type?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Product = LazyLoading extends LazyLoadingDisabled ? EagerProduct : LazyProduct

export declare const Product: (new (init: ModelInit<Product, ProductMetaData>) => Product) & {
  copyOf(source: Product, mutator: (draft: MutableModel<Product, ProductMetaData>) => MutableModel<Product, ProductMetaData> | void): Product;
}

type EagerDiscount = {
  readonly id: string;
  readonly title: string;
  readonly value: number;
  readonly type: DiscountType | keyof typeof DiscountType;
  readonly productCount?: number | null;
  readonly shopID: string;
  readonly products?: (Product | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDiscount = {
  readonly id: string;
  readonly title: string;
  readonly value: number;
  readonly type: DiscountType | keyof typeof DiscountType;
  readonly productCount?: number | null;
  readonly shopID: string;
  readonly products: AsyncCollection<Product>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Discount = LazyLoading extends LazyLoadingDisabled ? EagerDiscount : LazyDiscount

export declare const Discount: (new (init: ModelInit<Discount, DiscountMetaData>) => Discount) & {
  copyOf(source: Discount, mutator: (draft: MutableModel<Discount, DiscountMetaData>) => MutableModel<Discount, DiscountMetaData> | void): Discount;
}

type EagerShop = {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly logo?: string | null;
  readonly cover?: string | null;
  readonly description?: string | null;
  readonly location?: Location | null;
  readonly recommended?: boolean | null;
  readonly status?: ShopStatus | keyof typeof ShopStatus | null;
  readonly createdBy?: string | null;
  readonly updatedBy?: string | null;
  readonly category?: ShopCategory | null;
  readonly products?: (Product | null)[] | null;
  readonly members?: (ShopMember | null)[] | null;
  readonly discounts?: (Discount | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyShop = {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly logo?: string | null;
  readonly cover?: string | null;
  readonly description?: string | null;
  readonly location?: Location | null;
  readonly recommended?: boolean | null;
  readonly status?: ShopStatus | keyof typeof ShopStatus | null;
  readonly createdBy?: string | null;
  readonly updatedBy?: string | null;
  readonly category: AsyncItem<ShopCategory | undefined>;
  readonly products: AsyncCollection<Product>;
  readonly members: AsyncCollection<ShopMember>;
  readonly discounts: AsyncCollection<Discount>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Shop = LazyLoading extends LazyLoadingDisabled ? EagerShop : LazyShop

export declare const Shop: (new (init: ModelInit<Shop, ShopMetaData>) => Shop) & {
  copyOf(source: Shop, mutator: (draft: MutableModel<Shop, ShopMetaData>) => MutableModel<Shop, ShopMetaData> | void): Shop;
}

type EagerShopCategory = {
  readonly id: string;
  readonly name: string;
  readonly shops?: (Shop | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyShopCategory = {
  readonly id: string;
  readonly name: string;
  readonly shops: AsyncCollection<Shop>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ShopCategory = LazyLoading extends LazyLoadingDisabled ? EagerShopCategory : LazyShopCategory

export declare const ShopCategory: (new (init: ModelInit<ShopCategory, ShopCategoryMetaData>) => ShopCategory) & {
  copyOf(source: ShopCategory, mutator: (draft: MutableModel<ShopCategory, ShopCategoryMetaData>) => MutableModel<ShopCategory, ShopCategoryMetaData> | void): ShopCategory;
}

type EagerShopMember = {
  readonly id: string;
  readonly role: MemberRole | keyof typeof MemberRole;
  readonly shop?: Shop | null;
  readonly user?: User | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyShopMember = {
  readonly id: string;
  readonly role: MemberRole | keyof typeof MemberRole;
  readonly shop: AsyncItem<Shop | undefined>;
  readonly user: AsyncItem<User | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ShopMember = LazyLoading extends LazyLoadingDisabled ? EagerShopMember : LazyShopMember

export declare const ShopMember: (new (init: ModelInit<ShopMember, ShopMemberMetaData>) => ShopMember) & {
  copyOf(source: ShopMember, mutator: (draft: MutableModel<ShopMember, ShopMemberMetaData>) => MutableModel<ShopMember, ShopMemberMetaData> | void): ShopMember;
}

type EagerUser = {
  readonly id: string;
  readonly name: string;
  readonly phone: string;
  readonly email?: string | null;
  readonly image?: string | null;
  readonly disabled?: boolean | null;
  readonly role: UserRole | keyof typeof UserRole;
  readonly shops?: (ShopMember | null)[] | null;
  readonly addresses?: (UserAddress | null)[] | null;
  readonly cartItems?: (CartItem | null)[] | null;
  readonly favoriteProducts?: (FavoriteProduct | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly id: string;
  readonly name: string;
  readonly phone: string;
  readonly email?: string | null;
  readonly image?: string | null;
  readonly disabled?: boolean | null;
  readonly role: UserRole | keyof typeof UserRole;
  readonly shops: AsyncCollection<ShopMember>;
  readonly addresses: AsyncCollection<UserAddress>;
  readonly cartItems: AsyncCollection<CartItem>;
  readonly favoriteProducts: AsyncCollection<FavoriteProduct>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User, UserMetaData>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

type EagerUserAddress = {
  readonly id: string;
  readonly city: string;
  readonly township: string;
  readonly address: string;
  readonly primary?: boolean | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserAddress = {
  readonly id: string;
  readonly city: string;
  readonly township: string;
  readonly address: string;
  readonly primary?: boolean | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserAddress = LazyLoading extends LazyLoadingDisabled ? EagerUserAddress : LazyUserAddress

export declare const UserAddress: (new (init: ModelInit<UserAddress, UserAddressMetaData>) => UserAddress) & {
  copyOf(source: UserAddress, mutator: (draft: MutableModel<UserAddress, UserAddressMetaData>) => MutableModel<UserAddress, UserAddressMetaData> | void): UserAddress;
}

type EagerCartItem = {
  readonly id: string;
  readonly quantity?: number | null;
  readonly userID: string;
  readonly product?: Product | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCartItem = {
  readonly id: string;
  readonly quantity?: number | null;
  readonly userID: string;
  readonly product: AsyncItem<Product | undefined>;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type CartItem = LazyLoading extends LazyLoadingDisabled ? EagerCartItem : LazyCartItem

export declare const CartItem: (new (init: ModelInit<CartItem, CartItemMetaData>) => CartItem) & {
  copyOf(source: CartItem, mutator: (draft: MutableModel<CartItem, CartItemMetaData>) => MutableModel<CartItem, CartItemMetaData> | void): CartItem;
}

type EagerFavoriteProduct = {
  readonly id: string;
  readonly userID: string;
  readonly product?: Product | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyFavoriteProduct = {
  readonly id: string;
  readonly userID: string;
  readonly product: AsyncItem<Product | undefined>;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type FavoriteProduct = LazyLoading extends LazyLoadingDisabled ? EagerFavoriteProduct : LazyFavoriteProduct

export declare const FavoriteProduct: (new (init: ModelInit<FavoriteProduct, FavoriteProductMetaData>) => FavoriteProduct) & {
  copyOf(source: FavoriteProduct, mutator: (draft: MutableModel<FavoriteProduct, FavoriteProductMetaData>) => MutableModel<FavoriteProduct, FavoriteProductMetaData> | void): FavoriteProduct;
}