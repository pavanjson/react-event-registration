import { Button } from "react-bootstrap";

interface Props {
  color?: string;
  handler(e: any): void;
  name: string;
  classname?: string;
}

const MyButton = (props: Props) => {
  return (
    <>
      <Button
        color={props.color}
        onClick={props.handler}
        className={props.classname}
      >
        {props.name}
      </Button>
    </>
  );
};

export default MyButton;
