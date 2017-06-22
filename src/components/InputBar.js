import React, { Component } from 'react'

class InputBar extends Component {

  state = {
    inputTerm: ''
  }

  onInputChange = (event) => {
    console.log(event.target.value)
    this.setState({inputTerm: event.target.value})
  }

  onFormSubmit = (event) => {
    event.preventDefault()
    this.props.onInput(this.state.inputTerm.split(','))
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
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default InputBar
