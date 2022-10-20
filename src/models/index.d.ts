import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type ProductMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CategoryMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ShopMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ShopUserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Product {
  readonly id: string;
  readonly name?: string | null;
  readonly image?: string | null;
  readonly price?: number | null;
  readonly description?: string | null;
  readonly createdBy?: string | null;
  readonly updatedBy?: string | null;
  readonly available?: boolean | null;
  readonly shopID: string;
  readonly category?: Category | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly productCategoryId?: string | null;
  constructor(init: ModelInit<Product, ProductMetaData>);
  static copyOf(source: Product, mutator: (draft: MutableModel<Product, ProductMetaData>) => MutableModel<Product, ProductMetaData> | void): Product;
}

export declare class Category {
  readonly id: string;
  readonly name: string;
  readonly image: string;
  readonly hidden?: boolean | null;
  readonly parent?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Category, CategoryMetaData>);
  static copyOf(source: Category, mutator: (draft: MutableModel<Category, CategoryMetaData>) => MutableModel<Category, CategoryMetaData> | void): Category;
}

export declare class Shop {
  readonly id: string;
  readonly name?: string | null;
  readonly cover?: string | null;
  readonly profile?: string | null;
  readonly users?: (ShopUser | null)[] | null;
  readonly products?: (Product | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Shop, ShopMetaData>);
  static copyOf(source: Shop, mutator: (draft: MutableModel<Shop, ShopMetaData>) => MutableModel<Shop, ShopMetaData> | void): Shop;
}

export declare class User {
  readonly id: string;
  readonly name: string;
  readonly phone?: string | null;
  readonly email?: string | null;
  readonly avatar?: string | null;
  readonly identity: string;
  readonly disabled?: boolean | null;
  readonly shops?: (ShopUser | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class ShopUser {
  readonly id: string;
  readonly shop: Shop;
  readonly user: User;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<ShopUser, ShopUserMetaData>);
  static copyOf(source: ShopUser, mutator: (draft: MutableModel<ShopUser, ShopUserMetaData>) => MutableModel<ShopUser, ShopUserMetaData> | void): ShopUser;
}