import urql, { type ClientOptions, fetchExchange } from '@urql/vue'
import offlineExchange from './urql/offline-exchange'
import { devtoolsExchange } from '@urql/devtools'

export default defineNuxtPlugin(async (nuxtApp) => {
  const clientOptions: ClientOptions = {
    url: 'http://localhost:3000/api/graphql',
    exchanges: [
      devtoolsExchange,
      offlineExchange(),
      fetchExchange
    ],
    requestPolicy: 'cache-and-network'
  }

  nuxtApp.vueApp.use(urql, clientOptions)
})