
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

const decrement = state => ({ count: state.count - 1 })
const increment = state => ({ count: state.count + 1 })

const view = (state, dispatch) => {
  return div([
    a({ onclick: () => dispatch([decrement]) }, '-'),
    div(state.count),
    a({ onclick: () => dispatch([increment]) }, '+')
  ])
}

let node

pocket({
  state: {
    count: 0
  },
  render: (state, dispatch) => {
    node = patch(node, view(state, dispatch), document.body)
  }
})
```
