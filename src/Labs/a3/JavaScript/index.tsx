import BooleanVariables from "./variables/BooleanVariables";
import Destructing from "./json/Destructing";
import FunctionDestructing from "./functions/FunctionDestructing";
import House from "./json/House";
import IfElse from "./conditionals/IfElse";
import JsonStringify from "./json/JsonStringify";
import Spreading from "./json/Spreading";
import TemplateLiterals from "./string/TemplateLiterals";
import TernaryOperator from "./conditionals/TernaryOperator";
import VariablesAndConstants from "./variables/VariablesAndConstants";
import VariableTypes from "./variables/VariableTypes";
import WorkingWithFunctions from "./functions/WorkingWithFunctions";
import WorkingWithArrays from "./arrays/WorkingWithArrays";
  
function JavaScript() {
  console.log('Hello World!');
  return(
     <div>
        <h1>JavaScript</h1>
        <VariablesAndConstants/>
        <VariableTypes />
        <BooleanVariables />
        <IfElse />
        <TernaryOperator />
        <WorkingWithFunctions />
        <WorkingWithArrays />
        <JsonStringify />
        <TemplateLiterals />
        <House />
        <Spreading />
        <Destructing />
        <FunctionDestructing />
     </div>
  );
}
export default JavaScript