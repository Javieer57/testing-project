import { BrowserExtensions } from "./components/BrowserExtensions";
import { ThemeBar } from "./ThemeBar";

function App() {
  return (
    <main className="space-y-16 py-10">
      <ThemeBar />
      <BrowserExtensions />
    </main>
  );
}

export default App;
