import Nav from "./components/NavBar/Nav";
import Home from "./home/Home";
import Footer from "./components/Footer/Footer";
import IconHeader from "./components/IconsHeader/IconHeader";
import "./App.css";

function App() {
  return (
    <>
      <Nav />
      <IconHeader />
      {"Aquí se van a switchear las vistas"}
      <Home />
      <Footer />
    </>
  );
}

export default App;
