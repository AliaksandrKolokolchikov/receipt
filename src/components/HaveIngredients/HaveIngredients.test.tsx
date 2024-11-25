import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { HaveIngredients } from './HaveIngredients';
import { fetchIngredients } from '../../store/haveIngredients';
import { WrapperIngredients } from './WrapperIngredients.tsx';
import { useHaveIngredients } from '../../hooks';

jest.mock('../../store/haveIngredients', () => ({
  fetchIngredients: jest
    .fn()
    .mockImplementation((ingredients) => Promise.resolve(ingredients)),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn((selector) =>
    selector({
      haveIngredients: { recipes: [] },
    }),
  ),
  useDispatch: jest.fn(() => jest.fn()),
}));

jest.mock('../../hooks', () => ({
  useHaveIngredients: jest.fn(),
}));

const mockStore = configureStore({
  reducer: {
    haveIngredients: (state = { recipes: [] }) => state,
  },
});

describe('HaveIngredients Component', () => {
  it('renders and shows result after searching', () => {
    render(
      <Provider store={mockStore}>
        <HaveIngredients />
      </Provider>,
    );

    const searchInput = screen.getByPlaceholderText("What's cooking?");
    fireEvent.change(searchInput, { target: { value: 'Sugar' } });
    expect(searchInput).toHaveValue('Sugar');
  });

  it('renders button', () => {
    render(
      <Provider store={mockStore}>
        <HaveIngredients />
      </Provider>,
    );

    const showButton = screen.getByRole('button', { name: /show/i });
    expect(showButton).toBeInTheDocument();

    fireEvent.click(showButton);
    expect(fetchIngredients).toHaveBeenCalledTimes(1);
  });

  it('dispatches fetchIngredients on button click', () => {
    render(
      <Provider store={mockStore}>
        <HaveIngredients />
      </Provider>,
    );

    const showButton = screen.getByRole('button', { name: /show/i });
    const searchInput = screen.getByPlaceholderText("What's cooking?");

    fireEvent.change(searchInput, { target: { value: 'Sugar' } });
    fireEvent.click(showButton);

    expect(fetchIngredients).toHaveBeenCalledWith('Sugar');
    expect(fetchIngredients).toHaveBeenCalledTimes(2);
  });
});

describe('WrapperIngredients Component', () => {
  it('renders correctly', () => {
    (useHaveIngredients as jest.Mock).mockReturnValue({
      haveIngredients: {
        title: 'Ingredients',
        image: 'pizza.svg',
        readyInMinutes: 45,
        aggregateLikes: 1,
        summary: 'this is pizza',
        instructions: 'ready after 20 min',
      },
      error: null,
      loading: false,
    });

    render(
      <Provider store={mockStore}>
        <WrapperIngredients />
      </Provider>,
    );

    const mins = screen.getByText(/mins/i);
    const ingredients = screen.getByText(/Ingredients:/i);
    const instruction = screen.getByText(/Instructions:/i);

    expect(mins).toBeInTheDocument();
    expect(ingredients).toBeInTheDocument();
    expect(instruction).toBeInTheDocument();
  });
});
