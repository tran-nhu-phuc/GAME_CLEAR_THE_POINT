import { memo, MutableRefObject, useEffect, useMemo, useState } from "react";
import "./circle.css";
import { CircleType } from "../../App";

interface Props {
  countCircle: number;
  isResetCountValue: boolean;
  memoryValue: MutableRefObject<number>;
  onSuccess: Function;
}

const Circle: React.FC<Props> = (props: Props) => {
  const [circles, setCircles] = useState<CircleType[]>([]);
  useEffect(() => {
    if (props.countCircle > 0) {
      generateRandomCircles(props.countCircle);
    }
  }, [props.isResetCountValue]);

  const generateRandomCircles = (numberOfCircles: number) => {
    const containerWidth = 550;
    const containerHeight = 500;
    const newCircles: CircleType[] = [];

    for (let i = 0; i < numberOfCircles; i++) {
      const size = 50;
      const maxLeft = containerWidth - size;
      const maxTop = containerHeight - size;
      const left = Math.random() * maxLeft;
      const top = Math.random() * maxTop;
      newCircles.push({ size, left, top, value: i + 1 });
    }
    setCircles(newCircles);
  };

  const clearPoint = (valuePoint: number) => {
    if (valuePoint === props.memoryValue.current + 1) {
      setCircles((prevCircles: CircleType[]) => [
        ...prevCircles.filter(
          (item: CircleType) => Number(item.value) !== Number(valuePoint)
        ),
      ]);
      props.memoryValue.current = valuePoint;

      if (circles.length === 0) {
        props.onSuccess(true);
      }
      return;
    }
    alert("Bạn đã chọn sai");
  };

  useEffect(() => {
    if (circles.length === 0 && props.countCircle > 0) {
      props.onSuccess(true);
    }
  }, [circles]);

  const sortedCircles: any = useMemo(() => {
    return [...circles].sort((a, b) => b.value - a.value);
  }, [circles]);

  return sortedCircles?.map((item: CircleType, index: number) => {
    return (
      <div
        key={item.value}
        className="circle__container"
        style={{
          width: item.size + "px",
          height: item.size + "px",
          left: item.left + "px",
          top: item.top + "px",
          position: "absolute",
          backgroundColor: "lightblue",
          borderRadius: "50%",
          zIndex: index + 1,
        }}
        onClick={() => clearPoint(item.value)}
      >
        {item.value}
      </div>
    );
  });
};
export default memo(Circle);
