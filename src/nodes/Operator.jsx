import React from "react";
import { Handle } from "react-flow-renderer";
import { useStore } from "../store";
import '../index.css';


const Operator = ({ id, data }) => {
  const { setOperator } = useStore((state) => ({
    setOperator: (e) => state.updateNode(id, { operator: e.target.value }),
  }));

  const calculateResult = (state) => {
    const operand1Node = state.edges.find((edge) => edge.target === id && edge.source === "operand1");
    const operand2Node = state.edges.find((edge) => edge.target === id && edge.source === "operand2");
    const operator1Node = state.edges.find((edge) => edge.target === id && edge.source === "operator1");

    if (operand1Node && operand2Node) {
      const operand1Value = parseInt(state.nodes.find((node) => node.id === operand1Node.source).data.label);
      const operand2Value = parseInt(state.nodes.find((node) => node.id === operand2Node.source).data.label);
      const operator = data.operator;

      let result;
      switch (operator) {
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
          result = "Invalid value";
      }


      return `${operand1Value} ${operator} ${operand2Value} = ${result}`;


    } else if (operand1Node) {
      const operand1Value = parseInt(state.nodes.find((node) => node.id === operand1Node.source).data.label);
      return `${operand1Value}`;
    } else if (operand2Node) {
      const operand2Value = parseInt(state.nodes.find((node) => node.id === operand2Node.source).data.label);
      return `${operand2Value}`;
    } else if (operator1Node) {
      const operator1Value = state.nodes.find((node) => node.id === operator1Node.source).data.operator;
      return `${operator1Value}`;
    }

    return null;
  };

  const result = calculateResult(useStore.getState());

  return (
    <div className="operator">
      <Handle type="target" position="top"/>
      <label className="operators">
        <select className="nodrag" value={data.operator} onChange={setOperator}>
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">*</option>
          <option value="/">/</option>
        </select>
        <Handle type="target" position="right" />
        <Handle type="target" position="bottom" />
      </label>

      {result && <p className="result">Result: {result}</p>}
    </div>
  );
};

export default Operator;
