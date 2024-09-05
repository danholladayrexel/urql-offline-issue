<template>
  <UContainer>
    <CartButton></CartButton>

    <div class="p-2">
      <URadioGroup v-model="selectedCart" legend="Select Cart" :options="cartOptions" />
    </div>

    <h2>Products:</h2>
    <div v-for="product in productsQuery.data.value?.products" :key="product.id" class="mb-3">
      <Product :product="product" :cart-id="selectedCart"></Product>
    </div>

  </UContainer>
</template>

<script lang="ts" setup>
import { CartsDocument, ProductsDocument, type Cart } from '@gql';

const cartsQuery = useQuery({ query: CartsDocument, variables: {} })

const cartOptions = computed(() => {
  return cartsQuery.data.value?.carts.map((cart: Cart) => { return { value: cart.id, label: `Cart ${cart.id}` } })
})

const productsQuery = useQuery({ query: ProductsDocument, variables: {} })

const selectedCart = ref<string>('5a797e70-cdba-4738-b7a5-ca6a63a2ddc0')
</script>