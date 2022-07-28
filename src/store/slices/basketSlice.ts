import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBasket, IBasketItemChangePayload, IBasketItemAddPayload } from 'types/IBasket';
import { IProducts } from 'types/IProducts';

interface IBasketState {
  basket: IBasket[];
}

const initialState: IBasketState = {
  basket: []
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    createUserBasket: (state, action: PayloadAction<IBasket>) => {
      if (state.basket.some((b) => b.userId === action.payload.userId)) {
        return;
      }
      state.basket.push(action.payload);
    },
    basketItemAdd: (state, action: PayloadAction<IBasketItemAddPayload>) => {
      state.basket.forEach((b) => {
        if (b.userId === action.payload.userId) {
          b.totalAmount += 1;
          b.totalPrice += action.payload.userBasket.price;
          b.userBasket.push(action.payload.userBasket);
        }
      });
    },
    basketItemRemove: (state, action: PayloadAction<IBasketItemChangePayload>) => {
      const userBasketIndex = state.basket.findIndex(({ userId }) => userId === action.payload.userId);
      state.basket[userBasketIndex].userBasket.forEach(({ id, amount, price }) => {
        if (id === action.payload.id) {
          state.basket[userBasketIndex].totalAmount -= amount;
          state.basket[userBasketIndex].totalPrice -= amount * price;
        }
      });
      state.basket[userBasketIndex].userBasket = state.basket[userBasketIndex].userBasket.filter(
        ({ id }) => id !== action.payload.id
      );
    },
    basketItemInc: (state, action: PayloadAction<IBasketItemChangePayload>) => {
      const userBasketIndex = state.basket.findIndex(({ userId }) => userId === action.payload.userId);
      state.basket[userBasketIndex].totalAmount += 1;
      state.basket[userBasketIndex].userBasket.forEach((b) => {
        if (b.id === action.payload.id) {
          b.amount += 1;
          state.basket[userBasketIndex].totalPrice += b.price;
        }
      });
    },
    basketItemDec: (state, action: PayloadAction<IBasketItemChangePayload>) => {
      const userBasketIndex = state.basket.findIndex(({ userId }) => userId === action.payload.userId);
      state.basket[userBasketIndex].totalAmount -= 1;
      state.basket[userBasketIndex].userBasket.forEach((b) => {
        if (b.id === action.payload.id) {
          b.amount -= 1;
          state.basket[userBasketIndex].totalPrice -= b.price;
        }
      });
    },
    basketItemAdminRemove: (state, action: PayloadAction<string>) => {
      if (state.basket.length) {
        state.basket.forEach((b, index) => {
          b.userBasket.forEach((ub) => {
            if (ub.id === action.payload) {
              b.totalAmount -= ub.amount;
              b.totalPrice -= ub.amount * ub.price;
              state.basket[index].userBasket = state.basket[index].userBasket.filter(({ id }) => id !== action.payload);
            }
          });
        });
      }
    },
    basketItemAdminChange: (state, action: PayloadAction<IProducts>) => {
      if (state.basket.length) {
        state.basket.forEach((b, userIndex) => {
          b.userBasket.forEach((ub, productIndex) => {
            if (ub.id === action.payload.id) {
              if (ub.price !== action.payload.price) {
                b.totalPrice -= ub.amount * ub.price;
                b.totalPrice += ub.amount * action.payload.price;
              }
              state.basket[userIndex].userBasket[productIndex] = {
                ...state.basket[userIndex].userBasket[productIndex],
                ...action.payload
              };
            }
          });
        });
      }
    }
  }
});

export default basketSlice.reducer;
export const {
  basketItemAdd,
  basketItemRemove,
  basketItemInc,
  basketItemDec,
  createUserBasket,
  basketItemAdminRemove,
  basketItemAdminChange
} = basketSlice.actions;
