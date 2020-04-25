import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router} from "react-router-dom";

import Header from '../Header';

test("searchbox and search button render properly", () => {
  const { queryByTestId } = render(<Router> 
    {' '}
    <Header />
    {' '}
    </Router> );
  expect(queryByTestId("search-button")).toBeTruthy();
  expect(queryByTestId("search-field")).toBeTruthy();
});

describe("input into searchbox", () =>{
  test("updates", () => {
    const { queryByTestId } = render(<Router> 
      {' '}
      <Header />
      {' '}
       </Router> );
    const searchInput = queryByTestId('search-field');
    fireEvent.change(searchInput, {target: {value: "test"} } );
    expect(searchInput.value).toBe("test");
  })

  test("handleSearch gets called", () =>{
    const handleSearchSubmit = jest.fn();
    const { queryByTestId } = render(<Router> 
      {' '}
      <Header onSubmit={handleSearchSubmit}/>
      {' '}
       </Router> );
    const searchButton = queryByTestId('search-button');
    fireEvent.click(searchButton);
    expect(handleSearchSubmit).toHaveBeenCalledTimes(1);
  })
});

