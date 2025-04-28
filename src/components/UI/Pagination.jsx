import { usePagination } from "../../hooks/use-pagination";
import { DOTS } from "../../hooks/use-pagination";

import classes from "./Pagination.module.scss";

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={classes["pagination-container"]}>
      <li
        key="left_arrow"
        className={`${classes["pagination-item"]} ${
          classes[`${currentPage === 1 ? "disabled" : null}`]
        }`}
        onClick={onPrevious}
      >
        <div className={`${classes.arrow} ${classes.left}`}></div>
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li
              key={`page${index}`}
              className={`${classes["pagination-item"]} ${classes.dots}`}
            >
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={`page${index}`}
            className={`${classes["pagination-item"]} ${
              classes[`${pageNumber === currentPage ? "selected" : null}`]
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        key="right_arrow"
        className={`${classes["pagination-item"]} ${
          classes[`${currentPage === lastPage ? "disabled" : null}`]
        }`}
        onClick={onNext}
      >
        <div className={`${classes.arrow} ${classes.right}`}></div>
      </li>
    </ul>
  );
};

export default Pagination;
