import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Country {
  name: string;
  region: string;
  flag: string;
}

interface CountriesState {
  countries: Country[];
  filteredCountries: Country[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  page: number;
  itemsPerPage: number;
  selectedRegion: string;
}

const initialState: CountriesState = {
  countries: [],
  filteredCountries: [],
  status: 'idle',
  error: null,
  page: 1,
  itemsPerPage: 8,
  selectedRegion: 'All',
};

export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async () => {
    const response = await axios.get('https://restcountries.com/v2/all?fields=name,region,flag');
    console.log(response);
    return response.data;
  }
);

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setRegion: (state, action: PayloadAction<string>) => {
      state.selectedRegion = action.payload;
      state.filteredCountries = action.payload === 'All' 
        ? state.countries 
        : state.countries.filter(c => c.region === action.payload);
      state.page = 1;
    },
    loadMore: (state) => {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.countries = action.payload;
        state.filteredCountries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch countries';
      });
  },
});

export const { setRegion, loadMore } = countriesSlice.actions;
export default countriesSlice.reducer;