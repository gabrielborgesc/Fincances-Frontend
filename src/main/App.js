import React from 'react';
import Routes from './routes'
import 'bootswatch/dist/flatly/bootstrap.css'
import '../css/custom.css'
import Navbar from '../components/navbar/navbar'

class App extends React.Component {
  
  render(){
    return(
      <>
      <Navbar />
      <div className = "container">
        <Routes />
      </div>
      </>
    );
  }
}

export default App;
