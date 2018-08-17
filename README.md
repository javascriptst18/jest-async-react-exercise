# jest-async-react-exercise

## IMPORTANT! YOU HAVE TO GET YOUR OWN API KEY FROM [https://fixer.io/](https://fixer.io/)!! Then create a file named `config.js` inside of `src/api` with the following content and insert your own API-key:

```js
export const URL = 'http://data.fixer.io/api';
export const API_KEY = 'YOUR API KEY HERE';
```

>Example app built with [`create-react-app`](https://github.com/facebookincubator/create-react-app) for integration and snapshot testing. The app fetches currency rates from [**fixer.io**](http://fixer.io/) and displays it in a list. It also has an update button that can be tested separately. **CSS-framework is [Tailwind](https://tailwindcss.com/)**

The project is already set up with all packages to test react components: [**`enzyme`**](http://airbnb.io/enzyme/docs/api/), `enzyme-adapter-react-16`, `react-test-renderer` and `enzyme-to-json` for snapshot testing. You can read more about setting it up here: [**Running test @ create-react-app**](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests)


## Installation

_with npm_
```bash
git clone https://github.com/javascriptst18/jest-async-react-exercise.git
cd jest-async-react-exercise
npm install
```
_with yarn_
```bash
git clone https://github.com/javascriptst18/jest-async-react-exercise.git
cd jest-async-react-exercise
yarn
```

## Running tests

Project has a few test already that are mostly integration tests and [`snapshot`](https://facebook.github.io/jest/docs/en/snapshot-testing.html) tests. All tests should pass when you run the test command.

```bash
yarn test
```
```bash
npm test
```

## Extra exercise

Right now the rates are returned with the base **EUR**. The API allows you to fetch data with another base or from a specific date:

You can change this by providing props to `<App />`

```jsx
//index.js
ReactDOM.render(<App base="SEK" date="2007-01-27" />, mountPoint);
```

Or you can change the `this.state.date` and `this.state.base` in `<App />` and call `updateRates()` and new data will be fetched.

1. Change the props or state so the applications fetches a different date with still the same currency and that it fetches a different currency than EUR. Write tests that assert that the data is correctly fetches and correctly show in the DOM. This should be multiple tests. Divide it into smaller parts, think unit tests.

If you want to group tests together in the same test file you can use `describe()`:

```js
describe('async tests', () => {
    it('should test async call', () => {
        expect(true).toBe(true);
    });  
});

describe('button tests', () => {
    it('should call button', () => {
        expect(true).toBe(true);
    });  
});
```