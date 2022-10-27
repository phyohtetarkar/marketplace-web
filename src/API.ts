/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type ModelCategoryConnection = {
  __typename: "ModelCategoryConnection",
  items:  Array<Category | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type Category = {
  __typename: "Category",
  id: string,
  name: string,
  image?: string | null,
  parent?: string | null,
  products?: ModelProductConnection | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type ModelProductConnection = {
  __typename: "ModelProductConnection",
  items:  Array<Product | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type Product = {
  __typename: "Product",
  id: string,
  name?: string | null,
  images?: Array< string | null > | null,
  price?: number | null,
  discount?: Discount | null,
  description?: string | null,
  createdBy?: string | null,
  updatedBy?: string | null,
  available?: boolean | null,
  categoryID: string,
  shopID: string,
  category?: Category | null,
  shop?: Shop | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type Discount = {
  __typename: "Discount",
  value?: number | null,
  type?: string | null,
};

export type Shop = {
  __typename: "Shop",
  id: string,
  name: string,
  cover?: string | null,
  avatar?: string | null,
  description?: string | null,
  createdBy?: string | null,
  updatedBy?: string | null,
  products?: ModelProductConnection | null,
  members?: ModelShopMemberConnection | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type ModelShopMemberConnection = {
  __typename: "ModelShopMemberConnection",
  items:  Array<ShopMember | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ShopMember = {
  __typename: "ShopMember",
  id: string,
  role: MemberRole,
  shopID: string,
  userID: string,
  shop?: Shop | null,
  user?: User | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  owner?: string | null,
};

export enum MemberRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
}


export type User = {
  __typename: "User",
  id: string,
  name: string,
  phone: string,
  avatar?: string | null,
  authID: string,
  disabled?: boolean | null,
  role: UserRole,
  shops?: ModelShopMemberConnection | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export enum UserRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  CONSUMER = "CONSUMER",
}


export type CreateProductInput = {
  id?: string | null,
  name?: string | null,
  images?: Array< string | null > | null,
  price?: number | null,
  discount?: DiscountInput | null,
  description?: string | null,
  createdBy?: string | null,
  updatedBy?: string | null,
  available?: boolean | null,
  categoryID: string,
  shopID: string,
  _version?: number | null,
};

export type DiscountInput = {
  value?: number | null,
  type?: string | null,
};

export type ModelProductConditionInput = {
  name?: ModelStringInput | null,
  images?: ModelStringInput | null,
  price?: ModelFloatInput | null,
  description?: ModelStringInput | null,
  createdBy?: ModelStringInput | null,
  updatedBy?: ModelStringInput | null,
  available?: ModelBooleanInput | null,
  categoryID?: ModelIDInput | null,
  shopID?: ModelIDInput | null,
  and?: Array< ModelProductConditionInput | null > | null,
  or?: Array< ModelProductConditionInput | null > | null,
  not?: ModelProductConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateProductInput = {
  id: string,
  name?: string | null,
  images?: Array< string | null > | null,
  price?: number | null,
  discount?: DiscountInput | null,
  description?: string | null,
  createdBy?: string | null,
  updatedBy?: string | null,
  available?: boolean | null,
  categoryID?: string | null,
  shopID?: string | null,
  _version?: number | null,
};

export type DeleteProductInput = {
  id: string,
  _version?: number | null,
};

export type CreateShopInput = {
  id?: string | null,
  name: string,
  cover?: string | null,
  avatar?: string | null,
  description?: string | null,
  createdBy?: string | null,
  updatedBy?: string | null,
  _version?: number | null,
};

export type ModelShopConditionInput = {
  name?: ModelStringInput | null,
  cover?: ModelStringInput | null,
  avatar?: ModelStringInput | null,
  description?: ModelStringInput | null,
  createdBy?: ModelStringInput | null,
  updatedBy?: ModelStringInput | null,
  and?: Array< ModelShopConditionInput | null > | null,
  or?: Array< ModelShopConditionInput | null > | null,
  not?: ModelShopConditionInput | null,
};

export type UpdateShopInput = {
  id: string,
  name?: string | null,
  cover?: string | null,
  avatar?: string | null,
  description?: string | null,
  createdBy?: string | null,
  updatedBy?: string | null,
  _version?: number | null,
};

export type DeleteShopInput = {
  id: string,
  _version?: number | null,
};

export type CreateUserInput = {
  id?: string | null,
  name: string,
  phone: string,
  avatar?: string | null,
  authID: string,
  disabled?: boolean | null,
  role: UserRole,
  _version?: number | null,
};

export type ModelUserConditionInput = {
  name?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  avatar?: ModelStringInput | null,
  authID?: ModelStringInput | null,
  disabled?: ModelBooleanInput | null,
  role?: ModelUserRoleInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelUserRoleInput = {
  eq?: UserRole | null,
  ne?: UserRole | null,
};

export type UpdateUserInput = {
  id: string,
  name?: string | null,
  phone?: string | null,
  avatar?: string | null,
  authID?: string | null,
  disabled?: boolean | null,
  role?: UserRole | null,
  _version?: number | null,
};

export type DeleteUserInput = {
  id: string,
  _version?: number | null,
};

export type CreateCategoryInput = {
  id?: string | null,
  name: string,
  image?: string | null,
  parent?: string | null,
  _version?: number | null,
};

export type ModelCategoryConditionInput = {
  name?: ModelStringInput | null,
  image?: ModelStringInput | null,
  parent?: ModelIDInput | null,
  and?: Array< ModelCategoryConditionInput | null > | null,
  or?: Array< ModelCategoryConditionInput | null > | null,
  not?: ModelCategoryConditionInput | null,
};

export type UpdateCategoryInput = {
  id: string,
  name?: string | null,
  image?: string | null,
  parent?: string | null,
  _version?: number | null,
};

export type DeleteCategoryInput = {
  id: string,
  _version?: number | null,
};

export type CreateShopMemberInput = {
  id?: string | null,
  role: MemberRole,
  shopID: string,
  userID: string,
  _version?: number | null,
};

export type ModelShopMemberConditionInput = {
  role?: ModelMemberRoleInput | null,
  shopID?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelShopMemberConditionInput | null > | null,
  or?: Array< ModelShopMemberConditionInput | null > | null,
  not?: ModelShopMemberConditionInput | null,
};

export type ModelMemberRoleInput = {
  eq?: MemberRole | null,
  ne?: MemberRole | null,
};

export type UpdateShopMemberInput = {
  id: string,
  role?: MemberRole | null,
  shopID?: string | null,
  userID?: string | null,
  _version?: number | null,
};

export type DeleteShopMemberInput = {
  id: string,
  _version?: number | null,
};

export type CreateBannerInput = {
  id?: string | null,
  image?: string | null,
  link?: string | null,
  position: number,
  _version?: number | null,
};

export type ModelBannerConditionInput = {
  image?: ModelStringInput | null,
  link?: ModelStringInput | null,
  position?: ModelIntInput | null,
  and?: Array< ModelBannerConditionInput | null > | null,
  or?: Array< ModelBannerConditionInput | null > | null,
  not?: ModelBannerConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Banner = {
  __typename: "Banner",
  id: string,
  image?: string | null,
  link?: string | null,
  position: number,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateBannerInput = {
  id: string,
  image?: string | null,
  link?: string | null,
  position?: number | null,
  _version?: number | null,
};

export type DeleteBannerInput = {
  id: string,
  _version?: number | null,
};

export type ModelProductFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  images?: ModelStringInput | null,
  price?: ModelFloatInput | null,
  description?: ModelStringInput | null,
  createdBy?: ModelStringInput | null,
  updatedBy?: ModelStringInput | null,
  available?: ModelBooleanInput | null,
  categoryID?: ModelIDInput | null,
  shopID?: ModelIDInput | null,
  and?: Array< ModelProductFilterInput | null > | null,
  or?: Array< ModelProductFilterInput | null > | null,
  not?: ModelProductFilterInput | null,
};

export type ModelShopFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  cover?: ModelStringInput | null,
  avatar?: ModelStringInput | null,
  description?: ModelStringInput | null,
  createdBy?: ModelStringInput | null,
  updatedBy?: ModelStringInput | null,
  and?: Array< ModelShopFilterInput | null > | null,
  or?: Array< ModelShopFilterInput | null > | null,
  not?: ModelShopFilterInput | null,
};

export type ModelShopConnection = {
  __typename: "ModelShopConnection",
  items:  Array<Shop | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  avatar?: ModelStringInput | null,
  authID?: ModelStringInput | null,
  disabled?: ModelBooleanInput | null,
  role?: ModelUserRoleInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelCategoryFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  image?: ModelStringInput | null,
  parent?: ModelIDInput | null,
  and?: Array< ModelCategoryFilterInput | null > | null,
  or?: Array< ModelCategoryFilterInput | null > | null,
  not?: ModelCategoryFilterInput | null,
};

export type ModelShopMemberFilterInput = {
  id?: ModelIDInput | null,
  role?: ModelMemberRoleInput | null,
  shopID?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelShopMemberFilterInput | null > | null,
  or?: Array< ModelShopMemberFilterInput | null > | null,
  not?: ModelShopMemberFilterInput | null,
};

export type ModelBannerFilterInput = {
  id?: ModelIDInput | null,
  image?: ModelStringInput | null,
  link?: ModelStringInput | null,
  position?: ModelIntInput | null,
  and?: Array< ModelBannerFilterInput | null > | null,
  or?: Array< ModelBannerFilterInput | null > | null,
  not?: ModelBannerFilterInput | null,
};

export type ModelBannerConnection = {
  __typename: "ModelBannerConnection",
  items:  Array<Banner | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelSubscriptionProductFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  images?: ModelSubscriptionStringInput | null,
  price?: ModelSubscriptionFloatInput | null,
  description?: ModelSubscriptionStringInput | null,
  createdBy?: ModelSubscriptionStringInput | null,
  updatedBy?: ModelSubscriptionStringInput | null,
  available?: ModelSubscriptionBooleanInput | null,
  categoryID?: ModelSubscriptionIDInput | null,
  shopID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionProductFilterInput | null > | null,
  or?: Array< ModelSubscriptionProductFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionShopFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  cover?: ModelSubscriptionStringInput | null,
  avatar?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  createdBy?: ModelSubscriptionStringInput | null,
  updatedBy?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionShopFilterInput | null > | null,
  or?: Array< ModelSubscriptionShopFilterInput | null > | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  phone?: ModelSubscriptionStringInput | null,
  avatar?: ModelSubscriptionStringInput | null,
  authID?: ModelSubscriptionStringInput | null,
  disabled?: ModelSubscriptionBooleanInput | null,
  role?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionCategoryFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  image?: ModelSubscriptionStringInput | null,
  parent?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionCategoryFilterInput | null > | null,
  or?: Array< ModelSubscriptionCategoryFilterInput | null > | null,
};

export type ModelSubscriptionShopMemberFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  role?: ModelSubscriptionStringInput | null,
  shopID?: ModelSubscriptionIDInput | null,
  userID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionShopMemberFilterInput | null > | null,
  or?: Array< ModelSubscriptionShopMemberFilterInput | null > | null,
};

export type ModelSubscriptionBannerFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  image?: ModelSubscriptionStringInput | null,
  link?: ModelSubscriptionStringInput | null,
  position?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionBannerFilterInput | null > | null,
  or?: Array< ModelSubscriptionBannerFilterInput | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type FetchCategoriesQuery = {
  listCategories?:  {
    __typename: "ModelCategoryConnection",
    items:  Array< {
      __typename: "Category",
      id: string,
      name: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CreateProductMutationVariables = {
  input: CreateProductInput,
  condition?: ModelProductConditionInput | null,
};

export type CreateProductMutation = {
  createProduct?:  {
    __typename: "Product",
    id: string,
    name?: string | null,
    images?: Array< string | null > | null,
    price?: number | null,
    discount?:  {
      __typename: "Discount",
      value?: number | null,
      type?: string | null,
    } | null,
    description?: string | null,
    createdBy?: string | null,
    updatedBy?: string | null,
    available?: boolean | null,
    categoryID: string,
    shopID: string,
    category?:  {
      __typename: "Category",
      id: string,
      name: string,
      image?: string | null,
      parent?: string | null,
      products?:  {
        __typename: "ModelProductConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    shop?:  {
      __typename: "Shop",
      id: string,
      name: string,
      cover?: string | null,
      avatar?: string | null,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      products?:  {
        __typename: "ModelProductConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      members?:  {
        __typename: "ModelShopMemberConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateProductMutationVariables = {
  input: UpdateProductInput,
  condition?: ModelProductConditionInput | null,
};

export type UpdateProductMutation = {
  updateProduct?:  {
    __typename: "Product",
    id: string,
    name?: string | null,
    images?: Array< string | null > | null,
    price?: number | null,
    discount?:  {
      __typename: "Discount",
      value?: number | null,
      type?: string | null,
    } | null,
    description?: string | null,
    createdBy?: string | null,
    updatedBy?: string | null,
    available?: boolean | null,
    categoryID: string,
    shopID: string,
    category?:  {
      __typename: "Category",
      id: string,
      name: string,
      image?: string | null,
      parent?: string | null,
      products?:  {
        __typename: "ModelProductConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    shop?:  {
      __typename: "Shop",
      id: string,
      name: string,
      cover?: string | null,
      avatar?: string | null,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      products?:  {
        __typename: "ModelProductConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      members?:  {
        __typename: "ModelShopMemberConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteProductMutationVariables = {
  input: DeleteProductInput,
  condition?: ModelProductConditionInput | null,
};

export type DeleteProductMutation = {
  deleteProduct?:  {
    __typename: "Product",
    id: string,
    name?: string | null,
    images?: Array< string | null > | null,
    price?: number | null,
    discount?:  {
      __typename: "Discount",
      value?: number | null,
      type?: string | null,
    } | null,
    description?: string | null,
    createdBy?: string | null,
    updatedBy?: string | null,
    available?: boolean | null,
    categoryID: string,
    shopID: string,
    category?:  {
      __typename: "Category",
      id: string,
      name: string,
      image?: string | null,
      parent?: string | null,
      products?:  {
        __typename: "ModelProductConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    shop?:  {
      __typename: "Shop",
      id: string,
      name: string,
      cover?: string | null,
      avatar?: string | null,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      products?:  {
        __typename: "ModelProductConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      members?:  {
        __typename: "ModelShopMemberConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateShopMutationVariables = {
  input: CreateShopInput,
  condition?: ModelShopConditionInput | null,
};

export type CreateShopMutation = {
  createShop?:  {
    __typename: "Shop",
    id: string,
    name: string,
    cover?: string | null,
    avatar?: string | null,
    description?: string | null,
    createdBy?: string | null,
    updatedBy?: string | null,
    products?:  {
      __typename: "ModelProductConnection",
      items:  Array< {
        __typename: "Product",
        id: string,
        name?: string | null,
        images?: Array< string | null > | null,
        price?: number | null,
        description?: string | null,
        createdBy?: string | null,
        updatedBy?: string | null,
        available?: boolean | null,
        categoryID: string,
        shopID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    members?:  {
      __typename: "ModelShopMemberConnection",
      items:  Array< {
        __typename: "ShopMember",
        id: string,
        role: MemberRole,
        shopID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateShopMutationVariables = {
  input: UpdateShopInput,
  condition?: ModelShopConditionInput | null,
};

export type UpdateShopMutation = {
  updateShop?:  {
    __typename: "Shop",
    id: string,
    name: string,
    cover?: string | null,
    avatar?: string | null,
    description?: string | null,
    createdBy?: string | null,
    updatedBy?: string | null,
    products?:  {
      __typename: "ModelProductConnection",
      items:  Array< {
        __typename: "Product",
        id: string,
        name?: string | null,
        images?: Array< string | null > | null,
        price?: number | null,
        description?: string | null,
        createdBy?: string | null,
        updatedBy?: string | null,
        available?: boolean | null,
        categoryID: string,
        shopID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    members?:  {
      __typename: "ModelShopMemberConnection",
      items:  Array< {
        __typename: "ShopMember",
        id: string,
        role: MemberRole,
        shopID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteShopMutationVariables = {
  input: DeleteShopInput,
  condition?: ModelShopConditionInput | null,
};

export type DeleteShopMutation = {
  deleteShop?:  {
    __typename: "Shop",
    id: string,
    name: string,
    cover?: string | null,
    avatar?: string | null,
    description?: string | null,
    createdBy?: string | null,
    updatedBy?: string | null,
    products?:  {
      __typename: "ModelProductConnection",
      items:  Array< {
        __typename: "Product",
        id: string,
        name?: string | null,
        images?: Array< string | null > | null,
        price?: number | null,
        description?: string | null,
        createdBy?: string | null,
        updatedBy?: string | null,
        available?: boolean | null,
        categoryID: string,
        shopID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    members?:  {
      __typename: "ModelShopMemberConnection",
      items:  Array< {
        __typename: "ShopMember",
        id: string,
        role: MemberRole,
        shopID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    name: string,
    phone: string,
    avatar?: string | null,
    authID: string,
    disabled?: boolean | null,
    role: UserRole,
    shops?:  {
      __typename: "ModelShopMemberConnection",
      items:  Array< {
        __typename: "ShopMember",
        id: string,
        role: MemberRole,
        shopID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    phone: string,
    avatar?: string | null,
    authID: string,
    disabled?: boolean | null,
    role: UserRole,
    shops?:  {
      __typename: "ModelShopMemberConnection",
      items:  Array< {
        __typename: "ShopMember",
        id: string,
        role: MemberRole,
        shopID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    name: string,
    phone: string,
    avatar?: string | null,
    authID: string,
    disabled?: boolean | null,
    role: UserRole,
    shops?:  {
      __typename: "ModelShopMemberConnection",
      items:  Array< {
        __typename: "ShopMember",
        id: string,
        role: MemberRole,
        shopID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateCategoryMutationVariables = {
  input: CreateCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type CreateCategoryMutation = {
  createCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    image?: string | null,
    parent?: string | null,
    products?:  {
      __typename: "ModelProductConnection",
      items:  Array< {
        __typename: "Product",
        id: string,
        name?: string | null,
        images?: Array< string | null > | null,
        price?: number | null,
        description?: string | null,
        createdBy?: string | null,
        updatedBy?: string | null,
        available?: boolean | null,
        categoryID: string,
        shopID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateCategoryMutationVariables = {
  input: UpdateCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type UpdateCategoryMutation = {
  updateCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    image?: string | null,
    parent?: string | null,
    products?:  {
      __typename: "ModelProductConnection",
      items:  Array< {
        __typename: "Product",
        id: string,
        name?: string | null,
        images?: Array< string | null > | null,
        price?: number | null,
        description?: string | null,
        createdBy?: string | null,
        updatedBy?: string | null,
        available?: boolean | null,
        categoryID: string,
        shopID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteCategoryMutationVariables = {
  input: DeleteCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type DeleteCategoryMutation = {
  deleteCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    image?: string | null,
    parent?: string | null,
    products?:  {
      __typename: "ModelProductConnection",
      items:  Array< {
        __typename: "Product",
        id: string,
        name?: string | null,
        images?: Array< string | null > | null,
        price?: number | null,
        description?: string | null,
        createdBy?: string | null,
        updatedBy?: string | null,
        available?: boolean | null,
        categoryID: string,
        shopID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateShopMemberMutationVariables = {
  input: CreateShopMemberInput,
  condition?: ModelShopMemberConditionInput | null,
};

export type CreateShopMemberMutation = {
  createShopMember?:  {
    __typename: "ShopMember",
    id: string,
    role: MemberRole,
    shopID: string,
    userID: string,
    shop?:  {
      __typename: "Shop",
      id: string,
      name: string,
      cover?: string | null,
      avatar?: string | null,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      products?:  {
        __typename: "ModelProductConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      members?:  {
        __typename: "ModelShopMemberConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      phone: string,
      avatar?: string | null,
      authID: string,
      disabled?: boolean | null,
      role: UserRole,
      shops?:  {
        __typename: "ModelShopMemberConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type UpdateShopMemberMutationVariables = {
  input: UpdateShopMemberInput,
  condition?: ModelShopMemberConditionInput | null,
};

export type UpdateShopMemberMutation = {
  updateShopMember?:  {
    __typename: "ShopMember",
    id: string,
    role: MemberRole,
    shopID: string,
    userID: string,
    shop?:  {
      __typename: "Shop",
      id: string,
      name: string,
      cover?: string | null,
      avatar?: string | null,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      products?:  {
        __typename: "ModelProductConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      members?:  {
        __typename: "ModelShopMemberConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      phone: string,
      avatar?: string | null,
      authID: string,
      disabled?: boolean | null,
      role: UserRole,
      shops?:  {
        __typename: "ModelShopMemberConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type DeleteShopMemberMutationVariables = {
  input: DeleteShopMemberInput,
  condition?: ModelShopMemberConditionInput | null,
};

export type DeleteShopMemberMutation = {
  deleteShopMember?:  {
    __typename: "ShopMember",
    id: string,
    role: MemberRole,
    shopID: string,
    userID: string,
    shop?:  {
      __typename: "Shop",
      id: string,
      name: string,
      cover?: string | null,
      avatar?: string | null,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      products?:  {
        __typename: "ModelProductConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      members?:  {
        __typename: "ModelShopMemberConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      phone: string,
      avatar?: string | null,
      authID: string,
      disabled?: boolean | null,
      role: UserRole,
      shops?:  {
        __typename: "ModelShopMemberConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type CreateBannerMutationVariables = {
  input: CreateBannerInput,
  condition?: ModelBannerConditionInput | null,
};

export type CreateBannerMutation = {
  createBanner?:  {
    __typename: "Banner",
    id: string,
    image?: string | null,
    link?: string | null,
    position: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateBannerMutationVariables = {
  input: UpdateBannerInput,
  condition?: ModelBannerConditionInput | null,
};

export type UpdateBannerMutation = {
  updateBanner?:  {
    __typename: "Banner",
    id: string,
    image?: string | null,
    link?: string | null,
    position: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteBannerMutationVariables = {
  input: DeleteBannerInput,
  condition?: ModelBannerConditionInput | null,
};

export type DeleteBannerMutation = {
  deleteBanner?:  {
    __typename: "Banner",
    id: string,
    image?: string | null,
    link?: string | null,
    position: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type GetProductQueryVariables = {
  id: string,
};

export type GetProductQuery = {
  getProduct?:  {
    __typename: "Product",
    id: string,
    name?: string | null,
    images?: Array< string | null > | null,
    price?: number | null,
    discount?:  {
      __typename: "Discount",
      value?: number | null,
      type?: string | null,
    } | null,
    description?: string | null,
    createdBy?: string | null,
    updatedBy?: string | null,
    available?: boolean | null,
    categoryID: string,
    shopID: string,
    category?:  {
      __typename: "Category",
      id: string,
      name: string,
      image?: string | null,
      parent?: string | null,
      products?:  {
        __typename: "ModelProductConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    shop?:  {
      __typename: "Shop",
      id: string,
      name: string,
      cover?: string | null,
      avatar?: string | null,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      products?:  {
        __typename: "ModelProductConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      members?:  {
        __typename: "ModelShopMemberConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListProductsQueryVariables = {
  filter?: ModelProductFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProductsQuery = {
  listProducts?:  {
    __typename: "ModelProductConnection",
    items:  Array< {
      __typename: "Product",
      id: string,
      name?: string | null,
      images?: Array< string | null > | null,
      price?: number | null,
      discount?:  {
        __typename: "Discount",
        value?: number | null,
        type?: string | null,
      } | null,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      available?: boolean | null,
      categoryID: string,
      shopID: string,
      category?:  {
        __typename: "Category",
        id: string,
        name: string,
        image?: string | null,
        parent?: string | null,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null,
      shop?:  {
        __typename: "Shop",
        id: string,
        name: string,
        cover?: string | null,
        avatar?: string | null,
        description?: string | null,
        createdBy?: string | null,
        updatedBy?: string | null,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncProductsQueryVariables = {
  filter?: ModelProductFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncProductsQuery = {
  syncProducts?:  {
    __typename: "ModelProductConnection",
    items:  Array< {
      __typename: "Product",
      id: string,
      name?: string | null,
      images?: Array< string | null > | null,
      price?: number | null,
      discount?:  {
        __typename: "Discount",
        value?: number | null,
        type?: string | null,
      } | null,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      available?: boolean | null,
      categoryID: string,
      shopID: string,
      category?:  {
        __typename: "Category",
        id: string,
        name: string,
        image?: string | null,
        parent?: string | null,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null,
      shop?:  {
        __typename: "Shop",
        id: string,
        name: string,
        cover?: string | null,
        avatar?: string | null,
        description?: string | null,
        createdBy?: string | null,
        updatedBy?: string | null,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetShopQueryVariables = {
  id: string,
};

export type GetShopQuery = {
  getShop?:  {
    __typename: "Shop",
    id: string,
    name: string,
    cover?: string | null,
    avatar?: string | null,
    description?: string | null,
    createdBy?: string | null,
    updatedBy?: string | null,
    products?:  {
      __typename: "ModelProductConnection",
      items:  Array< {
        __typename: "Product",
        id: string,
        name?: string | null,
        images?: Array< string | null > | null,
        price?: number | null,
        description?: string | null,
        createdBy?: string | null,
        updatedBy?: string | null,
        available?: boolean | null,
        categoryID: string,
        shopID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    members?:  {
      __typename: "ModelShopMemberConnection",
      items:  Array< {
        __typename: "ShopMember",
        id: string,
        role: MemberRole,
        shopID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListShopsQueryVariables = {
  filter?: ModelShopFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListShopsQuery = {
  listShops?:  {
    __typename: "ModelShopConnection",
    items:  Array< {
      __typename: "Shop",
      id: string,
      name: string,
      cover?: string | null,
      avatar?: string | null,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      products?:  {
        __typename: "ModelProductConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      members?:  {
        __typename: "ModelShopMemberConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncShopsQueryVariables = {
  filter?: ModelShopFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncShopsQuery = {
  syncShops?:  {
    __typename: "ModelShopConnection",
    items:  Array< {
      __typename: "Shop",
      id: string,
      name: string,
      cover?: string | null,
      avatar?: string | null,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      products?:  {
        __typename: "ModelProductConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      members?:  {
        __typename: "ModelShopMemberConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    name: string,
    phone: string,
    avatar?: string | null,
    authID: string,
    disabled?: boolean | null,
    role: UserRole,
    shops?:  {
      __typename: "ModelShopMemberConnection",
      items:  Array< {
        __typename: "ShopMember",
        id: string,
        role: MemberRole,
        shopID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name: string,
      phone: string,
      avatar?: string | null,
      authID: string,
      disabled?: boolean | null,
      role: UserRole,
      shops?:  {
        __typename: "ModelShopMemberConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncUsersQuery = {
  syncUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name: string,
      phone: string,
      avatar?: string | null,
      authID: string,
      disabled?: boolean | null,
      role: UserRole,
      shops?:  {
        __typename: "ModelShopMemberConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetCategoryQueryVariables = {
  id: string,
};

export type GetCategoryQuery = {
  getCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    image?: string | null,
    parent?: string | null,
    products?:  {
      __typename: "ModelProductConnection",
      items:  Array< {
        __typename: "Product",
        id: string,
        name?: string | null,
        images?: Array< string | null > | null,
        price?: number | null,
        description?: string | null,
        createdBy?: string | null,
        updatedBy?: string | null,
        available?: boolean | null,
        categoryID: string,
        shopID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListCategoriesQueryVariables = {
  filter?: ModelCategoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCategoriesQuery = {
  listCategories?:  {
    __typename: "ModelCategoryConnection",
    items:  Array< {
      __typename: "Category",
      id: string,
      name: string,
      image?: string | null,
      parent?: string | null,
      products?:  {
        __typename: "ModelProductConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncCategoriesQueryVariables = {
  filter?: ModelCategoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncCategoriesQuery = {
  syncCategories?:  {
    __typename: "ModelCategoryConnection",
    items:  Array< {
      __typename: "Category",
      id: string,
      name: string,
      image?: string | null,
      parent?: string | null,
      products?:  {
        __typename: "ModelProductConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetShopMemberQueryVariables = {
  id: string,
};

export type GetShopMemberQuery = {
  getShopMember?:  {
    __typename: "ShopMember",
    id: string,
    role: MemberRole,
    shopID: string,
    userID: string,
    shop?:  {
      __typename: "Shop",
      id: string,
      name: string,
      cover?: string | null,
      avatar?: string | null,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      products?:  {
        __typename: "ModelProductConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      members?:  {
        __typename: "ModelShopMemberConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      phone: string,
      avatar?: string | null,
      authID: string,
      disabled?: boolean | null,
      role: UserRole,
      shops?:  {
        __typename: "ModelShopMemberConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type ListShopMembersQueryVariables = {
  filter?: ModelShopMemberFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListShopMembersQuery = {
  listShopMembers?:  {
    __typename: "ModelShopMemberConnection",
    items:  Array< {
      __typename: "ShopMember",
      id: string,
      role: MemberRole,
      shopID: string,
      userID: string,
      shop?:  {
        __typename: "Shop",
        id: string,
        name: string,
        cover?: string | null,
        avatar?: string | null,
        description?: string | null,
        createdBy?: string | null,
        updatedBy?: string | null,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null,
      user?:  {
        __typename: "User",
        id: string,
        name: string,
        phone: string,
        avatar?: string | null,
        authID: string,
        disabled?: boolean | null,
        role: UserRole,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncShopMembersQueryVariables = {
  filter?: ModelShopMemberFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncShopMembersQuery = {
  syncShopMembers?:  {
    __typename: "ModelShopMemberConnection",
    items:  Array< {
      __typename: "ShopMember",
      id: string,
      role: MemberRole,
      shopID: string,
      userID: string,
      shop?:  {
        __typename: "Shop",
        id: string,
        name: string,
        cover?: string | null,
        avatar?: string | null,
        description?: string | null,
        createdBy?: string | null,
        updatedBy?: string | null,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null,
      user?:  {
        __typename: "User",
        id: string,
        name: string,
        phone: string,
        avatar?: string | null,
        authID: string,
        disabled?: boolean | null,
        role: UserRole,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetBannerQueryVariables = {
  id: string,
};

export type GetBannerQuery = {
  getBanner?:  {
    __typename: "Banner",
    id: string,
    image?: string | null,
    link?: string | null,
    position: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListBannersQueryVariables = {
  filter?: ModelBannerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListBannersQuery = {
  listBanners?:  {
    __typename: "ModelBannerConnection",
    items:  Array< {
      __typename: "Banner",
      id: string,
      image?: string | null,
      link?: string | null,
      position: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncBannersQueryVariables = {
  filter?: ModelBannerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncBannersQuery = {
  syncBanners?:  {
    __typename: "ModelBannerConnection",
    items:  Array< {
      __typename: "Banner",
      id: string,
      image?: string | null,
      link?: string | null,
      position: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateProductSubscriptionVariables = {
  filter?: ModelSubscriptionProductFilterInput | null,
};

export type OnCreateProductSubscription = {
  onCreateProduct?:  {
    __typename: "Product",
    id: string,
    name?: string | null,
    images?: Array< string | null > | null,
    price?: number | null,
    discount?:  {
      __typename: "Discount",
      value?: number | null,
      type?: string | null,
    } | null,
    description?: string | null,
    createdBy?: string | null,
    updatedBy?: string | null,
    available?: boolean | null,
    categoryID: string,
    shopID: string,
    category?:  {
      __typename: "Category",
      id: string,
      name: string,
      image?: string | null,
      parent?: string | null,
      products?:  {
        __typename: "ModelProductConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    shop?:  {
      __typename: "Shop",
      id: string,
      name: string,
      cover?: string | null,
      avatar?: string | null,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      products?:  {
        __typename: "ModelProductConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      members?:  {
        __typename: "ModelShopMemberConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateProductSubscriptionVariables = {
  filter?: ModelSubscriptionProductFilterInput | null,
};

export type OnUpdateProductSubscription = {
  onUpdateProduct?:  {
    __typename: "Product",
    id: string,
    name?: string | null,
    images?: Array< string | null > | null,
    price?: number | null,
    discount?:  {
      __typename: "Discount",
      value?: number | null,
      type?: string | null,
    } | null,
    description?: string | null,
    createdBy?: string | null,
    updatedBy?: string | null,
    available?: boolean | null,
    categoryID: string,
    shopID: string,
    category?:  {
      __typename: "Category",
      id: string,
      name: string,
      image?: string | null,
      parent?: string | null,
      products?:  {
        __typename: "ModelProductConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    shop?:  {
      __typename: "Shop",
      id: string,
      name: string,
      cover?: string | null,
      avatar?: string | null,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      products?:  {
        __typename: "ModelProductConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      members?:  {
        __typename: "ModelShopMemberConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteProductSubscriptionVariables = {
  filter?: ModelSubscriptionProductFilterInput | null,
};

export type OnDeleteProductSubscription = {
  onDeleteProduct?:  {
    __typename: "Product",
    id: string,
    name?: string | null,
    images?: Array< string | null > | null,
    price?: number | null,
    discount?:  {
      __typename: "Discount",
      value?: number | null,
      type?: string | null,
    } | null,
    description?: string | null,
    createdBy?: string | null,
    updatedBy?: string | null,
    available?: boolean | null,
    categoryID: string,
    shopID: string,
    category?:  {
      __typename: "Category",
      id: string,
      name: string,
      image?: string | null,
      parent?: string | null,
      products?:  {
        __typename: "ModelProductConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    shop?:  {
      __typename: "Shop",
      id: string,
      name: string,
      cover?: string | null,
      avatar?: string | null,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      products?:  {
        __typename: "ModelProductConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      members?:  {
        __typename: "ModelShopMemberConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateShopSubscriptionVariables = {
  filter?: ModelSubscriptionShopFilterInput | null,
};

export type OnCreateShopSubscription = {
  onCreateShop?:  {
    __typename: "Shop",
    id: string,
    name: string,
    cover?: string | null,
    avatar?: string | null,
    description?: string | null,
    createdBy?: string | null,
    updatedBy?: string | null,
    products?:  {
      __typename: "ModelProductConnection",
      items:  Array< {
        __typename: "Product",
        id: string,
        name?: string | null,
        images?: Array< string | null > | null,
        price?: number | null,
        description?: string | null,
        createdBy?: string | null,
        updatedBy?: string | null,
        available?: boolean | null,
        categoryID: string,
        shopID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    members?:  {
      __typename: "ModelShopMemberConnection",
      items:  Array< {
        __typename: "ShopMember",
        id: string,
        role: MemberRole,
        shopID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateShopSubscriptionVariables = {
  filter?: ModelSubscriptionShopFilterInput | null,
};

export type OnUpdateShopSubscription = {
  onUpdateShop?:  {
    __typename: "Shop",
    id: string,
    name: string,
    cover?: string | null,
    avatar?: string | null,
    description?: string | null,
    createdBy?: string | null,
    updatedBy?: string | null,
    products?:  {
      __typename: "ModelProductConnection",
      items:  Array< {
        __typename: "Product",
        id: string,
        name?: string | null,
        images?: Array< string | null > | null,
        price?: number | null,
        description?: string | null,
        createdBy?: string | null,
        updatedBy?: string | null,
        available?: boolean | null,
        categoryID: string,
        shopID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    members?:  {
      __typename: "ModelShopMemberConnection",
      items:  Array< {
        __typename: "ShopMember",
        id: string,
        role: MemberRole,
        shopID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteShopSubscriptionVariables = {
  filter?: ModelSubscriptionShopFilterInput | null,
};

export type OnDeleteShopSubscription = {
  onDeleteShop?:  {
    __typename: "Shop",
    id: string,
    name: string,
    cover?: string | null,
    avatar?: string | null,
    description?: string | null,
    createdBy?: string | null,
    updatedBy?: string | null,
    products?:  {
      __typename: "ModelProductConnection",
      items:  Array< {
        __typename: "Product",
        id: string,
        name?: string | null,
        images?: Array< string | null > | null,
        price?: number | null,
        description?: string | null,
        createdBy?: string | null,
        updatedBy?: string | null,
        available?: boolean | null,
        categoryID: string,
        shopID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    members?:  {
      __typename: "ModelShopMemberConnection",
      items:  Array< {
        __typename: "ShopMember",
        id: string,
        role: MemberRole,
        shopID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    phone: string,
    avatar?: string | null,
    authID: string,
    disabled?: boolean | null,
    role: UserRole,
    shops?:  {
      __typename: "ModelShopMemberConnection",
      items:  Array< {
        __typename: "ShopMember",
        id: string,
        role: MemberRole,
        shopID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    phone: string,
    avatar?: string | null,
    authID: string,
    disabled?: boolean | null,
    role: UserRole,
    shops?:  {
      __typename: "ModelShopMemberConnection",
      items:  Array< {
        __typename: "ShopMember",
        id: string,
        role: MemberRole,
        shopID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    name: string,
    phone: string,
    avatar?: string | null,
    authID: string,
    disabled?: boolean | null,
    role: UserRole,
    shops?:  {
      __typename: "ModelShopMemberConnection",
      items:  Array< {
        __typename: "ShopMember",
        id: string,
        role: MemberRole,
        shopID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateCategorySubscriptionVariables = {
  filter?: ModelSubscriptionCategoryFilterInput | null,
};

export type OnCreateCategorySubscription = {
  onCreateCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    image?: string | null,
    parent?: string | null,
    products?:  {
      __typename: "ModelProductConnection",
      items:  Array< {
        __typename: "Product",
        id: string,
        name?: string | null,
        images?: Array< string | null > | null,
        price?: number | null,
        description?: string | null,
        createdBy?: string | null,
        updatedBy?: string | null,
        available?: boolean | null,
        categoryID: string,
        shopID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateCategorySubscriptionVariables = {
  filter?: ModelSubscriptionCategoryFilterInput | null,
};

export type OnUpdateCategorySubscription = {
  onUpdateCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    image?: string | null,
    parent?: string | null,
    products?:  {
      __typename: "ModelProductConnection",
      items:  Array< {
        __typename: "Product",
        id: string,
        name?: string | null,
        images?: Array< string | null > | null,
        price?: number | null,
        description?: string | null,
        createdBy?: string | null,
        updatedBy?: string | null,
        available?: boolean | null,
        categoryID: string,
        shopID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteCategorySubscriptionVariables = {
  filter?: ModelSubscriptionCategoryFilterInput | null,
};

export type OnDeleteCategorySubscription = {
  onDeleteCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    image?: string | null,
    parent?: string | null,
    products?:  {
      __typename: "ModelProductConnection",
      items:  Array< {
        __typename: "Product",
        id: string,
        name?: string | null,
        images?: Array< string | null > | null,
        price?: number | null,
        description?: string | null,
        createdBy?: string | null,
        updatedBy?: string | null,
        available?: boolean | null,
        categoryID: string,
        shopID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateShopMemberSubscriptionVariables = {
  filter?: ModelSubscriptionShopMemberFilterInput | null,
  owner?: string | null,
};

export type OnCreateShopMemberSubscription = {
  onCreateShopMember?:  {
    __typename: "ShopMember",
    id: string,
    role: MemberRole,
    shopID: string,
    userID: string,
    shop?:  {
      __typename: "Shop",
      id: string,
      name: string,
      cover?: string | null,
      avatar?: string | null,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      products?:  {
        __typename: "ModelProductConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      members?:  {
        __typename: "ModelShopMemberConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      phone: string,
      avatar?: string | null,
      authID: string,
      disabled?: boolean | null,
      role: UserRole,
      shops?:  {
        __typename: "ModelShopMemberConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnUpdateShopMemberSubscriptionVariables = {
  filter?: ModelSubscriptionShopMemberFilterInput | null,
  owner?: string | null,
};

export type OnUpdateShopMemberSubscription = {
  onUpdateShopMember?:  {
    __typename: "ShopMember",
    id: string,
    role: MemberRole,
    shopID: string,
    userID: string,
    shop?:  {
      __typename: "Shop",
      id: string,
      name: string,
      cover?: string | null,
      avatar?: string | null,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      products?:  {
        __typename: "ModelProductConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      members?:  {
        __typename: "ModelShopMemberConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      phone: string,
      avatar?: string | null,
      authID: string,
      disabled?: boolean | null,
      role: UserRole,
      shops?:  {
        __typename: "ModelShopMemberConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnDeleteShopMemberSubscriptionVariables = {
  filter?: ModelSubscriptionShopMemberFilterInput | null,
  owner?: string | null,
};

export type OnDeleteShopMemberSubscription = {
  onDeleteShopMember?:  {
    __typename: "ShopMember",
    id: string,
    role: MemberRole,
    shopID: string,
    userID: string,
    shop?:  {
      __typename: "Shop",
      id: string,
      name: string,
      cover?: string | null,
      avatar?: string | null,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      products?:  {
        __typename: "ModelProductConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      members?:  {
        __typename: "ModelShopMemberConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      phone: string,
      avatar?: string | null,
      authID: string,
      disabled?: boolean | null,
      role: UserRole,
      shops?:  {
        __typename: "ModelShopMemberConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnCreateBannerSubscriptionVariables = {
  filter?: ModelSubscriptionBannerFilterInput | null,
};

export type OnCreateBannerSubscription = {
  onCreateBanner?:  {
    __typename: "Banner",
    id: string,
    image?: string | null,
    link?: string | null,
    position: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateBannerSubscriptionVariables = {
  filter?: ModelSubscriptionBannerFilterInput | null,
};

export type OnUpdateBannerSubscription = {
  onUpdateBanner?:  {
    __typename: "Banner",
    id: string,
    image?: string | null,
    link?: string | null,
    position: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteBannerSubscriptionVariables = {
  filter?: ModelSubscriptionBannerFilterInput | null,
};

export type OnDeleteBannerSubscription = {
  onDeleteBanner?:  {
    __typename: "Banner",
    id: string,
    image?: string | null,
    link?: string | null,
    position: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};
