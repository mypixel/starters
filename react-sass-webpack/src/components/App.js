import React, { Component } from 'react';

// components
import Header     from './Header';
import Footer  from './Footer';

class App extends Component {


  // constructor
  constructor(){
    super(); // need b4 can use 'this' keyword

    //initial state
    this.state = {
    };
  }

  // hooks - componentDidMount etc

  componentWillMount(){

  }

  // render to page
  render() {

    return (
      <div className="App">

        <Header />

        <h2>Welcome</h2>

        <Footer />

      </div>
    );
  }
}

export default App;
