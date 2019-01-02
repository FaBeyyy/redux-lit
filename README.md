# Redux for LitElement
## Installation
`npm install --save redux-lit`
## Quick Start
All you have to do is wrap the createStore function from redux the following: 

```js
import {initLitStore} from 'redux-lit'

const store = initLitStore(createStore(...))
```
Now you are ready to use the connect function :)
## Usage with `connect()`
Redux lit provides a connect function for you to connect your component to the store.

Normally, you’ll call connect in this way:
```js
import { connect } from 'redux-lit'
import {LitElement, html} from '@polymer/lit-element';

class TestElement extends LitElement {...}

const mapStateToProps = (state) => {
  return {
    counter: state.counter
  }
}

const mapDispatchToProps = { increment, decrement, reset }

export default connect(
  mapStateToProps,
  'test-html-element'  // Name of the custom html element that should be defined
)(TestElement)
```
Every property returned from mapStateToProps() is now added to the class properties and as soon as you change the state LitElement automatically re-renders the component.

## Where is the `disaptch()` method added?
The dispatch method is added to the class prototype, so calling:
```js
this.dispatch(someAction())
```
in a LitElement component does the job.
