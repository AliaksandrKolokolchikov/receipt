import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { HeaderSearch } from './HeaderSearch';
import { recipeReducer } from '../../store/search';
import '@testing-library/jest-dom';

jest.mock('../../store/search', () => ({
  fetchRecipes: jest.fn(),
  recipeReducer: jest.fn((state = {}) => state),
}));

const store = configureStore({
  reducer: {
    search: recipeReducer,
  },
});

describe('HeaderSearch Component', () => {
  test('renders and shows results after searching', async () => {
    render(
      <Provider store={store}>
        <HeaderSearch />
      </Provider>,
    );

    const searchInput = screen.getByPlaceholderText("What's cooking?");

    fireEvent.change(searchInput, { target: { value: 'Pizza' } });
    expect(searchInput).toHaveValue('Pizza');
  });

  test('does not show results when search input is empty', () => {
    render(
      <Provider store={store}>
        <HeaderSearch />
      </Provider>,
    );

    const showButton = screen.getByRole('button', { name: /show/i });

    fireEvent.click(showButton);
  });
});
