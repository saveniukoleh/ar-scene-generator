import React from 'react';
import './css/bootstrap.css';
import './css/main.css';
import Header from './components/Header';
import Form from './components/Form';
import ProgressBar from './components/ProgressBar';

class App extends React.Component {
  render() {
    return <div className="App">
      <Header />
      <Form />
      <ProgressBar />
    </div>;
  }
}

export default App;
