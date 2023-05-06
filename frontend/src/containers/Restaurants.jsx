import React, { useEffect } from 'react'

// API関数
import { fetchRestaurants } from '../apis/restaurants'

export const Restaurants = () => {

  // 初回レンダリング時にfetchRestaurantsというAPI関数を実行するようuseEffectを使う
  useEffect(() => {
    fetchRestaurants()
    .then((data) =>
      console.log(data)
    )
  }, [])

  return (
    <div>Restaurants</div>
  )
}
