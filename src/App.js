import './App.css';
import Home from './screens/Home';
import Detail from "./screens/Detail"
import Evalution from './screens/Evalution';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/students/:id" element = {<Home />}>
        </Route>
        <Route path = "/students/:id/detail" element = {<Detail />}>
        </Route>
        <Route path = "/students/:id/evalution" element = {<Evalution />}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
