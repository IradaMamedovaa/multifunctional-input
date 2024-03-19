import React from "react";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";

import useFormulaStore from "../../utils/store/store";

const operands = ["*", "=", "+", "-"];

const CustomInput = ({ value }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["suggestionsData"],
    queryFn: () =>
      fetch("https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete")
        .then((res) => res.json())
        .then((res) =>
          res.map((suggestion) => ({ ...suggestion, label: suggestion.name })),
        ),
  });
  const updateFormula = useFormulaStore((state) => state.updateFormula);
  const cursorPosition = useFormulaStore((state) => state.cursorPosition);
  const updateCursorPosition = useFormulaStore(
    (state) => state.updateCursorPosition,
  );

  const ValueContainer = ({ children, ...props }) => {
    return <span {...props}>{children}</span>;
  };

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;


  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      cursorPosition !== 0 && updateCursorPosition(cursorPosition - 1);
    } else if (e.key === "ArrowRight") {
      cursorPosition !== value.length &&
        updateCursorPosition(cursorPosition + 1);
    } else if (operands.includes(e.key)){
      return '' // TODO
    }
  };

console.log(cursorPosition)
  return (
    <div className="CustomInputContainer">
      <Select
        options={data}
        isMulti
        name="colors"
        className="basic-multi-select"
        classNamePrefix="select"
        trim={false}
        formatOptionLabel={{ ValueContainer }}
        onKeyDown={(e) => handleKeyDown(e)}
        onChange={(newValue) => {
          updateFormula(newValue);
          updateCursorPosition(cursorPosition + 1);
          console.log("newValue: ", newValue);
        }}
      >
        <input className={'input'}/>
      </Select>
    </div>
  );
};

export default CustomInput;
