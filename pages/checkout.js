import { Button } from '@mui/material'
import axios from 'axios'
import { ethers } from 'ethers'
import { useContext, useState } from 'react'
import AppContext from '../components/AppContext'
import ErrorMessage from '../components/ErrorMessage'
import TxList from '../components/TxList'

const style = {
  wrapper: ``,
  walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42] `,
  button: `border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
  details: `text-lg text-center text=[#282b2f] font-semibold mt-4`,
}

const startPayment = async ({ setError, setTxs, ether, addr }) => {
  try {
    if (!window.ethereum)
      throw new Error('No crypto wallet found. Please install it.')

    await window.ethereum.send('eth_requestAccounts')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    ethers.utils.getAddress(addr)
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether),
    })
    setTxs([tx])
  } catch (err) {
    setError(err.message)
  }
}

const sendingData = async (finalMap) => {
  const createEventAttendeeResp = await axios.post(
    '/api/sendTransaction',
    finalMap
  )
}
export default function Checkout() {
  const [error, setError] = useState()
  const [txs, setTxs] = useState([])
  const { purchased, setPurchased } = useContext(AppContext)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    setError()
    startPayment({
      setError,
      setTxs,
      ether: data.get('ether'),
      addr: data.get('addr'),
    })
  }

  if (txs.length > 0) {
    purchased.map((item) => {
      item['transactionID'] = txs[0]?.hash
    })
    sendingData(purchased)
  }
  return (
    <form className="m-4" onSubmit={handleSubmit}>
      <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Send ETH payment
          </h1>
          <div className="">
            <div className="my-3">
              <input
                type="text"
                name="addr"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                placeholder="Recipient Address"
              />
            </div>
            <div className="my-3">
              <input
                name="ether"
                type="text"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                placeholder="Amount in ETH"
              />
            </div>
          </div>
        </main>
        <footer className="p-4">
          <Button
            variant="outlined"
            type="submit"
            className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
          >
            Pay now
          </Button>
          <ErrorMessage message={error} />
          <TxList txs={txs} />
        </footer>
      </div>
    </form>
  )
}
