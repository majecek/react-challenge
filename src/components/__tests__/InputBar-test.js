import React from 'react'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'
import InputBar from './../InputBar'


it('InputBar component check against snapshot', () => {
  const component = renderer.create(<InputBar/>).toJSON()
  expect(component).toMatchSnapshot()
})

it('InputBar checks state properties', async () => {
  const wrapper = mount(<InputBar/>)
  // console.log(wrapper.state())

  expect(wrapper.state('inputTerm')).toEqual('')
  await wrapper.find('input').simulate('change')
  // console.log(wrapper.state())
  expect(wrapper.state('error')).toEqual('')
})
