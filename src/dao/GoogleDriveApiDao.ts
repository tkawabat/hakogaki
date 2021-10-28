import * as C from '../lib/Const'
import CommonUtil from 'src/lib/CommonUtil'

class GoogleDriveApiDao {
    expiredAt: number | null = null
    reload!: () => Promise<gapi.auth2.AuthResponse>
    login!: () => void
    logout!: () => void
    
    init(
        signIn: () => void,
        signOut: () => void,
    ): void {
        this.login = signIn
        this.logout = signOut
    }

    setToken(
        expiredAt: number,
        reload: () => Promise<gapi.auth2.AuthResponse>
    ) {
        this.expiredAt = expiredAt;
        this.reload = reload;

        gapi.load('client', () => {
            gapi.client.load('drive', 'v3')
        })
    }

    deleteToken() {
        this.expiredAt = null;
    }

    reloadToken() {
        if (!this.expiredAt || Date.now() < this.expiredAt) return;

        this.reload().then(res => {
            this.setToken(res.expires_at, this.reload)
        }).catch(res => {
            console.error('google api token refresh error.')
            console.error(res)
        })
    }

    async createDirctoryIfNotExists() {
        if (!this.expiredAt) return;
        this.reloadToken();

        const query = 'mimeType = "application/vnd.google-apps.folder"'
            + ' and name = "'+C.DriveFolderName+'"'
            + ' and trashed = false'

        let id = await gapi.client.drive.files.list({
            q: query,
            fields: 'files(id)',
        }).then((res) => {
            if (res.result.files?.length == 0) return ''
            return res.result.files?.[0].id!
        }).catch((err) => {
            console.error(err)
            const message = 'Google Driveファイル取得エラー'
            CommonUtil.enqueueSnackbar(message, { variant: C.NotificationType.ERROR})
        })

        if (!id) { // フォルダがない
            id = await gapi.client.drive.files.create({
                resource: {
                    mimeType: 'application/vnd.google-apps.folder',
                    name: 'HAKOGAKI',
                }
            }).then((res) => {
                const message = 'Google DriveにHAKOGAKIフォルダを作成しました。'
                CommonUtil.enqueueSnackbar(message, { variant: C.NotificationType.SUCCESS})
                return res.result.id!
            }).catch((err) => {
                console.error(err)
                const message = 'Google Driveフォルダ作成エラー'
                CommonUtil.enqueueSnackbar(message, { variant: C.NotificationType.ERROR})
            })
        }

        return id
    }

    getFile(fileId:string) {
        if (!this.expiredAt) return;
        this.reloadToken();

        if (!fileId) {
            const message = 'Google Driveファイル情報がありません。'
            CommonUtil.enqueueSnackbar(message, { variant: C.NotificationType.ERROR})
            return;
        }

        return gapi.client.drive.files.get({
            fileId: fileId,
            alt: 'media'
        }).then((res) => {
            return res.body
        }).catch((err) => {
            console.error(err)
            const message = 'Google Driveファイル取得エラー'
            CommonUtil.enqueueSnackbar(message, { variant: C.NotificationType.ERROR})
        })
    }

    async createFile(fileName: string) {
        if (!this.expiredAt) return;
        this.reloadToken();

        const folderId = await this.createDirctoryIfNotExists()
        if (!folderId) return // Error

        return gapi.client.drive.files.create({
            resource: { name: fileName, parents: [folderId!] },
        }).then((res) => {
            const message = 'Google Driveにファイルを作成しました。'
            CommonUtil.enqueueSnackbar(message, { variant: C.NotificationType.SUCCESS})
            return res.result.id
        }).catch((err) => {
            console.error(err)
            const message = 'Google Driveファイル作成エラー'
            CommonUtil.enqueueSnackbar(message, { variant: C.NotificationType.ERROR})
        })
    }
    
    patchFile(fileId:string, text:string) {
        if (!this.expiredAt) return;
        this.reloadToken();

        const params = {
            fileId: fileId,
            uploadType: 'multipart',
        }

        const metaData = {
            mimeType: 'text/plain',
        }

        const multipartRequestBody =
            C.HttpRequestDelimiter +
            'Content-Type: application/json\r\n\r\n' +
            JSON.stringify(metaData) +
            C.HttpRequestDelimiter +
            'Content-Type: application/json\r\n\r\n' +
            text +
            C.HttpRequestCloseDelim

        return gapi.client.request({
            path: '/upload/drive/v3/files/' + fileId,
            method: 'PATCH',
            params: params,
            headers: {
                'Content-Type': 'multipart/form-data; boundary="'
                    + C.HttpRequestBoundary + '"',
                Authorization: 'Bearer ' + gapi.auth.getToken().access_token
            },
            body: multipartRequestBody
        }).then((res) => {
            const message = 'Google Driveにファイルを保存しました。'
            CommonUtil.enqueueSnackbar(message, { variant: C.NotificationType.SUCCESS})
        }).catch((err) => {
            console.error(err)
            const message = 'Google Driveファイル更新エラー'
            CommonUtil.enqueueSnackbar(message, { variant: C.NotificationType.ERROR})
            throw new Error()
        })
    }

    getList() {
        if (!this.expiredAt) return;
        this.reloadToken();

        return gapi.client.drive.files.list({
            q: 'fileExtension = "json"',
            orderBy: 'modifiedTime desc',
            fields: 'files(id, name, modifiedTime)',
        }).then((res) => {
            return res.result.files
        }).catch((err) => {
            console.error(err)
            const message = 'Google Driveファイル取得エラー'
            CommonUtil.enqueueSnackbar(message, { variant: C.NotificationType.ERROR})
        })
    }
    
}

export default new GoogleDriveApiDao()
