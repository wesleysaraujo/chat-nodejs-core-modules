
const net =  require('net')

var connections = []

var broadcast = (message, origin) => {
	connections.forEach((connection) => {
		if(origin === connection) return	
		connection.write(message)
	})
}

net.createServer((connection) => {
	// save connection
	connections.push(connection)
	// Send message of client while client connect
	connection.write('Hello Client, i am Server')
	// Receive connection message of client
	connection.on('data', (message) => {
		var command = message.toString()

		if(command.indexOf('/nickname') === 0) {
			var nickname = command.replace('/nickname ', '')
			console.log(nickname)
			return
		}
		broadcast(message, connection)
	})
}).listen(3000)