import React, { Component } from 'react'
import InputBar from './InputBar'
import ReactMatrix from 'react-matrix'

class Home extends Component {

  constructor (props) {
    super(props)

    this.state = {
      vectorArray: [],
      sinkBaseTotalWater: 0,
      leftHighestArray: [],
      rightHighestArray: [],
      matrix: [
        [0,0,0,0,0],
        [0,1,0,1,0],
        [0,1,1,1,0],
        [0,0,1,0,0],
        [0,0,0,0,0],
      ]
    }
  }

  onInputArray = (vectorInput) => {
    this.setState({
      vectorArray: vectorInput
    })

    this.sinkBaseCalculation(vectorInput)
  }

  sinkBaseCalculation = (vectorInput) => {
    let leftHeighestColumn = []
    for (let i = 0; i < vectorInput.length; i++) {
      leftHeighestColumn[i] = Math.max(vectorInput[i], i !== 0 ? leftHeighestColumn[i - 1] : 0)
    }

    let rightHeighestColumn = []
    for (let i = vectorInput.length - 1; i >= 0; i--) {
      rightHeighestColumn[i] = Math.max(vectorInput[i], i < vectorInput.length - 1 ? rightHeighestColumn[i + 1] : 0)
    }

    let sinkBaseArray = []
    for (let i = 0; i < vectorInput.length; i++) {
      sinkBaseArray[i] = Math.min(leftHeighestColumn[i], rightHeighestColumn[i]) - vectorInput[i]
    }

    this.setState({sinkBaseTotalWater: sinkBaseArray.reduce((total, amount) => total + amount, 0)})
  }

  render () {
    return (
      <div>
        <InputBar onInput={this.onInputArray}/>
        input Array: {this.state.vectorArray}
        SinkBase: {this.state.sinkBaseTotalWater}
        <ReactMatrix squareSize={20} matrix={this.state.matrix} cellStates={{'0': 'available','1': 'barrier' }} />
      </div>
    )
  }
}

export default Home
