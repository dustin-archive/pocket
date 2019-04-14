
function pocket (data) {
  var state = Object.assign({}, data.state)
  var actions = wireActions({
    state: state,
    actions: Object.assign({}, data.actions)
  })

  data.render(state, actions)

  return actions

  function wireActions (data) {
    var target = {}

    for (var key in data.actions) {
      target[key] = function (data) {
        var result = data.actions[key](data.state, data.actions)

        if (result) {
          state = Object.assign({}, state, result)
          data.render(state, actions)
        }

        return result
      }
    }

    return target
  }
}

export default pocket
