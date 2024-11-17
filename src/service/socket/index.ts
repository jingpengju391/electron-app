import net from 'net'
import * as xml2js from 'xml2js'
import { create } from 'xmlbuilder'
import { PointPartialDischarge } from '../../shared/dataModelTypes/partialDischarge'
import { receivePartialDischargeListData, updateConnectServer } from '../../server/partialDischarge/socketPartialDischarge'
let server: net.Server | null = null
const clientSockets: net.Socket[] = []
import { execSync } from 'child_process'
import { getLocalIPAddress } from '@service/util'
export function createServer(port: number, ip?: string) {
	ip = ip ?? getLocalIPAddress()
	if (server) {
		// console.log('Already start server.')
		return
	}

	try {
		server = net.createServer((socket: net.Socket) => {
			// 当有客户端连接时触发
			let arr: string[] = []
			socket.on('data', async (data: Buffer) => {
				const message = data.toString('utf-8').trim()

				if (message.startsWith('<head>') && message.endsWith('</head>')) {
					msgOption(message, socket)
				}
				if (message.startsWith('<head>') && !message.endsWith('</head>')) {
					arr.push(data.toString('utf-8'))
				}
				if (!message.startsWith('<head>') && !message.endsWith('</head>')) {
					arr.push(data.toString('utf-8'))
				}
				if (!message.startsWith('<head>') && message.endsWith('</head>')) {
					arr.push(data.toString('utf-8'))
					msgOption(arr.join(''), socket)
					arr = []
				}
			})
			// 监听客户端发送的数据 133协议作废，采用t95自定义协议
			// socket.on('data', async (receiveData: Buffer) => {
			// 	console.log('Already start server.')
			//     console.log(receiveData)
			// 	// 处理数据接收等其他逻辑
			// 	totalDataBuffer = Buffer.concat([totalDataBuffer, receiveData])
			// 	const data: string = totalDataBuffer.toString('hex')
			// 	const head: string = data.substring(0, 8)
			// 	const index: number = data.indexOf('eb90eb90')
			// 	if (head !== 'eb90eb90' && index === -1 && data.length === 65535) {
			// 		totalDataBuffer = Buffer.alloc(0)
			// 	} else {
			// 		const subData: string = data.slice(index)
			// 		totalDataBuffer = Buffer.from(subData, 'hex')
			// 	}
			//
			// 	if ('eb90eb90' === head && data.length >= 32) {
			// 		const expectedLength: bigint = BigInt('0x' + data.substring(16, 32))
			// 		if (totalDataBuffer.length >= Number(expectedLength.toString())) {
			// 			// 读取到完整或大于完整包的数据
			// 			let totalData: string = totalDataBuffer.toString('hex')
			// 			const endState: string = totalData.slice(Number(expectedLength.toString()) * 2 - 2, Number(expectedLength.toString()) * 2)
			// 			totalData = totalData.slice(0, Number(expectedLength.toString()) * 2)
			// 			// 移除已取到的buffer
			// 			const totalDataBuf: Buffer = Buffer.from(totalData, 'hex')
			// 			totalDataBuffer = totalDataBuffer.slice(Number(expectedLength.toString()), totalDataBuffer.length)
			//
			// 			if (endState === '03') {
			// 				// 说明完整包已经读取成功
			// 				const dataHx: string = totalDataBuf.toString('hex')
			// 				// 业务数据长度
			// 				const xmlLength: number = parseInt(dataHx.substring(78, 94), 16)
			// 				// 业务数据报文
			// 				const xmlDataBuffer: string = dataHx.substring(94, 94 + xmlLength * 2)
			// 				const buffer: Buffer = Buffer.from(xmlDataBuffer, 'hex')
			// 				const xmlDataBufferStr: string = buffer.toString('utf-8')
			// 				// console.log(xmlDataBufferStr)
			// 				const result = await xmlToJavaScriptObject(xmlDataBufferStr)
			// 				console.log(result)
			//                 // const arr = []
			//                 // result.main_task.sub_task.clearances.forEach((item: any) => {
			//                 //
			//                 // })
			//                 // const pointPartialDischarge : PointPartialDischarge = {
			//                 //     dataType: ,
			//                 //     workId: ,
			//                 //     subWorkId: ,
			//                 //     workDetailId: string
			//                 //     userId: string
			//                 //     detectPositionId: string
			//                 //     groupId: string
			//                 //     detectMethod: number
			//                 //     detectMethodCn: string
			//                 //     deviceType: string
			//                 //     deviceTypeName: string
			//                 //     voltageLevel: string
			//                 //     detectPositionName: string
			//                 //     orderNumber: number
			//                 //     deviceId: string
			//                 //     deviceName: string
			//                 //     dispatchNumber: number
			//                 //     blockName: string
			//                 //     routeType: number
			//                 //     status: number
			//                 //     reasonNotDetect: string
			//                 // }
			//                 // arr.push(pointPartialDischarge)
			//                 // receivePartialDischargeListData(arr)
			// 			}
			// 		}
			// 	}
			// })
			socket.on('end', () => {
				const index: number = clientSockets.indexOf(socket)
				if (index !== -1) {
					clientSockets.splice(index, 1)
				}
				sendReportLink(false)
				// console.log('Client disconnected')
			})
			socket.on('close', () => {})
			socket.on('error', (err: Error) => {
				console.log(`Client msg error: ${err}`)
			})
			// 当客户端断开连接时触发
			socket.on('end', () => {
				console.log('客户端已断开连接')
			})
		})
		server.listen(port, ip, () => {
			// console.log(`Socket服务器正在监听端口 ${port}`)
		})

		server.on('connection', function (socket: net.Socket) {
			if (clientSockets.length >= 1) {
				const socket1 = clientSockets.shift()
				if (socket1) {
					socket1.destroyed && socket1.destroy()
				}
			}
			clientSockets.push(socket)
			// 获取客户端端口号识别不同的客户端
			sendReportLink(true)
			// clientSocket.write('当前在线人数:');
		})
	} catch (e) {
		console.error('服务器创建或监听错误:', e)
	}
}

