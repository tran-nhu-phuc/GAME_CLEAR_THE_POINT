import { memo, MutableRefObject } from "react";
import Circle from "../Circle/circle";
import "./gameBoard.css";

interface Props {
  countCircle: number;
  isResetCountValue: boolean;
  memoryValue: MutableRefObject<number>;
  onSuccess: Function;
}

const GameBoard: React.FC<Props> = (props: Props) => {
  return (
    <div className="game-board__container">
      <Circle
        onSuccess={props.onSuccess}
        countCircle={props.countCircle}
        isResetCountValue={props.isResetCountValue}
        memoryValue={props.memoryValue}
      />
    </div>
  );
};
export default memo(GameBoard);
