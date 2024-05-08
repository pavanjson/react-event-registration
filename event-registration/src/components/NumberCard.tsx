import "../assets/NumberCard.css";
interface NumberCardProps {
  number: number | string;
  name: string;
}
const NumberCard = (props: NumberCardProps) => {
  return (
    <div className="number-card card">
      <h3 className="number-card-title card-title">{props.number}</h3>
      <p className="card-text">{props.name}</p>
    </div>
  );
};

export default NumberCard;
