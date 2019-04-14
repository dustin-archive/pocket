
function clone (a, b) {
  return Object.assign({}, a, b)
}

function pocket (data) {
  var globalState = clone(data.state)
  var globalActions = wire(globalState, clone(data.actions))
  var lock = false

  render()

  return globalActions

  function wire (state, actions) {
    var target = {}

    for (var key in actions) {
      target[key] = function (data) {
        var result = actions[key](data)

        typeof result === 'function' && (result = result(state, actions))
        globalState = clone(state, result)
        !lock && render(lock = true)

        return result
      }
    }

    return target
  }

  function render () {
    lock = false

    requestAnimationFrame(function () {
      data.render(globalState, globalActions)
    })
  }
}

export default pocket
