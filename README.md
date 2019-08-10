
# pocket

> A simple state manager.

## Install

```
npm github:whaaaley/pocket
```

## Use

Use alongside your favorite view library.

```js
import { patch } from 'superfine'
import { a, div } from 'html'
import pocket from 'pocket'

const view = (state, actions) => {
  return div([
    a({ onclick: () => actions.decrement() }, '-'),
    div(state.count),
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