function msgOption(message: string, socket: net.Socket) {
	const parser = new xml2js.Parser({
		explicitArray: false, // 设置为false，避免生成多余的数组结构（根据你的数据结构需求可调整）
		trim: true // 去除字符串两端的空白字符
	})
	parser.parseString(message, (err, result) => {
		if (err) {
			console.error('解析 XML 失败:', err)
		} else {
			const headJson = result.head
			const input = headJson.data
			const cmd = headJson.cmd
			if (cmd == 'query link') {
				const sendType = 'task ack'
				const msg = `<head><seq>${Date.now()}</seq><cmd>${sendType}</cmd><data>ok</data></head>`
				socket.write(msg)
			} else {
				const base64DataXml = input.replace(/ /g, '+')
				const decodedDataXml = Buffer.from(base64DataXml, 'base64').toString('utf-8')
				// console.log(`decodedDataXml: ${decodedDataXml}`)
				parser.parseString(decodedDataXml, (err, result) => {
					if (err) {
						console.error('解析 XML 失败:', err)
					} else {
						const pointPartialDischargeArray: PointPartialDischarge[] = []
						// console.log(`result: ${JSON.stringify(result)}`)
						const main_task = result.IDescription.main_task
						// console.log(`main_task: ${JSON.stringify(main_task)}`)
						const sub_task = main_task.sub_task
						// console.log(`sub_task: ${JSON.stringify(sub_task)}`)
						const clearance = sub_task.clearance
						// console.log(`clearance: ${JSON.stringify(clearance)}`)
						const test_point = clearance.test_point
						if (Array.isArray(test_point)) {
							for (const testPointElement of test_point) {
								const pointPartialDischarge: PointPartialDischarge = {
									workId: main_task.$.id,
									workName: main_task.$.name,
									subWorkId: sub_task.$.id,
									partName: testPointElement.$.part !== undefined ? testPointElement.$.part : '',
									deviceName: testPointElement.$.name,
									partId: testPointElement.$.id,
									type: main_task.$.type,
									subWorkName: sub_task.$.name,
									deviceType: testPointElement.$.deviceType
								}
								pointPartialDischargeArray.push(pointPartialDischarge)
							}
						} else {
							const pointPartialDischarge: PointPartialDischarge = {
								workId: main_task.$.id,
								workName: main_task.$.name,
								subWorkId: sub_task.$.id,
								partName: test_point.$.part,
								deviceName: test_point.$.name,
								partId: test_point.$.id,
								type: main_task.$.type,
								subWorkName: sub_task.$.name,
								deviceType: test_point.$.deviceType
							}
							pointPartialDischargeArray.push(pointPartialDischarge)
						}
						receivePartialDischargeListData(pointPartialDischargeArray)
						// console.log('pointPartialDischargeArray', JSON.stringify(pointPartialDischargeArray))
					}
				})
			}
		}
	})
}

