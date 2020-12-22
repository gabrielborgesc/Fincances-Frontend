import React from 'react';
import Routes from './routes'
import 'bootswatch/dist/flatly/bootstrap.css'
import '../css/custom.css'

class App extends React.Component {
  
  render(){
    return(
      <div>
        <Routes />
      </div>
    );
  }
}

export default App;
