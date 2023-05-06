// APIリクエスト中に画面がどのような状態なのかを知るための状態をimport
import { REQUEST_STATE } from "../constants";

// useReducerで使用する初期値を定義
export const initialState = {
  // APIの取得状況を表すkey, 初期値はINITIAL
  fetchState: REQUEST_STATE.INITIAL,
  // APIから取得したrestaurant一覧を表すkey, 初期値は空の配列
  restaurantsList: [],
}

// 条件分岐として扱う定数を定義
export const restaurantsActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
}

export const restaurantsReducer = (state, action) => {
  switch (action.type) {
    case restaurantsActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case restaurantsActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        restaurantsList: action.payload.restaurants,
      };
    default:
      throw new Error();
  }
}