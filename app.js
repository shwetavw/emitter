 //import module
 const EventEmitter = require('events') 

 //Instantiate event emitter
 const eventEmitter = new EventEmitter()

 //Use case-1 (normal)
 //listen to the event
 eventEmitter.on('usecase1',() => {
     console.log('Use case-1 (normal): connected...')
 })

 //publish an event
 eventEmitter.emit('usecase1')
 

//Use case-2 (with argument)
 eventEmitter.on('usecase2',(serverName) => {
    console.log(`Use case-2 (with argument): connected to ${serverName}`)
})

eventEmitter.emit('usecase2', 'testserver')

//Use case-3 (register multiple listener)
//The listeners execution order determined how the listeners have been registered.
//The Listeners executes the events synchronously in the current event loop cycle
//listen-1 to the event
eventEmitter.on('usecase3',() => {
    console.log('Use case-3 (register multiple listener-1)')
})
//listen-2 to the event
eventEmitter.on('usecase3',(serverName) => {
    console.log('Use case-3 (register multiple listener-2)')
})

eventEmitter.emit('usecase3')


//Use case-4 (listener must be register before emitting the event)
eventEmitter.on('usecase4',() => {
    console.log('Use case-4 (listener must be register before emitting the event)')
})

eventEmitter.emit('usecase4', 'testserver')

//listen-2 to the event (omitted listener as registered after emitting event)
eventEmitter.on('usecase4',() => {
    console.log('Use case-4 (this listener will be omitted)')
})

//Use case-5 (single instance of event emitter)
//emit and on functions must be called on the same EventEmitter instance, if called on two different event emitter instance then registred listener will be omitted
const em1 = new EventEmitter()
const em2 = new EventEmitter() 

 em1.on('usecase5',() => {
    console.log('Use case-5 (omitted due to different instance of event emitter)')
})

em2.emit('usecase5')

//USe case-6 (off function)
//listen to the event
function printhello(){
    console.log('Hello')
}
eventEmitter.on('usecase6', printhello)

//remove listener
eventEmitter.off('usecase6', printhello)

//this will be ignored
eventEmitter.on('usecase6', printhello)

//publish an event
eventEmitter.emit('usecase6')

//Use case-7 (once function)
//This will be called only once

eventEmitter.on('usecase7', () => {
    console.log('Use case-7: on function')
})

eventEmitter.once('usecase7', () => {
    console.log('Use case-7: once function')
})

//publish event multiple times
eventEmitter.emit('usecase7') //run on and once
eventEmitter.emit('usecase7') //run only on

//Use case-8 (Listener count)
eventEmitter.on('usecase8', () => {
    console.log('Use case-8: first')
})
eventEmitter.on('usecase8', () => {
    console.log('Use case-8: second')
})
eventEmitter.on('usecase8', () => {
    console.log('Use case-8: third')
})

//publish event multiple times
eventEmitter.emit('usecase8')

//Listeners count for use case-8
console.log('Use case-8: Total registered listeners count is '+ eventEmitter.listenerCount('usecase8'))

//Use case-9 (returns all active eventNames)
console.log('all registered event names for all use cases : ', eventEmitter.eventNames())

//Use case-10 (addListener, removeListener, removeAllListeners functions)
//addListener and removeListener are exactely same as on and off respectively
//removeAllListeners will remove all the registered listeners for that event


