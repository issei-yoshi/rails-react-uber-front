import React, { useEffect, useReducer } from 'react'
import styled from 'styled-components';
import { useParams } from 'react-router-dom'
import { Link } from "react-router-dom";
import { Skeleton } from '@mui/material';

// components
import { LocalMallIcon } from '../components/Icons';
import { FoodWrapper } from '../components/FoodWrapper';

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
import { COLORS } from '../style_constants';

// images
import MainLogo from '../images/logo.png';
import FoodImage from '../images/food-image.jpg';

// styled-components
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 32px;
`;

const BagIconWrapper = styled.div`
  padding-top: 24px;
`;

const ColoredBagIcon = styled(LocalMallIcon)`
  color: ${COLORS.MAIN};
`;

const MainLogoImage = styled.img`
  height: 90px;
`

const FoodsList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const ItemWrapper = styled.div`
  margin: 16px;
`;

// ここからFoodsコンポーネント
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
      <HeaderWrapper>
        <Link to="/restaurants">
          <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
        <BagIconWrapper>
          <Link to="/orders">
            <ColoredBagIcon fontSize="large" />
          </Link>
        </BagIconWrapper>
      </HeaderWrapper>
      <FoodsList>
      {
        // foodsStateというstateのfetchStateがLOADINGの場合という条件分岐
        foodsState.fetchState === REQUEST_STATE.LOADING ?
        <>
          {
            // => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]となり、12個のSkeltonが描画される
            [...Array(12).keys()].map(i =>
              <ItemWrapper key={i}>
                <Skeleton key={i} variant='rect' width={450} height={180} />
              </ItemWrapper>
            )
          }
        </>
        :
        // foodsStateというstate内のfoodsListを一つ一つ取り出して表示
        foodsState.foodsList.map(food =>
          <ItemWrapper key={food.id}>
            <FoodWrapper
              food={food}
              onClickFoodWrapper={(food) => console.log(food)}
              imageUrl={FoodImage}
            />
          </ItemWrapper>
        )
      }
      </FoodsList>
    </>
  )
}
