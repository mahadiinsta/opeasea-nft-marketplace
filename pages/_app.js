import { ThirdwebWeb3Provider } from '@3rdweb/hooks'
import { useState } from 'react'
import AppContext from '../components/AppContext'
import '../styles/globals.css'

/**
 * The chain ID 4 represents the Rinkeby network
 * The `injected` connector is a web3 connection method used by Metamask
 */
const supportedChainIds = [4]
const connectors = {
  injected: {},
}

function MyApp({ Component, pageProps }) {
  const [purchased, setPurchased] = useState([])
  return (
    <ThirdwebWeb3Provider
      supportedChainIds={supportedChainIds}
      connectors={connectors}
    >
      <AppContext.Provider value={{ purchased, setPurchased }}>
        <Component {...pageProps} />
      </AppContext.Provider>
    </ThirdwebWeb3Provider>
  )
}

export default MyApp
