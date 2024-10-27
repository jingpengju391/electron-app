import net from 'net'

export default net.createServer((socket) => {
	socket.on('data', () => {})
	socket.on('close', () => {})
	socket.on('error', () => {})
})
