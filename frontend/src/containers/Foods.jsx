import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

// API関数
import { fetchFoods } from '../apis/foods';

export const Foods = () => {
  // useParamsを使うことで:以降に指定したparamsと同名の値を取得することができる
  const { restaurantId } = useParams();

  // useEffectを用いて初回レンダリング時にfetchFoodsというAPI関数を実行するよう実装
  useEffect(() => {
    // restaurantIdを引数に取って実行する
    fetchFoods(restaurantId)
    // 成功時には取得したdataをコンソールに表示する
    .then((data) =>
      console.log(data)
    )
  }, [])

  return (
    <>
      <p>restaurantIdは{restaurantId}です</p>
    </>
  )
}
