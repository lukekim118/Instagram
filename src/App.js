import Main from "./Main"
import Navbar from "./Navbar";
function App() {
  return (
    <div className="App">
      <div className="header">
        <Navbar/>
      </div>
      <div>
        <Main/>
      </div>
    </div>
  );
}

export default App;
