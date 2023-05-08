import React, { useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom'

// Reducers
import {
  initialState as foodsInitialState,
  foodsActionTypes,
  foodsReducer,
} from '../reducers/foods'

// API関数
import { fetchFoods } from '../apis/foods';

// constants(APIリクエストに関して必要な定数)
import { REQUEST_STATE } from '../constants';

export const Foods = () => {
  // useParamsを使うことで:以降に指定したparamsと同名の値を取得することができる
  const { restaurantId } = useParams();

  // useReducerを用いてstateを管理、importしたfoodsReducer関数を第一引数に渡す
  const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitialState);

  // useEffectを用いて初回レンダリング時にfetchFoodsというAPI関数を実行するよう実装
  useEffect(() => {
    // 最初にレンダリングした段階でtypeにFETCHINGを指定する
    // そうすることでrestaurantsReducer関数のcase文に割り振られるようにする
    dispatch({ type: foodsActionTypes.FETCHING })
    // restaurantIdを引数に取って実行する
    fetchFoods(restaurantId)
    // 成功時には2つのkeyの値を間接的に更新するよう返却
    // typeにFETCH＿SUCCESSを指定してcase文に振られるよう設定
    // payload.foodsに取得したdataの中にあるfoods(food一覧)を設定
    // そうすることでdispatchはreducerを通じて間接的にstateを更新することができる
    .then((data) =>
      dispatch({
        type: foodsActionTypes.FETCH_SUCCESS,
        payload: {
          foods: data.foods
        }
      })
    )
  }, [])

  return (
    <>
      {
        // foodsStateというstateのfetchStateがLOADINGの場合という条件分岐
        foodsState.fetchState === REQUEST_STATE.LOADING ?
        <>
          <p>ロード中</p>
        </>
        :
        // foodsStateというstate内のfoodsListを一つ一つ取り出して表示
        foodsState.foodsList.map(food =>
          <div key={food.id}>
            {food.name}
          </div>
        )
      }
    </>
  )
}