export function sendReportLink(isLink: boolean) {
	updateConnectServer(isLink)
	clientSockets.forEach((socket: net.Socket) => {
		const sendType = 'report link'
		const msg = `<head><seq>${Date.now()}</seq><cmd>${sendType}</cmd><data>${isLink ? 'connect' : 'disconnect'}</data></head>`
		// console.log('msg', msg)
		// 向客户端发送消息
		socket.write(msg)
	})
}

export function send2Client(message: PointPartialDischarge) {
	clientSockets.forEach((socket: net.Socket) => {
		// console.log('message', message)
		const taskXml = getXmlString(message)
		// console.log('taskXml', taskXml)
		const originalBuffer = Buffer.from(taskXml, 'utf8')
		const mac = getMacAddressFromIpconfigOutput()
		const result = mac + ',' + originalBuffer.toString('base64')
		// console.log('mac', mac)
		const sendType = 'send result'
		const msg = `<head><seq>${Date.now()}</seq><cmd>${sendType}</cmd><data>${result}</data></head>`
		// console.log('msg', msg)
		// 向客户端发送消息
		socket.write(msg)
	})
}

function getMacAddressFromIpconfigOutput() {
	try {
		// 执行ipconfig /all命令并获取原始二进制输出
		const outputBuffer = execSync('ipconfig /all')

		// 将二进制输出转换为字符串
		const outputString = outputBuffer.toString('utf8')

		const lines = outputString.split('\n')

		for (const line of lines) {
			if (line) {
				// 提取:后面的值，去除两端空白字符
				const value = line.split(':')
				if (value && value.length > 1) {
					const a = value.pop()
					if (a) {
						const possibleMacAddress = a.trim()
						// 判断是否为MAC地址
						if (isMacAddress(possibleMacAddress)) {
							return possibleMacAddress
						}
					}
				}
			}
		}
	} catch (err) {
		return null
	}
	return null
}

function isMacAddress(value) {
	const macAddressRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/
	return macAddressRegex.test(value)
}
function getXmlString(message: PointPartialDischarge) {
	const descriptionXml = create('IDescription')
	// const descriptionXml = xmlObj.ele('IDescription')
	descriptionXml.ele('version').txt('1.1')
	const mainTaskXml = descriptionXml.ele('main_task')
	mainTaskXml.ele('type').txt(message.type)
	mainTaskXml.ele('id').txt(message.workId)
	mainTaskXml.ele('name').txt(message.workName)
	if (message && message.files && message.files.length > 1) {
		mainTaskXml.ele('file_type').txt('1')
	}
	if (message && message.files && message.files.length == 1) {
		mainTaskXml.ele('file_type').txt('0')
	}

	const subTaskXml = mainTaskXml.ele('sub_task')
	subTaskXml.ele('id').txt(message.subWorkId)
	subTaskXml.ele('name').txt(message.subWorkName)
	const clearanceXml = subTaskXml.ele('clearance')
	clearanceXml.ele('id').txt(message.partName)
	clearanceXml.ele('name').txt(message.partId)

	const testPointXml = clearanceXml.ele('test_point')
	testPointXml.ele('id').txt(message.partId)
	testPointXml.ele('part').txt(message.partName)
	testPointXml.ele('name').txt(message.deviceName)
	testPointXml.ele('filename').txt(message.file ?? '')
	testPointXml.ele('bgfilename').txt('dms')
	return descriptionXml.toString()
}

