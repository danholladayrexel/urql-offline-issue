import { createYoga } from 'graphql-yoga'
import { schema } from '../../../schema'

const yoga = createYoga({ schema, graphqlEndpoint: '/api/graphql' })

export default defineEventHandler(async (event) => {
  return yoga(event.req, event.res);
});