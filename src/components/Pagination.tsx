import { useMemo } from "react";

interface PaginationProps {
  totalPage?: number;
  currentPage?: number;
  onChange?: (page: number) => void;
}

function Pagination(props: PaginationProps) {
  const { totalPage = 0, currentPage = 0, onChange } = props;
  const hasPrev = currentPage > 0;
  const hasNext = currentPage < totalPage - 1;

  const pages = useMemo(() => {
    if (currentPage > totalPage) {
      return [];
    }

    if (totalPage <= 1) {
      return [];
    }

    const pages = Array(totalPage > 3 ? 3 : totalPage).fill(0);
    const len = pages.length;

    return pages.map((p, i) => {
      if (currentPage - 1 >= 0) {
        if (currentPage === totalPage - 1) {
          return totalPage - len + i;
        }
        return p + i + (currentPage - 1);
      }
      return p + i + currentPage;
    });
  }, [currentPage, totalPage]);

  if (totalPage <= 1) {
    return null;
  }

  return (
    <nav aria-label="Pagination">
      <ul className="pagination mb-0">
        {currentPage === 0 ? (
          <li className="page-item disabled">
            <span className={"page-link user-select-none"}>First</span>
          </li>
        ) : (
          <li className="page-item">
            <div
              role="button"
              className="page-link"
              onClick={() => {
                onChange?.(0);
              }}
            >
              First
            </div>
          </li>
        )}
        {!hasPrev ? (
          <li className="page-item disabled">
            <span className={"page-link user-select-none"}>Prev</span>
          </li>
        ) : (
          <li className="page-item">
            <div
              role="button"
              className="page-link"
              onClick={() => {
                onChange?.(currentPage - 1);
              }}
            >
              Prev
            </div>
          </li>
        )}
        {pages.map((e, i) => {
          return (
            <li
              className={`page-item ${currentPage === e ? "active" : ""}`}
              key={i}
            >
              <div
                role="button"
                className="page-link"
                onClick={() => {
                  if (currentPage !== e) {
                    onChange?.(e);
                  }
                }}
              >
                {e + 1}
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
            <div
              role="button"
              className="page-link"
              onClick={() => {
                onChange?.(currentPage + 1);
              }}
            >
              Next
            </div>
          </li>
        )}
        {currentPage === totalPage - 1 ? (
          <li className="page-item disabled">
            <span className={"page-link user-select-none"}>Last</span>
          </li>
        ) : (
          <li className="page-item">
            <div
              role="button"
              className="page-link"
              onClick={() => {
                onChange?.(totalPage - 1);
              }}
            >
              Last
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Pagination;
