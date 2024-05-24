import { GraphQLClient } from 'graphql-request';
import { useEffect, useState } from 'react';
import { useChainId } from 'wagmi';
import { pairAddress } from '../../contracts/contractAddress';
import { conversionRate, fixedNumber, getEndpoint } from '../../utils';
import { pairReserver } from '../../utils/graphql-query';
import styles from './Conversion.module.scss'


interface requestReSponse {
    pair: {
        id: string,
        reserve0: string,
        reserve1: string,
    }
}

function Conversion({ amount }: { amount: number | string}) {
    const chainId = useChainId()
    const [client, setClient] = useState(false)
    const endpoint = getEndpoint(chainId)
    const [conversion, setConversion] = useState('')

    useEffect(() => {
        setClient(true)
    }, [])

    useEffect(() => {
        if (!client) return
        console.log(pairAddress[chainId])
        const getConversion = async () => {
            const graphQlClient = new GraphQLClient(endpoint)
            const request: requestReSponse = await graphQlClient.request(pairReserver(pairAddress[chainId]))
            const [token0Amount, token1Amount] = [parseFloat(request.pair.reserve0), parseFloat(request.pair.reserve1)]
            if (token1Amount < token0Amount) {
                const conversion = conversionRate(token1Amount, token0Amount)
                setConversion(conversion)
            } else {
                const conversion = conversionRate(token0Amount, token1Amount)
                setConversion(conversion)
            }
        }
        getConversion()
    }, [client, chainId])
    return (
        <>
            {parseFloat(amount as string) > 0 && <div className={styles.conversionContainer} >
                ~{fixedNumber(parseFloat(amount as string) * parseFloat(conversion))} USD
            </div>}
        </>
    );
}

export default Conversion;