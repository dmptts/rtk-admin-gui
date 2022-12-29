import { Dispatch, FormEvent } from 'react';
import styled from 'styled-components';
import SVG from 'react-inlinesvg';
import ChevronIcon from '../img/icon-chevron.svg';
import EllipsisIcon from '../img/icon-ellipsis.svg';

const Pagination = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  padding-left: 20px;

  list-style: none;
`;

const PaginationItem = styled.li<{ isActive?: boolean }>`
  display: block;
  min-width: 48px;
  padding-top: ${({ isActive }) => isActive ? '9px' : '7px'};
  padding-bottom: ${({ isActive }) => isActive ? '9px' : '7px'};
  padding-left: 9px;
  padding-right: 9px;

  font-size: 20px;
  font-weight: 500;
  color: ${({ isActive }) => isActive
    ? '#ffffff'
    : 'var(--color-text-main)'
  };
  text-align: center;

  background-color: ${({ isActive }) => isActive
    ? 'var(--color-brand-violet)'
    : 'transparent'
  };
  border-width: ${({ isActive }) => isActive
    ? '0'
    : '2px 0 2px 0'
  };
  border-style: solid;
  border-color: var(--color-grey);

  cursor: pointer;

  &:first-child {
    border-width: ${({ isActive }) => isActive
      ? '0'
      : '2px 0 2px 2px'
    };
    border-radius: 10px 0 0 10px;
  }

  &:last-child {
    border-width: ${({ isActive }) => isActive
      ? '0'
      : '2px 2px 2px 0'
    };
    border-radius: 0 10px 10px 0;
  }

  &:hover {
    padding-top: ${({ isActive }) => !isActive && '9px'};
    padding-bottom: ${({ isActive }) => !isActive && '9px'};

    color: ${({ isActive }) => isActive
      ? '#ffffff'
      : 'var(--color-text-main)'
    };

    background-color: ${({ isActive }) => isActive
      ? 'var(--color-brand-violet)'
      : 'var(--color-brand-orange)'
    };
    border-width: 0;
  }

  

  &:last-child:hover {
    padding-right: ${({ isActive }) => !isActive && '11px'};
  }

  &:first-child:hover {
    padding-left: ${({ isActive }) => !isActive && '11px'};
  }
`;

const PaginationEllipsis = styled(PaginationItem)`
  cursor: default;

  svg {
    width: 22px;
    height: 8px;

    stroke: var(--color-text-main);
  }

  &:hover {
    padding-top: 7px;
    padding-bottom: 7px;
    padding-left: 9px;
    padding-right: 9px;
    
    background-color: transparent;
    border-width: 2px 0 2px 0;
  }
`;

const PaginationFirstItem = styled(PaginationItem)`
  svg {
    width: 10px;
    height: 16px;
    stroke: var(--color-text-main);
  }

  &:hover svg {
    stroke: #ffffff;
  }
`;

const PaginationLastItem = styled(PaginationFirstItem)`
  svg {
    transform: rotate(180deg);
  }
`;

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
          <PaginationItem
            key={i}
            isActive={currentPage === i}
            onClick={(e) => clickHandler(e, i)}
          >
            {i}
          </PaginationItem>
        );
      };
    } else {
      if (currentPage < CUTTED_START_END_LENGTH) {
        for (let i = 1; i <= CUTTED_START_END_LENGTH; i ++) {
          result.push(
            <PaginationItem
              key={i}
              onClick={(e) => clickHandler(e, i)}
              isActive={i === currentPage}
            >
              {i}
            </PaginationItem>
          );
        };

        result.push(
          <PaginationEllipsis>
            <SVG src={EllipsisIcon} width={22} height={8} />
          </PaginationEllipsis>
        );
        result.push(
          <PaginationLastItem onClick={(e) => clickHandler(e, pagesCount)}>
            <SVG src={ChevronIcon} width={10} height={16} />
          </PaginationLastItem>
        );
      } else if (currentPage > pagesCount - CUTTED_START_END_LENGTH + 1) {
        result.push(
          <PaginationFirstItem onClick={(e) => clickHandler(e, 1)}>
            <SVG src={ChevronIcon} width={10} height={16} />
          </PaginationFirstItem>
        );

        result.push(
          <PaginationEllipsis>
            <SVG src={EllipsisIcon} width={22} height={8} />
          </PaginationEllipsis>
        );

        for (let i = pagesCount - CUTTED_START_END_LENGTH + 1; i <= pagesCount; i ++) {
          result.push(
            <PaginationItem
              key={i}
              onClick={(e) => clickHandler(e, i)}
              isActive={i === currentPage}
            >
              {i}
            </PaginationItem>
          );
        };
      } else {
        result.push(
          <PaginationFirstItem onClick={(e) => clickHandler(e, 1)}>
            <SVG src={ChevronIcon} width={10} height={16} />
          </PaginationFirstItem>
        );

        result.push(
          <PaginationEllipsis>
            <SVG src={EllipsisIcon} width={22} height={8} />
          </PaginationEllipsis>
        );

        for (let i = currentPage - PAGES_AROUND_ACTIVE; i <= currentPage + PAGES_AROUND_ACTIVE; i ++) {
          result.push(
            <PaginationItem
              key={i}
              onClick={(e) => clickHandler(e, i)}
              isActive={i === currentPage}
            >
              {i}
            </PaginationItem>
          );
        };

        result.push(
          <PaginationEllipsis>
            <SVG src={EllipsisIcon} width={22} height={8} />
          </PaginationEllipsis>
        );

        result.push(
          <PaginationLastItem onClick={(e) => clickHandler(e, pagesCount)}>
            <SVG src={ChevronIcon} width={10} height={16} />
          </PaginationLastItem>
        );
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