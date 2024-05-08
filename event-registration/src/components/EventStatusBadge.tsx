interface Props {
  isActive: boolean;
}
const EventStatusBadge = (props: Props) => {
  return (
    <p className="card-text">
      {props.isActive ? (
        <span className="badge bg-success m-3">Active</span>
      ) : (
        <span className="badge bg-danger m-3">Closed</span>
      )}
    </p>
  );
};

export default EventStatusBadge;
