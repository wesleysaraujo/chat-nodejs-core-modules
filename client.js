const net = require('net')
// Connection of client on server at port 30000
const client = net.connect(3000)
// Receive Message when connect
client.on('connect', () => {
	client.write('Hello, i am the client')
})
// Receive message of server
client.on('data', (message) => {
	console.log(message.toString())
})

process.stdin.on('readable', () => {
	let message = process.stdin.read()
	
	if (!message) return
	
	message = message.toString().replace(/\n/, '')
	client.write(message)
})