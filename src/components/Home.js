import React, { Component } from 'react'
import InputBar from './InputBar'

class Home extends Component {

  constructor (props) {
    super(props)

    this.state = {
      vectorArray: [],
      sinkBaseTotalWater: 0
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

    let sinkBase = 0
    for (let i = 0; i < vectorInput.length; i++) {
      sinkBase += Math.min(leftHeighestColumn[i], rightHeighestColumn[i]) - vectorInput[i]
    }

    this.setState({sinkBaseTotalWater: sinkBase})
  }

  render () {
    return (
      <div>
        <InputBar onInput={this.onInputArray}/>
        input Array: {this.state.vectorArray}
        SinkBase: {this.state.sinkBaseTotalWater}
      </div>
    )
  }
}

export default Home
