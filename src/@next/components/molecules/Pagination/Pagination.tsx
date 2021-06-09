import React, { FC } from "react";
import ArrowRight from "images/arrow-right.svg";
import ArrowLeft from "images/arrow-left.svg";
import { PageItem } from "@components/atoms";
import {
  Container,
  PageControl,
  PageInfo,
  PageButton,
  PageButtonIcon,
  PageInfoMobile,
  PageItems,
} from "./styles";
import { IProps } from "./types";


export const Pagination: FC<IProps> = ({
  page,
  total,
  pageSize,
  onPageChange,
  className,
  pageItemsLimit = 3,
}) => {
  const getPages = (): number => {
    if (!total || !pageSize) {
      return 0;
    }
    return Math.ceil(total / pageSize);
  };

  const pages = getPages();

  const handlePageChange = (p: number): void => {
    if (page === p) {
      return;
    }
    onPageChange?.(p);
  };

  const getPageLimits = () => {
    let pageLimit = pageItemsLimit;
    let pageStart = 1;
    let pageEnd = pages;

    if (pageLimit < 1) {
      pageLimit = 5;
    }

    if (pageLimit < pageEnd) {
      if (page === pageStart) {
        pageStart = page;
      } else if (page === pageEnd) {
        pageStart = page - pageLimit + 1;
      } else {
        pageStart = page - (pageLimit - (pageLimit % 2)) / 2;
        if (pageStart < 1) {
          pageStart = 1;
        }
      }

      pageEnd = pageStart + pageLimit - 1;

      if (pageEnd > pages) {
        const dif = pageEnd - pages;
        pageEnd = pages;
        pageStart -= dif;
      }
    }

    return {
      pageEnd,
      pageStart,
    };
  };

  const renderPageItems = (): JSX.Element[] => {
    const pageItems: JSX.Element[] = [];
    const { pageEnd, pageStart } = getPageLimits();

    for (let i = pageStart - 1; i < pageEnd; i++) {
      const p = i + 1;

      pageItems.push(
        <PageItem
          key={p}
          selected={page === Number(p)}
          onClick={() => handlePageChange(p)}
        >
          {p}
        </PageItem>
      );
    }

    return pageItems;
  };

  if (pages < 2) {
    return null;
  }

  return (
    <Container className={className}>
      <PageControl>
        {page > 1 && (
          <PageButton
            data-testid="prev"
            onClick={() => handlePageChange(page - 1)}
          >
            <PageButtonIcon src={ArrowLeft} alt="" leftSide />
            Anterior
          </PageButton>
        )}
        <PageItems>{renderPageItems()}</PageItems>
        <PageInfoMobile>
          <span>{page}</span>/<span>{pages}</span>
        </PageInfoMobile>
        {page < pages && (
          <PageButton
            data-testid="next"
            onClick={() => handlePageChange(page + 1)}
          >
            Siguiente
            <PageButtonIcon src={ArrowRight} alt="" />
          </PageButton>
        )}
      </PageControl>
      <PageInfo>{`Página ${page} de ${pages}`}</PageInfo>
    </Container>
  );
};
