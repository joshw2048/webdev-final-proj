import Labs from "./Labs";
import HelloWorld from "./Labs/a3/HelloWorld";
import Kanbas from "./Kanbas";
import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
   <HashRouter>
   <div>
      <Routes>
         <Route path="/"         element={<Navigate to="/Labs"/>}/>
         <Route path="/Labs/*"   element={<Labs/>}/>
         <Route path="/kanbas/*" element={<Kanbas/>}/>
         <Route path="/hello"    element={<HelloWorld/>}/>
      </Routes>
   </div>
   </HashRouter>
   );
}

export default App;
