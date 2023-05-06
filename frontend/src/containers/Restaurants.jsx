import React, { useEffect, useReducer } from 'react'
import styled from 'styled-components'

// API関数
import { fetchRestaurants } from '../apis/restaurants'

// Reducers
import {
  initialState,
  restaurantsActionTypes,
  restaurantsReducer,
} from '../reducers/restaurants'

// Images
import MainLogo from '../images/logo.png'
import MainCoverImage from '../images/main-cover-image.png'

// Styled-Component
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 32px;
`;

const MainLogoImage = styled.img`
  height: 90px;
`

const MainCoverImageWrapper = styled.div`
  text-align: center;
`;

const MainCover = styled.img`
  height: 600px;
`;

const RestaurantsContentsList = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 150px;
`;

const RestaurantsContentWrapper = styled.div`
  width: 450px;
  height: 300px;
  padding: 48px;
`;

const RestaurantsImageNode = styled.img`
  width: 100%;
`;

const MainText = styled.p`
  color: black;
  font-size: 18px;
`;

const SubText = styled.p`
  color: black;
  font-size: 12px;
`;

// ここからFunctional-Component
export const Restaurants = () => {
  // useReducerを用いてstateを管理, importしたrestaurantsReducer関数を第一引数に渡す
  const [state, dispatch] = useReducer(restaurantsReducer, initialState)

  // 初回レンダリング時にfetchRestaurantsというAPI関数を実行するようuseEffectを使う
  useEffect(() => {
    // 最初にレンダリングした段階でtypeにFETCHINGを指定する
    // そうすることでrestaurantsReducer関数のcase文に割り振られるようにする
    dispatch({ type: restaurantsActionTypes.FETCHING })
    fetchRestaurants()
    .then((data) =>
      // 成功したタイミングでtypeにFETCH_SUCCESSを指定
      // そうすることでrestaurantsReducer関数のcase文に割り振られるようにする
      // と同時にpayloadのrestaurants内に取得したdataを渡す
      // そうするとdispatchはreducerを通じて間接的にstateを変更させる
      dispatch({
        type: restaurantsActionTypes.FETCH_SUCCESS,
        payload: {
          restaurants: data.restaurants
        }
      })
    )
  }, [])

  // ここから描画開始
  return (
    <>
      <HeaderWrapper>
        <MainLogoImage src={MainLogo} alt="main logo" />
      </HeaderWrapper>
      <MainCoverImageWrapper>
        <MainCover src={MainCoverImage} alt="main cover" />
      </MainCoverImageWrapper>
      {
        // dispatchがreducerを通じて間接的にstateの値を変更することで
        // state内のrestaurantsListにAPIで取得したdataが入り、展開可能となる
        state.restaurantsList.map(restaurant =>
          <div key={restaurant.id}>
            {restaurant.name}
          </div>
        )
      }
    </>
  )
}
