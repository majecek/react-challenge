import React, { Component } from 'react'
import InputBar from './InputBar'
import ReactMatrix from 'react-matrix'
import _ from 'lodash'
import 'bootstrap/dist/css/bootstrap.min.css'

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
}

class Home extends Component {

  constructor (props) {
    super(props)

    this.state = {
      vectorArray: [],
      sinkBaseTotalWater: 0,
      sinkBaseArray: [],
      squareSize: 0,
      matrix: [[]]

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

    this.matrixGeneration()
  }

  matrixGeneration = () => {

    // console.log('matrixGeneration -> vector', this.state.vectorArray)
    // console.log('matrixGeneration -> sink', this.state.sinkBaseArray)
    //
    // console.log('Y:', _.max(this.state.vectorArray))
    // console.log('X:', this.state.vectorArray.length)
    const YAxis = _.max(this.state.vectorArray)
    const XAxis = this.state.vectorArray.length

    const vectorArray = this.state.vectorArray
    const waterArray = this.state.sinkBaseArray

    // console.log('YAxis:', YAxis)
    // console.log('vectorArray:', vectorArray)
    // console.log('waterArray', waterArray)

    const zerosArray = []
    waterArray.forEach( (waterNumber, index ) => {
      zerosArray[index] = YAxis - (waterNumber + vectorArray[index])
      // console.log('index:', index,'zeroesNumber:',zerosArray[index],'waterNumber:', waterNumber, 'vectorNumber:', vectorArray[index])
    })

    // console.log('zerosArray', zerosArray)
    const matrix = Array.from({length: _.max(this.state.vectorArray)}, () => new Array(this.state.vectorArray.length).fill(0))

    for (let i = 0; i < XAxis; i++) {
      for (let j = 0; j < YAxis; j++) {
        // matrix[j][i] = j < zerosArray[i] ? '0' : zerosArray[i]  < j < (waterArray[i] -1) ? '2' : '1'
        matrix[j][i] = j < zerosArray[i] ? '0' : j < (waterArray[i] + zerosArray[i]) ? '2' : '1'
        // console.log('matrix:',j,i,' => i',i,'j', j,' => zerosArray[i]',zerosArray[i],' !!=> zerosArray[i] < j < waterArray[i] -1',  j < (waterArray[i] ),' !!!!!!=> j < zerosArray[i] ? 0 : j < (waterArray[i] ) ? 2 : 1 ==>',matrix[j][i])
      }
    }
    // console.log(matrix)

    this.setState({
      matrix: matrix

    })

  }

  render () {
    return (
      <div style={style}>
        <InputBar onInput={this.onInputArray}/>

        <div style={{padding: 10}}>
        <ReactMatrix squareSize={50} matrix={this.state.matrix}
                     cellStates={{'0': 'available', '1': 'barrier', '2': 'path'}}/>
        </div>

        SinkBase: {this.state.sinkBaseTotalWater}
      </div>
    )
  }
}

export default Home
