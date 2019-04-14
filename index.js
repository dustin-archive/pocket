
function pocket (opts) {
  var assign = Object.assign
  var state = assign({}, opts.state)
  var actions = assign({}, opts.actions)
  var lock = false

  for (var key in actions) {
    wire()
  }

  render()

  return actions

  function wire () {
    var action = actions[key]

    actions[key] = function (data) {
      var result = action(data)

      if (typeof result === 'function') {
        result = result(state, actions)
      }

      if (result) {
        state = assign({}, state, result)

        if (!lock) {
          render(lock = true)
        }
      }

      return result
    }
  }

  function render () {
    lock = false

    requestAnimationFrame(function () {
      opts.render(state, actions)
    })
  }
}

export default pocket
