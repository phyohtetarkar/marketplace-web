interface PaginationProps {
  hasPrev?: boolean;
  hasNext?: boolean;
}

function Pagination({ hasPrev, hasNext }: PaginationProps) {
  return (
    <nav aria-label="Pagination">
      <ul className="pagination">
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
