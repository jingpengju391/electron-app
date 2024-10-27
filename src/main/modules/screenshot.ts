import { desktopCapturer, screen } from 'electron'
import { getWinodws } from '../configWindows'
import { ModelWindowKey } from '@shared/dataModelTypes/windows'

export async function getDesktopCapturer(): Promise<string> {
	const primaryDisplay = screen.getPrimaryDisplay()
	const { scaleFactor } = primaryDisplay
	const { width, height } = primaryDisplay.bounds
	try {
		const res = await desktopCapturer.getSources({
			types: ['screen'],
			thumbnailSize: {
				width: width * scaleFactor,
				height: height * scaleFactor
			}
		})
		return res[0].thumbnail.toDataURL({ scaleFactor })
	} catch (error) {
		console.log(error)
		return ''
	}
}

export async function showScreenshotWindow() {
	// await createWindow(shotWindow())
	const shotWindow = getWinodws(ModelWindowKey.shotWindow)
	shotWindow?.show()
}

export async function closeScreenshotWindow() {
	const shotWindow = getWinodws(ModelWindowKey.shotWindow)
	shotWindow?.hide()
}
