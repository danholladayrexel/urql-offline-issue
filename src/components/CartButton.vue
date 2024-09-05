<template>
    <UButton :to="{name:'cart'}">Go to cart ({{ cartTotal }})</UButton>
</template>

<script lang="ts" setup>
import { CartsDocument, type Cart } from '@gql';

const cartsQuery = useQuery({ query: CartsDocument, variables: {} })

const cartTotal = computed(() => {
    let totalLineItems = 0
    cartsQuery.data.value?.carts.forEach((cart: Cart) => {
        totalLineItems += cart.lineCount
    })
    return totalLineItems
})
</script>