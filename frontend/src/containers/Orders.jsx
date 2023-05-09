import React, { useEffect, useReducer } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

// API
import { fetchLineFoods } from '../apis/line_foods'
import { postOrder } from '../apis/orders'

// reducers
import {
  initialState,
  lineFoodsActionTypes,
  lineFoodsReducer,
} from '../reducers/lineFoods'

// components
import { OrderDetailItem } from '../components/OrderDetailItem'
import { OrderButton } from '../components/Buttons/OrderButton'
import { CircularProgress } from '@mui/material'

// images
import MainLogo from '../images/logo.png';
import { REQUEST_STATE } from '../constants';

// styled-components
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 32px;
`;

const MainLogoImage = styled.img`
  height: 90px;
`;

const OrderListWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const OrderItemWrapper = styled.div`
  margin-bottom: 50px;
`;

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

  // OrderButton(注文する時に押すボタン)のクリックイベントとして渡す関数を定義
  const postLineFoods = () => {
    // 登録するAPIを呼ぶ前段階でローディング状態にstateを更新
    dispatch({ type: lineFoodsActionTypes.POSTING })
    // fetchLineFoodsで更新したlineFoodsSummaryのdata内にあるline_food_idsをpostOrder関数の引数として渡す
    postOrder({
      line_food_ids: state.lineFoodsSummary.line_food_ids,
    }).then(() => {
      // 成功したら状態を成功に更新
      dispatch({ type: lineFoodsActionTypes.POST_SUCCESS });
      // 画面をリロードする
      window.location.reload();
    });
  };

  // 注文ボタンの中に表示する文字列をリクエストの状態に応じて出し分ける関数を定義
  const orderButtonLabel = () => {
    switch (state.postState) {
      case REQUEST_STATE.LOADING:
        return '注文中...';
      case REQUEST_STATE.OK:
        return '注文が完了しました';
      default:
        return '注文を確定する';
    }
  };

  return (
    <>
      <HeaderWrapper>
        <Link to="/restaurants" >
          <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
      </HeaderWrapper>
      <OrderListWrapper>
        <div>
          <OrderItemWrapper>
            {
              state.fetchState === REQUEST_STATE.LOADING ?
                <CircularProgress />
              :
                state.lineFoodsSummary &&
                  <OrderDetailItem
                    //fetchLineFoodsで更新したlineFoodsSummaryのdata内にあるrestaurant(Railsの返り値)
                    restaurantFee={state.lineFoodsSummary.restaurant.fee}
                    restaurantName={state.lineFoodsSummary.restaurant.name}
                    restaurantId={state.lineFoodsSummary.restaurant.id}
                    timeRequired={state.lineFoodsSummary.restaurant.time_required}
                    //fetchLineFoodsで更新したlineFoodsSummaryのdata内にあるcount(Railsの返り値)
                    foodCount={state.lineFoodsSummary.count}
                    //fetchLineFoodsで更新したlineFoodsSummaryのdata内にあるamount(Railsの返り値)
                    price={state.lineFoodsSummary.amount}
                  />
            }
          </OrderItemWrapper>
          <div>
            {
              // fetchStateがOKかつlineFoodsSummaryが存在する(trueの)時はOrderButtonコンポーネントを表示する
              state.fetchState === REQUEST_STATE.OK && state.lineFoodsSummary &&
              <OrderButton
                // クリックしたときに発火するイベントを設定、注文登録APIを呼ぶ関数
                onClick={() => postLineFoods()}
                // APIを呼んでいるもしくは成功した場合にはボタンをdisabledにするよう設定
                disabled={state.postState === REQUEST_STATE.LOADING || state.postState === REQUEST_STATE.OK }
              >
                {orderButtonLabel()}
              </OrderButton>
            }
            {
              // fetchStateがOKかつlineFoodsSummaryが存在しない(falseの)時は仮注文データがないという意味なので、注文予定商品がないと表示する
              state.fetchState === REQUEST_STATE.OK && !(state.lineFoodsSummary) &&
              <p>
                注文予定の商品はありません
              </p>
            }
          </div>
        </div>
      </OrderListWrapper>
    </>
  )
};
