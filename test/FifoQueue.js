'use strict'
/* eslint-env node, mocha */

const path = require('path')
const expect = require('chai').expect
const fifoQueueFactory = require(path.join(__dirname, '..', 'lib', 'FifoQueue'))

suite('FifoQueue', function () {
  suite('#ctor(size, initial)', function () {
    test('creates queues with a default size of 16', function (done) {
      const q = fifoQueueFactory()
      expect(q.size).to.equal(16)
      done()
    })

    test('creates queues with a specified size', function (done) {
      const q = fifoQueueFactory(2)
      expect(q.size).to.equal(2)
      done()
    })

    test('creates queues with a specified size and inital values', function (done) {
      const q = fifoQueueFactory(2, [1, 2])
      expect(q.size).to.equal(2)
      expect(q.length).to.equal(2)
      expect(q.pop()).to.equal(1)
      expect(q.pop()).to.equal(2)
      done()
    })

    test('creates queues with default size and initial values', function (done) {
      const q = fifoQueueFactory([1, 2])
      expect(q.size).to.equal(16)
      expect(q.length).to.equal(2)
      expect(q.pop()).to.equal(1)
      expect(q.pop()).to.equal(2)
      done()
    })

    test('will not create a queue with an invalid size', function (done) {
      expect(fifoQueueFactory.bind(null, 1.2)).to.throw(Error)
      done()
    })

    test('will not create a queue with an invalid initial value', function (done) {
      expect(fifoQueueFactory.bind(null, 1, 1)).to.throw(Error)
      done()
    })
  })

  suite('#length', function () {
    test('returns the number of pushed elements', function (done) {
      const q = fifoQueueFactory(2)
      q.push(1)
      expect(q.length).to.equal(1)
      q.push(2)
      expect(q.length).to.equal(2)
      done()
    })
  })

  suite('#size', function () {
    test('returns the number of slots in the queue', function (done) {
      const q = fifoQueueFactory(2)
      q.push(1)
      expect(q.size).to.equal(2)
      q.push(2)
      expect(q.size).to.equal(2)
      done()
    })
  })

  suite('#push(item)', function () {
    test('adds to the the end of the queue', function (done) {
      let q = fifoQueueFactory(2)
      q.push(1)

      let values = q.values()
      expect(values.next().value).to.equal(1)
      expect(values.next().value).to.be.undefined

      q = fifoQueueFactory(4)
      q.push(1)
      q.push(2)
      q.push(3)
      q.push(4)
      values = q.values()
      expect(values.next().value).to.equal(1)
      expect(values.next().value).to.equal(2)
      expect(values.next().value).to.equal(3)
      expect(values.next().value).to.equal(4)
      q.push(5)
      values = q.values()
      expect(values.next().value).to.equal(2)
      expect(values.next().value).to.equal(3)
      expect(values.next().value).to.equal(4)
      expect(values.next().value).to.equal(5)
      expect(values.next().value).to.be.undefined

      done()
    })

    test('returns the number of elements in the queue', function (done) {
      let q = fifoQueueFactory()
      expect(q.length).to.equal(0)
      expect(q.push(1)).to.equal(1)
      expect(q.length).to.equal(1)
      done()
    })
  })

  suite('#pop()', function () {
    test('dequeues elements from the front of the queue', function (done) {
      const q = fifoQueueFactory(4)
      expect(q.pop()).to.be.null

      q.push(1)
      q.push(2)
      q.push(3)
      q.push(4)

      expect(q.pop()).to.equal(1)
      expect(q.pop()).to.equal(2)
      expect(q.pop()).to.equal(3)
      expect(q.pop()).to.equal(4)
      expect(q.length).to.equal(0)
      expect(q.pop()).to.equal(null)

      done()
    })
  })

  suite('#values()', function () {
    test('does not modify the queue', function (done) {
      const q = fifoQueueFactory(4, [1, 2, 3, 4])
      const values = q.values()

      expect(values.next().value).to.equal(1)
      expect(q.length).to.equal(4)

      expect(values.next().value).to.equal(2)
      expect(q.length).to.equal(4)

      expect(values.next().value).to.equal(3)
      expect(q.length).to.equal(4)

      expect(values.next().value).to.equal(4)
      expect(q.length).to.equal(4)

      done()
    })
  })
})
