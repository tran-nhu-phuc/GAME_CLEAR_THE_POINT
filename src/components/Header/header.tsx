import { useStopwatch } from "react-timer-hook";
import "./header.css";
import { MutableRefObject, useEffect, useState } from "react";

interface Props {
  handleCountCircle: Function;
  onRestartValue: Function;
  memoryValue: MutableRefObject<number>;
  isSuccess: boolean;
  onSuccess: Function;
  countCircle: Number;
}

const Header: React.FC<Props> = (props: Props) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [milliseconds, setMilliseconds] = useState<number>(0);
  const { reset, seconds, pause } = useStopwatch({
    autoStart: isRunning,
  });
  let interval: string | number | NodeJS.Timeout | undefined;

  useEffect(() => {
    if (isRunning) {
      interval = setInterval(() => {
        setMilliseconds(new Date().getMilliseconds());
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const resetTime = () => {
    if (props.countCircle) {
      reset();
      setMilliseconds(0);
      props.onRestartValue();
      props.memoryValue.current = 0;
      setIsRunning(true);
      props.onSuccess(false);
      return;
    }
    alert("Vui vòng nhập số lượng hạt!");
  };

  useEffect(() => {
    if (props.isSuccess) {
      alert("Chúc mừng bạn đã chiến thắng");
      setIsRunning((prevIsRunning: boolean) => !prevIsRunning);
      pause();
    }
  }, [props.isSuccess]);

  return (
    <div className="header-game__container">
      <div className="header-game__context">
        <h2 className="header-game__context-text">LET'S PLAY</h2>
      </div>
      <div className="header-game__score">
        <div className="header-game__score-label">
          <span>Points:</span>
        </div>
        <div className="header-game__score-input">
          <input
            type="number"
            placeholder="."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              props.handleCountCircle(e.target.value)
            }
          />
        </div>
      </div>
      <div className="header-game__time">
        <div className="header-game__time-label">
          <span>Time:</span>
        </div>
        <div className="header-game__time-value">
          <span>{`${seconds}.${String(milliseconds).charAt(0)}s`}</span>
        </div>
      </div>
      <div className="header-game__controls">
        <button className="header-game__restart-button" onClick={resetTime}>
          Restart
        </button>
      </div>
    </div>
  );
};

export default Header;