//
// export function getCrc32(data: Buffer): number {
// 	const table: number[] = [
// 		0x00000000, 0x77073096, 0xee0e612c, 0x990951ba, 0x076dc419, 0x706af48f, 0xe963a535, 0x9e6495a3, 0x0edb8832, 0x79dcb8a4, 0xe0d5e91e, 0x97d2d988, 0x09b64c2b, 0x7eb17cbd, 0xe7b82d07, 0x90bf1d91,
// 		0x1db71064, 0x6ab020f2, 0xf3b97148, 0x84be41de, 0x1adad47d, 0x6ddde4eb, 0xf4d4b551, 0x83d385c7, 0x136c9856, 0x646ba8c0, 0xfd62f97a, 0x8a65c9ec, 0x14015c4f, 0x63066cd9, 0xfa0f3d63, 0x8d080df5,
// 		0x3b6e20c8, 0x4c69105e, 0xd56041e4, 0xa2677172, 0x3c03e4d1, 0x4b04d447, 0xd20d85fd, 0xa50ab56b, 0x35b5a8fa, 0x42b2986c, 0xdbbbc9d6, 0xacbcf940, 0x32d86ce3, 0x45df5c75, 0xdcd60dcf, 0xabd13d59,
// 		0x26d930ac, 0x51de003a, 0xc8d75180, 0xbfd06116, 0x21b4f4b5, 0x56b3c423, 0xcfba9599, 0xb8bda50f, 0x2802b89e, 0x5f058808, 0xc60cd9b2, 0xb10be924, 0x2f6f7c87, 0x58684c11, 0xc1611dab, 0xb6662d3d,
// 		0x76dc4190, 0x01db7106, 0x98d220bc, 0xefd5102a, 0x71b18589, 0x06b6b51f, 0x9fbfe4a5, 0xe8b8d433, 0x7807c9a2, 0x0f00f934, 0x9609a88e, 0xe10e9818, 0x7f6a0dbb, 0x086d3d2d, 0x91646c97, 0xe6635c01,
// 		0x6b6b51f4, 0x1c6c6162, 0x856530d8, 0xf262004e, 0x6c0695ed, 0x1b01a57b, 0x8208f4c1, 0xf50fc457, 0x65b0d9c6, 0x12b7e950, 0x8bbeb8ea, 0xfcb9887c, 0x62dd1ddf, 0x15da2d49, 0x8cd37cf3, 0xfbd44c65,
// 		0x4db26158, 0x3ab551ce, 0xa3bc0074, 0xd4bb30e2, 0x4adfa541, 0x3dd895d7, 0xa4d1c46d, 0xd3d6f4fb, 0x4369e96a, 0x346ed9fc, 0xad678846, 0xda60b8d0, 0x44042d73, 0x33031de5, 0xaa0a4c5f, 0xdd0d7cc9,
// 		0x5005713c, 0x270241aa, 0xbe0b1010, 0xc90c2086, 0x5768b525, 0x206f85b3, 0xb966d409, 0xce61e49f, 0x5edef90e, 0x29d9c998, 0xb0d09822, 0xc7d7a8b4, 0x59b33d17, 0x2eb40d81, 0xb7bd5c3b, 0xc0ba6cad,
// 		0xedb88320, 0x9abfb3b6, 0x03b6e20c, 0x74b1d29a, 0xead54739, 0x9dd277af, 0x04db2615, 0x73dc1683, 0xe3630b12, 0x94643b84, 0x0d6d6a3e, 0x7a6a5aa8, 0xe40ecf0b, 0x9309ff9d, 0x0a00ae27, 0x7d079eb1,
// 		0xf00f9344, 0x8708a3d2, 0x1e01f268, 0x6906c2fe, 0xf762575d, 0x806567cb, 0x196c3671, 0x6e6b06e7, 0xfed41b76, 0x89d32be0, 0x10da7a5a, 0x67dd4acc, 0xf9b9df6f, 0x8ebeeff9, 0x17b7be43, 0x60b08ed5,
// 		0xd6d6a3e8, 0xa1d1937e, 0x38d8c2c4, 0x4fdff252, 0xd1bb67f1, 0xa6bc5767, 0x3fb506dd, 0x48b2364b, 0xd80d2bda, 0xaf0a1b4c, 0x36034af6, 0x41047a60, 0xdf60efc3, 0xa867df55, 0x316e8eef, 0x4669be79,
// 		0xcb61b38c, 0xbc66831a, 0x256fd2a0, 0x5268e236, 0xcc0c7795, 0xbb0b4703, 0x220216b9, 0x5505262f, 0xc5ba3bbe, 0xb2bd0b28, 0x2bb45a92, 0x5cb36a04, 0xc2d7ffa7, 0xb5d0cf31, 0x2cd99e8b, 0x5bdeae1d,
// 		0x9b64c2b0, 0xec63f226, 0x756aa39c, 0x026d930a, 0x9c0906a9, 0xeb0e363f, 0x72076785, 0x05005713, 0x95bf4a82, 0xe2b87a14, 0x7bb12bae, 0x0cb61b38, 0x92d28e9b, 0xe5d5be0d, 0x7cdcefb7, 0x0bdbdf21,
// 		0x86d3d2d4, 0xf1d4e242, 0x68ddb3f8, 0x1fda836e, 0x81be16cd, 0xf6b9265b, 0x6fb077e1, 0x18b74777, 0x88085ae6, 0xff0f6a70, 0x66063bca, 0x11010b5c, 0x8f659eff, 0xf862ae69, 0x616bffd3, 0x166ccf45,
// 		0xa00ae278, 0xd70dd2ee, 0x4e048354, 0x3903b3c2, 0xa7672661, 0xd06016f7, 0x4969474d, 0x3e6e77db, 0xaed16a4a, 0xd9d65adc, 0x40df0b66, 0x37d83bf0, 0xa9bcae53, 0xdebb9ec5, 0x47b2cf7f, 0x30b5ffe9,
// 		0xbdbdf21c, 0xcabac28a, 0x53b39330, 0x24b4a3a6, 0xbad03605, 0xcdd70693, 0x54de5729, 0x23d967bf, 0xb3667a2e, 0xc4614ab8, 0x5d681b02, 0x2a6f2b94, 0xb40bbe37, 0xc30c8ea1, 0x5a05df1b, 0x2d02ef8d
// 	]
// 	let crc: number = 0xffffffff
//
// 	for (let i: number = 0; i < data.length; i++) {
// 		crc = (crc >>> 8) ^ table[(crc ^ data[i]) & 0xff]
// 	}
//
// 	return crc
// }
//
// export function generatePacket(sequenceNumber: number, isRequest: boolean, messageTypeCode: number, businessData: string, instrumentManufacturer: number, fileData: number[]): Buffer {
// 	const header: number = 0xeb90eb90
// 	const version: number = 1
// 	const requestFlag: number = isRequest ? 0x00 : 0x01
// 	let packetTotalLength: number = 0
// 	const compressionFlag: number = 0x00
// 	const encryptionFlag: number = 0x00
// 	const businessDataFormat: number = 0x02
// 	const spareBytes: Buffer = Buffer.alloc(15, 0)
//
// 	// 计算数据包总长度
// 	packetTotalLength = 60 + Buffer.byteLength(businessData) + fileData.length
//
// 	// 创建一个可写的Buffer对象
// 	const buffer: Buffer = Buffer.alloc(packetTotalLength)
//
// 	// 写入报文头
// 	buffer.writeUInt32BE(header, 0)
// 	// 写入版本号
// 	buffer.writeUInt8(version, 4)
// 	// 写入序号
// 	buffer.writeUInt16BE(sequenceNumber, 5)
// 	// 写入请求标志
// 	buffer.writeUInt8(requestFlag, 7)
// 	// 写入数据包总长度
// 	buffer.writeBigUInt64BE(BigInt(packetTotalLength), 8)
// 	// 写入报文类型编码
// 	buffer.writeUInt32BE(messageTypeCode, 16)
// 	// 写入压缩标志
// 	buffer.writeUInt8(compressionFlag, 20)
// 	// 写入加密标志
// 	buffer.writeUInt8(encryptionFlag, 21)
// 	// 写入仪器厂商
// 	buffer.writeUInt8(instrumentManufacturer, 22)
// 	// 写入备用字节
// 	spareBytes.copy(buffer, 23)
// 	// 写入业务数据格式
// 	buffer.writeUInt8(businessDataFormat, 38)
// 	// 写入业务数据长度
// 	buffer.writeBigUInt64BE(BigInt(Buffer.byteLength(businessData)), 39)
// 	// 写入业务数据
// 	buffer.write(businessData, 47, 'utf8')
// 	// 写入检测数据文件长度
// 	buffer.writeBigUInt64BE(BigInt(fileData.length), 47 + Buffer.byteLength(businessData))
// 	// 手动复制文件数据
// 	for (let i: number = 0; i < fileData.length; i++) {
// 		buffer[55 + Buffer.byteLength(businessData) + i] = fileData[i]
// 	}
//
// 	// 计算CRC32值
// 	const crc32Value: number = Math.abs(getCrc32(buffer.slice(0, buffer.length - 5)))
// 	// 写入校验字节
// 	buffer.writeUInt32BE(crc32Value, buffer.length - 5)
// 	// 写入报文尾
// 	buffer.writeUInt8(0x03, buffer.length - 1)
//
// 	return buffer
// }

// export function packMessage(fileData: number[], businessData: string): Buffer {
// 	const sequenceNumber: number = 1
// 	const isRequest: boolean = true
// 	const messageTypeCode: number = 0x80000001
// 	const instrumentManufacturer: number = 0x00
//
// 	return generatePacket(sequenceNumber, isRequest, messageTypeCode, businessData, instrumentManufacturer, fileData)
// }
