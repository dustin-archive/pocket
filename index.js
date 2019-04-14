
var defer = requestAnimationFrame // eslint-disable-line

function clone () {
  return Object.assign({}, arguments)
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
        var newState = actions[key](state, actions, data)

        !lock && render(lock = true)
        globalState = clone(state, newState)

        return newState
      }
    }

    return target
  }

  function render () {
    lock = false
    defer(data.bind(globalState, globalActions))
  }
}

export default pocket
