import React from 'react'
import Home from './../Home'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import ReactMatrix from 'react-matrix'
import InputBar from './../InputBar'

it('Home component tests', () => {
  const component = renderer.create(<Home/>).toJSON()
  expect(component).toMatchSnapshot()
})

it('Home checks for sub components', () => {
  expect(shallow(<Home/>).find(InputBar)).toHaveLength(1)
  expect(shallow(<Home/>).find(ReactMatrix)).toHaveLength(1)
})

it('Testing calculations for sinkbase and matrix', async () => {
  const wrapper = shallow(<Home/>)
  // console.log(wrapper.state())

  expect(wrapper.state('sinkBaseArray')).toEqual(expect.arrayContaining([]))
  expect(wrapper.state('vectorArray')).toEqual(expect.arrayContaining([]))
  expect(wrapper.state('matrix')).toEqual(expect.arrayContaining([[]]))

  await wrapper.find(InputBar).simulate('input',[4,1,2,3])
  expect(wrapper.state('vectorArray')).toEqual(expect.arrayContaining([ 4, 1, 2, 3 ]))
  expect(wrapper.state('sinkBaseArray')).toEqual(expect.arrayContaining([ 0, 2, 1, 0 ]))
  expect(wrapper.state('matrix')).toEqual(expect.arrayContaining([[ '1', '0', '0', '0' ], [ '1', '2', '2', '1' ], [ '1', '2', '1', '1' ], [ '1', '1', '1', '1' ] ]))
  expect(wrapper.state('sinkBaseTotalWater')).toBe(3)

  await wrapper.find(InputBar).simulate('input',[1, 5, 3, 7, 2])
  // console.log(wrapper.state())
  expect(wrapper.state('sinkBaseTotalWater')).toBe(2)
  expect(wrapper.state('vectorArray')).toEqual(expect.arrayContaining([ 1, 5, 3, 7, 2 ]))
  expect(wrapper.state('sinkBaseArray')).toEqual(expect.arrayContaining([ 0, 0, 2, 0, 0 ]))
  expect(wrapper.state('matrix')).toEqual(expect.arrayContaining([[ '0', '0', '0', '1', '0' ],
    [ '0', '0', '0', '1', '0' ],
    [ '0', '1', '2', '1', '0' ],
    [ '0', '1', '2', '1', '0' ],
    [ '0', '1', '1', '1', '0' ],
    [ '0', '1', '1', '1', '1' ],
    [ '1', '1', '1', '1', '1' ] ]))

  await wrapper.find(InputBar).simulate('input',[5, 3, 7, 2, 6, 4, 5, 9, 1, 2])
  expect(wrapper.state('sinkBaseTotalWater')).toBe(14)
  await wrapper.find(InputBar).simulate('input',[5, 5, 5, 5])
  expect(wrapper.state('sinkBaseTotalWater')).toBe(0)
  await wrapper.find(InputBar).simulate('input',[5, 5, 5, 5])
  expect(wrapper.state('sinkBaseTotalWater')).toBe(0)
  // console.log(wrapper.state())
})