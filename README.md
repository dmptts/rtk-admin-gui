# Admin GUI

Простой DataGrid позволяющий редактировать, добавлять, удалять и фильтровать записи в таблице.
В качестве сервера использовался [My JSON Server](https://my-json-server.typicode.com), и т.к. сервис не фиксирует изменения данных и не генерирует новые id, это накладывает несколько ограничений:

- невозможность добавить больше одной сущности в таблицу;
- изменения после перезагрузки страницы теряются.

## Используемые техонологии:

- React
- Typescript
- Redux Toolkit
- React Router
- styled-components
- Formik + yup

## Скрипты

- `npm start` -- Запускает dev-сервер
- `npm run build` -- Собирает проект для продакшена
