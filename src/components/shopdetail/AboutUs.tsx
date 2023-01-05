function AboutUs({ value }: { value: string }) {
  return (
    <div className="card shadow-sm">
      <div className="card-header border-bottom bg-white py-2h">
        <h4 className="mb-0">About us</h4>
      </div>
      <div className="card-body">
        <span>{value}</span>
      </div>
    </div>
  );
}

export default AboutUs;
