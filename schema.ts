import { randomUUID } from 'crypto';
import { createSchema } from 'graphql-yoga';

// Define types
type Product = {
  id: string;
  title: string;
  stock: number;
  price: number;
};

type Cart = {
  id: string;
  lines: CartLine[];
};

type CartLine = {
  id: string;
  product: Product;
  qty: number;
};

type QueryCart = Cart & {
  lineCount: number;
  total: number;
};

type UpdateProductInput = Product;
type AddProductToCartInput = {
  cartId: string;
  productId: string;
  qty: number;
};

type ClearCartInput = {
  cartId: string;
};

// Sample data
const products: Product[] = [
  { id: '8bceb990-9335-403b-9056-496f275cb8f4', title: 'Item A', stock: 1000, price: 1.01 },
  { id: 'f43356d8-d6e0-48d3-bba5-68d84167e31c', title: 'Item B', stock: 2000, price: 2.02 },
  { id: '3c76eb56-28c4-4762-bba0-428fbb394be1', title: 'Item C', stock: 3000, price: 3.03 },
  { id: 'd573635e-041b-44a6-92ad-315997350737', title: 'Item D', stock: 4000, price: 4.04 },
];

const carts: Cart[] = [
  { id: '5a797e70-cdba-4738-b7a5-ca6a63a2ddc0', lines: [] as CartLine[] },
  { id: '4a797e70-cdba-4738-b7a5-ca6a63a2ddc1', lines: [] as CartLine[] },
];

// Utility functions
function calculateCart(cart: Cart): QueryCart {
  const lineCount = cart.lines.length;
  const total = cart.lines.reduce((sum, line) => sum + line.product.price * line.qty, 0);
  return { ...cart, lineCount, total };
}

function getCarts(): QueryCart[] {
  return carts.map(calculateCart);
}

// GraphQL schema and resolvers
export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Product {
      id: ID!
      title: String!
      stock: Int!
      price: Float!
    }

    type Cart {
      id: ID!
      lines: [CartLine]!
      lineCount: Int!
      total: Float!
    }

    type CartLine {
      id: ID!
      product: Product!
      qty: Int!
    }

    input UpdateProductInput {
      id: ID!
      title: String!
      stock: Int!
      price: Float!
    }

    input AddProductToCartInput {
      cartId: ID!
      productId: ID!
      qty: Int!
    }

    input ClearCartInput {
      cartId: ID!
    }

    type Query {
      products: [Product!]!
      carts: [Cart!]!
    }

    type Mutation {
      updateProduct(input: UpdateProductInput!): Product!
      addProductToCart(input: AddProductToCartInput!): Cart!
      clearCart(input: ClearCartInput!): Cart
    }
  `,
  resolvers: {
    Query: {
      products: () => products,
      carts: () => getCarts(),
    },
    Mutation: {
      updateProduct: (parent: unknown, { input }: { input: UpdateProductInput }) => {
        const productIndex = products.findIndex((product) => product.id === input.id);

        if (productIndex !== -1) {
          products[productIndex] = input;
        } else {
          products.push(input);
        }

        return input;
      },
      addProductToCart: (parent: unknown, { input }: { input: AddProductToCartInput }) => {
        const { cartId, productId, qty } = input;
        const cart = carts.find((cart) => cart.id === cartId);
        const product = products.find((product) => product.id === productId);

        if (!cart || !product) {
          throw new Error('Cart or Product not found');
        }

        const existingLine = cart.lines.find((line) => line.product.id === product.id);

        if (existingLine) {
          existingLine.qty += qty;
        } else {
          const newLine: CartLine = {
            id: randomUUID(),
            product,
            qty,
          };
          cart.lines.push(newLine);
        }

        return calculateCart(cart);
      },
      clearCart: (parent: unknown, { input }: { input: ClearCartInput }) => {
        const cart = carts.find((cart) => cart.id === input.cartId);

        if (cart) {
          cart.lines = [];
          return calculateCart(cart);
        }

        throw new Error('Cart not found');
      },
    },
  },
});