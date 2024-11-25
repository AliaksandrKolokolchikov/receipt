import '@testing-library/jest-dom';
import { useRecipeDetails } from '../../hooks';
import { fireEvent, render, screen } from '@testing-library/react';
import { MainRecipe } from './InfoRecipesDetails/MainRecipe.tsx';
import { ItemSearchRecipes } from './ItemSearchRecipes.tsx';
import { RECIPE } from '../../types';
import { MemoryRouter, useNavigate } from 'react-router-dom';

jest.mock('../../hooks', () => ({
  useRecipeDetails: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Recipe Components', () => {
  const mockRecipeDetails = {
    recipe: {
      id: 1,
      thumbnail_url: 'pizza.svg',
      name: 'test',
      cook_time_minutes: 40,
      description: 'description',
      user_ratings: {
        count_positive: 10,
        count_negative: 8,
      },
      instructions: [
        { display_text: 'step one' },
        { display_text: 'step two' },
      ],
    },
  };

  const mockItemRecipe: RECIPE = {
    id: 1,
    name: 'Test Recipe',
    thumbnail_url: 'pizza.svg',
    cook_time_minutes: 40,
    description: 'description',
    user_ratings: { count_negative: 11, count_positive: 22 },
    original_video_url: 'test-video.png',
    instructions: [
      { display_text: 'Preheat the oven to 180°C', position: 1 },
      { display_text: 'Mix the ingredients in a bowl', position: 2 },
      { display_text: 'Bake for 25 minutes', position: 3 },
    ],
    nutrition: {
      calories: 250,
      carbohydrates: 30,
      fat: 10,
      fiber: 5,
      protein: 15,
      sugar: 8,
    },
  };

  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('renders recipe details correctly', () => {
    (useRecipeDetails as jest.Mock).mockReturnValue(mockRecipeDetails);

    render(<MainRecipe />);

    expect(screen.getByText(/test/i)).toBeInTheDocument();
    expect(screen.getByText(/40 mins/i)).toBeInTheDocument();
    expect(screen.getByText(/10/i)).toBeInTheDocument();
    expect(screen.getByText(/8/i)).toBeInTheDocument();
    expect(screen.getByText(/description/i)).toBeInTheDocument();
  });

  it('navigates after clicking on recipe', () => {
    render(
      <MemoryRouter>
        <ItemSearchRecipes recipe={mockItemRecipe} />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText(/Test Recipe/i));

    expect(mockNavigate).toHaveBeenCalledWith('/search/1');
  });
});
