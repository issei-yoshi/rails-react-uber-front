// APIリクエスト中に画面がどのような状態なのかを知るための状態をimport
import { REQUEST_STATE } from "../constants";

// useReducerで使用する初期値を定義
export const initialState = {
  // APIの取得状況を表すkey, 初期値はINITIAL
  fetchState: REQUEST_STATE.INITIAL,
  // APIから取得したfood一覧を表すkey, 初期値は空の配列
  foodsList: []
}

// 条件分岐として扱う定数を定義
export const foodsActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
}

export const foodsReducer = (state, action) => {
  // 受け取ったaction.typeに応じて何を返却するのかが変わる
  switch (action.type){
    // FETCHINGだった場合
    case foodsActionTypes.FETCHING:
      // fetchStateをLOADINGとして返却
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    // FETCH_SUCCESSだった場合
    case foodsActionTypes.FETCH_SUCCESS:
      // fetchStateをOK, foodsListの中にpayload.foodsを間接的に更新して返却
      return {
        fetchState: REQUEST_STATE.OK,
        foodsList: action.payload.foods,
      };
    default:
      throw new Error();
  }
}
