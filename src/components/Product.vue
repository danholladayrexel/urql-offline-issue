<template>
  <UCard v-if="product">    
    <div>{{ product.title }}</div>
    <div class="text-sm opacity-30">ID: {{ product.id }}</div>
    <div class="text-sm opacity-30">Stock: {{ product.stock }}</div>
    <div class="text-sm opacity-30">Price: {{ product.price }}</div>
    <div class="flex">
      <UInput type="number" v-model.number="qty">
        <template #leading><span class="text-xs">Qty</span></template>
      </UInput>
      <UButton @click="addToCart">Add To Cart</UButton>
    </div>    
  </UCard>
</template>

<script lang="ts" setup>
import { AddProductToCartDocument, CartsDocument, type Product } from '@gql';
const qty = ref<number>(1)

const props = defineProps<{ product: Product, cartId: string }>()

const addToCartMutation = useMutation(AddProductToCartDocument)

const addToCart = () => {
  addToCartMutation.executeMutation({
    input: {
      cartId: props.cartId,
      productId: props.product.id,
      qty: qty.value || 1
    }
  })
}
</script>