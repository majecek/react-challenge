import React from 'react'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'
import InputBar from './../InputBar'

it('InputBar component check against snapshot', () => {
  const onChange = jest.fn()
  const component = renderer.create(<InputBar onInput={onChange} />).toJSON()
  expect(component).toMatchSnapshot()
})

it('InputBar checks state properties', async () => {
  const onChange = jest.fn()
  const wrapper = mount(<InputBar onInput={onChange} />)
  // console.log(wrapper.state())

  expect(wrapper.state('inputTerm')).toEqual('')
  await wrapper.find('input').simulate('change')
  // console.log(wrapper.state())
  expect(wrapper.state('error')).toEqual('')
  // expect(onChange).toBeCalledWith(1);
})
