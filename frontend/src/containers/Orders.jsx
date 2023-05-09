import React, { useEffect, useReducer } from 'react'

// API
import { fetchLineFoods } from '../apis/line_foods'

// reducers
import {
  initialState,
  lineFoodsActionTypes,
  lineFoodsReducer,
} from '../reducers/lineFoods'

//ここからOrdersコンポーネント
export const Orders = () => {

  // useReducerとimportした関数、初期値を使って状態を定義
  const [state, dispatch] = useReducer(lineFoodsReducer, initialState);

  // useEffectを用いて初回レンダリング時にfetchLineFoodsを実行
  useEffect(() => {
    // 最初にレンダリングした段階でtypeにFETCHINGを指定する
    // そうすることでlineFoodsReducer関数のcase文に割り振られるようにする
    dispatch({ type: lineFoodsActionTypes.FETCHING });
    // API関数を実行してLineFoods一覧を取得する
    fetchLineFoods()
      // 処理成功時にはtypeにFETCH_SUCCESSを指定してcase文に割り振られるようにする
      // payload.lineFoodsSummaryにdataを渡して、間接的にlineFoodsSummaryというstateを更新する
      .then((data) =>
        dispatch({
          type: lineFoodsActionTypes.FETCH_SUCCESS,
          payload: {
            lineFoodsSummary: data
          }
        })
      )
      .catch((e) => console.error(e));
  }, [])

  return (
    <div>Orders</div>
  )
}
