
function clone (a, b) {
  return Object.assign({}, a, b)
}

function pocket (opts) {
  var globalState = clone(opts.state)
  var globalActions = wire(globalState, clone(opts.actions))
  var lock = false

  render()

  return globalActions

  function wire (state, actions) {
    for (var key in actions) {
      const action = actions[key]

      actions[key] = (data) => {
        let result = action(data)

        typeof result === 'function' && (
          result = result(globalState, actions)
        )

        if (result) {
          globalState = clone(globalState, result)
          !lock && render(lock = true)
        }

        return result
      }
    }

    return actions
  }

  function render () {
    lock = false

    requestAnimationFrame(function () {
      opts.render(globalState, globalActions)
    })
  }
}

export default pocket
