import { app } from 'electron'
import { autoUpdater } from 'electron-updater'

const updateURL = 'https://你的更新服务器地址/update/' // 更新服务器URL

autoUpdater.setFeedURL(updateURL)

autoUpdater.on('error', (error) => {
    console.error('检查更新出错:', error)
    // 通知用户更新出错
})

autoUpdater.on('checking-for-update', () => {
    console.log('正在检查更新...')
    // 通知用户正在检查更新
})

autoUpdater.on('update-available', (info) => {
    console.log('发现新版本:', info)
    // 下载更新包
    autoUpdater.downloadUpdate()
})

autoUpdater.on('update-not-available', () => {
    console.log('当前已是最新版本')
    // 通知用户当前已是最新版本
})

autoUpdater.on('download-progress', (progressObj) => {
    console.log(`下载速度: ${progressObj.bytesPerSecond} - 已下载: ${progressObj.percent}%`)
    // 更新下载进度通知
})

autoUpdater.on('update-downloaded', () => {
    // 这里可以弹出对话框让用户选择是否现在重启并安装更新
    // ...  event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate
    // 如果用户选择安装，则调用quitAndInstall()
    //   quitAndUpdate && quitAndUpdate();
})

// 在应用程序启动时检查更新
app.on('ready', () => {
    autoUpdater.checkForUpdates()
    // ... 其他初始化代码
})
