import React, { Component } from 'react'
import _ from 'lodash'

class InputBar extends Component {

  state = {
    inputTerm: '',
    error: ''
  }

  onInputChange = (event) => {
    if(! /^([0-9\,]*)$/.test(event.target.value)) {
      this.setState({error:'use only numbers and commas'})
      return
    }
    this.setState({
      inputTerm: event.target.value,
      error: ''
    })
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
            placeholder="enter 4,2,4"
            className="form-control"
            value={this.state.inputTerm}
            onChange={this.onInputChange}/>
          <span className="input-group-btn">
            <button type="submit" className="btn btn-secondary">Submit</button>
          </span>
        </form>
        <div className="form-group has-danger">
            <div className="form-control-feedback">{this.state.error}</div>
        </div>
      </div>
    )
  }
}

export default InputBar
