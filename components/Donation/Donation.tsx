import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { parseEther } from 'viem';
import { useAccount, useBalance, useChainId, useWriteContract } from 'wagmi';
import { donationABI } from '../../contracts/abi/DonationABI';
import Loader from '../Loader/Loader';
import styles from './Donation.module.scss';
import { contractAddress } from '../../contracts/contractAddress';
import { waitForTransactionReceipt } from 'viem/actions';
import config from '../../config-wagmi';
import { ToastComponent } from '../Toast/Toast';
import Conversion from '../Conversion/Conversion';

function Donation() {

    const chainId = useChainId()
    const [value, setValue] = useState('0')
    const [isLoading, setIsLoading] = useState(false)
    const abi = donationABI
    const { data: hash, writeContractAsync } = useWriteContract()
    const { isConnected } = useAccount()
    const [isToastActive, setIsToastActive] = useState(false)
    const [toast, setToast] = useState({
        description: '',
        type: ''
    })
    const [isClient, useIsClient] = useState(false)
    const { address } = useAccount()
    let isToastActiveTimeOut: any

    const { data: balances } = useBalance({ address })

    const currency = () => chainId === 1 || chainId === 11155111 ? 'ETH' : 'BNB'

    useEffect(() => {
        if (isToastActiveTimeOut) {
            clearTimeout(isToastActiveTimeOut)
        }
        if (isToastActive && !isToastActiveTimeOut) {
            isToastActiveTimeOut = setTimeout(() => {
                setIsToastActive(false)
                console.log('run')
            }, 5000);
        }

        return () => {
            // setIsToastActive(false)
        }
    }, [isToastActive])

    useEffect(() => {
        useIsClient(true)
    }, [])

    const renderButtonDetail = () => {
        if (parseFloat(balances?.formatted!) <= parseFloat(value)) return 'Insufficient balance'
        if (!isConnected) return 'Please connect a wallet to donate'
        if (isLoading) return <Loader />
        return 'Donate !!!'
    }
    const donate = async () => {
        try {
            setIsLoading(true)
            // @ts-ignore
            setIsToastActive(true)
            setToast({ description: 'Send transaction...', type: 'loading' })
            const txn = await writeContractAsync({
                address: contractAddress[chainId],
                abi,
                functionName: '_donate',
                value: parseEther(value)
            })
            setIsLoading(false)
            setIsToastActive(true)
            setToast({ description: 'Thank you for donation', type: 'success' })
        } catch (err) {
            console.log(err)
            setIsLoading(false)
            setIsToastActive(true)
            setToast({ description: 'Error while sending transaction', type: 'error' })
        }
    }

    const renderToast = () => {
        if (!isClient) return
        return <ToastComponent isActive={isToastActive} description={toast.description} width="20px" height="20px" type={{ type: toast.type as "loading" | "error" | "success" }} />
    }


    return (
        <div className={styles.donationContainerFluid}>
            {renderToast()}
            <div className={styles.donationContainer}>
                <p className={styles.donationThankyou}>Thank you for your generous donation</p>
                <p className={styles.donationDesc}>Your support is invaluable and greatly appreciated. Thank you for being a part of our mission!</p>

                <div className={styles.donationForm}>
                    <div className={styles.donationInput}>
                        <input type='number' value={value} onChange={(e) => setValue(e.target.value)} />
                        <p className={styles.currency}>{currency()}</p>
                        <Conversion amount={value}/>
                    </div>
                    <button className={clsx(styles.donationButton, (!value || !isConnected || isLoading || parseFloat(balances?.formatted!) <= parseFloat(value)) && styles.inactive)} disabled={!value || !isConnected || isLoading || parseFloat(balances?.formatted!) <= parseFloat(value)} onClick={donate}>
                        {renderButtonDetail()}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Donation;

