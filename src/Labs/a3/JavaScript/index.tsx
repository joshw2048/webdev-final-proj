import BooleanVariables from "./variables/BooleanVariables";
import IfElse from "./conditionals/IfElse";
import WorkingWithFunctions from "./functions/WorkingWithFunctions";
import TernaryOperator from "./conditionals/TernaryOperator";
import VariablesAndConstants from "./variables/VariablesAndConstants";
import VariableTypes from "./variables/VariableTypes";
  
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
     </div>
  );
}
export default JavaScript