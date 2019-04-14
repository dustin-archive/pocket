
function clone () {
  return Object.assign({}, arguments)
}

function pocket (data) {
  var lock = false
  var state = clone(data.state)
  var actions = wireActions({
    state: state,
    actions: clone(data.actions)
  })

  render()

  return actions

  function update (newState) {
    if (lock === false) {
      lock = true
      render()
    }

    state = clone(state, newState)
  }

  function defer () {
    data.render(state, actions)
  }

  function render () {
    lock = false
    requestAnimationFrame(defer) // eslint-disable-line
  }

  function wireActions (data) {
    var target = {}

    for (var key in data.actions) {
      target[key] = function (data) {
        var newState = data.actions[key](data.state, data.actions)

        if (newState) {
          update(newState)
        }

        return newState
      }
    }

    return target
  }
}

export default pocket
