import React, { Component } from 'react'
import InputBar from './InputBar'
import ReactMatrix from 'react-matrix'
import _ from 'lodash'
import 'bootstrap/dist/css/bootstrap.min.css'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },

  matrix: {
    padding: 20
  }

}

class Home extends Component {

  state = {
    vectorArray: [],
    sinkBaseTotalWater: 0,
    sinkBaseArray: [],
    matrix: [[]]

  }

  onInputArray = async (vectorInput) => {
    await this.setState({
      vectorArray: vectorInput
    })

    await this.sinkBaseCalculation()
  }

  sinkBaseCalculation = () => {
    const vectorInput = this.state.vectorArray

    const leftHighestColumn = []
    for (let i = 0; i < vectorInput.length; i++) {
      leftHighestColumn[i] = Math.max(vectorInput[i], i !== 0 ? leftHighestColumn[i - 1] : 0)
    }

    const rightHighestColumn = []
    for (let i = vectorInput.length - 1; i >= 0; i--) {
      rightHighestColumn[i] = Math.max(vectorInput[i], i < vectorInput.length - 1 ? rightHighestColumn[i + 1] : 0)
    }

    const sinkBaseArray = []
    for (let i = 0; i < vectorInput.length; i++) {
      sinkBaseArray[i] = Math.min(leftHighestColumn[i], rightHighestColumn[i]) - vectorInput[i]
    }

    this.setState({
      sinkBaseTotalWater: sinkBaseArray.reduce((total, amount) => total + amount, 0),
      sinkBaseArray
    })

    this.matrixGeneration()
  }

  matrixGeneration = () => {

    const YAxis = _.max(this.state.vectorArray)
    const XAxis = this.state.vectorArray.length

    const zerosArray = []
    this.state.sinkBaseArray.forEach((waterNumber, index) => {
      zerosArray[index] = YAxis - (waterNumber + this.state.vectorArray[index])
    })

    const matrix = Array.from({length: _.max(this.state.vectorArray)}, () => [this.state.vectorArray.length].fill(0))

    for (let i = 0; i < XAxis; i++) {
      for (let j = 0; j < YAxis; j++) {
        matrix[j][i] = j < zerosArray[i] ? '0' : j < (this.state.sinkBaseArray[i] + zerosArray[i]) ? '2' : '1'
      }
    }

    this.setState({matrix})
  }

  render () {
    return (
      <div style={styles.container}>
        <div className="alert alert-info" role="alert">
          Count water in sink base - project assignment can be found on <a href="https://github.com/majecek/react-challenge">Github</a>
        </div>

        <InputBar onInput={this.onInputArray}/>

        <div className="card">
          <div className="card-block text-nowrap">
            Total water in sinkbase: {this.state.sinkBaseTotalWater}
          </div>
        </div>

        <div style={styles.matrix}>
          <ReactMatrix squareSize={50} matrix={this.state.matrix}
                       cellStates={{'0': 'available', '1': 'barrier', '2': 'path'}}/>
        </div>

      </div>
    )
  }
}

export default Home
