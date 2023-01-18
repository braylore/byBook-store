import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { useHttp } from 'hooks/useHttp';
import { ICategories } from 'types/ICategories';
import { baseUrlCategories } from 'constants/baseUrls';

export const fetchAllCategories = createAsyncThunk('categories/fetchAllCategories', async (_, thunkAPI) => {
  const { request } = useHttp();
  try {
    const response = (await request(baseUrlCategories)) as ICategories[];
    return response;
  } catch (e) {
    return thunkAPI.rejectWithValue('Произошла ошибка при загрузке категорий');
  }
});

interface ICategoriesState {
  categoriesList: ICategories[];
  isCategoriesListLoading: boolean;
  categoriesListError: string;
}

const initialState: ICategoriesState = {
  categoriesList: [],
  isCategoriesListLoading: false,
  categoriesListError: ''
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    categoriesRemoveById: (state, action: PayloadAction<string>) => {
      state.categoriesList = state.categoriesList.filter(({ id }) => id !== action.payload);
    }
  },
  extraReducers: {
    [fetchAllCategories.fulfilled.type]: (state, action: PayloadAction<ICategories[]>) => {
      state.isCategoriesListLoading = false;
      state.categoriesList = action.payload;
    },
    [fetchAllCategories.pending.type]: (state) => {
      state.isCategoriesListLoading = true;
      state.categoriesListError = '';
    },
    [fetchAllCategories.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isCategoriesListLoading = false;
      state.categoriesListError = action.payload;
    }
  }
});

export default categoriesSlice.reducer;
export const { categoriesRemoveById } = categoriesSlice.actions;
