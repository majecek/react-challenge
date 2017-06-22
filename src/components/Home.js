import React, { Component } from 'react'
import InputBar from './InputBar'
import ReactMatrix from 'react-matrix'
import _ from 'lodash'

class Home extends Component {

  constructor (props) {
    super(props)

    this.state = {
      vectorArray: [],
      sinkBaseTotalWater: 0,
      sinkBaseArray: [],
      squareSize: 0,
      matrix: [[]],
      matrix2: [
        [0, 0, 0, 0, 0],
        [0, 1, 2, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
      ]
    }
  }

  onInputArray = async (vectorInput) => {
    await this.setState({
      vectorArray: vectorInput
    })

    await this.sinkBaseCalculation()
  }

  sinkBaseCalculation = () => {
    const vectorInput = this.state.vectorArray

    let leftHighestColumn = []
    for (let i = 0; i < vectorInput.length; i++) {
      leftHighestColumn[i] = Math.max(vectorInput[i], i !== 0 ? leftHighestColumn[i - 1] : 0)
    }

    let rightHighestColumn = []
    for (let i = vectorInput.length - 1; i >= 0; i--) {
      rightHighestColumn[i] = Math.max(vectorInput[i], i < vectorInput.length - 1 ? rightHighestColumn[i + 1] : 0)
    }

    let sinkBaseArray = []
    for (let i = 0; i < vectorInput.length; i++) {
      sinkBaseArray[i] = Math.min(leftHighestColumn[i], rightHighestColumn[i]) - vectorInput[i]
    }

    this.setState({
      sinkBaseTotalWater: sinkBaseArray.reduce((total, amount) => total + amount, 0),
      sinkBaseArray: sinkBaseArray
    })

    // console.log('vectorInput', this.state.vectorArray)
    // console.log('sinkBaseArray', this.state.sinkBaseArray)

    this.matrixPreparation()
  }

  matrixPreparation = () => {

    console.log('matrixPreparation -> vector', this.state.vectorArray)
    console.log('matrixPreparation -> sink', this.state.sinkBaseArray)

    console.log('Y:', _.max(this.state.vectorArray))
    console.log('X:', this.state.vectorArray.length)
    const YAxis = _.max(this.state.vectorArray)
    const XAxis = this.state.vectorArray.length

    const vectorArray = this.state.vectorArray
    const waterArray = this.state.sinkBaseArray

    console.log('YAxis:', YAxis)
    console.log('vectorArray:', vectorArray)
    console.log('waterArray', waterArray)

    const zerosArray = []
    waterArray.forEach( (waterNumber, index ) => {
      zerosArray[index] = YAxis - (waterNumber + vectorArray[index])
      // console.log('index:', index,'zeroesNumber:',zerosArray[index],'waterNumber:', waterNumber, 'vectorNumber:', vectorArray[index])
    })

    console.log('zerosArray', zerosArray)
    const matrix = Array.from({length: _.max(this.state.vectorArray)}, () => new Array(this.state.vectorArray.length).fill(0))

    for (let i = 0; i < XAxis; i++) {
      for (let j = 0; j < YAxis; j++) {
        // matrix[j][i] = j < zerosArray[i] ? '0' : zerosArray[i]  < j < (waterArray[i] -1) ? '2' : '1'
        matrix[j][i] = j < zerosArray[i] ? '0' : j < (waterArray[i] + zerosArray[i]) ? '2' : '1'
console.log('matrix:',j,i,' => i',i,'j', j,' => zerosArray[i]',zerosArray[i],' !!=> zerosArray[i] < j < waterArray[i] -1',  j < (waterArray[i] ),' !!!!!!=> j < zerosArray[i] ? 0 : j < (waterArray[i] ) ? 2 : 1 ==>',matrix[j][i])
      }
    }
    console.log(matrix)

    this.setState({
      // matrix: Array.from({length: _.max(this.state.vectorArray)}, () => new Array(this.state.vectorArray.length).fill(0))
      matrix: matrix

    })

    // console.log('matrix', _.flatten(this.state.matrix))
    // console.log('matrix', this.state.matrix)
    // console.log(matrix[0,0],matrix[1,0],matrix[2,0])
    // console.log(matrix[0,1],matrix[1,1],matrix[2,1])
    // console.log(matrix[0,2],matrix[1,2],matrix[2,2])

    // const matrix = this.state.matrix
    // console.log('matrix ',matrix[0][0],matrix[1][0],matrix[2][0])
    // console.log('matrix2 ',matrix[0][1],matrix[1][1],matrix[2][1])
    // console.log('matrix3 ',matrix[0][2],matrix[1][2],matrix[2][2])
    // console.log(matrix[0,1],matrix[1,1],matrix[2,1])
    // console.log(matrix[0,2],matrix[1,2],matrix[2,2])
  }

  generateMatrixValues = (zerosNumber, waterNumber, vectorNumber, maxRows) => {

  }

  render () {
    return (
      <div>
        <InputBar onInput={this.onInputArray}/>
        input Array: {this.state.vectorArray}
        SinkBase: {this.state.sinkBaseTotalWater}
        Matrix:
        <ReactMatrix squareSize={50} matrix={this.state.matrix}
                     cellStates={{'0': 'available', '1': 'barrier', '2': 'path'}}/>
      </div>
    )
  }
}

export default Home
