import React, { forwardRef } from "react";

type propsType = {
  actionValue: string;
}

const ActionButton = forwardRef<HTMLDivElement, propsType>((props, ref) => {
  const applyAction = (action: string) => {
    if (typeof ref !== "function") {
      if (ref && ref.current) {
        document.execCommand(action);
        ref.current.focus({ preventScroll: true });
      }
    }
  };

  return (
    <>
      <button
        className={`btn mr-2 my-5 p-1 border border-solid border-black rounded`}
        onClick={() => applyAction(props.actionValue)}
      >
        {props.actionValue}
      </button>
    </>
  );
});
ActionButton.displayName = "ActionButton";

export default ActionButton;
