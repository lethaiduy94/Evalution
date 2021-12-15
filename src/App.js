import './App.css';
import List from "./screens/List"
import Detail from "./screens/Detail"
import Evalution from './screens/Evalution';
import Thanks from './screens/Thanks';
import Flower from './screens/Flower';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
      <Route path = "/" element = {<List />}>
        </Route>
        <Route path = "/students/:id" element = {<Evalution />}>
        </Route>
        <Route path = "/students/:id/detail" element = {<Detail />}>
        </Route>
        <Route path = "/students/:id/thanks" element = {<Thanks />}>
        </Route>
        <Route path = "/students/:id/detail/flower" element = {<Flower />}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
