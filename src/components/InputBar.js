import React, { Component } from 'react'
import _ from 'lodash'

class InputBar extends Component {

  state = {
    inputTerm: ''
  }

  onInputChange = (event) => {
    if(! /^([0-9\,]*)$/.test(event.target.value)) {
      alert('only numeric values separated by comma')
      return
    }
    this.setState({inputTerm: event.target.value})
  }

  onFormSubmit = (event) => {
    event.preventDefault()
    this.props.onInput(_.map(this.state.inputTerm.split(','), _.parseInt))
  }

  render () {
    return (
      <div>
        <form onSubmit={this.onFormSubmit} className="input-group">
          <input
            placeholder="insert your array separated by commas"
            className="form-control"
            value={this.state.inputTerm}
            onChange={this.onInputChange}/>
          <span className="input-group-btn">
            <button type="submit" className="btn btn-secondary">Submit</button>
          </span>
        </form>
      </div>
    )
  }
}

export default InputBar
