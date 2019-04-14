
function pocket (opts) {
  var assign = Object.assign
  var globalState = assign({}, opts.state)
  var globalActions = wire(globalState, assign({}, opts.actions))
  var lock = false

  render()

  return globalActions

  function wire (state, actions) {
    for (var key in actions) {
      var action = actions[key]

      actions[key] = function (data) {
        var result = action(data)

        if (typeof result === 'function') {
          result = result(globalState, actions)
        }

        if (result) {
          globalState = assign({}, globalState, result)

          if (!lock) {
            render(lock = true)
          }
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
