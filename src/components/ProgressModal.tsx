interface ProgressModalProps {
  show: boolean;
}

function ProgressModal(props: ProgressModalProps) {
  const { show } = props;

  return (
    <>
      {show && (
        <div className="overlay">
          <div className="position-relative w-100 h-100">
            <div className="position-absolute top-50 start-50 translate-middle">
              <div
                className="progress"
                style={{
                  height: 8,
                  width: "10rem"
                }}
              >
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated bg-primary"
                  role="progressbar"
                  style={{ width: "100%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProgressModal;
