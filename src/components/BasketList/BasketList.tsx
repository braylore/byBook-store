import { Stack, Collapse } from '@mui/material';
import BasketListItem from 'components/BasketListItem/BasketListItem';
import { useAppDispatch } from 'hooks/redux';
import { FC } from 'react';
import { basketItemDec, basketItemInc, basketItemRemove } from 'store/slices/basketSlice';
import { IUserBasket } from 'types/IBasket';
import { TransitionGroup } from 'react-transition-group';

interface IBasketListProps {
  userBasket: IUserBasket[];
  userId: string | null;
}

const BasketList: FC<IBasketListProps> = ({ userBasket, userId }) => {
  const dispatch = useAppDispatch();

  const handleItemInc = (basketUserId: string | null, basketProductId: string) => {
    const payloadItemDecObj = {
      userId: basketUserId,
      id: basketProductId
    };
    dispatch(basketItemInc(payloadItemDecObj));
  };

  const handleItemDec = (basketUserId: string | null, basketProductId: string, basketItemAmount: number) => {
    const payloadItemDecObj = {
      userId: basketUserId,
      id: basketProductId
    };
    if (basketItemAmount === 1) {
      dispatch(basketItemRemove(payloadItemDecObj));
      return;
    }
    dispatch(basketItemDec(payloadItemDecObj));
  };

  return (
    <Stack
      spacing={2}
      flex={6}
    >
      <TransitionGroup component={null}>
        {userBasket.map((b) => (
          <Collapse key={b.id}>
            <BasketListItem
              handleItemDec={handleItemDec}
              handleItemInc={handleItemInc}
              userId={userId}
              key={b.id}
              {...b}
            />
          </Collapse>
        ))}
      </TransitionGroup>
    </Stack>
  );
};

export default BasketList;
