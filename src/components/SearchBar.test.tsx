import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  test('calls onSearch prop with input value when form is submitted', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search for news topics...');
    fireEvent.change(input, { target: { value: 'test search' } });
    
    const form = screen.getByRole('form');
    fireEvent.submit(form);
    
    expect(mockOnSearch).toHaveBeenCalledWith('test search');
  });
});