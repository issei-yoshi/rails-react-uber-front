import React, { useEffect } from 'react'

// API
import { fetchLineFoods } from '../apis/line_foods'

export const Orders = () => {

  // useEffectを用いて初回レンダリング時にfetchLineFoodsを実行
  useEffect(() => {
    fetchLineFoods()
      .then((data) =>
        console.log(data)
      )
      .catch((e) => console.error(e));
  }, [])

  return (
    <div>Orders</div>
  )
}
