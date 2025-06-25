import { BrowserExtensions } from "./components/BrowserExtensions";
import data from "./mock/data.json";

function App() {
  return (
    <>
      <BrowserExtensions extensions={data} />
    </>
  );
}

export default App;
