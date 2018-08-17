import React from 'react';
import toJSON from 'enzyme-to-json';
import { mount, render, shallow } from 'enzyme';
import Button from '../components/Button';

it('button state should be enabled from start', () => {
  
})

it('button state should be disabled on click, check state', () => {
  
})

it('button style should be disabled on click, check style', () => {
  
})

/**
 * Snapshot testing is good for smaller components and 
 * making sure the correct styling or class is applied
 * but we have to check the snapshots manually.
 */
it('should match snapshot', () => {
  const wrapper = shallow(<Button onClick={() => {}}/>);
  expect(toJSON(wrapper)).toMatchSnapshot();
})

it('button state should be disabled on click, check state', () => {
   
})