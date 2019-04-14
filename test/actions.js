
import pocket from '../index'

const equal = (value, equals, message) => {
  const test = value === equals ? '## Pass' : '## Fail'
  console.log(test + ' - ' + message)
  console.log('  ---')
  console.log('    oporator:', 'equal')
  console.log('    expected:', equals)
  console.log('    actual:', value)
  console.log('  ...')
}

const test1 = () => {
  let i = 0

  const main = pocket({
    state: {
      value: 1
    },
    actions: {
      up: () => state => ({ value: state.value + 1 })
    },
    render: state => {
      if (i === 0) equal(state.value, 1, 'value should be 1')
      if (i === 1) equal(state.value, 2, 'value should be 2')
      i++
    }
  })

  setTimeout(() => main.up(), 1000)
}

test1()

const test2 = () => {
  let i = 0

  const main = pocket({
    state: {},
    actions: {
      update: data => data
    },
    render: state => {
      if (i === 0) equal(state.foo, void 0, 'foo should be undefined')
      if (i === 1) equal(state.foo, 'bar', 'foo should be bar')
      i++
    }
  })

  setTimeout(() => main.update({ foo: 'bar' }), 1000)
}

test2()

const test3 = () => {
  let i = 0

  const main = pocket({
    state: {
      value: 2
    },
    actions: {
      up: () => state => ({ value: state.value + 1 }),
      delay: () => (s, actions) => {
        setTimeout(() => actions.up(), 1000)
      }
    },
    render: state => {
      if (i === 0) equal(state.value, 2, 'value should be 2')
      if (i === 1) equal(state.value, 3, 'value should be 3')
      i++
    }
  })

  setTimeout(() => main.delay(), 1000)
}

test3()

const test4 = () => {
  let i = 0

  const main = pocket({
    state: {
      value: 3
    },
    actions: {
      up: () => state => ({ value: state.value + 1 }),
      foo: () => (s, actions) => {
        actions.up()
        return { foo: true }
      }
    },
    render: state => {
      if (i === 0) {
        equal(state.value, 3, 'value should be 3')
        equal(state.foo, void 0, 'foo should be undefined')
      }
      if (i === 1) {
        equal(state.value, 4, 'value should be 4')
        equal(state.foo, true, 'value should be true')
      }
      i++
    }
  })

  setTimeout(() => main.foo(), 1000)
}

test4()
