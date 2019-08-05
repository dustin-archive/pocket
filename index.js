
function pocket (props) {
  var assign = Object.assign
  var state = assign({}, props.state)
  var lock = false

  function dispatch (actions) {
    for (var i = 0; i < actions.length; i++) {
      var result = actions[i](state)

      if (result && result !== state) {
        state = assign({}, state, result)

        if (!lock) {
          render(lock = true)
        }
      }
    }
  }

  function render () {
    lock = false

    requestAnimationFrame(function () {
      props.render(state, dispatch)
    })
  }

  render()

  return dispatch
}

export default pocket
