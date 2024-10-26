import { desktopCapturer, screen } from 'electron'

export default async function getDesktopCapturer(): Promise<string>{
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