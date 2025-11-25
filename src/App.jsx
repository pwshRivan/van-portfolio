import { useLenis } from "@/hooks";
import Portfolio from "@/pages/Portfolio";

function App() {
  // Initialize Lenis smooth scrolling
  useLenis();

  return <Portfolio />;
}

export default App;
