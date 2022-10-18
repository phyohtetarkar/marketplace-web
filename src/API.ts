/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateProductInput = {
  id?: string | null,
  name?: string | null,
  image?: string | null,
  price?: number | null,
  description?: string | null,
  modifiedAt?: number | null,
  modifiedBy?: string | null,
  available?: boolean | null,
  shopID: string,
  _version?: number | null,
  productCategoryId?: string | null,
};

export type ModelProductConditionInput = {
  name?: ModelStringInput | null,
  image?: ModelStringInput | null,
  price?: ModelFloatInput | null,
  description?: ModelStringInput | null,
  modifiedAt?: ModelIntInput | null,
  modifiedBy?: ModelStringInput | null,
  available?: ModelBooleanInput | null,
  shopID?: ModelIDInput | null,
  and?: Array< ModelProductConditionInput | null > | null,
  or?: Array< ModelProductConditionInput | null > | null,
  not?: ModelProductConditionInput | null,
  productCategoryId?: ModelIDInput | null,
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

export type Product = {
  __typename: "Product",
  id: string,
  name?: string | null,
  image?: string | null,
  price?: number | null,
  description?: string | null,
  modifiedAt?: number | null,
  modifiedBy?: string | null,
  available?: boolean | null,
  shopID: string,
  category?: Category | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  productCategoryId?: string | null,
};

export type Category = {
  __typename: "Category",
  id: string,
  name: string,
  image: string,
  parent?: string | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateProductInput = {
  id: string,
  name?: string | null,
  image?: string | null,
  price?: number | null,
  description?: string | null,
  modifiedAt?: number | null,
  modifiedBy?: string | null,
  available?: boolean | null,
  shopID?: string | null,
  _version?: number | null,
  productCategoryId?: string | null,
};

export type DeleteProductInput = {
  id: string,
  _version?: number | null,
};

export type CreateShopInput = {
  id?: string | null,
  name?: string | null,
  cover?: string | null,
  profile?: string | null,
  _version?: number | null,
};

export type ModelShopConditionInput = {
  name?: ModelStringInput | null,
  cover?: ModelStringInput | null,
  profile?: ModelStringInput | null,
  and?: Array< ModelShopConditionInput | null > | null,
  or?: Array< ModelShopConditionInput | null > | null,
  not?: ModelShopConditionInput | null,
};

export type Shop = {
  __typename: "Shop",
  id: string,
  name?: string | null,
  cover?: string | null,
  profile?: string | null,
  users?: ModelShopUserConnection | null,
  products?: ModelProductConnection | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type ModelShopUserConnection = {
  __typename: "ModelShopUserConnection",
  items:  Array<ShopUser | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ShopUser = {
  __typename: "ShopUser",
  id: string,
  shopID: string,
  userID: string,
  shop: Shop,
  user: User,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type User = {
  __typename: "User",
  id: string,
  name: string,
  phone?: string | null,
  email?: string | null,
  avatar?: string | null,
  identity: string,
  disabled?: boolean | null,
  modifiedAt?: number | null,
  shops?: ModelShopUserConnection | null,
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

export type UpdateShopInput = {
  id: string,
  name?: string | null,
  cover?: string | null,
  profile?: string | null,
  _version?: number | null,
};

export type DeleteShopInput = {
  id: string,
  _version?: number | null,
};

export type CreateUserInput = {
  id?: string | null,
  name: string,
  phone?: string | null,
  email?: string | null,
  avatar?: string | null,
  identity: string,
  disabled?: boolean | null,
  modifiedAt?: number | null,
  _version?: number | null,
};

export type ModelUserConditionInput = {
  name?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  email?: ModelStringInput | null,
  avatar?: ModelStringInput | null,
  identity?: ModelStringInput | null,
  disabled?: ModelBooleanInput | null,
  modifiedAt?: ModelIntInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type UpdateUserInput = {
  id: string,
  name?: string | null,
  phone?: string | null,
  email?: string | null,
  avatar?: string | null,
  identity?: string | null,
  disabled?: boolean | null,
  modifiedAt?: number | null,
  _version?: number | null,
};

export type DeleteUserInput = {
  id: string,
  _version?: number | null,
};

export type CreateCategoryInput = {
  id?: string | null,
  name: string,
  image: string,
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

export type CreateShopUserInput = {
  id?: string | null,
  shopID: string,
  userID: string,
  _version?: number | null,
};

export type ModelShopUserConditionInput = {
  shopID?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelShopUserConditionInput | null > | null,
  or?: Array< ModelShopUserConditionInput | null > | null,
  not?: ModelShopUserConditionInput | null,
};

export type UpdateShopUserInput = {
  id: string,
  shopID?: string | null,
  userID?: string | null,
  _version?: number | null,
};

export type DeleteShopUserInput = {
  id: string,
  _version?: number | null,
};

export type ModelProductFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  image?: ModelStringInput | null,
  price?: ModelFloatInput | null,
  description?: ModelStringInput | null,
  modifiedAt?: ModelIntInput | null,
  modifiedBy?: ModelStringInput | null,
  available?: ModelBooleanInput | null,
  shopID?: ModelIDInput | null,
  and?: Array< ModelProductFilterInput | null > | null,
  or?: Array< ModelProductFilterInput | null > | null,
  not?: ModelProductFilterInput | null,
  productCategoryId?: ModelIDInput | null,
};

export type ModelShopFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  cover?: ModelStringInput | null,
  profile?: ModelStringInput | null,
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
  email?: ModelStringInput | null,
  avatar?: ModelStringInput | null,
  identity?: ModelStringInput | null,
  disabled?: ModelBooleanInput | null,
  modifiedAt?: ModelIntInput | null,
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

export type ModelCategoryConnection = {
  __typename: "ModelCategoryConnection",
  items:  Array<Category | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelShopUserFilterInput = {
  id?: ModelIDInput | null,
  shopID?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelShopUserFilterInput | null > | null,
  or?: Array< ModelShopUserFilterInput | null > | null,
  not?: ModelShopUserFilterInput | null,
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
    image?: string | null,
    price?: number | null,
    description?: string | null,
    modifiedAt?: number | null,
    modifiedBy?: string | null,
    available?: boolean | null,
    shopID: string,
    category?:  {
      __typename: "Category",
      id: string,
      name: string,
      image: string,
      parent?: string | null,
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
    productCategoryId?: string | null,
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
    image?: string | null,
    price?: number | null,
    description?: string | null,
    modifiedAt?: number | null,
    modifiedBy?: string | null,
    available?: boolean | null,
    shopID: string,
    category?:  {
      __typename: "Category",
      id: string,
      name: string,
      image: string,
      parent?: string | null,
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
    productCategoryId?: string | null,
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
    image?: string | null,
    price?: number | null,
    description?: string | null,
    modifiedAt?: number | null,
    modifiedBy?: string | null,
    available?: boolean | null,
    shopID: string,
    category?:  {
      __typename: "Category",
      id: string,
      name: string,
      image: string,
      parent?: string | null,
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
    productCategoryId?: string | null,
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
    name?: string | null,
    cover?: string | null,
    profile?: string | null,
    users?:  {
      __typename: "ModelShopUserConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
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
};

export type UpdateShopMutationVariables = {
  input: UpdateShopInput,
  condition?: ModelShopConditionInput | null,
};

export type UpdateShopMutation = {
  updateShop?:  {
    __typename: "Shop",
    id: string,
    name?: string | null,
    cover?: string | null,
    profile?: string | null,
    users?:  {
      __typename: "ModelShopUserConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
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
};

export type DeleteShopMutationVariables = {
  input: DeleteShopInput,
  condition?: ModelShopConditionInput | null,
};

export type DeleteShopMutation = {
  deleteShop?:  {
    __typename: "Shop",
    id: string,
    name?: string | null,
    cover?: string | null,
    profile?: string | null,
    users?:  {
      __typename: "ModelShopUserConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
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
    phone?: string | null,
    email?: string | null,
    avatar?: string | null,
    identity: string,
    disabled?: boolean | null,
    modifiedAt?: number | null,
    shops?:  {
      __typename: "ModelShopUserConnection",
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
    phone?: string | null,
    email?: string | null,
    avatar?: string | null,
    identity: string,
    disabled?: boolean | null,
    modifiedAt?: number | null,
    shops?:  {
      __typename: "ModelShopUserConnection",
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
    phone?: string | null,
    email?: string | null,
    avatar?: string | null,
    identity: string,
    disabled?: boolean | null,
    modifiedAt?: number | null,
    shops?:  {
      __typename: "ModelShopUserConnection",
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
    image: string,
    parent?: string | null,
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
    image: string,
    parent?: string | null,
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
    image: string,
    parent?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateShopUserMutationVariables = {
  input: CreateShopUserInput,
  condition?: ModelShopUserConditionInput | null,
};

export type CreateShopUserMutation = {
  createShopUser?:  {
    __typename: "ShopUser",
    id: string,
    shopID: string,
    userID: string,
    shop:  {
      __typename: "Shop",
      id: string,
      name?: string | null,
      cover?: string | null,
      profile?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      phone?: string | null,
      email?: string | null,
      avatar?: string | null,
      identity: string,
      disabled?: boolean | null,
      modifiedAt?: number | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateShopUserMutationVariables = {
  input: UpdateShopUserInput,
  condition?: ModelShopUserConditionInput | null,
};

export type UpdateShopUserMutation = {
  updateShopUser?:  {
    __typename: "ShopUser",
    id: string,
    shopID: string,
    userID: string,
    shop:  {
      __typename: "Shop",
      id: string,
      name?: string | null,
      cover?: string | null,
      profile?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      phone?: string | null,
      email?: string | null,
      avatar?: string | null,
      identity: string,
      disabled?: boolean | null,
      modifiedAt?: number | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteShopUserMutationVariables = {
  input: DeleteShopUserInput,
  condition?: ModelShopUserConditionInput | null,
};

export type DeleteShopUserMutation = {
  deleteShopUser?:  {
    __typename: "ShopUser",
    id: string,
    shopID: string,
    userID: string,
    shop:  {
      __typename: "Shop",
      id: string,
      name?: string | null,
      cover?: string | null,
      profile?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      phone?: string | null,
      email?: string | null,
      avatar?: string | null,
      identity: string,
      disabled?: boolean | null,
      modifiedAt?: number | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
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
    image?: string | null,
    price?: number | null,
    description?: string | null,
    modifiedAt?: number | null,
    modifiedBy?: string | null,
    available?: boolean | null,
    shopID: string,
    category?:  {
      __typename: "Category",
      id: string,
      name: string,
      image: string,
      parent?: string | null,
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
    productCategoryId?: string | null,
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
      image?: string | null,
      price?: number | null,
      description?: string | null,
      modifiedAt?: number | null,
      modifiedBy?: string | null,
      available?: boolean | null,
      shopID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      productCategoryId?: string | null,
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
      image?: string | null,
      price?: number | null,
      description?: string | null,
      modifiedAt?: number | null,
      modifiedBy?: string | null,
      available?: boolean | null,
      shopID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      productCategoryId?: string | null,
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
    name?: string | null,
    cover?: string | null,
    profile?: string | null,
    users?:  {
      __typename: "ModelShopUserConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
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
      name?: string | null,
      cover?: string | null,
      profile?: string | null,
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
      name?: string | null,
      cover?: string | null,
      profile?: string | null,
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
    phone?: string | null,
    email?: string | null,
    avatar?: string | null,
    identity: string,
    disabled?: boolean | null,
    modifiedAt?: number | null,
    shops?:  {
      __typename: "ModelShopUserConnection",
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
      phone?: string | null,
      email?: string | null,
      avatar?: string | null,
      identity: string,
      disabled?: boolean | null,
      modifiedAt?: number | null,
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
      phone?: string | null,
      email?: string | null,
      avatar?: string | null,
      identity: string,
      disabled?: boolean | null,
      modifiedAt?: number | null,
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
    image: string,
    parent?: string | null,
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
      image: string,
      parent?: string | null,
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
      image: string,
      parent?: string | null,
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

export type GetShopUserQueryVariables = {
  id: string,
};

export type GetShopUserQuery = {
  getShopUser?:  {
    __typename: "ShopUser",
    id: string,
    shopID: string,
    userID: string,
    shop:  {
      __typename: "Shop",
      id: string,
      name?: string | null,
      cover?: string | null,
      profile?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      phone?: string | null,
      email?: string | null,
      avatar?: string | null,
      identity: string,
      disabled?: boolean | null,
      modifiedAt?: number | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListShopUsersQueryVariables = {
  filter?: ModelShopUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListShopUsersQuery = {
  listShopUsers?:  {
    __typename: "ModelShopUserConnection",
    items:  Array< {
      __typename: "ShopUser",
      id: string,
      shopID: string,
      userID: string,
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

export type SyncShopUsersQueryVariables = {
  filter?: ModelShopUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncShopUsersQuery = {
  syncShopUsers?:  {
    __typename: "ModelShopUserConnection",
    items:  Array< {
      __typename: "ShopUser",
      id: string,
      shopID: string,
      userID: string,
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

export type OnCreateProductSubscription = {
  onCreateProduct?:  {
    __typename: "Product",
    id: string,
    name?: string | null,
    image?: string | null,
    price?: number | null,
    description?: string | null,
    modifiedAt?: number | null,
    modifiedBy?: string | null,
    available?: boolean | null,
    shopID: string,
    category?:  {
      __typename: "Category",
      id: string,
      name: string,
      image: string,
      parent?: string | null,
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
    productCategoryId?: string | null,
  } | null,
};

export type OnUpdateProductSubscription = {
  onUpdateProduct?:  {
    __typename: "Product",
    id: string,
    name?: string | null,
    image?: string | null,
    price?: number | null,
    description?: string | null,
    modifiedAt?: number | null,
    modifiedBy?: string | null,
    available?: boolean | null,
    shopID: string,
    category?:  {
      __typename: "Category",
      id: string,
      name: string,
      image: string,
      parent?: string | null,
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
    productCategoryId?: string | null,
  } | null,
};

export type OnDeleteProductSubscription = {
  onDeleteProduct?:  {
    __typename: "Product",
    id: string,
    name?: string | null,
    image?: string | null,
    price?: number | null,
    description?: string | null,
    modifiedAt?: number | null,
    modifiedBy?: string | null,
    available?: boolean | null,
    shopID: string,
    category?:  {
      __typename: "Category",
      id: string,
      name: string,
      image: string,
      parent?: string | null,
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
    productCategoryId?: string | null,
  } | null,
};

export type OnCreateShopSubscription = {
  onCreateShop?:  {
    __typename: "Shop",
    id: string,
    name?: string | null,
    cover?: string | null,
    profile?: string | null,
    users?:  {
      __typename: "ModelShopUserConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
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
};

export type OnUpdateShopSubscription = {
  onUpdateShop?:  {
    __typename: "Shop",
    id: string,
    name?: string | null,
    cover?: string | null,
    profile?: string | null,
    users?:  {
      __typename: "ModelShopUserConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
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
};

export type OnDeleteShopSubscription = {
  onDeleteShop?:  {
    __typename: "Shop",
    id: string,
    name?: string | null,
    cover?: string | null,
    profile?: string | null,
    users?:  {
      __typename: "ModelShopUserConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
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
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    phone?: string | null,
    email?: string | null,
    avatar?: string | null,
    identity: string,
    disabled?: boolean | null,
    modifiedAt?: number | null,
    shops?:  {
      __typename: "ModelShopUserConnection",
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

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    phone?: string | null,
    email?: string | null,
    avatar?: string | null,
    identity: string,
    disabled?: boolean | null,
    modifiedAt?: number | null,
    shops?:  {
      __typename: "ModelShopUserConnection",
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

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    name: string,
    phone?: string | null,
    email?: string | null,
    avatar?: string | null,
    identity: string,
    disabled?: boolean | null,
    modifiedAt?: number | null,
    shops?:  {
      __typename: "ModelShopUserConnection",
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

export type OnCreateCategorySubscription = {
  onCreateCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    image: string,
    parent?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateCategorySubscription = {
  onUpdateCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    image: string,
    parent?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteCategorySubscription = {
  onDeleteCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    image: string,
    parent?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateShopUserSubscription = {
  onCreateShopUser?:  {
    __typename: "ShopUser",
    id: string,
    shopID: string,
    userID: string,
    shop:  {
      __typename: "Shop",
      id: string,
      name?: string | null,
      cover?: string | null,
      profile?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      phone?: string | null,
      email?: string | null,
      avatar?: string | null,
      identity: string,
      disabled?: boolean | null,
      modifiedAt?: number | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateShopUserSubscription = {
  onUpdateShopUser?:  {
    __typename: "ShopUser",
    id: string,
    shopID: string,
    userID: string,
    shop:  {
      __typename: "Shop",
      id: string,
      name?: string | null,
      cover?: string | null,
      profile?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      phone?: string | null,
      email?: string | null,
      avatar?: string | null,
      identity: string,
      disabled?: boolean | null,
      modifiedAt?: number | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteShopUserSubscription = {
  onDeleteShopUser?:  {
    __typename: "ShopUser",
    id: string,
    shopID: string,
    userID: string,
    shop:  {
      __typename: "Shop",
      id: string,
      name?: string | null,
      cover?: string | null,
      profile?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      phone?: string | null,
      email?: string | null,
      avatar?: string | null,
      identity: string,
      disabled?: boolean | null,
      modifiedAt?: number | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};
