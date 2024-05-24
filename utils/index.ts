import { GraphQLClient } from "graphql-request";
import { useChainId } from "wagmi";
import 'dotenv/config'
export const conversionRate = (token0Amount : number, token1Amount : number) => {
    return  (token1Amount / token0Amount).toFixed(2)
}

export const getEndpoint = (chainId :number) => {
    if(chainId === 97 || chainId === 56) return `https://data-platform.nodereal.io/graph/v1/${process.env.NEXT_PUBLIC_PANCAKESWAP_GRAPHQL_KEY}/projects/pancakeswap`
    if(chainId === 11155111 || chainId === 1) return `https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2`
    return ''
}

export const fixedNumber = (number : number) => {
    return number.toFixed(2)  
}