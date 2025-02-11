import { fileURLToPath } from 'node:url'
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  ssr: false,
  srcDir: 'src/',
  alias: {
    '@gql': fileURLToPath(new URL('./src/gql/codegen/graphql.ts', import.meta.url))
  },
})