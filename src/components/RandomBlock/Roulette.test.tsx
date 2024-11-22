import '@testing-library/jest-dom';
import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Roulette } from './Roulette.tsx';
import { useRandomLogic } from '../../hooks';
import { RouletteWrapper } from './RouletteWrapper.tsx';
import { RECIPE_RANDOM } from '../../types';

jest.mock('../../hooks', () => ({
  useRandomLogic: jest.fn(),
}));

jest.mock('../../store/random', () => ({
  fetchRecipesRandom: jest.fn().mockImplementation(() => Promise.resolve()),
}));

const store = configureStore({
  reducer: {
    randomRecipe: (state = { recipes: [] }) => state,
  },
});

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn((selector) =>
    selector({
      randomRecipe: { recipes: [] },
    }),
  ),
  useDispatch: jest.fn(() => jest.fn()),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Roulette component', () => {
  const mockWinningRecipe: RECIPE_RANDOM = {
    id: '1',
    name: 'Test Recipe',
    prepTimeMinutes: 30,
    image: 'test-image.jpg',
    instructions: ['Step 1', 'Step 2', 'Step 3'],
    userId: 1,
    ingredients: [],
    rating: 4.5,
  };

  it('starts roulette and defines the winner', () => {
    const mockHandleStart = jest.fn();
    const mockHandlePrizeDefined = jest.fn();

    (useRandomLogic as jest.Mock).mockReturnValue({
      prizes: [
        { id: '1', name: 'Prize 1' },
        { id: '2', name: 'Prize 2' },
      ],
      prizeIndex: 1,
      start: true,
      handleStart: mockHandleStart,
      handlePrizeDefined: mockHandlePrizeDefined,
      winningRecipe: null,
    });
    render(
      <Provider store={store}>
        <Roulette />
      </Provider>,
    );

    const showButton = screen.getByRole('button', { name: /Start/i });
    expect(showButton).toBeInTheDocument();
    fireEvent.click(showButton);
    expect(mockHandleStart).toHaveBeenCalled();
  });

  it('render winner recipe after win in roulette', () => {
    render(
      <Provider store={store}>
        <RouletteWrapper winningRecipe={mockWinningRecipe} />
      </Provider>,
    );

    expect(
      screen.getByText('Поздравляем! Вы выиграли рецепт:'),
    ).toBeInTheDocument();

    expect(screen.getByText('30 минут на приготовление')).toBeInTheDocument();

    const recipeImage = screen.getByAltText(/Winning recipe/i);
    expect(recipeImage).toBeInTheDocument();
    expect(recipeImage).toHaveAttribute('src', 'test-image.jpg');
  });

  it('navigate after click by recipe', () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    render(
      <Provider store={store}>
        <RouletteWrapper winningRecipe={mockWinningRecipe} />
      </Provider>,
    );

    const showButton = screen.getByRole('button', {
      name: /More Information.../i,
    });
    expect(showButton).toBeInTheDocument();

    fireEvent.click(showButton);
    expect(mockNavigate).toHaveBeenCalledWith('/roulette/Test Recipe');
  });
});
