import net from 'net'

export function createServer(ip: string, port: number) {
	const server = net.createServer((socket: net.Socket) => {
		socket.on('data', (data: Buffer) => {
			console.log(data)
		})
		socket.on('close', () => {})
		socket.on('error', (err: Error) => {
			console.log(err)
		})
	})

	server.listen(port, ip, () => {})

	server.on('error', (err: Error) => {
		throw err
	})
}
