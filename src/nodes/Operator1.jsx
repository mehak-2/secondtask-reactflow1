import React from "react";
import { Handle } from "react-flow-renderer";
import { useStore } from "../store";

const Operator1 = ({ id, data }) => {
  const { setOperator } = useStore((state) => ({
    setOperator: (e) => state.updateNode(id, { operator: e.target.value }),
  }));

  const calculateResult = (state) => {
    const operand1Edge = state.edges.find((edge) => edge.target === id && edge.source.startsWith("operand"));
    const operand2Edge = state.edges.find((edge) => edge.target === id && edge.source.startsWith("operand"));
    const operatorEdge = state.edges.find((edge) => edge.target === id && edge.source === "operator");

    if (!operand1Edge || !operand2Edge || !operatorEdge) {
      return null; 
    }

    const operand1Id = operand1Edge.source;

    const operand2Id = operand2Edge.source;
    const operatorId = operatorEdge.source;

    const operand1Value = parseInt(state.nodes.find((node) => node.id === operand1Id).data.label);
    const operand2Value = parseInt(state.nodes.find((node) => node.id === operand2Id).data.label);

    const operatorValue = state.nodes.find((node) => node.id === operatorId).data.operator;

    let result;
    switch (operatorValue) {
      case "+":
        result = operand1Value + operand2Value;
        break;
      case "-":
        result = operand1Value - operand2Value;
        break;
      case "*":
        result = operand1Value * operand2Value;
        break;
      case "/":
        result = operand1Value / operand2Value;
        break;
      default:
        result = "Invalid Value";
    }

    return `${operand1Value} ${operatorValue} ${operand2Value} = ${result}`;
  };

  const result = calculateResult(useStore.getState());

  return (
    <div className="operator">
      <Handle type="target" position="top" />
      <label className="operators">
        <select className="nodrag" value={data.operator} onChange={setOperator}>
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">*</option>
          <option value="/">/</option>
        </select>
        <Handle type="target" position="right"  />
        <Handle type="target" position="bottom" />
      </label>

      {result !== null && <p className="result">Result: {result}</p>}
    </div>
  );
};

export default Operator1;
