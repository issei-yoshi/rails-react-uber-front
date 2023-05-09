import axios from "axios";

// /ordersというURLをインポート
import { orders } from "../urls";

// /ordersにPOSTリクエストを送るAPI関数を定義
export const postOrder = (params) => {
  // POSTリクエストなので、第一引数にURL, 第二引数にパラメーターを渡す
  return axios.post(orders,
    {
      line_food_ids: params.line_food_ids
    },
  )
  .then(res => {
    return res.data
  })
  .catch((e) => console.error(e))
}
