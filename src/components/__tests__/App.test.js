import React from 'react'
import ReactDOM from 'react-dom'
import App from '../../App'
import renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('App component tests', () => {
  const component = renderer.create(<App/>).toJSON()
  expect(component).toMatchSnapshot()
})