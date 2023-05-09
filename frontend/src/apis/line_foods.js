import axios from "axios";

// line_foodsにAPIを叩くURLをimport
// line_foods/replaceを叩くURLをimport
import { lineFoods, lineFoodsReplace } from "../urls";

// paramsを引数に取ってAPIを叩く関数を定義
export const postLineFoods = (params) => {
  // URLに対してPOSTを送るためaxios.postを使用
  // 第一引数にリクエスト先のURL文字列
  return axios.post(lineFoods,
    // 第二引数にパラメーターを渡す
    // ここでfood_idとcountの2つをオブジェクト形式で渡すことでRailsで以下のように受け取ることが可能
    // params[:food_id]とparams[:count]
    {
      food_id: params.foodId,
      count: params.count,
    }
  )
  .then(res => {
    return res.data
  })
  .catch((e) => { throw e; })
};

// paramsを引数にとってAPIを叩く関数を定義
export const replaceLineFoods = (params) => {
  // URLに対してPUTを送るためaxios.putを使用
  // 第一引数にリクエスト先のURL文字列
  return axios.put(lineFoodsReplace,
    // 第二引数にパラメーターを渡す
    // ここでfood_idとcountの2つをオブジェクト形式で渡すことでRailsで以下のように受け取ることが可能
    // params[:food_id]とparams[:count]
    {
      food_id: params.foodId,
      count: params.count,
    }
  )
  .then(res => {
    return res.data
  })
  .catch((e) => { throw e; })
};

// /line_foodsにGETリクエストを投げるAPI関数を定義
export const fetchLineFoods = () => {
  return axios.get(lineFoods)
  .then(res => {
    return res.data
  })
  .catch((e) => { throw e; })
};
