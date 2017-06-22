import React, { Component } from 'react'
import Home from './components/Home'

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start'
}

class App extends Component {
  render () {
    return (
      <div style={style}>
        <Home/>
      </div>
    )
  }
}

export default App
