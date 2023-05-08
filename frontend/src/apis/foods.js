import axios from "axios";

// restaurants/${restaurantId}/foodsにAPIを叩くURLをimport
import { foodsIndex } from "../urls";

// restaurantIdを引数にとってAPIを叩く関数を定義
export const fetchFoods = (restaurantId) => {
  return axios.get(foodsIndex(restaurantId))
  // 成功したら取得したレスポンスの中身だけを返却する
  .then(res => {
    return res.data
  })
  // 失敗時にはコンソールにエラーを吐かせる
  .catch((e) => console.error(e))
}
