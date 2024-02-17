function Footer({ scrollToTop }: { scrollToTop?: () => void }) {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto bg-light" style={{ height: 70 }}>
      <div className="px-3 d-flex justify-content-between align-items-center h-100">
        <span className="text-muted">
          Copyright &copy; {year}&nbsp;
          {process.env.NEXT_PUBLIC_APP_NAME}
        </span>
        {scrollToTop && (
          <div
            role="button"
            className="nav-link p-0"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop?.();
            }}
          >
            Back to top
          </div>
        )}
      </div>
    </footer>
  );
}

export default Footer;
