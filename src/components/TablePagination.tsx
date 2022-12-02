import React, { Dispatch, FormEvent } from 'react';
import { Pagination } from 'react-bootstrap';

interface TablePagintaionProps {
  pagesCount: number,
  currentPage: number,
  setCurrentPage: Dispatch<number>,
}

function TablePagination ({
  pagesCount,
  currentPage,
  setCurrentPage
}: TablePagintaionProps) {

  const clickHandler = (e: FormEvent, index: number) => {
    e.preventDefault();
    setCurrentPage(index);
  };

  const renderPagination = () => {
    const MAX_PAGES_WITHOUT_CUT = 10; //Максимальное количество страниц при котором отображаются все страницы
    const CUTTED_START_END_LENGTH = 5; // Количество отрисовываемых страниц сокращенного списка если активная страница в начале списка
    const PAGES_AROUND_ACTIVE = 2;

    const result: JSX.Element[] = [];

    if (pagesCount === 0) {
      return [];
    } else if (pagesCount <= MAX_PAGES_WITHOUT_CUT) {
      for (let i = 1; i <= pagesCount; i++) {
        result.push(
          <Pagination.Item
            key={i}
            active={currentPage === i}
            onClick={(e) => clickHandler(e, i)}
          >{i}</Pagination.Item>
        );
      };
    } else {
      if (currentPage < CUTTED_START_END_LENGTH) {
        for (let i = 1; i <= CUTTED_START_END_LENGTH; i ++) {
          result.push(
            <Pagination.Item
              key={i}
              onClick={(e) => clickHandler(e, i)}
              active={i === currentPage}
            >{i}</Pagination.Item>);
        };

        result.push(<Pagination.Ellipsis disabled/>);
        result.push(<Pagination.Last onClick={(e) => clickHandler(e, pagesCount)} />);
      } else if (currentPage > pagesCount - CUTTED_START_END_LENGTH + 1) {
        result.push(<Pagination.First onClick={(e) => clickHandler(e, 1)} />);
        result.push(<Pagination.Ellipsis disabled/>);

        for (let i = pagesCount - CUTTED_START_END_LENGTH + 1; i <= pagesCount; i ++) {
          result.push(
            <Pagination.Item
              key={i}
              onClick={(e) => clickHandler(e, i)}
              active={i === currentPage}
            >{i}</Pagination.Item>);
        };
      } else {
        result.push(<Pagination.First onClick={(e) => clickHandler(e, 1)} />);
        result.push(<Pagination.Ellipsis disabled/>);

        for (let i = currentPage - PAGES_AROUND_ACTIVE; i <= currentPage + PAGES_AROUND_ACTIVE; i ++) {
          result.push(
            <Pagination.Item
              key={i}
              onClick={(e) => clickHandler(e, i)}
              active={i === currentPage}
            >{i}</Pagination.Item>
          );
        };

        result.push(<Pagination.Ellipsis disabled/>);
        result.push(<Pagination.Last onClick={(e) => clickHandler(e, pagesCount)}  />);
      };
    };

    return result.map((btn) => btn);
  };

  return (
    <Pagination>
      {renderPagination()}
    </Pagination>
  );
};

export default TablePagination;