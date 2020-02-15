import React from 'react';
import App from './App';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer'
configure({ adapter: new Adapter() });


it('renders without crashing', () => {
  const item = renderer
     .create(
        <App />
      ).toJSON();
   expect(item).toMatchSnapshot();
});


it('should test for initial state', () => {
  const component = mount(<App />);
  expect(component.state('authenticated')).toEqual(false);
  expect(component.state('userId')).toEqual(null);
  expect(component.state('accessType')).toEqual('Free');
  component.unmount();
});


it('should update state on login', () => {
  const component = mount(<App />);
  component.instance().login(1);
  expect(component.state('authenticated')).toEqual(true);
  expect(component.state('userId')).toEqual(1);
  expect(component.state('accessType')).toEqual('Free');
  component.unmount();
});

it('should update state on logout', () => {
  const component = mount(<App />);
  component.instance().logout();
  expect(component.state('authenticated')).toEqual(false);
  expect(component.state('userId')).toEqual(null);
  expect(component.state('accessType')).toEqual('Free');
  component.unmount();
});


it('should update state on subscribe', () => {
  const component = mount(<App />);
  component.instance().subscribe();
  expect(component.state('accessType')).toEqual('Premium');
  component.unmount();
});

