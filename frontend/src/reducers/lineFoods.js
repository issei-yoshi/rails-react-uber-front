// 仮注文の取得状況
// 仮注文から注文を登録する導線

import { REQUEST_STATE } from '../constants'

//初期状態を定義
export const initialState = {
  fetchState: REQUEST_STATE.INITIAL, //取得状況
  postState: REQUEST_STATE.INITIAL, //登録状況
  lineFoodsSummary: null, //仮注文データ
}

// 条件分岐として扱う定数を定義
export const lineFoodsActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  POSTING: 'POSTING',
  POST_SUCCESS: 'POST_SUCCESS'
}

export const lineFoodsReducer = (state, action) => {
  switch(action.type) {
    //取得状況がFETCHINGの時はfetchStateをLOADINGにする
    case lineFoodsActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    //取得状況がFETCH_SUCCESSの時はfetchStateをOKにする
    case lineFoodsActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        lineFoodsSummary: action.payload.lineFoodsSummary,
      };
    //登録状況がPOSTINGの時はpostStateをLOADINGにする
    case lineFoodsActionTypes.POSTING:
      return {
        ...state,
        postState: REQUEST_STATE.LOADING,
      };
      //登録状況がPOST_SUCCESSの時はpostStateをOKにする
    case lineFoodsActionTypes.POST_SUCCESS:
      return {
        ...state,
        postState: REQUEST_STATE.OK,
      };
    default:
      throw new Error();
  }
}
