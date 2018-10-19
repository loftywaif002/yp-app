import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Login from './index.js';
import {findBytestAttribute} from '../../../test/testUtils';
Enzyme.configure({ adapter: new EnzymeAdapter()});


/** 
*Factory function to create a ShallowWrapper for the App component
* @function setup
* @param {object} props -  Component props specific to this setup
* @returns {ShallowWrapper}
*/
const setup = (props={}, state=null) => {
	const wrapper = shallow(<Login {...props} />)
	if (state) wrapper.setState(state);
	return wrapper;
}

test('login component renders without error', () =>{
  const wrapper = setup();
  const appComponent = findBytestAttribute(wrapper,'component-login');
  expect(appComponent.length).toBe(1);
});
