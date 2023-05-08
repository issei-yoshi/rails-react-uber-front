// 406が返ってきたときに出すモーダルコンポーネント
import React from 'react'

import { DialogContent, Dialog, DialogTitle, DialogActions } from '@mui/material'
import { OrderButton } from './Buttons/OrderButton'

export const NewOrderConfirmDialog = ({
  isOpen,
  onClose,
  existingRestaurantName, //他店舗の名前
  newRestaurantName, //今選択した店舗の名前
  onClickSubmit, //仮注文の置き換えAPI
}) => (
  <Dialog
    open={isOpen}
    onClose={onClose}
    maxWidth="xs"
  >
    <DialogTitle>
      新規注文を開始しますか？
    </DialogTitle>
    <DialogContent>
      <p>
        {
          `ご注文に${existingRestaurantName}の商品が含まれています。
          新規の注文を開始して${newRestaurantName}の商品を追加してください。`
        }
      </p>
      <OrderButton onClick={onClickSubmit}>
        新規注文
      </OrderButton>
    </DialogContent>
  </Dialog>
);
