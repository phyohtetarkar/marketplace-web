import { ReactNode, useState } from "react";
import { ProgressContext } from "./contexts";

function ProgressContextProvider({ children }: { children: ReactNode }) {
  const update = (show: boolean) => {
    setProgressState((old) => {
      return { ...old, show: show };
    });
  };

  const [progressState, setProgressState] = useState({
    show: false,
    update: update
  });

  return (
    <ProgressContext.Provider value={progressState}>
      {children}
    </ProgressContext.Provider>
  );
}

export default ProgressContextProvider;
