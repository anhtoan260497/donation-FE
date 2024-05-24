import { gql } from "graphql-request"

const graphqlQueries = {
    pairReserver (pair : `0x${string}`) {
        return gql`
    {
        pair(id: ${JSON.stringify(pair)}) {
          id
          token0 {
            symbol
            decimals
          }
          token1 {
            symbol
            decimals
          }
          reserve0
          reserve1
        }
      }
    `
    }
}

export const {pairReserver} = graphqlQueries