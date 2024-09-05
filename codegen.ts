
import { type CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:3000/api/graphql',
  documents: ['**/*.gql'],
  generates: {
    './src/gql/codegen/': { 
      preset: 'client',
      config: {

      }
    },
    './src/gql/codegen/urql-introspection.json': {
      plugins: ['urql-introspection']
    }
  }
}

export default config
