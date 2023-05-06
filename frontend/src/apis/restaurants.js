import { Axios } from "axios";

// 定数として定義したrestaurantsへのURLをimport
import { restaurantsIndex } from "../urls";

export const fetchRestaurants = () => {
  // restaurantsIndexに向けてGEリクエストでURLを叩く
  return axios.get(restaurantsIndex)
  // 成功時にはres.dataでレスポンスの中身だけをreturn
  .then(res => {
    return res.data
  })
  // 失敗時にはコンソールにエラーを吐かせる
  .catch((e) => console.error(e))
}
