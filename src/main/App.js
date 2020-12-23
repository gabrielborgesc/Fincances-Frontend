import React from 'react';
import Routes from './routes'
import Navbar from '../components/navbar/navbar'

import 'toastr/build/toastr.min.js'

import 'bootswatch/dist/flatly/bootstrap.css'
import '../css/custom.css'
import 'toastr/build/toastr.css'

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
