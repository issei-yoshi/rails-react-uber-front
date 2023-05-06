import React from 'react'
import { useParams } from 'react-router-dom'

export const Foods = () => {
  // useParamsを使うことで:以降に指定したparamsと同名の値を取得することができる
  const { restaurantId } = useParams();

  return (
    <>
      <p>restaurantIdは{restaurantId}です</p>
    </>
  )
}
