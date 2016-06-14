'use strict'

/**
 * Creates a new {@link FifoQueue}.
 *
 * @param  {number} [size] The number of elements the queue should be capable
 * of containing. The queue size is static upon creation. The default size is
 * `16`.
 * @param  {array} [initial] An initial set of elements to add to the queue.
 * The first element in the array will be the first element returned by
 * the queue.
 * @return {FifoQueue}
 * @throws {Error} If `size` is supplied and is not a number, or `initial` is
 * not an array.
 */
function fifoQueueFactory (size, initial) {
  let _initial = initial
  if (_initial && !Array.isArray(_initial)) {
    throw new Error('initial must be an array of values')
  }

  let _size
  if (Array.isArray(size)) {
    _size = 16
    _initial = size
  } else if (size) {
    if (!Number.isInteger(size)) throw new Error('size must be an integer')
    _size = size
  } else {
    _size = 16
  }
  const q = new Array(_size)
  q.fill(null)

  let elements = 0

  /**
   * Provides a queue wherein the first element added is the first element
   * returned.
   *
   * @prop {number} size The total number of slots available in the queue.
   * @prop {number} length The total number of items in the queue.
   * @constructor
   */
  function FifoQueue () {
    if (_initial) {
      _initial.forEach((item) => this.push(item))
    }
  }

  FifoQueue.prototype = {
    get length () { return elements },
    get size () { return _size }
  }

  /**
   * Returns a new `Iterator` that provides access to the elements in the
   * queue. Iterating through the queue via this method will not alter the
   * queue.
   *
   * @return {Iterator}
   */
  FifoQueue.prototype.values = function values () {
    return (function * () {
      for (let pos = _size - elements; pos <= _size; pos += 1) {
        yield q[pos]
      }
    }())
  }

  /**
   * Returns the same `Iterator` as {@link FifoQueue#values()}.
   *
   * @return {Iterator}
   */
  FifoQueue.prototype[Symbol.iterator] = () => FifoQueue.prototype.values.bind(this)

  /**
   * Adds a new element to the end of the queue. If the queue is full, i.e.
   * every pre-allocated slot has an item, then the oldest, "first", item will
   * be dropped from the queue.
   *
   * For example, given a queue size of 4 with elements `[1, 2, 3, 4]`, then
   * `q.push(5)` will result in the queue having elements `[2, 3, 4, 5]`.
   *
   * @param  {*} item Any entity you wish to put in the queue.
   * @return {number} The number of elements now in the queue,
   * i.e. {@link FifoQueue#length}.
   */
  FifoQueue.prototype.push = function push (item) {
    if (elements === 0) {
      q[_size - 1] = item
      elements = 1
      return elements
    }

    if (elements < _size) {
      q.copyWithin((_size - 1) - elements, _size - elements)
      q[_size - 1] = item
      elements += 1
      return elements
    }

    q.copyWithin(0, 1)
    q[_size - 1] = item
    return elements
  }

  /**
   * Retrieves the first element in the queue and removes it from the queue.
   *
   * @return {*} Whatever element was first in the queue.
   */
  FifoQueue.prototype.pop = function pop () {
    if (elements === 0) {
      return null
    }

    if (elements === _size) {
      const result = q[0]
      q[0] = null
      elements -= 1
      return result
    }

    const result = q[_size - elements]
    q[_size - elements] = null
    elements -= 1
    return result
  }

  return new FifoQueue()
}

module.exports = fifoQueueFactory
