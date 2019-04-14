
# pocket

> A simple state manager.

## Install

```
npm @finepoint/pocket
```

## Use

Use alongside your favorite view library.

```js
import { patch } from 'superfine'
import html from '@finepoint/html'
import pocket from '@finepoint/pocket'

const view = (state, actions) => {
  return div([
    a({ onclick: () => actions.decrement() }, '-'),
    div(, state.count),
    a({ onclick: () => actions.increment() }, '+')
  ])
}

let node

pocket({
  state: {
    count: 0
  },
  actions: {
    decrement: () => state => ({ count: state.count - 1 }),
    increment: () => state => ({ count: state.count + 1 })
  },
  render: (state, actions) => {
    node = patch(node, view(state, actions), document.body)
  }
})
```
