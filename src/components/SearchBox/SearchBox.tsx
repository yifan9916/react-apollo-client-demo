import React, { FC, useState } from 'react';

type SearchBoxProps = {
  onSubmit: (inputText: string) => void;
};

export const SearchBox: FC<SearchBoxProps> = ({ onSubmit }) => {
  const [inputText, setInputText] = useState('');

  const handleOnChange = (e: React.ChangeEvent) => {
    setInputText((e.target as HTMLInputElement).value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(inputText);
  };

  return (
    <div className="flex justify-center">
      <form className="w-2/5" role="search" onSubmit={handleSubmit}>
        <label htmlFor="issue-search">Search through the results: </label>
        <div className="flex">
          <input
            className="border-2 border-black rounded-lg w-full mr-1"
            id="issue-search"
            type="search"
            value={inputText}
            onChange={handleOnChange}
            aria-label="Search for issues"
          />
          <button
            className="p-2 rounded-lg border-2 border-black"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};
