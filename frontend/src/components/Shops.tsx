import axios from 'axios'
import React , { FC,useEffect, useState }from 'react'
import ShopType from '../types/shop'
import ProductCard from './Product'
import Shop from './shop'

const Shops : FC = (): JSX.Element=> {
  const [ items, setItems ] = useState<ShopType[]>([])

  useEffect(() => {
		async function getItems() {
			const { data } = await axios.get('http://localhost:5000/shop/all')
			setItems(data)
		}
		
		getItems()
		
	}, [])
  return (
    <>
    <div>
      {
					items.map(item => {
						return <Shop item={item} key={item.id} />
					})
				}
    </div>
    <div>
   

    </div>
    </>
    
  )
}

export default Shops