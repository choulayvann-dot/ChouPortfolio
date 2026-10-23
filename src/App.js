import Navbar from "./components/Navbar";
import Herosection from "./components/HeroSection";
import About from "./components/About";
import Projects from "./components/Projects";
import Skill from "./components/Skill";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Herosection></Herosection>
      <About></About>
      <Projects></Projects>
      <Skill></Skill>
      <Contact></Contact>
      <Footer></Footer>
    </div>
  );
}

export default App;
