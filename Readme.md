# cavalcade

*cavalcade* provides a set of queue-like data structures.

## Install

```bash
$ npm install --save cavalcade
```

## Example

```javascript
const cavalcade = require('cavalcade')
const fifoQueue = cavalcade.fifoQueue(4, [1, 2, 3, 4])

fifo.size // 4
fifo.length // 4

fifo.pop() // 1
fifo.size // 4
fifo.length // 3
// queue: [null, 4, 3, 2]

fifo.push(5)
// queue: [5, 4, 3, 2]

fifo.push(6)
// queue: [6, 5, 4, 3]

fifo.pop() // 3
```

## Queues

+ `cavalcade.fifoQueue(size: number, initial: array)`:
  Provides a "first in first out" queue of a given `size` (or `16` slots) with
  an optional set of `initial` values. Items are automatically dequeued when
  the queue is full and a new item is added.

  Supports the following properties/methods:
    + `size`: the number or slots allocated to the queue. This will not change
      after initialization.
    + `length`: the number of items in the queue. This will change with
      enqueues and dequeues.
    + `push(item)`: adds an item to the queue.
    + `pop()`: retrieves and removes the first item in the queue. Returns `null`
      if there are no items available.
    + `values()`: returns an iterator that can be used to examine the values
      in the queue without modifying the queue. Note: if the queue changes while
      you are iterating it the values may not be what you are expecting.
    + `[@@iterator]`: returns the same iterator as `values()`

+ `cavalcade.lifoQueue(size: number, initial: array)`:
  Provides a "last in first out" queue, or stack, of a given `size` (or `16`
  slots) with an optional set of `initial` values. Items are automatically
  dequeued when the queue is full and a new item is added.

  Supports the following properties/methods:
    + `size`: the number or slots allocated to the queue. This will not change
      after initialization.
    + `length`: the number of items in the queue. This will change with
      enqueues and dequeues.
    + `push(item)`: adds an item to the queue.
    + `pop()`: retrieves and removes the first item in the queue. Returns `null`
      if there are no items available.
    + `values()`: returns an iterator that can be used to examine the values
      in the queue without modifying the queue. Note: if the queue changes while
      you are iterating it the values may not be what you are expecting.
    + `[@@iterator]`: returns the same iterator as `values()`

## License

[MIT License](http://jsumners.mit-license.org/)
