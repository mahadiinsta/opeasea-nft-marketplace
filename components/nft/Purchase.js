import { useContext, useEffect, useState } from 'react'
import AppContext from '../AppContext'

import toast, { Toaster } from 'react-hot-toast'
import { HiTag } from 'react-icons/hi'
import { IoMdWallet } from 'react-icons/io'

const style = {
  button: `mr-8 flex items-center py-2 px-12 rounded-lg cursor-pointer`,
  buttonIcon: `text-xl`,
  buttonText: `ml-2 text-lg font-semibold`,
}

const MakeOffer = ({ isListed, selectedNft, listings, marketPlaceModule }) => {
  const [selectedMarketNft, setSelectedMarketNft] = useState()
  const [enableButton, setEnableButton] = useState(false)
  const { purchased, setPurchased } = useContext(AppContext)
  useEffect(() => {
    if (!listings || isListed === 'false') return
    ;(async () => {
      setSelectedMarketNft(
        listings.find((marketNft) => marketNft.asset?.id === selectedNft.id)
      )
    })()
  }, [selectedNft, listings, isListed])

  useEffect(() => {
    if (!selectedMarketNft || !selectedNft) return

    setEnableButton(true)
  }, [selectedMarketNft, selectedNft])

  const confirmPurchase = (toastHandler = toast) =>
    toastHandler.success(`Purchase successful!`, {
      style: {
        background: '#04111d',
        color: '#fff',
      },
    })

  const buyItem = async (
    listingId = selectedMarketNft.id,
    quantityDesired = 1,
    module = marketPlaceModule
  ) => {
    console.log(listingId, quantityDesired, module, 'david')
    await module
      .buyoutDirectListing({
        listingId: listingId,
        quantityDesired: quantityDesired,
      })
      .catch((error) => console.error(error))

    confirmPurchase()
  }

  const handlePurchase = (newItem) => {
    if (purchased.length === 0) {
      setPurchased([...purchased, newItem])
      alert('Purchased item')
    }
    // else {
    //   purchased.map((item) => {
    //     if (item.id === newItem.id) {
    //
    //     } else {
    //     }
    //   })
    // }
    else {
      const result = purchased.find((element) => element.id === newItem.id)
      if (result === undefined) {
        alert('You have purchased this item')
        setPurchased([...purchased, newItem])
      } else {
        alert('You have already purchased this item')
      }
    }
  }
  return (
    <div className="flex h-20 w-full items-center rounded-lg border border-[#151c22] bg-[#303339] px-12">
      <Toaster position="bottom-left" reverseOrder={false} />
      {isListed === 'true' ? (
        <>
          <div
            onClick={() => {
              enableButton ? buyItem(selectedMarketNft.id, 1) : null
            }}
            className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}
          >
            <IoMdWallet className={style.buttonIcon} />
            <div className={style.buttonText}>Buy Now</div>
          </div>
          <div
            className={`${style.button} border border-[#151c22]  bg-[#363840] hover:bg-[#4c505c]`}
          >
            <HiTag className={style.buttonIcon} />
            <div className={style.buttonText}>Make Offer</div>
          </div>
        </>
      ) : (
        <div
          className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}
          onClick={() => handlePurchase(selectedNft)}
        >
          <IoMdWallet className={style.buttonIcon} />
          <div className={style.buttonText}>Buy Item</div>
        </div>
      )}
      {console.log('selected nft', selectedNft)}
    </div>
  )
}

export default MakeOffer
