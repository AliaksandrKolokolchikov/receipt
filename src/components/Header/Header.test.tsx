import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';

import { HeaderSearch } from './HeaderSearch';
import { fetchRecipes, recipeReducer } from '../../store/search';
import { NavAside } from './NavAside.tsx';
import { MemoryRouter, useNavigate } from 'react-router-dom';

jest.mock('../../store/search', () => ({
  fetchRecipes: jest.fn(),
  recipeReducer: jest.fn((state = {}) => state),
}));

const store = configureStore({
  reducer: {
    search: recipeReducer,
  },
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('HeaderSearch Component', () => {
  it('renders and shows results after searching', async () => {
    render(
      <Provider store={store}>
        <HeaderSearch />
      </Provider>,
    );

    const searchInput = screen.getByPlaceholderText("What's cooking?");

    fireEvent.change(searchInput, { target: { value: 'Pizza' } });
    expect(searchInput).toHaveValue('Pizza');
  });

  it('renders button', () => {
    render(
      <Provider store={store}>
        <HeaderSearch />
      </Provider>,
    );
    const showButton = screen.getByRole('button', { name: /show/i });
    expect(showButton).toBeInTheDocument();

    fireEvent.click(showButton);
  });

  it('does not show results when search input is empty', () => {
    render(
      <Provider store={store}>
        <HeaderSearch />
      </Provider>,
    );

    const showButton = screen.getByRole('button', { name: /show/i });
    expect('Shows button').not.toBe(showButton);
    fireEvent.click(showButton);

    expect(fetchRecipes).not.toHaveBeenCalled();
    expect(screen.queryByText('Showing Results')).not.toBeInTheDocument();
  });
});

describe('NavAside Component', () => {
  const mockSetActivePage = jest.fn();
  const mockNavigate = jest.fn();

  const renderComponent = (activePage: string) =>
    render(
      <MemoryRouter>
        <NavAside activePage={activePage} setActivePage={mockSetActivePage} />
      </MemoryRouter>,
    );

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders all menu in navAside', () => {
    renderComponent('home');
    const menu = ['Home', 'Search', 'Random', 'Logo', 'INSTA', 'TIKTOC', 'YT'];

    menu.forEach((item) => {
      const el = screen.getByAltText(item);
      expect(el).toBeInTheDocument();
      expect(el).toHaveAttribute('src');
    });
  });

  it('renders and handles clicks correctly', () => {
    renderComponent('home');

    const imgLogo = screen.getByAltText(/Logo/i);
    const imgSearch = screen.getByAltText(/Search/i);
    const imgRank = screen.getByAltText(/Random/i);
    const imgHome = screen.getByAltText(/Home/i);

    fireEvent.click(imgLogo);
    expect(mockNavigate).toHaveBeenCalledWith('/');

    fireEvent.click(imgSearch);
    expect(mockNavigate).toHaveBeenCalledWith('/search');

    fireEvent.click(imgRank);
    expect(mockNavigate).toHaveBeenCalledWith('/roulette');

    fireEvent.click(imgHome);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('renders and handles clicks correctly social media', () => {
    renderComponent('home');

    const YT = screen.getByRole('link', { name: /YT/i });
    const insta = screen.getByRole('link', { name: /insta/i });
    const tiktoc = screen.getByRole('link', { name: /tiktoc/i });

    expect(YT).toBeInTheDocument();
    fireEvent.click(YT);
    expect(YT).toHaveAttribute('href', 'https://youtube.com');

    expect(insta).toBeInTheDocument();
    fireEvent.click(insta);
    expect(insta).toHaveAttribute('href', 'https://instagram.com');

    expect(tiktoc).toBeInTheDocument();
    fireEvent.click(tiktoc);
    expect(tiktoc).toHaveAttribute('href', 'https://www.tiktok.com/explore');
  });
});
