import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { useHttp } from 'hooks/useHttp';
import { IProducts } from 'types/IProducts';
import { baseUrlProducts } from 'constants/baseUrls';

export const fetchAllProducts = createAsyncThunk('products/fetchAllProducts', async (_, thunkAPI) => {
  const { request } = useHttp();
  try {
    const response = (await request(baseUrlProducts)) as IProducts[];
    return response;
  } catch (e) {
    return thunkAPI.rejectWithValue('Произошла ошибка при загрузке продуктов');
  }
});

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id: string, thunkAPI) => {
  const { request } = useHttp();
  try {
    const response = (await request(`${baseUrlProducts}/${id}`)) as IProducts;
    return response;
  } catch (e) {
    return thunkAPI.rejectWithValue('Произошла ошибка при загрузке продукта');
  }
});

interface IProductsState {
  productSpecific: IProducts | null;
  productsList: IProducts[];
  isProductSpecificLoading: boolean;
  isProductListLoading: boolean;
  productListError: string;
  specificProductError: string;
}

const initialState: IProductsState = {
  productSpecific: null,
  productsList: [],
  isProductSpecificLoading: false,
  isProductListLoading: false,
  productListError: '',
  specificProductError: ''
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productChangeById: (state, action: PayloadAction<IProducts>) => {
      state.productsList[state.productsList.findIndex(({ id }) => id === action.payload.id)] = action.payload;
    },
    productRemoveById: (state, action: PayloadAction<string>) => {
      state.productsList = state.productsList.filter(({ id }) => id !== action.payload);
    }
  },
  extraReducers: {
    [fetchAllProducts.fulfilled.type]: (state, action: PayloadAction<IProducts[]>) => {
      state.isProductListLoading = false;
      state.productsList = action.payload;
    },
    [fetchAllProducts.pending.type]: (state) => {
      state.isProductListLoading = true;
      state.productListError = '';
    },
    [fetchAllProducts.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isProductListLoading = false;
      state.productListError = action.payload;
    },
    [fetchProductById.fulfilled.type]: (state, action: PayloadAction<IProducts>) => {
      state.isProductSpecificLoading = false;
      state.productSpecific = action.payload;
    },
    [fetchProductById.pending.type]: (state) => {
      state.isProductSpecificLoading = true;
      state.specificProductError = '';
    },
    [fetchProductById.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isProductSpecificLoading = false;
      state.specificProductError = action.payload;
    }
  }
});

export default productsSlice.reducer;
export const { productChangeById, productRemoveById } = productsSlice.actions;
