import React, { Dispatch } from 'react';
import styled from 'styled-components';
import { DataHeadingsTranslations } from '../const';
import { sortPropertiesByTemplate } from '../utils';
import TextField from './TextField';

const TableCell = styled.td`
  &:first-child {
    padding-left: 20px;
  }
`;

interface ISearchProps<T> {
  state: T,
  stateSetter: Dispatch<T>
};

interface ISearchStateI {
  [key: string]: string,
};

export default function Search<T extends ISearchStateI> ({state, stateSetter}: ISearchProps<T>) {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    stateSetter({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <tr>
      {Object.keys(state)
        .sort(sortPropertiesByTemplate)
        .map((param, i) => {
          return <TableCell key={i}>
            <TextField
              type="text"
              name={param}
              value={state[param as keyof T]}
              onChange={changeHandler}
              placeholder={`Поиск по ${DataHeadingsTranslations[param as keyof typeof DataHeadingsTranslations]}`}
            />
          </TableCell>
        }
      )}
      <td width='56px'></td>
    </tr>
  );
};