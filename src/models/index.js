// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Product, Category, Shop, User, ShopUser } = initSchema(schema);

export {
  Product,
  Category,
  Shop,
  User,
  ShopUser
};