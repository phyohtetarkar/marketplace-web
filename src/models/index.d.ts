import { ModelInit, MutableModel } from "@aws-amplify/datastore";

export enum UserRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  CONSUMER = "CONSUMER"
}

export enum MemberRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN"
}

export declare class Discount {
  readonly value?: number | null;
  readonly type?: string | null;
  constructor(init: ModelInit<Discount>);
}

type ProductMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CategoryMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ShopMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ShopMemberMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type BannerMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Product {
  readonly id: string;
  readonly name?: string | null;
  readonly images?: (string | null)[] | null;
  readonly price?: number | null;
  readonly discount?: Discount | null;
  readonly description?: string | null;
  readonly createdBy?: string | null;
  readonly updatedBy?: string | null;
  readonly available?: boolean | null;
  readonly category?: Category | null;
  readonly shop?: Shop | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Product, ProductMetaData>);
  static copyOf(source: Product, mutator: (draft: MutableModel<Product, ProductMetaData>) => MutableModel<Product, ProductMetaData> | void): Product;
}

export declare class Category {
  readonly id: string;
  readonly name: string;
  readonly image?: string | null;
  readonly parent?: string | null;
  readonly products?: (Product | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Category, CategoryMetaData>);
  static copyOf(source: Category, mutator: (draft: MutableModel<Category, CategoryMetaData>) => MutableModel<Category, CategoryMetaData> | void): Category;
}

export declare class Shop {
  readonly id: string;
  readonly name: string;
  readonly cover?: string | null;
  readonly avatar?: string | null;
  readonly description?: string | null;
  readonly createdBy?: string | null;
  readonly updatedBy?: string | null;
  readonly products?: (Product | null)[] | null;
  readonly members?: (ShopMember | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Shop, ShopMetaData>);
  static copyOf(source: Shop, mutator: (draft: MutableModel<Shop, ShopMetaData>) => MutableModel<Shop, ShopMetaData> | void): Shop;
}

export declare class ShopMember {
  readonly id: string;
  readonly role: MemberRole | keyof typeof MemberRole;
  readonly shop?: Shop | null;
  readonly user?: User | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<ShopMember, ShopMemberMetaData>);
  static copyOf(source: ShopMember, mutator: (draft: MutableModel<ShopMember, ShopMemberMetaData>) => MutableModel<ShopMember, ShopMemberMetaData> | void): ShopMember;
}

export declare class User {
  readonly id: string;
  readonly name: string;
  readonly phone: string;
  readonly avatar?: string | null;
  readonly authID: string;
  readonly disabled?: boolean | null;
  readonly role: UserRole | keyof typeof UserRole;
  readonly shops?: (ShopMember | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class Banner {
  readonly id: string;
  readonly image?: string | null;
  readonly link?: string | null;
  readonly position: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Banner, BannerMetaData>);
  static copyOf(source: Banner, mutator: (draft: MutableModel<Banner, BannerMetaData>) => MutableModel<Banner, BannerMetaData> | void): Banner;
}