interface StepViewProps {
  step: number;
  title: string;
  active?: boolean;
  end?: boolean;
  onClick?: () => void;
}

function StepView(props: StepViewProps) {
  const { step, title, active, end, onClick } = props;

  return (
    <div className="row gx-2 align-items-center" onClick={onClick}>
      <div
        className={`col-auto rounded-circle d-flex align-items-center justify-content-center ${
          active ? "bg-primary text-light" : "bg-light-gray"
        }`}
        style={{ width: 40, height: 40 }}
      >
        {step}
      </div>
      <span className={`col-auto ${active ? "text-primary" : "text-dark"}`}>
        {title}
      </span>
      {!end && (
        <>
          <hr className="col my-0 d-none d-md-block" />
          <div className="col-12 b-block d-md-none px-0">
            <div
              className="d-flex justify-content-center py-1"
              style={{ width: 40 }}
            >
              <div className="vr"></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default StepView;
