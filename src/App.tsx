import React from "react";
import "./css/bootstrap.css";
import "./css/main.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Form from "./components/Forms/Form";
import ProgressBar from "./components/ProgressBar";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Form />
        <Footer />
        {/* <ProgressBar /> */}
      </div>
    );
  }
}

export default App;
