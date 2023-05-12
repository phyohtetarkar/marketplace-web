interface ShopSubscriptionProps {
  shopId: number;
}

function ShopSubscription(props: ShopSubscriptionProps) {
  const { shopId } = props;

  return (
    <>
      <div className="row g-3 mb-3">
        <div className="col"></div>
        <div className="col-auto">
          <button className="btn btn-primary px-3 py-2" onClick={() => {}}>
            Renew plan
          </button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead className="text-nowrap">
            <tr>
              <th scope="col" style={{ minWidth: 250 }}>
                Subscription Plan
              </th>
              <th scope="col" style={{ minWidth: 100 }}>
                Duration
              </th>
              <th scope="col" style={{ minWidth: 120 }}>
                Status
              </th>
              <th scope="col" style={{ minWidth: 150 }}>
                Expired At
              </th>
            </tr>
          </thead>
          <tbody className="text-nowrap"></tbody>
        </table>
      </div>
    </>
  );
}

export default ShopSubscription;
