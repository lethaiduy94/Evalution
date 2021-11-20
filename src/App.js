import './App.css';
import Detail from "./screens/Detail"
import Evalution from './screens/Evalution';
import Thanks from './screens/Thanks';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/students/:id" element = {<Evalution />}>
        </Route>
        <Route path = "/students/:id/detail" element = {<Detail />}>
        </Route>
        <Route path = "/students/:id/thanks" element = {<Thanks />}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
