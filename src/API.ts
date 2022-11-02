/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateCartItemInput = {
  id?: string | null,
  quantity?: number | null,
  userID: string,
  productID: string,
  owner?: string | null,
};

export type ModelCartItemConditionInput = {
  quantity?: ModelIntInput | null,
  userID?: ModelIDInput | null,
  productID?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelCartItemConditionInput | null > | null,
  or?: Array< ModelCartItemConditionInput | null > | null,
  not?: ModelCartItemConditionInput | null,
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

export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
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

export type CartItem = {
  __typename: "CartItem",
  id: string,
  quantity?: number | null,
  userID: string,
  productID: string,
  product?: Product | null,
  owner?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type Product = {
  __typename: "Product",
  id: string,
  name: string,
  slug: string,
  images?: Array< string | null > | null,
  price: number,
  discount?: Discount | null,
  description?: string | null,
  createdBy?: string | null,
  updatedBy?: string | null,
  available?: boolean | null,
  suspended?: boolean | null,
  newArrival?: boolean | null,
  deleted?: boolean | null,
  mainCategoryID: string,
  subCategoryID: string,
  categoryID: string,
  shopID: string,
  category?: Category | null,
  shop?: Shop | null,
  favoriteUsers?: ModelFavoriteProductConnection | null,
  cartItems?: ModelCartItemConnection | null,
  type?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type Discount = {
  __typename: "Discount",
  value?: number | null,
  type?: string | null,
};

export type Category = {
  __typename: "Category",
  id: string,
  name: string,
  slug: string,
  image?: string | null,
  categoryID?: string | null,
  products?: ModelProductConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelProductConnection = {
  __typename: "ModelProductConnection",
  items:  Array<Product | null >,
  nextToken?: string | null,
};

export type Shop = {
  __typename: "Shop",
  id: string,
  name: string,
  slug: string,
  headline?: string | null,
  cover?: string | null,
  avatar?: string | null,
  description?: string | null,
  createdBy?: string | null,
  updatedBy?: string | null,
  suspended?: boolean | null,
  recommended?: boolean | null,
  products?: ModelProductConnection | null,
  members?: ModelShopMemberConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelShopMemberConnection = {
  __typename: "ModelShopMemberConnection",
  items:  Array<ShopMember | null >,
  nextToken?: string | null,
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
  email?: string | null,
  avatar?: string | null,
  disabled?: boolean | null,
  role: UserRole,
  shops?: ModelShopMemberConnection | null,
  addresses?: ModelUserAddressConnection | null,
  cartItems?: ModelCartItemConnection | null,
  favoriteProducts?: ModelFavoriteProductConnection | null,
  createdAt: string,
  updatedAt: string,
};

export enum UserRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  CONSUMER = "CONSUMER",
}


export type ModelUserAddressConnection = {
  __typename: "ModelUserAddressConnection",
  items:  Array<UserAddress | null >,
  nextToken?: string | null,
};

export type UserAddress = {
  __typename: "UserAddress",
  id: string,
  city: string,
  township: string,
  address: string,
  primary?: boolean | null,
  userID: string,
  createdAt: string,
  updatedAt: string,
};

export type ModelCartItemConnection = {
  __typename: "ModelCartItemConnection",
  items:  Array<CartItem | null >,
  nextToken?: string | null,
};

export type ModelFavoriteProductConnection = {
  __typename: "ModelFavoriteProductConnection",
  items:  Array<FavoriteProduct | null >,
  nextToken?: string | null,
};

export type FavoriteProduct = {
  __typename: "FavoriteProduct",
  id: string,
  userID: string,
  productID: string,
  product?: Product | null,
  owner?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type DeleteCartItemInput = {
  id: string,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelCartItemFilterInput = {
  id?: ModelIDInput | null,
  quantity?: ModelIntInput | null,
  userID?: ModelIDInput | null,
  productID?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelCartItemFilterInput | null > | null,
  or?: Array< ModelCartItemFilterInput | null > | null,
  not?: ModelCartItemFilterInput | null,
};

export type ModelCategoryFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  slug?: ModelStringInput | null,
  image?: ModelStringInput | null,
  categoryID?: ModelIDInput | null,
  and?: Array< ModelCategoryFilterInput | null > | null,
  or?: Array< ModelCategoryFilterInput | null > | null,
  not?: ModelCategoryFilterInput | null,
};

export type ModelCategoryConnection = {
  __typename: "ModelCategoryConnection",
  items:  Array<Category | null >,
  nextToken?: string | null,
};

export type CreateFavoriteProductInput = {
  id?: string | null,
  userID: string,
  productID: string,
  owner?: string | null,
};

export type ModelFavoriteProductConditionInput = {
  userID?: ModelIDInput | null,
  productID?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelFavoriteProductConditionInput | null > | null,
  or?: Array< ModelFavoriteProductConditionInput | null > | null,
  not?: ModelFavoriteProductConditionInput | null,
};

export type DeleteFavoriteProductInput = {
  id: string,
};

export type ModelFavoriteProductFilterInput = {
  id?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  productID?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelFavoriteProductFilterInput | null > | null,
  or?: Array< ModelFavoriteProductFilterInput | null > | null,
  not?: ModelFavoriteProductFilterInput | null,
};

export type ModelProductFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  slug?: ModelStringInput | null,
  images?: ModelStringInput | null,
  price?: ModelFloatInput | null,
  description?: ModelStringInput | null,
  createdBy?: ModelStringInput | null,
  updatedBy?: ModelStringInput | null,
  available?: ModelBooleanInput | null,
  suspended?: ModelBooleanInput | null,
  newArrival?: ModelBooleanInput | null,
  deleted?: ModelBooleanInput | null,
  mainCategoryID?: ModelIDInput | null,
  subCategoryID?: ModelIDInput | null,
  categoryID?: ModelIDInput | null,
  shopID?: ModelIDInput | null,
  type?: ModelStringInput | null,
  and?: Array< ModelProductFilterInput | null > | null,
  or?: Array< ModelProductFilterInput | null > | null,
  not?: ModelProductFilterInput | null,
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

export type ModelFloatKeyConditionInput = {
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelShopFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  slug?: ModelStringInput | null,
  headline?: ModelStringInput | null,
  cover?: ModelStringInput | null,
  avatar?: ModelStringInput | null,
  description?: ModelStringInput | null,
  createdBy?: ModelStringInput | null,
  updatedBy?: ModelStringInput | null,
  suspended?: ModelBooleanInput | null,
  recommended?: ModelBooleanInput | null,
  and?: Array< ModelShopFilterInput | null > | null,
  or?: Array< ModelShopFilterInput | null > | null,
  not?: ModelShopFilterInput | null,
};

export type ModelShopConnection = {
  __typename: "ModelShopConnection",
  items:  Array<Shop | null >,
  nextToken?: string | null,
};

export type CreateProductInput = {
  id?: string | null,
  name: string,
  slug: string,
  images?: Array< string | null > | null,
  price: number,
  discount?: DiscountInput | null,
  description?: string | null,
  createdBy?: string | null,
  updatedBy?: string | null,
  available?: boolean | null,
  suspended?: boolean | null,
  newArrival?: boolean | null,
  deleted?: boolean | null,
  mainCategoryID: string,
  subCategoryID: string,
  categoryID: string,
  shopID: string,
  type?: string | null,
};

export type DiscountInput = {
  value?: number | null,
  type?: string | null,
};

export type ModelProductConditionInput = {
  name?: ModelStringInput | null,
  slug?: ModelStringInput | null,
  images?: ModelStringInput | null,
  price?: ModelFloatInput | null,
  description?: ModelStringInput | null,
  createdBy?: ModelStringInput | null,
  updatedBy?: ModelStringInput | null,
  available?: ModelBooleanInput | null,
  suspended?: ModelBooleanInput | null,
  newArrival?: ModelBooleanInput | null,
  deleted?: ModelBooleanInput | null,
  mainCategoryID?: ModelIDInput | null,
  subCategoryID?: ModelIDInput | null,
  categoryID?: ModelIDInput | null,
  shopID?: ModelIDInput | null,
  type?: ModelStringInput | null,
  and?: Array< ModelProductConditionInput | null > | null,
  or?: Array< ModelProductConditionInput | null > | null,
  not?: ModelProductConditionInput | null,
};

export type UpdateProductInput = {
  id: string,
  name?: string | null,
  slug?: string | null,
  images?: Array< string | null > | null,
  price?: number | null,
  discount?: DiscountInput | null,
  description?: string | null,
  createdBy?: string | null,
  updatedBy?: string | null,
  available?: boolean | null,
  suspended?: boolean | null,
  newArrival?: boolean | null,
  deleted?: boolean | null,
  mainCategoryID?: string | null,
  subCategoryID?: string | null,
  categoryID?: string | null,
  shopID?: string | null,
  type?: string | null,
};

export type DeleteProductInput = {
  id: string,
};

export type CreateShopInput = {
  id?: string | null,
  name: string,
  slug: string,
  headline?: string | null,
  cover?: string | null,
  avatar?: string | null,
  description?: string | null,
  createdBy?: string | null,
  updatedBy?: string | null,
  suspended?: boolean | null,
  recommended?: boolean | null,
};

export type ModelShopConditionInput = {
  name?: ModelStringInput | null,
  slug?: ModelStringInput | null,
  headline?: ModelStringInput | null,
  cover?: ModelStringInput | null,
  avatar?: ModelStringInput | null,
  description?: ModelStringInput | null,
  createdBy?: ModelStringInput | null,
  updatedBy?: ModelStringInput | null,
  suspended?: ModelBooleanInput | null,
  recommended?: ModelBooleanInput | null,
  and?: Array< ModelShopConditionInput | null > | null,
  or?: Array< ModelShopConditionInput | null > | null,
  not?: ModelShopConditionInput | null,
};

export type UpdateShopInput = {
  id: string,
  name?: string | null,
  slug?: string | null,
  headline?: string | null,
  cover?: string | null,
  avatar?: string | null,
  description?: string | null,
  createdBy?: string | null,
  updatedBy?: string | null,
  suspended?: boolean | null,
  recommended?: boolean | null,
};

export type DeleteShopInput = {
  id: string,
};

export type CreateUserInput = {
  id?: string | null,
  name: string,
  phone: string,
  email?: string | null,
  avatar?: string | null,
  disabled?: boolean | null,
  role: UserRole,
};

export type ModelUserConditionInput = {
  name?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  email?: ModelStringInput | null,
  avatar?: ModelStringInput | null,
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
  email?: string | null,
  avatar?: string | null,
  disabled?: boolean | null,
  role?: UserRole | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateCategoryInput = {
  id?: string | null,
  name: string,
  slug: string,
  image?: string | null,
  categoryID?: string | null,
};

export type ModelCategoryConditionInput = {
  name?: ModelStringInput | null,
  slug?: ModelStringInput | null,
  image?: ModelStringInput | null,
  categoryID?: ModelIDInput | null,
  and?: Array< ModelCategoryConditionInput | null > | null,
  or?: Array< ModelCategoryConditionInput | null > | null,
  not?: ModelCategoryConditionInput | null,
};

export type UpdateCategoryInput = {
  id: string,
  name?: string | null,
  slug?: string | null,
  image?: string | null,
  categoryID?: string | null,
};

export type DeleteCategoryInput = {
  id: string,
};

export type CreateShopMemberInput = {
  id?: string | null,
  role: MemberRole,
  shopID: string,
  userID: string,
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
};

export type DeleteShopMemberInput = {
  id: string,
};

export type CreateBannerInput = {
  id?: string | null,
  image?: string | null,
  link?: string | null,
  position: number,
};

export type ModelBannerConditionInput = {
  image?: ModelStringInput | null,
  link?: ModelStringInput | null,
  position?: ModelIntInput | null,
  and?: Array< ModelBannerConditionInput | null > | null,
  or?: Array< ModelBannerConditionInput | null > | null,
  not?: ModelBannerConditionInput | null,
};

export type Banner = {
  __typename: "Banner",
  id: string,
  image?: string | null,
  link?: string | null,
  position: number,
  createdAt: string,
  updatedAt: string,
};

export type UpdateBannerInput = {
  id: string,
  image?: string | null,
  link?: string | null,
  position?: number | null,
};

export type DeleteBannerInput = {
  id: string,
};

export type CreateUserAddressInput = {
  id?: string | null,
  city: string,
  township: string,
  address: string,
  primary?: boolean | null,
  userID: string,
};

export type ModelUserAddressConditionInput = {
  city?: ModelStringInput | null,
  township?: ModelStringInput | null,
  address?: ModelStringInput | null,
  primary?: ModelBooleanInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelUserAddressConditionInput | null > | null,
  or?: Array< ModelUserAddressConditionInput | null > | null,
  not?: ModelUserAddressConditionInput | null,
};

export type UpdateUserAddressInput = {
  id: string,
  city?: string | null,
  township?: string | null,
  address?: string | null,
  primary?: boolean | null,
  userID?: string | null,
};

export type DeleteUserAddressInput = {
  id: string,
};

export type UpdateCartItemInput = {
  id: string,
  quantity?: number | null,
  userID?: string | null,
  productID?: string | null,
  owner?: string | null,
};

export type UpdateFavoriteProductInput = {
  id: string,
  userID?: string | null,
  productID?: string | null,
  owner?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  email?: ModelStringInput | null,
  avatar?: ModelStringInput | null,
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
};

export type ModelUserAddressFilterInput = {
  id?: ModelIDInput | null,
  city?: ModelStringInput | null,
  township?: ModelStringInput | null,
  address?: ModelStringInput | null,
  primary?: ModelBooleanInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelUserAddressFilterInput | null > | null,
  or?: Array< ModelUserAddressFilterInput | null > | null,
  not?: ModelUserAddressFilterInput | null,
};

export type ModelSubscriptionProductFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  slug?: ModelSubscriptionStringInput | null,
  images?: ModelSubscriptionStringInput | null,
  price?: ModelSubscriptionFloatInput | null,
  description?: ModelSubscriptionStringInput | null,
  createdBy?: ModelSubscriptionStringInput | null,
  updatedBy?: ModelSubscriptionStringInput | null,
  available?: ModelSubscriptionBooleanInput | null,
  suspended?: ModelSubscriptionBooleanInput | null,
  newArrival?: ModelSubscriptionBooleanInput | null,
  deleted?: ModelSubscriptionBooleanInput | null,
  mainCategoryID?: ModelSubscriptionIDInput | null,
  subCategoryID?: ModelSubscriptionIDInput | null,
  categoryID?: ModelSubscriptionIDInput | null,
  shopID?: ModelSubscriptionIDInput | null,
  type?: ModelSubscriptionStringInput | null,
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
  slug?: ModelSubscriptionStringInput | null,
  headline?: ModelSubscriptionStringInput | null,
  cover?: ModelSubscriptionStringInput | null,
  avatar?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  createdBy?: ModelSubscriptionStringInput | null,
  updatedBy?: ModelSubscriptionStringInput | null,
  suspended?: ModelSubscriptionBooleanInput | null,
  recommended?: ModelSubscriptionBooleanInput | null,
  and?: Array< ModelSubscriptionShopFilterInput | null > | null,
  or?: Array< ModelSubscriptionShopFilterInput | null > | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  phone?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  avatar?: ModelSubscriptionStringInput | null,
  disabled?: ModelSubscriptionBooleanInput | null,
  role?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionCategoryFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  slug?: ModelSubscriptionStringInput | null,
  image?: ModelSubscriptionStringInput | null,
  categoryID?: ModelSubscriptionIDInput | null,
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

export type ModelSubscriptionUserAddressFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  city?: ModelSubscriptionStringInput | null,
  township?: ModelSubscriptionStringInput | null,
  address?: ModelSubscriptionStringInput | null,
  primary?: ModelSubscriptionBooleanInput | null,
  userID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionUserAddressFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserAddressFilterInput | null > | null,
};

export type ModelSubscriptionCartItemFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  quantity?: ModelSubscriptionIntInput | null,
  userID?: ModelSubscriptionIDInput | null,
  productID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionCartItemFilterInput | null > | null,
  or?: Array< ModelSubscriptionCartItemFilterInput | null > | null,
};

export type ModelSubscriptionFavoriteProductFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  userID?: ModelSubscriptionIDInput | null,
  productID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionFavoriteProductFilterInput | null > | null,
  or?: Array< ModelSubscriptionFavoriteProductFilterInput | null > | null,
};

export type AddProductToCartMutationVariables = {
  input: CreateCartItemInput,
  condition?: ModelCartItemConditionInput | null,
};

export type AddProductToCartMutation = {
  createCartItem?:  {
    __typename: "CartItem",
    id: string,
    quantity?: number | null,
    userID: string,
    productID: string,
  } | null,
};

export type RemoveProductFromCartMutationVariables = {
  input: DeleteCartItemInput,
  condition?: ModelCartItemConditionInput | null,
};

export type RemoveProductFromCartMutation = {
  deleteCartItem?:  {
    __typename: "CartItem",
    id: string,
  } | null,
};

export type FindCartItemsByUserQueryVariables = {
  userID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCartItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type FindCartItemsByUserQuery = {
  cartItemsByUser?:  {
    __typename: "ModelCartItemConnection",
    items:  Array< {
      __typename: "CartItem",
      id: string,
      quantity?: number | null,
      userID: string,
      product?:  {
        __typename: "Product",
        id: string,
        name: string,
        slug: string,
        images?: Array< string | null > | null,
        price: number,
        category?:  {
          __typename: "Category",
          id: string,
          name: string,
          slug: string,
        } | null,
        shop?:  {
          __typename: "Shop",
          id: string,
          name: string,
          slug: string,
        } | null,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type FindCategoriesQueryVariables = {
  filter?: ModelCategoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type FindCategoriesQuery = {
  listCategories?:  {
    __typename: "ModelCategoryConnection",
    items:  Array< {
      __typename: "Category",
      id: string,
      name: string,
      slug: string,
      image?: string | null,
      categoryID?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type AddFavoriteProductMutationVariables = {
  input: CreateFavoriteProductInput,
  condition?: ModelFavoriteProductConditionInput | null,
};

export type AddFavoriteProductMutation = {
  createFavoriteProduct?:  {
    __typename: "FavoriteProduct",
    id: string,
    userID: string,
    productID: string,
  } | null,
};

export type RemoveFavoriteProductMutationVariables = {
  input: DeleteFavoriteProductInput,
  condition?: ModelFavoriteProductConditionInput | null,
};

export type RemoveFavoriteProductMutation = {
  deleteFavoriteProduct?:  {
    __typename: "FavoriteProduct",
    id: string,
  } | null,
};

export type FindFavoriteProductsByUserQueryVariables = {
  userID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelFavoriteProductFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type FindFavoriteProductsByUserQuery = {
  favoriteProductsByUser?:  {
    __typename: "ModelFavoriteProductConnection",
    items:  Array< {
      __typename: "FavoriteProduct",
      id: string,
      userID: string,
      product?:  {
        __typename: "Product",
        id: string,
        name: string,
        slug: string,
        price: number,
        images?: Array< string | null > | null,
        available?: boolean | null,
        description?: string | null,
        discount?:  {
          __typename: "Discount",
          type?: string | null,
          value?: number | null,
        } | null,
        category?:  {
          __typename: "Category",
          id: string,
          name: string,
          slug: string,
        } | null,
        shop?:  {
          __typename: "Shop",
          id: string,
          name: string,
          avatar?: string | null,
          slug: string,
        } | null,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type FindProductByIdQueryVariables = {
  id: string,
};

export type FindProductByIdQuery = {
  getProduct?:  {
    __typename: "Product",
    id: string,
    name: string,
    slug: string,
    price: number,
    images?: Array< string | null > | null,
    available?: boolean | null,
    description?: string | null,
    mainCategoryID: string,
    subCategoryID: string,
    discount?:  {
      __typename: "Discount",
      type?: string | null,
      value?: number | null,
    } | null,
    category?:  {
      __typename: "Category",
      id: string,
      name: string,
      slug: string,
    } | null,
    shop?:  {
      __typename: "Shop",
      id: string,
      name: string,
      avatar?: string | null,
      slug: string,
    } | null,
  } | null,
};

export type FindProductBySlugQueryVariables = {
  slug: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelProductFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type FindProductBySlugQuery = {
  getProductBySlug?:  {
    __typename: "ModelProductConnection",
    items:  Array< {
      __typename: "Product",
      id: string,
      name: string,
      slug: string,
      price: number,
      images?: Array< string | null > | null,
      available?: boolean | null,
      description?: string | null,
      mainCategoryID: string,
      subCategoryID: string,
      discount?:  {
        __typename: "Discount",
        type?: string | null,
        value?: number | null,
      } | null,
      category?:  {
        __typename: "Category",
        id: string,
        name: string,
        slug: string,
      } | null,
      shop?:  {
        __typename: "Shop",
        id: string,
        name: string,
        avatar?: string | null,
        slug: string,
      } | null,
    } | null >,
  } | null,
};

export type FindProductsQueryVariables = {
  filter?: ModelProductFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type FindProductsQuery = {
  listProducts?:  {
    __typename: "ModelProductConnection",
    items:  Array< {
      __typename: "Product",
      id: string,
      name: string,
      slug: string,
      price: number,
      images?: Array< string | null > | null,
      available?: boolean | null,
      description?: string | null,
      mainCategoryID: string,
      subCategoryID: string,
      discount?:  {
        __typename: "Discount",
        type?: string | null,
        value?: number | null,
      } | null,
      category?:  {
        __typename: "Category",
        id: string,
        name: string,
        slug: string,
      } | null,
      shop?:  {
        __typename: "Shop",
        id: string,
        name: string,
        avatar?: string | null,
        slug: string,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type FindProductsOrderByPriceQueryVariables = {
  type: string,
  price?: ModelFloatKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelProductFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type FindProductsOrderByPriceQuery = {
  productsByPrice?:  {
    __typename: "ModelProductConnection",
    items:  Array< {
      __typename: "Product",
      id: string,
      name: string,
      slug: string,
      price: number,
      images?: Array< string | null > | null,
      available?: boolean | null,
      description?: string | null,
      mainCategoryID: string,
      subCategoryID: string,
      discount?:  {
        __typename: "Discount",
        type?: string | null,
        value?: number | null,
      } | null,
      category?:  {
        __typename: "Category",
        id: string,
        name: string,
        slug: string,
      } | null,
      shop?:  {
        __typename: "Shop",
        id: string,
        name: string,
        avatar?: string | null,
        slug: string,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetShopByIdQueryVariables = {
  id: string,
};

export type GetShopByIdQuery = {
  getShop?:  {
    __typename: "Shop",
    id: string,
    name: string,
    slug: string,
    headline?: string | null,
    cover?: string | null,
    avatar?: string | null,
    description?: string | null,
    createdBy?: string | null,
    updatedBy?: string | null,
    suspended?: boolean | null,
    recommended?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type FindShopBySlugQueryVariables = {
  slug: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelShopFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type FindShopBySlugQuery = {
  getShopBySlug?:  {
    __typename: "ModelShopConnection",
    items:  Array< {
      __typename: "Shop",
      id: string,
      name: string,
      slug: string,
      headline?: string | null,
      cover?: string | null,
      avatar?: string | null,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      suspended?: boolean | null,
      recommended?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
  } | null,
};

export type FindShopsQueryVariables = {
  filter?: ModelShopFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type FindShopsQuery = {
  listShops?:  {
    __typename: "ModelShopConnection",
    items:  Array< {
      __typename: "Shop",
      id: string,
      name: string,
      slug: string,
      headline?: string | null,
      cover?: string | null,
      avatar?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      suspended?: boolean | null,
      recommended?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserByIdQueryVariables = {
  id: string,
};

export type GetUserByIdQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    name: string,
    phone: string,
    email?: string | null,
    avatar?: string | null,
    disabled?: boolean | null,
    role: UserRole,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCartItemMutationVariables = {
  input: DeleteCartItemInput,
  condition?: ModelCartItemConditionInput | null,
};

export type DeleteCartItemMutation = {
  deleteCartItem?:  {
    __typename: "CartItem",
    id: string,
    quantity?: number | null,
    userID: string,
    productID: string,
    product?:  {
      __typename: "Product",
      id: string,
      name: string,
      slug: string,
      images?: Array< string | null > | null,
      price: number,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      available?: boolean | null,
      suspended?: boolean | null,
      newArrival?: boolean | null,
      deleted?: boolean | null,
      mainCategoryID: string,
      subCategoryID: string,
      categoryID: string,
      shopID: string,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteFavoriteProductMutationVariables = {
  input: DeleteFavoriteProductInput,
  condition?: ModelFavoriteProductConditionInput | null,
};

export type DeleteFavoriteProductMutation = {
  deleteFavoriteProduct?:  {
    __typename: "FavoriteProduct",
    id: string,
    userID: string,
    productID: string,
    product?:  {
      __typename: "Product",
      id: string,
      name: string,
      slug: string,
      images?: Array< string | null > | null,
      price: number,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      available?: boolean | null,
      suspended?: boolean | null,
      newArrival?: boolean | null,
      deleted?: boolean | null,
      mainCategoryID: string,
      subCategoryID: string,
      categoryID: string,
      shopID: string,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
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
    name: string,
    slug: string,
    images?: Array< string | null > | null,
    price: number,
    discount?:  {
      __typename: "Discount",
      value?: number | null,
      type?: string | null,
    } | null,
    description?: string | null,
    createdBy?: string | null,
    updatedBy?: string | null,
    available?: boolean | null,
    suspended?: boolean | null,
    newArrival?: boolean | null,
    deleted?: boolean | null,
    mainCategoryID: string,
    subCategoryID: string,
    categoryID: string,
    shopID: string,
    category?:  {
      __typename: "Category",
      id: string,
      name: string,
      slug: string,
      image?: string | null,
      categoryID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    shop?:  {
      __typename: "Shop",
      id: string,
      name: string,
      slug: string,
      headline?: string | null,
      cover?: string | null,
      avatar?: string | null,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      suspended?: boolean | null,
      recommended?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    favoriteUsers?:  {
      __typename: "ModelFavoriteProductConnection",
      nextToken?: string | null,
    } | null,
    cartItems?:  {
      __typename: "ModelCartItemConnection",
      nextToken?: string | null,
    } | null,
    type?: string | null,
    createdAt: string,
    updatedAt: string,
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
    name: string,
    slug: string,
    images?: Array< string | null > | null,
    price: number,
    discount?:  {
      __typename: "Discount",
      value?: number | null,
      type?: string | null,
    } | null,
    description?: string | null,
    createdBy?: string | null,
    updatedBy?: string | null,
    available?: boolean | null,
    suspended?: boolean | null,
    newArrival?: boolean | null,
    deleted?: boolean | null,
    mainCategoryID: string,
    subCategoryID: string,
    categoryID: string,
    shopID: string,
    category?:  {
      __typename: "Category",
      id: string,
      name: string,
      slug: string,
      image?: string | null,
      categoryID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    shop?:  {
      __typename: "Shop",
      id: string,
      name: string,
      slug: string,
      headline?: string | null,
      cover?: string | null,
      avatar?: string | null,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      suspended?: boolean | null,
      recommended?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    favoriteUsers?:  {
      __typename: "ModelFavoriteProductConnection",
      nextToken?: string | null,
    } | null,
    cartItems?:  {
      __typename: "ModelCartItemConnection",
      nextToken?: string | null,
    } | null,
    type?: string | null,
    createdAt: string,
    updatedAt: string,
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
    name: string,
    slug: string,
    images?: Array< string | null > | null,
    price: number,
    discount?:  {
      __typename: "Discount",
      value?: number | null,
      type?: string | null,
    } | null,
    description?: string | null,
    createdBy?: string | null,
    updatedBy?: string | null,
    available?: boolean | null,
    suspended?: boolean | null,
    newArrival?: boolean | null,
    deleted?: boolean | null,
    mainCategoryID: string,
    subCategoryID: string,
    categoryID: string,
    shopID: string,
    category?:  {
      __typename: "Category",
      id: string,
      name: string,
      slug: string,
      image?: string | null,
      categoryID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    shop?:  {
      __typename: "Shop",
      id: string,
      name: string,
      slug: string,
      headline?: string | null,
      cover?: string | null,
      avatar?: string | null,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      suspended?: boolean | null,
      recommended?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    favoriteUsers?:  {
      __typename: "ModelFavoriteProductConnection",
      nextToken?: string | null,
    } | null,
    cartItems?:  {
      __typename: "ModelCartItemConnection",
      nextToken?: string | null,
    } | null,
    type?: string | null,
    createdAt: string,
    updatedAt: string,
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
    slug: string,
    headline?: string | null,
    cover?: string | null,
    avatar?: string | null,
    description?: string | null,
    createdBy?: string | null,
    updatedBy?: string | null,
    suspended?: boolean | null,
    recommended?: boolean | null,
    products?:  {
      __typename: "ModelProductConnection",
      nextToken?: string | null,
    } | null,
    members?:  {
      __typename: "ModelShopMemberConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    slug: string,
    headline?: string | null,
    cover?: string | null,
    avatar?: string | null,
    description?: string | null,
    createdBy?: string | null,
    updatedBy?: string | null,
    suspended?: boolean | null,
    recommended?: boolean | null,
    products?:  {
      __typename: "ModelProductConnection",
      nextToken?: string | null,
    } | null,
    members?:  {
      __typename: "ModelShopMemberConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    slug: string,
    headline?: string | null,
    cover?: string | null,
    avatar?: string | null,
    description?: string | null,
    createdBy?: string | null,
    updatedBy?: string | null,
    suspended?: boolean | null,
    recommended?: boolean | null,
    products?:  {
      __typename: "ModelProductConnection",
      nextToken?: string | null,
    } | null,
    members?:  {
      __typename: "ModelShopMemberConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    email?: string | null,
    avatar?: string | null,
    disabled?: boolean | null,
    role: UserRole,
    shops?:  {
      __typename: "ModelShopMemberConnection",
      nextToken?: string | null,
    } | null,
    addresses?:  {
      __typename: "ModelUserAddressConnection",
      nextToken?: string | null,
    } | null,
    cartItems?:  {
      __typename: "ModelCartItemConnection",
      nextToken?: string | null,
    } | null,
    favoriteProducts?:  {
      __typename: "ModelFavoriteProductConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    email?: string | null,
    avatar?: string | null,
    disabled?: boolean | null,
    role: UserRole,
    shops?:  {
      __typename: "ModelShopMemberConnection",
      nextToken?: string | null,
    } | null,
    addresses?:  {
      __typename: "ModelUserAddressConnection",
      nextToken?: string | null,
    } | null,
    cartItems?:  {
      __typename: "ModelCartItemConnection",
      nextToken?: string | null,
    } | null,
    favoriteProducts?:  {
      __typename: "ModelFavoriteProductConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    email?: string | null,
    avatar?: string | null,
    disabled?: boolean | null,
    role: UserRole,
    shops?:  {
      __typename: "ModelShopMemberConnection",
      nextToken?: string | null,
    } | null,
    addresses?:  {
      __typename: "ModelUserAddressConnection",
      nextToken?: string | null,
    } | null,
    cartItems?:  {
      __typename: "ModelCartItemConnection",
      nextToken?: string | null,
    } | null,
    favoriteProducts?:  {
      __typename: "ModelFavoriteProductConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    slug: string,
    image?: string | null,
    categoryID?: string | null,
    products?:  {
      __typename: "ModelProductConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    slug: string,
    image?: string | null,
    categoryID?: string | null,
    products?:  {
      __typename: "ModelProductConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    slug: string,
    image?: string | null,
    categoryID?: string | null,
    products?:  {
      __typename: "ModelProductConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
      slug: string,
      headline?: string | null,
      cover?: string | null,
      avatar?: string | null,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      suspended?: boolean | null,
      recommended?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      phone: string,
      email?: string | null,
      avatar?: string | null,
      disabled?: boolean | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
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
      slug: string,
      headline?: string | null,
      cover?: string | null,
      avatar?: string | null,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      suspended?: boolean | null,
      recommended?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      phone: string,
      email?: string | null,
      avatar?: string | null,
      disabled?: boolean | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
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
      slug: string,
      headline?: string | null,
      cover?: string | null,
      avatar?: string | null,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      suspended?: boolean | null,
      recommended?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      phone: string,
      email?: string | null,
      avatar?: string | null,
      disabled?: boolean | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
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
  } | null,
};

export type CreateUserAddressMutationVariables = {
  input: CreateUserAddressInput,
  condition?: ModelUserAddressConditionInput | null,
};

export type CreateUserAddressMutation = {
  createUserAddress?:  {
    __typename: "UserAddress",
    id: string,
    city: string,
    township: string,
    address: string,
    primary?: boolean | null,
    userID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserAddressMutationVariables = {
  input: UpdateUserAddressInput,
  condition?: ModelUserAddressConditionInput | null,
};

export type UpdateUserAddressMutation = {
  updateUserAddress?:  {
    __typename: "UserAddress",
    id: string,
    city: string,
    township: string,
    address: string,
    primary?: boolean | null,
    userID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserAddressMutationVariables = {
  input: DeleteUserAddressInput,
  condition?: ModelUserAddressConditionInput | null,
};

export type DeleteUserAddressMutation = {
  deleteUserAddress?:  {
    __typename: "UserAddress",
    id: string,
    city: string,
    township: string,
    address: string,
    primary?: boolean | null,
    userID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCartItemMutationVariables = {
  input: CreateCartItemInput,
  condition?: ModelCartItemConditionInput | null,
};

export type CreateCartItemMutation = {
  createCartItem?:  {
    __typename: "CartItem",
    id: string,
    quantity?: number | null,
    userID: string,
    productID: string,
    product?:  {
      __typename: "Product",
      id: string,
      name: string,
      slug: string,
      images?: Array< string | null > | null,
      price: number,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      available?: boolean | null,
      suspended?: boolean | null,
      newArrival?: boolean | null,
      deleted?: boolean | null,
      mainCategoryID: string,
      subCategoryID: string,
      categoryID: string,
      shopID: string,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCartItemMutationVariables = {
  input: UpdateCartItemInput,
  condition?: ModelCartItemConditionInput | null,
};

export type UpdateCartItemMutation = {
  updateCartItem?:  {
    __typename: "CartItem",
    id: string,
    quantity?: number | null,
    userID: string,
    productID: string,
    product?:  {
      __typename: "Product",
      id: string,
      name: string,
      slug: string,
      images?: Array< string | null > | null,
      price: number,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      available?: boolean | null,
      suspended?: boolean | null,
      newArrival?: boolean | null,
      deleted?: boolean | null,
      mainCategoryID: string,
      subCategoryID: string,
      categoryID: string,
      shopID: string,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateFavoriteProductMutationVariables = {
  input: CreateFavoriteProductInput,
  condition?: ModelFavoriteProductConditionInput | null,
};

export type CreateFavoriteProductMutation = {
  createFavoriteProduct?:  {
    __typename: "FavoriteProduct",
    id: string,
    userID: string,
    productID: string,
    product?:  {
      __typename: "Product",
      id: string,
      name: string,
      slug: string,
      images?: Array< string | null > | null,
      price: number,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      available?: boolean | null,
      suspended?: boolean | null,
      newArrival?: boolean | null,
      deleted?: boolean | null,
      mainCategoryID: string,
      subCategoryID: string,
      categoryID: string,
      shopID: string,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateFavoriteProductMutationVariables = {
  input: UpdateFavoriteProductInput,
  condition?: ModelFavoriteProductConditionInput | null,
};

export type UpdateFavoriteProductMutation = {
  updateFavoriteProduct?:  {
    __typename: "FavoriteProduct",
    id: string,
    userID: string,
    productID: string,
    product?:  {
      __typename: "Product",
      id: string,
      name: string,
      slug: string,
      images?: Array< string | null > | null,
      price: number,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      available?: boolean | null,
      suspended?: boolean | null,
      newArrival?: boolean | null,
      deleted?: boolean | null,
      mainCategoryID: string,
      subCategoryID: string,
      categoryID: string,
      shopID: string,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetProductQueryVariables = {
  id: string,
};

export type GetProductQuery = {
  getProduct?:  {
    __typename: "Product",
    id: string,
    name: string,
    slug: string,
    images?: Array< string | null > | null,
    price: number,
    discount?:  {
      __typename: "Discount",
      value?: number | null,
      type?: string | null,
    } | null,
    description?: string | null,
    createdBy?: string | null,
    updatedBy?: string | null,
    available?: boolean | null,
    suspended?: boolean | null,
    newArrival?: boolean | null,
    deleted?: boolean | null,
    mainCategoryID: string,
    subCategoryID: string,
    categoryID: string,
    shopID: string,
    category?:  {
      __typename: "Category",
      id: string,
      name: string,
      slug: string,
      image?: string | null,
      categoryID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    shop?:  {
      __typename: "Shop",
      id: string,
      name: string,
      slug: string,
      headline?: string | null,
      cover?: string | null,
      avatar?: string | null,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      suspended?: boolean | null,
      recommended?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    favoriteUsers?:  {
      __typename: "ModelFavoriteProductConnection",
      nextToken?: string | null,
    } | null,
    cartItems?:  {
      __typename: "ModelCartItemConnection",
      nextToken?: string | null,
    } | null,
    type?: string | null,
    createdAt: string,
    updatedAt: string,
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
      name: string,
      slug: string,
      images?: Array< string | null > | null,
      price: number,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      available?: boolean | null,
      suspended?: boolean | null,
      newArrival?: boolean | null,
      deleted?: boolean | null,
      mainCategoryID: string,
      subCategoryID: string,
      categoryID: string,
      shopID: string,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetProductBySlugQueryVariables = {
  slug: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelProductFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetProductBySlugQuery = {
  getProductBySlug?:  {
    __typename: "ModelProductConnection",
    items:  Array< {
      __typename: "Product",
      id: string,
      name: string,
      slug: string,
      images?: Array< string | null > | null,
      price: number,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      available?: boolean | null,
      suspended?: boolean | null,
      newArrival?: boolean | null,
      deleted?: boolean | null,
      mainCategoryID: string,
      subCategoryID: string,
      categoryID: string,
      shopID: string,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ProductsByPriceQueryVariables = {
  type: string,
  price?: ModelFloatKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelProductFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ProductsByPriceQuery = {
  productsByPrice?:  {
    __typename: "ModelProductConnection",
    items:  Array< {
      __typename: "Product",
      id: string,
      name: string,
      slug: string,
      images?: Array< string | null > | null,
      price: number,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      available?: boolean | null,
      suspended?: boolean | null,
      newArrival?: boolean | null,
      deleted?: boolean | null,
      mainCategoryID: string,
      subCategoryID: string,
      categoryID: string,
      shopID: string,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
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
    slug: string,
    headline?: string | null,
    cover?: string | null,
    avatar?: string | null,
    description?: string | null,
    createdBy?: string | null,
    updatedBy?: string | null,
    suspended?: boolean | null,
    recommended?: boolean | null,
    products?:  {
      __typename: "ModelProductConnection",
      nextToken?: string | null,
    } | null,
    members?:  {
      __typename: "ModelShopMemberConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
      slug: string,
      headline?: string | null,
      cover?: string | null,
      avatar?: string | null,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      suspended?: boolean | null,
      recommended?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetShopBySlugQueryVariables = {
  slug: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelShopFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetShopBySlugQuery = {
  getShopBySlug?:  {
    __typename: "ModelShopConnection",
    items:  Array< {
      __typename: "Shop",
      id: string,
      name: string,
      slug: string,
      headline?: string | null,
      cover?: string | null,
      avatar?: string | null,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      suspended?: boolean | null,
      recommended?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
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
    email?: string | null,
    avatar?: string | null,
    disabled?: boolean | null,
    role: UserRole,
    shops?:  {
      __typename: "ModelShopMemberConnection",
      nextToken?: string | null,
    } | null,
    addresses?:  {
      __typename: "ModelUserAddressConnection",
      nextToken?: string | null,
    } | null,
    cartItems?:  {
      __typename: "ModelCartItemConnection",
      nextToken?: string | null,
    } | null,
    favoriteProducts?:  {
      __typename: "ModelFavoriteProductConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
      email?: string | null,
      avatar?: string | null,
      disabled?: boolean | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
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
    slug: string,
    image?: string | null,
    categoryID?: string | null,
    products?:  {
      __typename: "ModelProductConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
      slug: string,
      image?: string | null,
      categoryID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
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
      slug: string,
      headline?: string | null,
      cover?: string | null,
      avatar?: string | null,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      suspended?: boolean | null,
      recommended?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      phone: string,
      email?: string | null,
      avatar?: string | null,
      disabled?: boolean | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
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
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
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
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserAddressQueryVariables = {
  id: string,
};

export type GetUserAddressQuery = {
  getUserAddress?:  {
    __typename: "UserAddress",
    id: string,
    city: string,
    township: string,
    address: string,
    primary?: boolean | null,
    userID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUserAddressesQueryVariables = {
  filter?: ModelUserAddressFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserAddressesQuery = {
  listUserAddresses?:  {
    __typename: "ModelUserAddressConnection",
    items:  Array< {
      __typename: "UserAddress",
      id: string,
      city: string,
      township: string,
      address: string,
      primary?: boolean | null,
      userID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCartItemQueryVariables = {
  id: string,
};

export type GetCartItemQuery = {
  getCartItem?:  {
    __typename: "CartItem",
    id: string,
    quantity?: number | null,
    userID: string,
    productID: string,
    product?:  {
      __typename: "Product",
      id: string,
      name: string,
      slug: string,
      images?: Array< string | null > | null,
      price: number,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      available?: boolean | null,
      suspended?: boolean | null,
      newArrival?: boolean | null,
      deleted?: boolean | null,
      mainCategoryID: string,
      subCategoryID: string,
      categoryID: string,
      shopID: string,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCartItemsQueryVariables = {
  filter?: ModelCartItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCartItemsQuery = {
  listCartItems?:  {
    __typename: "ModelCartItemConnection",
    items:  Array< {
      __typename: "CartItem",
      id: string,
      quantity?: number | null,
      userID: string,
      productID: string,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CartItemsByUserQueryVariables = {
  userID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCartItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CartItemsByUserQuery = {
  cartItemsByUser?:  {
    __typename: "ModelCartItemConnection",
    items:  Array< {
      __typename: "CartItem",
      id: string,
      quantity?: number | null,
      userID: string,
      productID: string,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetFavoriteProductQueryVariables = {
  id: string,
};

export type GetFavoriteProductQuery = {
  getFavoriteProduct?:  {
    __typename: "FavoriteProduct",
    id: string,
    userID: string,
    productID: string,
    product?:  {
      __typename: "Product",
      id: string,
      name: string,
      slug: string,
      images?: Array< string | null > | null,
      price: number,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      available?: boolean | null,
      suspended?: boolean | null,
      newArrival?: boolean | null,
      deleted?: boolean | null,
      mainCategoryID: string,
      subCategoryID: string,
      categoryID: string,
      shopID: string,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListFavoriteProductsQueryVariables = {
  filter?: ModelFavoriteProductFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFavoriteProductsQuery = {
  listFavoriteProducts?:  {
    __typename: "ModelFavoriteProductConnection",
    items:  Array< {
      __typename: "FavoriteProduct",
      id: string,
      userID: string,
      productID: string,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type FavoriteProductsByUserQueryVariables = {
  userID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelFavoriteProductFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type FavoriteProductsByUserQuery = {
  favoriteProductsByUser?:  {
    __typename: "ModelFavoriteProductConnection",
    items:  Array< {
      __typename: "FavoriteProduct",
      id: string,
      userID: string,
      productID: string,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateProductSubscriptionVariables = {
  filter?: ModelSubscriptionProductFilterInput | null,
};

export type OnCreateProductSubscription = {
  onCreateProduct?:  {
    __typename: "Product",
    id: string,
    name: string,
    slug: string,
    images?: Array< string | null > | null,
    price: number,
    discount?:  {
      __typename: "Discount",
      value?: number | null,
      type?: string | null,
    } | null,
    description?: string | null,
    createdBy?: string | null,
    updatedBy?: string | null,
    available?: boolean | null,
    suspended?: boolean | null,
    newArrival?: boolean | null,
    deleted?: boolean | null,
    mainCategoryID: string,
    subCategoryID: string,
    categoryID: string,
    shopID: string,
    category?:  {
      __typename: "Category",
      id: string,
      name: string,
      slug: string,
      image?: string | null,
      categoryID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    shop?:  {
      __typename: "Shop",
      id: string,
      name: string,
      slug: string,
      headline?: string | null,
      cover?: string | null,
      avatar?: string | null,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      suspended?: boolean | null,
      recommended?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    favoriteUsers?:  {
      __typename: "ModelFavoriteProductConnection",
      nextToken?: string | null,
    } | null,
    cartItems?:  {
      __typename: "ModelCartItemConnection",
      nextToken?: string | null,
    } | null,
    type?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateProductSubscriptionVariables = {
  filter?: ModelSubscriptionProductFilterInput | null,
};

export type OnUpdateProductSubscription = {
  onUpdateProduct?:  {
    __typename: "Product",
    id: string,
    name: string,
    slug: string,
    images?: Array< string | null > | null,
    price: number,
    discount?:  {
      __typename: "Discount",
      value?: number | null,
      type?: string | null,
    } | null,
    description?: string | null,
    createdBy?: string | null,
    updatedBy?: string | null,
    available?: boolean | null,
    suspended?: boolean | null,
    newArrival?: boolean | null,
    deleted?: boolean | null,
    mainCategoryID: string,
    subCategoryID: string,
    categoryID: string,
    shopID: string,
    category?:  {
      __typename: "Category",
      id: string,
      name: string,
      slug: string,
      image?: string | null,
      categoryID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    shop?:  {
      __typename: "Shop",
      id: string,
      name: string,
      slug: string,
      headline?: string | null,
      cover?: string | null,
      avatar?: string | null,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      suspended?: boolean | null,
      recommended?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    favoriteUsers?:  {
      __typename: "ModelFavoriteProductConnection",
      nextToken?: string | null,
    } | null,
    cartItems?:  {
      __typename: "ModelCartItemConnection",
      nextToken?: string | null,
    } | null,
    type?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteProductSubscriptionVariables = {
  filter?: ModelSubscriptionProductFilterInput | null,
};

export type OnDeleteProductSubscription = {
  onDeleteProduct?:  {
    __typename: "Product",
    id: string,
    name: string,
    slug: string,
    images?: Array< string | null > | null,
    price: number,
    discount?:  {
      __typename: "Discount",
      value?: number | null,
      type?: string | null,
    } | null,
    description?: string | null,
    createdBy?: string | null,
    updatedBy?: string | null,
    available?: boolean | null,
    suspended?: boolean | null,
    newArrival?: boolean | null,
    deleted?: boolean | null,
    mainCategoryID: string,
    subCategoryID: string,
    categoryID: string,
    shopID: string,
    category?:  {
      __typename: "Category",
      id: string,
      name: string,
      slug: string,
      image?: string | null,
      categoryID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    shop?:  {
      __typename: "Shop",
      id: string,
      name: string,
      slug: string,
      headline?: string | null,
      cover?: string | null,
      avatar?: string | null,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      suspended?: boolean | null,
      recommended?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    favoriteUsers?:  {
      __typename: "ModelFavoriteProductConnection",
      nextToken?: string | null,
    } | null,
    cartItems?:  {
      __typename: "ModelCartItemConnection",
      nextToken?: string | null,
    } | null,
    type?: string | null,
    createdAt: string,
    updatedAt: string,
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
    slug: string,
    headline?: string | null,
    cover?: string | null,
    avatar?: string | null,
    description?: string | null,
    createdBy?: string | null,
    updatedBy?: string | null,
    suspended?: boolean | null,
    recommended?: boolean | null,
    products?:  {
      __typename: "ModelProductConnection",
      nextToken?: string | null,
    } | null,
    members?:  {
      __typename: "ModelShopMemberConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    slug: string,
    headline?: string | null,
    cover?: string | null,
    avatar?: string | null,
    description?: string | null,
    createdBy?: string | null,
    updatedBy?: string | null,
    suspended?: boolean | null,
    recommended?: boolean | null,
    products?:  {
      __typename: "ModelProductConnection",
      nextToken?: string | null,
    } | null,
    members?:  {
      __typename: "ModelShopMemberConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    slug: string,
    headline?: string | null,
    cover?: string | null,
    avatar?: string | null,
    description?: string | null,
    createdBy?: string | null,
    updatedBy?: string | null,
    suspended?: boolean | null,
    recommended?: boolean | null,
    products?:  {
      __typename: "ModelProductConnection",
      nextToken?: string | null,
    } | null,
    members?:  {
      __typename: "ModelShopMemberConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    email?: string | null,
    avatar?: string | null,
    disabled?: boolean | null,
    role: UserRole,
    shops?:  {
      __typename: "ModelShopMemberConnection",
      nextToken?: string | null,
    } | null,
    addresses?:  {
      __typename: "ModelUserAddressConnection",
      nextToken?: string | null,
    } | null,
    cartItems?:  {
      __typename: "ModelCartItemConnection",
      nextToken?: string | null,
    } | null,
    favoriteProducts?:  {
      __typename: "ModelFavoriteProductConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    email?: string | null,
    avatar?: string | null,
    disabled?: boolean | null,
    role: UserRole,
    shops?:  {
      __typename: "ModelShopMemberConnection",
      nextToken?: string | null,
    } | null,
    addresses?:  {
      __typename: "ModelUserAddressConnection",
      nextToken?: string | null,
    } | null,
    cartItems?:  {
      __typename: "ModelCartItemConnection",
      nextToken?: string | null,
    } | null,
    favoriteProducts?:  {
      __typename: "ModelFavoriteProductConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    email?: string | null,
    avatar?: string | null,
    disabled?: boolean | null,
    role: UserRole,
    shops?:  {
      __typename: "ModelShopMemberConnection",
      nextToken?: string | null,
    } | null,
    addresses?:  {
      __typename: "ModelUserAddressConnection",
      nextToken?: string | null,
    } | null,
    cartItems?:  {
      __typename: "ModelCartItemConnection",
      nextToken?: string | null,
    } | null,
    favoriteProducts?:  {
      __typename: "ModelFavoriteProductConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    slug: string,
    image?: string | null,
    categoryID?: string | null,
    products?:  {
      __typename: "ModelProductConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    slug: string,
    image?: string | null,
    categoryID?: string | null,
    products?:  {
      __typename: "ModelProductConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    slug: string,
    image?: string | null,
    categoryID?: string | null,
    products?:  {
      __typename: "ModelProductConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateShopMemberSubscriptionVariables = {
  filter?: ModelSubscriptionShopMemberFilterInput | null,
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
      slug: string,
      headline?: string | null,
      cover?: string | null,
      avatar?: string | null,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      suspended?: boolean | null,
      recommended?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      phone: string,
      email?: string | null,
      avatar?: string | null,
      disabled?: boolean | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateShopMemberSubscriptionVariables = {
  filter?: ModelSubscriptionShopMemberFilterInput | null,
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
      slug: string,
      headline?: string | null,
      cover?: string | null,
      avatar?: string | null,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      suspended?: boolean | null,
      recommended?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      phone: string,
      email?: string | null,
      avatar?: string | null,
      disabled?: boolean | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteShopMemberSubscriptionVariables = {
  filter?: ModelSubscriptionShopMemberFilterInput | null,
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
      slug: string,
      headline?: string | null,
      cover?: string | null,
      avatar?: string | null,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      suspended?: boolean | null,
      recommended?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      phone: string,
      email?: string | null,
      avatar?: string | null,
      disabled?: boolean | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
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
  } | null,
};

export type OnCreateUserAddressSubscriptionVariables = {
  filter?: ModelSubscriptionUserAddressFilterInput | null,
};

export type OnCreateUserAddressSubscription = {
  onCreateUserAddress?:  {
    __typename: "UserAddress",
    id: string,
    city: string,
    township: string,
    address: string,
    primary?: boolean | null,
    userID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserAddressSubscriptionVariables = {
  filter?: ModelSubscriptionUserAddressFilterInput | null,
};

export type OnUpdateUserAddressSubscription = {
  onUpdateUserAddress?:  {
    __typename: "UserAddress",
    id: string,
    city: string,
    township: string,
    address: string,
    primary?: boolean | null,
    userID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserAddressSubscriptionVariables = {
  filter?: ModelSubscriptionUserAddressFilterInput | null,
};

export type OnDeleteUserAddressSubscription = {
  onDeleteUserAddress?:  {
    __typename: "UserAddress",
    id: string,
    city: string,
    township: string,
    address: string,
    primary?: boolean | null,
    userID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCartItemSubscriptionVariables = {
  filter?: ModelSubscriptionCartItemFilterInput | null,
  owner?: string | null,
};

export type OnCreateCartItemSubscription = {
  onCreateCartItem?:  {
    __typename: "CartItem",
    id: string,
    quantity?: number | null,
    userID: string,
    productID: string,
    product?:  {
      __typename: "Product",
      id: string,
      name: string,
      slug: string,
      images?: Array< string | null > | null,
      price: number,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      available?: boolean | null,
      suspended?: boolean | null,
      newArrival?: boolean | null,
      deleted?: boolean | null,
      mainCategoryID: string,
      subCategoryID: string,
      categoryID: string,
      shopID: string,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCartItemSubscriptionVariables = {
  filter?: ModelSubscriptionCartItemFilterInput | null,
  owner?: string | null,
};

export type OnUpdateCartItemSubscription = {
  onUpdateCartItem?:  {
    __typename: "CartItem",
    id: string,
    quantity?: number | null,
    userID: string,
    productID: string,
    product?:  {
      __typename: "Product",
      id: string,
      name: string,
      slug: string,
      images?: Array< string | null > | null,
      price: number,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      available?: boolean | null,
      suspended?: boolean | null,
      newArrival?: boolean | null,
      deleted?: boolean | null,
      mainCategoryID: string,
      subCategoryID: string,
      categoryID: string,
      shopID: string,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCartItemSubscriptionVariables = {
  filter?: ModelSubscriptionCartItemFilterInput | null,
  owner?: string | null,
};

export type OnDeleteCartItemSubscription = {
  onDeleteCartItem?:  {
    __typename: "CartItem",
    id: string,
    quantity?: number | null,
    userID: string,
    productID: string,
    product?:  {
      __typename: "Product",
      id: string,
      name: string,
      slug: string,
      images?: Array< string | null > | null,
      price: number,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      available?: boolean | null,
      suspended?: boolean | null,
      newArrival?: boolean | null,
      deleted?: boolean | null,
      mainCategoryID: string,
      subCategoryID: string,
      categoryID: string,
      shopID: string,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateFavoriteProductSubscriptionVariables = {
  filter?: ModelSubscriptionFavoriteProductFilterInput | null,
  owner?: string | null,
};

export type OnCreateFavoriteProductSubscription = {
  onCreateFavoriteProduct?:  {
    __typename: "FavoriteProduct",
    id: string,
    userID: string,
    productID: string,
    product?:  {
      __typename: "Product",
      id: string,
      name: string,
      slug: string,
      images?: Array< string | null > | null,
      price: number,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      available?: boolean | null,
      suspended?: boolean | null,
      newArrival?: boolean | null,
      deleted?: boolean | null,
      mainCategoryID: string,
      subCategoryID: string,
      categoryID: string,
      shopID: string,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateFavoriteProductSubscriptionVariables = {
  filter?: ModelSubscriptionFavoriteProductFilterInput | null,
  owner?: string | null,
};

export type OnUpdateFavoriteProductSubscription = {
  onUpdateFavoriteProduct?:  {
    __typename: "FavoriteProduct",
    id: string,
    userID: string,
    productID: string,
    product?:  {
      __typename: "Product",
      id: string,
      name: string,
      slug: string,
      images?: Array< string | null > | null,
      price: number,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      available?: boolean | null,
      suspended?: boolean | null,
      newArrival?: boolean | null,
      deleted?: boolean | null,
      mainCategoryID: string,
      subCategoryID: string,
      categoryID: string,
      shopID: string,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteFavoriteProductSubscriptionVariables = {
  filter?: ModelSubscriptionFavoriteProductFilterInput | null,
  owner?: string | null,
};

export type OnDeleteFavoriteProductSubscription = {
  onDeleteFavoriteProduct?:  {
    __typename: "FavoriteProduct",
    id: string,
    userID: string,
    productID: string,
    product?:  {
      __typename: "Product",
      id: string,
      name: string,
      slug: string,
      images?: Array< string | null > | null,
      price: number,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      available?: boolean | null,
      suspended?: boolean | null,
      newArrival?: boolean | null,
      deleted?: boolean | null,
      mainCategoryID: string,
      subCategoryID: string,
      categoryID: string,
      shopID: string,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
