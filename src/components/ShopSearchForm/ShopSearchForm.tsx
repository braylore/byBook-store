import {
  Accordion,
  AccordionDetails,
  AccordionDetailsProps,
  AccordionSummary,
  AccordionSummaryProps,
  Box,
  Button,
  ButtonProps,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  styled,
  Typography
} from '@mui/material';
import { ExpandMore, Search } from '@mui/icons-material';
import { ChangeEvent, FC, useState, useEffect } from 'react';
import { fetchAllCategories } from 'store/slices/categoriesSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

const ErrorMsg = styled(Typography)({
  marginTop: '1rem',
  textAlign: 'center',
  fontWeight: 'bold'
});

const StyledAccordionDetails = styled((props: AccordionDetailsProps) => <AccordionDetails {...props} />)({
  maxHeight: '247px',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    width: '10px',
    backgroundColor: '#ccc7c7',
    borderRadius: '10px'
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#555',
    boxShadow: 'inset 0 0 6px #221f1fa1',
    borderRadius: '10px'
  }
});

const StyledAccordionSummary = styled((props: AccordionSummaryProps) => <AccordionSummary {...props} />)(
  ({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#ffffff1a' : '#00000014'
  })
);

const SearchBtn = styled((props: ButtonProps) => (
  <Button
    fullWidth
    endIcon={<Search />}
    variant="outlined"
    size="medium"
    color="inherit"
    type="button"
    {...props}
  />
))({
  fontWeight: 'bold',
  fontSize: '1rem',
  marginTop: '1rem'
});

interface IShopSearchFormProps {
  handleSearchFormSubmit: (
    checkboxState: string[],
    searchQueryState: string,
    searchSelectState: string,
    sortSelectState: string
  ) => void;
  categoriesParams: string[];
  searchQueryParams: string;
  searchSelectParams: string;
  sortSelectParams: string;
}

const ShopSearchForm: FC<IShopSearchFormProps> = ({
  handleSearchFormSubmit,
  categoriesParams,
  searchQueryParams,
  searchSelectParams,
  sortSelectParams
}) => {
  const {
    categoriesList = [],
    categoriesListError,
    isCategoriesListLoading
  } = useAppSelector((state) => state.categoriesReducer);
  const dispatch = useAppDispatch();
  const [searchType, setSearchType] = useState(searchSelectParams);
  const [checkedCategory, setCheckedCategory] = useState(categoriesParams);
  const [searchQuery, setSearchQuery] = useState(searchQueryParams);
  const [sortType, setSortType] = useState(sortSelectParams);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, []);

  const handleSelectSortChange = (event: SelectChangeEvent) => {
    setSortType(event.target.value);
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSearchType(event.target.value);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (checkedCategory.includes(event.target.name)) {
      setCheckedCategory(checkedCategory.filter((c) => c !== event.target.name));
    } else {
      setCheckedCategory((state) => [...state, event.target.name]);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: { xs: 'block', lg: 'flex' },
          mb: '10px'
        }}
      >
        <FormControl
          sx={{
            mb: { xs: '10px', lg: 'unset' },
            width: { xs: '100%', lg: '200px' }
          }}
        >
          <InputLabel id="search-select">Искать</InputLabel>
          <Select
            label="Искать"
            labelId="search-select"
            value={searchType}
            onChange={handleSelectChange}
          >
            <MenuItem value="all">Всё</MenuItem>
            <MenuItem value="author">По автору</MenuItem>
            <MenuItem value="title">По названию</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="search">Поиск</InputLabel>
          <OutlinedInput
            onChange={handleInputChange}
            value={searchQuery}
            label="Поиск"
            autoComplete="off"
            type="search"
            id="search"
          />
        </FormControl>
      </Box>
      {!categoriesListError ? (
        <Accordion disabled={isCategoriesListLoading}>
          <StyledAccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Категории</Typography>
          </StyledAccordionSummary>
          <StyledAccordionDetails>
            <FormControl
              component="fieldset"
              variant="outlined"
            >
              <FormLabel component="legend">Искать только выбранные категории</FormLabel>
              <FormGroup>
                {categoriesList.map(({ categoryName, id }) => {
                  return (
                    <FormControlLabel
                      key={id}
                      control={
                        <Checkbox
                          checked={checkedCategory.includes(categoryName)}
                          onChange={handleCheckboxChange}
                          name={categoryName}
                        />
                      }
                      label={categoryName}
                    />
                  );
                })}
              </FormGroup>
            </FormControl>
          </StyledAccordionDetails>
        </Accordion>
      ) : (
        <ErrorMsg>{categoriesListError}. Пожалуйста перезагрузите страницу.</ErrorMsg>
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          mt: '10px',
          alignItems: 'center'
        }}
      >
        <FormControl
          fullWidth
          sx={{
            minWidth: '150px'
          }}
        >
          <InputLabel id="sort-select">Порядок</InputLabel>
          <Select
            label="Порядок"
            labelId="sort-select"
            value={sortType}
            onChange={handleSelectSortChange}
          >
            <MenuItem value="none">Любой</MenuItem>
            <MenuItem value="cheap">Сначала дешёвые</MenuItem>
            <MenuItem value="expensive">Сначала дорогие</MenuItem>
          </Select>
        </FormControl>
        <SearchBtn onClick={() => handleSearchFormSubmit(checkedCategory, searchQuery, searchType, sortType)}>
          Искать
        </SearchBtn>
      </Box>
    </>
  );
};
export default ShopSearchForm;
