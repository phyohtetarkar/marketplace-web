// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const UserRole = {
  "OWNER": "OWNER",
  "ADMIN": "ADMIN",
  "CONSUMER": "CONSUMER"
};

const MemberRole = {
  "OWNER": "OWNER",
  "ADMIN": "ADMIN"
};

const DiscountType = {
  "PERCENTAGE": "PERCENTAGE",
  "FIXED_AMOUNT": "FIXED_AMOUNT"
};

const ProductStatus = {
  "PUBLISHED": "PUBLISHED",
  "DRAFT": "DRAFT",
  "ARCHIVED": "ARCHIVED",
  "DENIED": "DENIED"
};

const ShopStatus = {
  "LIVE": "LIVE",
  "PENDING": "PENDING",
  "DENIED": "DENIED"
};

const { Banner, Category, Product, Discount, Shop, ShopCategory, ShopMember, User, UserAddress, CartItem, FavoriteProduct, ProductOption, ProductOptionValue, ProductVariant, Location } = initSchema(schema);

export {
  Banner,
  Category,
  Product,
  Discount,
  Shop,
  ShopCategory,
  ShopMember,
  User,
  UserAddress,
  CartItem,
  FavoriteProduct,
  UserRole,
  MemberRole,
  DiscountType,
  ProductStatus,
  ShopStatus,
  ProductOption,
  ProductOptionValue,
  ProductVariant,
  Location
};