import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeProvider } from '../ThemeProvider';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  it('renders search input', () => {
    render(
      <ThemeProvider>
        <SearchBar />
      </ThemeProvider>
    );
    expect(screen.getByRole('button')).toBeTruthy();
  });
});
