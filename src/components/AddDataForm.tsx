import React, { useCallback, useEffect, useState } from 'react';
import { AsyncThunk } from '@reduxjs/toolkit';
import { useAppDispatch } from '../hooks';

interface addDataFormProps<T> {
  fields: Array<keyof T>,
  addEntity: AsyncThunk<any, T, object>,
}

function AddDataForm<T> ({ fields, addEntity }: addDataFormProps<T>) {
  const dispatch = useAppDispatch();
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [formState, setFormState] = useState<{[key: string]: string} | null>(null);

  const getInitialFormState = useCallback(() => {
    setFormState(
      fields.reduce((state, value) => {
        state[value as keyof {[key: string]: string}] = '';
        return state;
      }, {} as {[key: string]: string})
    );
  }, [fields]);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  };

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formState) {
      dispatch(addEntity(formState as T));
    }
  }

  useEffect(() => {
    if (fields) {
      getInitialFormState();
    }
  }, [fields, getInitialFormState])
  
  return (
    <>
      {<button onClick={() => setIsOpened(!isOpened)}>{isOpened ? 'Отменить' : 'Добавить'}</button>}
      {
        isOpened && 
        <form onSubmit={formSubmitHandler}>
          {formState && Object.entries(formState).map((formField, i) => {
            return <>
              <label key={i} htmlFor={`${formField[0]}-field`}>{formField[0]}</label>
              <input
                key={i}
                type="text"
                name={formField[0]}
                id={`${formField[0]}-field`}
                value={formField[1]}
                onChange={inputChangeHandler}
                required
              />
            </>
          })}
          <button type='submit'>Отправить</button>
        </form>
      }
    </>
  );
};

export default AddDataForm;