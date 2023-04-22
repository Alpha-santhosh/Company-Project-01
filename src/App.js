import { useEffect } from "react";
import "./App.css";
import Github from "./components/Github";
import { useDispatch } from "react-redux";
import { getSagaData } from "./redux/Action";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSagaData(1));
  }, [dispatch]);

  return (
    <div className="app" id="app">
      <h1>Most Starred Repository</h1>
      <Github />
    </div>
  );
}

export default App;
