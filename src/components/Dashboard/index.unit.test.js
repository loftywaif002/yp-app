import React from 'react';
import { shallow } from 'enzyme';

import Dashboard from './index.js';
import store from '../../store';
import {findBytestAttribute} from '../../../test/testUtils';



/** 
*Factory function to create a ShallowWrapper for the App component
* @function setup
* @param {object} props -  Component props specific to this setup
* @returns {ShallowWrapper}
*/
const setup = (props={}, state=null) => {
	const wrapper = shallow(<Dashboard store={store} />)
	if (state) wrapper.setState(state);
	return wrapper;
}

test('Dashboard component renders without error', () =>{
  const wrapper = setup();
  const appComponent = findBytestAttribute(wrapper,'component-dashboard');
  expect(appComponent.length).toBe(1);
});