import React, { useEffect, useReducer } from 'react'

// API
import { fetchLineFoods } from '../apis/line_foods'
import { postOrder } from '../apis/orders'

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

  const postLineFoods = () => {
    // 登録するAPIを呼ぶ前段階でローディング状態にstateを更新
    dispatch({ type: lineFoodsActionTypes.POSTING })
    // fetchLineFoodsで更新したlineFoodsSummaryのdata内にあるline_food_idsをpostOrder関数の引数として渡す
    postOrder({
      line_foods_ids: state.lineFoodsSummary.line_food_ids,
    }).then(() => {
      // 成功したら状態を成功に更新
      dispatch({ type: lineFoodsActionTypes.POST_SUCCESS });
      // 画面をリロードする
      window.location.reload();
    });
  };

  return (
    <div>Orders</div>
  )
}
