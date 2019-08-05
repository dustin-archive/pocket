
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

// - - - - - - - -
// # Test 1
// - - - - - - - -

const test1 = () => {
  let i = 0

  const dispatch = pocket({
    state: {
      value: 1
    },
    render: state => {
      if (i === 0) equal(state.value, 1, 'Test 1: value should be 1')
      if (i === 1) equal(state.value, 2, 'Test 1: value should be 2')
      i++
    }
  })

  const up = state => ({ value: state.value + 1 })

  setTimeout(() => dispatch([ up ]), 1000)
}

test1()

// - - - - - - - -
// # Test 2
// - - - - - - - -

const test2 = () => {
  let i = 0

  const dispatch = pocket({
    state: {},
    render: state => {
      if (i === 0) equal(state.foo, void 0, 'Test 2A: foo should be undefined')
      if (i === 1) equal(state.foo, 'bar', 'Test 2B: foo should be bar')
      i++
    }
  })

  const update = data => () => data

  setTimeout(() => dispatch([ update({ foo: 'bar' }) ]), 1000)
}

test2()

// - - - - - - - -
// # Test 3
// - - - - - - - -

const test3 = () => {
  let i = 0

  const dispatch = pocket({
    state: {
      value: 2
    },
    render: state => {
      if (i === 0) equal(state.value, 2, 'Test 3A: value should be 2')
      if (i === 1) equal(state.value, 2, 'Test 3B: value should be 2')
      if (i === 2) equal(state.value, 3, 'Test 3C: value should be 3')
      i++
    }
  })

  const up = state => ({ value: state.value + 1 })
  const delay = (state) => {
    setTimeout(() => dispatch([ up ]), 1000)
  }

  setTimeout(() => dispatch([ delay ]), 1000)
}

test3()

// - - - - - - - -
// # Test 4
// - - - - - - - -

const test4 = () => {
  let i = 0

  const dispatch = pocket({
    state: {
      value: 3
    },
    render: state => {
      if (i === 0) {
        equal(state.value, 3, 'Test 4A: value should be 3')
        equal(state.foo, void 0, 'Test 4B: foo should be undefined')
      }
      if (i === 1) {
        equal(state.value, 4, 'Test 4C: value should be 4')
        equal(state.foo, true, 'Test 4D: value should be true')
      }
      i++
    }
  })

  const up = state => ({ value: state.value + 1 })
  const foo = () => {
    dispatch([ up ])
    return { foo: true }
  }

  setTimeout(() => dispatch([ foo ]), 1000)
}

test4()
