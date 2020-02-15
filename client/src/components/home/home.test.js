import React from 'react';
import Home from './home';
import { BrowserRouter } from "react-router-dom";
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer'
configure({ adapter: new Adapter() });


it('renders without crashing', () => {
  const item = renderer
     .create(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
      ).toJSON();
   expect(item).toMatchSnapshot();
});


it('should redirect if user is authenticated', () => {
  const fnClick = jest.fn();
  const mock = {
    push: fnClick
  }

  renderer
     .create(
      <BrowserRouter>
        <Home authStatus={true} history={mock}/>
      </BrowserRouter>
      ).toJSON();
      expect(fnClick).toHaveBeenCalled();
});

xit('should login when clicked the login button', () => {
                            
  const fnClick = jest.fn();
  const mock = {
    push: fnClick
  }

  const fnClick2 = jest.fn();
  const mock2 = {
    push: fnClick
  }

  const home = mount(
   <BrowserRouter>
     <Home authStatus={true} props={mock} history={mock2}/>
   </BrowserRouter>
   )

   home
   .find('#login')
   .simulate('click');

   
   expect(fnClick).toHaveBeenCalled();
});




