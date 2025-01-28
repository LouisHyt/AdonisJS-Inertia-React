import transmit from '@adonisjs/transmit/services/main'

transmit.on('connect', ({ uid }) => {
  console.log(`User ${uid} connected`)
})

transmit.on('disconnect', ({ uid }) => {
  console.log(`User ${uid} disconnected`)
})
