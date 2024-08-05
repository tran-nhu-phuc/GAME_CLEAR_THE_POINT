import { useRef, useState } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard/gameBoard";
import Header from "./components/Header/header";
export interface CircleType {
  size: number;
  left: number;
  top: number;
  value: number;
}
function App() {
  const [countCircle, setCountCircle] = useState<number>(0);
  const [isResetCountValue, setIsResetCountValue] = useState<boolean>(false);
  const memoryValue = useRef<number>(0);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleCountCircle = (countValue: number) => {
    setCountCircle(countValue);
  };
  const onRestartValue = () => {
    setIsResetCountValue(!isResetCountValue);
  };

  const onSuccess = (status: boolean) => {
    setIsSuccess(status);
  };

  return (
    <div className="App">
      <Header
        handleCountCircle={handleCountCircle}
        onRestartValue={onRestartValue}
        memoryValue={memoryValue}
        isSuccess={isSuccess}
        onSuccess={onSuccess}
        countCircle={countCircle}
      />
      <GameBoard
        countCircle={countCircle}
        isResetCountValue={isResetCountValue}
        memoryValue={memoryValue}
        onSuccess={onSuccess}
      />
    </div>
  );
}

export default App;
