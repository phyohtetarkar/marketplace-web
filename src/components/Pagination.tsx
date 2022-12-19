interface PaginationProps {
  totalPage?: number;
  currentPage?: number;
}

function Pagination(props: PaginationProps) {
  const { totalPage = 0, currentPage = 0 } = props;
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPage;

  // const pages = useMemo(() => {
  //   return Array(totalPage > 3 ? 3 : totalPage).fill(null);
  // }, [totalPage]);

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
        {/* {pages.map((e, i) => {
          return (
            <li
              className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              key={i}
            >
              <div role="button" className="page-link" onClick={() => {}}>
                {i + 1}
              </div>
            </li>
          );
        })} */}
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
