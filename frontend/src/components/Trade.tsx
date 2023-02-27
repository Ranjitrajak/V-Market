import axios from 'axios'
import React,{FC,useEffect,useState} from 'react'
import TradeType from '../types/trade'
import TradeItem from './TradeItem'

const Trade : FC = (): JSX.Element=>  {

    const [ items, setItems ] = useState<TradeType[]>([])

    useEffect(() => {
      


          async function getItems() {
            const token = localStorage.getItem("accessToken")
			const email = localStorage.getItem('userEmail')

			const headerConfig = { headers: { Authorization: `Bearer ${ token }` } }
			const { data } = await axios.get(`http://localhost:5000/shop/email/${ email }`, headerConfig)
			const userId = await data.id
              const res = await axios.get(`http://localhost:5000/trade/${userId}`,headerConfig)
              if(res){
                setItems(res.data)

              }
             
          }
          
          getItems()
          
      }, [])
  return (
    <div>
          {
					items.map(item => {
						return <TradeItem item={item} key={item.tradeId} />
					})
				}

    </div>
  )
}

export default Trade