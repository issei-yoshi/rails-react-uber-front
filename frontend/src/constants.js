// APIリクエストに関して必要な定数を定義するファイル

// APIリクエスト中に画面がどのような状態なのかを知るための状態
export const REQUEST_STATE = {
  INITIAL: 'INITIAL',
  LOADING: "LOADING",
  OK: 'OK',
}

// HTTP_STATUS_CODEを知るための状態
export const HTTP_STATUS_CODE = {
  NOT_ACCEPTABLE: 406,
}