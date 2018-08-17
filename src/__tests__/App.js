import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJSON from 'enzyme-to-json';
import fetchMock from 'fetch-mock';
import App from '../components/App';
import responseObject from '../responseObject';
import { mapObjectToArray }from '../api';
import { API_KEY } from '../api/config';

/**
 * Helper function to force all the promises to resolve.
 * Needed when we must wait for a component to load
 * data on mount. Lifecycle methods will only run
 * when we use mount, not when we use shallow or render
 */
function flushAllPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

/**
 * Restore fetchMock after each test. Cleanup duty.
 */
afterEach(()=>{
  fetchMock.restore();
  fetchMock.reset();
})

/**
 * I am using a mocked copy of the response object instead of calling
 * the API. These test are only checking if the components renders as it
 * should, not checking if the API is being called. For this purpose
 * we do not need to call the API because that would require much more work
 */

it('populate list with rates', () => {
  /* Mounts the whole app */
  const rates = mapObjectToArray(responseObject.rates);
  const wrapper = shallow(<App rates={rates} />);
  const list = wrapper.find('[data-test="list"]');
  expect(list.children()).toHaveLength(168);
});

it('should populate list with rates from api', () => {
  fetchMock.get(`http://data.fixer.io/api/latest?base=EUR&access_key=${API_KEY}&format=1`, responseObject);
  const wrapper = mount(<App />);
  // Force Jest to finish all API-calls
  return flushAllPromises()
    .then(() => {
      // When API-calls are done, do some assertion
      expect(wrapper.find('[data-test="list"]').text()).toContain("AUD");
    });
});

it('should populate list with rates from api, async await edition', async () => {
  fetchMock.get(`http://data.fixer.io/api/latest?base=EUR&access_key=${API_KEY}&format=1`, responseObject);
  const wrapper = mount(<App />);
  // Force Jest to finish all API-calls
  await flushAllPromises();
  expect(wrapper.find('[data-test="list"]').text()).toContain("AUD");
});

it('first rate should be AED', () => {
  const rates = mapObjectToArray(responseObject.rates);
  const wrapper = shallow(<App rates={rates} />);
  const list = wrapper.find('[data-test="list"]');
  const firstParagraph = list.find('p').first();
  expect(firstParagraph.text()).toContain('AED');
});

it('should be base EUR', () =>{
  const wrapper = shallow(<App />);
  expect(wrapper.find('h1').text()).toContain('EUR');
});


// Extra 
it('list should not be populated', () => {
  // No mount, no fetch in component === no list
  const wrapper = shallow(<App />);
  expect(wrapper.find('[data-test="list"]').children()).toHaveLength(0);
});

it.skip('error message displays when fetch fails', async () => {
  const message = 'You failed yo!';
  fetchMock.get(`http://data.fixer.io/api/fail?base=fail&access_key=${API_KEY}&format=1`, { throws: { message } });
  const wrapper = mount(<App base="fail" date="fail" />);
  await flushAllPromises();
  expect(wrapper.find('.error').text()).toEqual(message);
});
