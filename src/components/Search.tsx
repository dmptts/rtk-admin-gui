import React, { Dispatch } from 'react';

interface SearchProps<T> {
  state: T,
  stateSetter: Dispatch<T>
}

interface SearchStateI {
  [key: string]: string,
}

function Search<T extends SearchStateI> ({state, stateSetter}: SearchProps<T>) {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    stateSetter({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <tr>
      {Object.keys(state).map((param, i) => {
        return <td key={i}>
          <input type="text" name={param} value={state[param as keyof T]} onChange={changeHandler} />
        </td>
      })}
    </tr>
  )
}

export default Search;