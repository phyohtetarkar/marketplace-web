import { useMemo } from "react";

interface PaginationProps {
  totalPage?: number;
  currentPage?: number;
}

function Pagination(props: PaginationProps) {
  const { totalPage = 0, currentPage = 0 } = props;
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPage;

  const pages = useMemo(() => {
    const pages = [0, 0, 0];

    if (currentPage > totalPage) {
      return pages;
    }

    if (currentPage === 1) {
      pages[0] = currentPage;
    } else if (currentPage === totalPage && currentPage - 2 > 0) {
      pages[0] = currentPage - 2;
    } else if (currentPage - 1 > 0) {
      pages[0] = currentPage - 1;
    }

    if (currentPage === 1 && currentPage + 1 <= totalPage) {
      pages[1] = currentPage + 1;
    } else if (currentPage === totalPage && currentPage - 1 > 0) {
      pages[1] = currentPage - 1;
    } else if (currentPage > 1) {
      pages[1] = currentPage;
    }

    if (totalPage < 3) {
      return pages;
    }

    if (currentPage === totalPage) {
      pages[2] = currentPage;
    } else if (currentPage === 1 && currentPage + 2 <= totalPage) {
      pages[2] = currentPage + 2;
    } else if (currentPage + 1 <= totalPage) {
      pages[2] = currentPage + 1;
    }

    return pages;
  }, [currentPage, totalPage]);

  if (totalPage <= 1) {
    return null;
  }

  return (
    <nav aria-label="Pagination">
      <ul className="pagination mb-0">
        {!hasPrev ? (
          <li className="page-item disabled">
            <span className={"page-link user-select-none"}>Prev</span>
          </li>
        ) : (
          <li className="page-item">
            <div role="button" className="page-link" onClick={() => {}}>
              Prev
            </div>
          </li>
        )}
        {pages.map((e, i) => {
          if (e === 0) {
            return null;
          }
          return (
            <li
              className={`page-item ${currentPage === e ? "active" : ""}`}
              key={i}
            >
              <div role="button" className="page-link" onClick={() => {}}>
                {e}
              </div>
            </li>
          );
        })}
        {!hasNext ? (
          <li className="page-item disabled">
            <span className={"page-link user-select-none"}>Next</span>
          </li>
        ) : (
          <li className="page-item">
            <div role="button" className="page-link" onClick={() => {}}>
              Next
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Pagination;
