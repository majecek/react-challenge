import React, { Component } from 'react'
import InputBar from './InputBar'


class Home extends Component {

  state = {
    inputArray: []
  }

  onInputArray = (input) => {
    console.log('home -> onInputArray',input)
    this.setState = {
      inputArray: input
    }
  }

  waterCalculation = () => {
    
  }

  render() {
    return (
      <div>
        <InputBar onInput={this.onInputArray} />
        input Array: {this.state.inputArray.toString()}
      </div>
    )
  }
}

export default Home
