import React, { Dispatch } from 'react';
import styled from 'styled-components';
import { TableHeadings } from '../const';
import Input from './Input';

const TableCell = styled.td`
  padding-top: 10px;
  padding-bottom: 10px;

  &:first-child {
    padding-left: 20px;
  }

  &:last-child {
    padding-right: 20px;
  }
`;

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
        return <TableCell key={i}>
          <Input type="text" name={param} value={state[param as keyof T]} onChange={changeHandler} placeholder={`Поиск по ${TableHeadings[param as keyof typeof TableHeadings]}`}/>
        </TableCell>
      })}
    </tr>
  )
}

export default Search;