<template>
  <UContainer>
    <UButton :to="{ name: 'index' }">Back</UButton>
    <div v-for="cart in cartsQuery.data.value?.carts" :key="cart.id" class="my-4">
      <UCard>
        <template #header>
          Cart {{ cart.id }}
        </template>

        <UCard v-for="line in cart.lines" :key="line?.id" class="my-2">
          <div class="text-lg">{{ line?.product.title }}</div>
          <div class="text-sm opacity-30">ID: {{ line?.product.id }}</div>
          <div class="text-sm opacity-30">Stock: {{ line?.product.stock }}</div>
          <div class="text-sm opacity-30">Price: {{ line?.product.price }}</div>
          <div>Quantity: {{ line?.qty }}</div>
        </UCard>

        <template #footer>
          <div>Total: {{ cart.total }}</div>
          <div>Line Items: {{ cart.lineCount }}</div>
          <UButton @click="clearCart.executeMutation({ input: { cartId: cart.id } })">Clear Cart</UButton>
        </template>
      </UCard>

    </div>
  </UContainer>
</template>

<script lang="ts" setup>
import { CartsDocument, ClearCartDocument, type CartLine } from '@gql';

const cartsQuery = useQuery({ query: CartsDocument, variables: {} })
const clearCart = useMutation(ClearCartDocument)

</script>