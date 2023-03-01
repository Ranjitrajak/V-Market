import axios from 'axios'
import React, { FC, useEffect, useState } from 'react'
import TradeType from '../types/trade'
import TradeItem from './TradeItem'
import jwt_decode from "jwt-decode";

const Trade: FC = (): JSX.Element => {

  const [items, setItems] = useState<TradeType[]>([])

  useEffect(() => {



    async function getItems() {
      const token: any = localStorage.getItem("accessToken")
      const decodedToken: any = jwt_decode(token);
      const userId: string = decodedToken.id;


      // const headerConfig = { headers: { Authorization: `Bearer ${token}` } }


      const res = await axios.get(`http://localhost:5000/trade/${userId}`)
      if (res) {
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