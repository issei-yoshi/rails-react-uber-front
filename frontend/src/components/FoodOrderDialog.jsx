import React from 'react'
import { DialogContent, Dialog, DialogTitle, DialogActions } from '@mui/material'
import styled from 'styled-components'

// components
import { SubText } from './StyledText'

// images
import OrderHeaderImage from '../images/order-header.png'

// styled-components
const OrderHeader = styled.img`
  width: 100%;
  height: 350px;
`;

const DescriptionWrapper = styled.div`
  padding: 0 8px 8px 8px;
  height: 50px;
`;

const CountersWrapper = styled.div`
  margin-right: auto;
  display: flex;
  padding: 0 16px;
`;

const CountItem = styled.div`
  margin: 0 8px;
`

const CountNum = styled.div`
  padding-top: 10px;
`

const OrderTextWrapper = styled.div`
  display: flex;
`;

const OrderButtonTextWrapper = styled.div`
  width: 300px;
`;

const PriceWrapper = styled.div`
  padding-top: 4px;
`;

export const FoodOrderDialog = ({
  food,
  // 開くか閉じるかのpropsをbooleanで受け取る
  isOpen,
  // モーダルを閉じるために行う関数をpropsとして受け取り実行する
  onClose,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
    >
      <OrderHeader src={OrderHeaderImage} alt="order header" />
      <DialogTitle>
        {food.name}
      </DialogTitle>
      <DialogContent>
        <DescriptionWrapper>
          <SubText>
            {food.description}
          </SubText>
        </DescriptionWrapper>
      </DialogContent>
      <DialogActions>
      </DialogActions>
    </Dialog>
  )
}
