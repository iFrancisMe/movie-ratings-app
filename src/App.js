import React, { Component } from 'react'
import './App.css';
import MovieShowCase from './components/MovieShowCase';
import ResultsContainer from './components/ResultsContainer';
import TitleBarContainer from './components/TitleBarContainer';

export default class App extends Component {

  constructor() {
    super();
    
    this.ref = React.createRef(null);
    
  }
  render() {
    let ref = this.ref;

    return (
      <div ref={ref} className="App">
        <TitleBarContainer mainRef={ref}/>
        <MovieShowCase mainRef={ref}/>
        <ResultsContainer mainRef={ref}/>
      </div>
    )
  }
}
