/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type ModelCategoryConnection = {
  __typename: "ModelCategoryConnection",
  items:  Array<Category | null >,
  nextToken?: string | null,
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
};

export type ModelProductConnection = {
  __typename: "ModelProductConnection",
  items:  Array<Product | null >,
  nextToken?: string | null,
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
  editors?: Array< string | null > | null,
  categoryID: string,
  shopID: string,
  category?: Category | null,
  shop?: Shop | null,
  createdAt: string,
  updatedAt: string,
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
  owner?: string | null,
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
  editors?: Array< string | null > | null,
  categoryID: string,
  shopID: string,
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
  editors?: ModelStringInput | null,
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
  editors?: Array< string | null > | null,
  categoryID?: string | null,
  shopID?: string | null,
};

export type DeleteProductInput = {
  id: string,
};

export type CreateShopInput = {
  id?: string | null,
  name: string,
  cover?: string | null,
  avatar?: string | null,
  description?: string | null,
  createdBy?: string | null,
  updatedBy?: string | null,
  owner?: string | null,
};

export type ModelShopConditionInput = {
  name?: ModelStringInput | null,
  cover?: ModelStringInput | null,
  avatar?: ModelStringInput | null,
  description?: ModelStringInput | null,
  createdBy?: ModelStringInput | null,
  updatedBy?: ModelStringInput | null,
  owner?: ModelStringInput | null,
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
  owner?: string | null,
};

export type DeleteShopInput = {
  id: string,
};

export type CreateUserInput = {
  id?: string | null,
  name: string,
  phone: string,
  avatar?: string | null,
  authID: string,
  disabled?: boolean | null,
  role: UserRole,
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
};

export type DeleteUserInput = {
  id: string,
};

export type CreateCategoryInput = {
  id?: string | null,
  name: string,
  image?: string | null,
  parent?: string | null,
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

export type ModelProductFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  images?: ModelStringInput | null,
  price?: ModelFloatInput | null,
  description?: ModelStringInput | null,
  createdBy?: ModelStringInput | null,
  updatedBy?: ModelStringInput | null,
  available?: ModelBooleanInput | null,
  editors?: ModelStringInput | null,
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
  owner?: ModelStringInput | null,
  and?: Array< ModelShopFilterInput | null > | null,
  or?: Array< ModelShopFilterInput | null > | null,
  not?: ModelShopFilterInput | null,
};

export type ModelShopConnection = {
  __typename: "ModelShopConnection",
  items:  Array<Shop | null >,
  nextToken?: string | null,
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
    editors?: Array< string | null > | null,
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
      } | null,
      createdAt: string,
      updatedAt: string,
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
      owner?: string | null,
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
    editors?: Array< string | null > | null,
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
      } | null,
      createdAt: string,
      updatedAt: string,
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
      owner?: string | null,
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
    editors?: Array< string | null > | null,
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
      } | null,
      createdAt: string,
      updatedAt: string,
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
      owner?: string | null,
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
    cover?: string | null,
    avatar?: string | null,
    description?: string | null,
    createdBy?: string | null,
    updatedBy?: string | null,
    owner?: string | null,
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
        editors?: Array< string | null > | null,
        categoryID: string,
        shopID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
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
        owner?: string | null,
      } | null >,
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
    cover?: string | null,
    avatar?: string | null,
    description?: string | null,
    createdBy?: string | null,
    updatedBy?: string | null,
    owner?: string | null,
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
        editors?: Array< string | null > | null,
        categoryID: string,
        shopID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
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
        owner?: string | null,
      } | null >,
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
    cover?: string | null,
    avatar?: string | null,
    description?: string | null,
    createdBy?: string | null,
    updatedBy?: string | null,
    owner?: string | null,
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
        editors?: Array< string | null > | null,
        categoryID: string,
        shopID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
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
        owner?: string | null,
      } | null >,
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
        owner?: string | null,
      } | null >,
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
        owner?: string | null,
      } | null >,
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
        owner?: string | null,
      } | null >,
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
        editors?: Array< string | null > | null,
        categoryID: string,
        shopID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
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
        editors?: Array< string | null > | null,
        categoryID: string,
        shopID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
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
        editors?: Array< string | null > | null,
        categoryID: string,
        shopID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
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
      cover?: string | null,
      avatar?: string | null,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      owner?: string | null,
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
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
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
      owner?: string | null,
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
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
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
      owner?: string | null,
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
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    editors?: Array< string | null > | null,
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
      } | null,
      createdAt: string,
      updatedAt: string,
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
      owner?: string | null,
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
      editors?: Array< string | null > | null,
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
        owner?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
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
    cover?: string | null,
    avatar?: string | null,
    description?: string | null,
    createdBy?: string | null,
    updatedBy?: string | null,
    owner?: string | null,
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
        editors?: Array< string | null > | null,
        categoryID: string,
        shopID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
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
        owner?: string | null,
      } | null >,
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
      cover?: string | null,
      avatar?: string | null,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      owner?: string | null,
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
        owner?: string | null,
      } | null >,
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
      avatar?: string | null,
      authID: string,
      disabled?: boolean | null,
      role: UserRole,
      shops?:  {
        __typename: "ModelShopMemberConnection",
        nextToken?: string | null,
      } | null,
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
        editors?: Array< string | null > | null,
        categoryID: string,
        shopID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
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
      image?: string | null,
      parent?: string | null,
      products?:  {
        __typename: "ModelProductConnection",
        nextToken?: string | null,
      } | null,
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
      cover?: string | null,
      avatar?: string | null,
      description?: string | null,
      createdBy?: string | null,
      updatedBy?: string | null,
      owner?: string | null,
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
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
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
        owner?: string | null,
        createdAt: string,
        updatedAt: string,
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
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};
