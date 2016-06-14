'use strict'

const path = require('path')
const reqlib = function () {
  const args = Array.from(arguments)
  return require(
    path.join.apply(null, [__dirname, 'lib'].concat(args))
  )
}

module.exports = {
  fifoQueue: reqlib('FifoQueue'),
  lifoQueue: reqlib('LifoQueue')
}
