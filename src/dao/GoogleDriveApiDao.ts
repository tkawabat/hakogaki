import * as C from '../lib/Const'
import CommonUtil from 'src/lib/CommonUtil'
import { signIn, signOut } from "next-auth/react";

class GoogleDriveApiDao {
    initialized: boolean = false;
    accessToken: string = '';

    async init(): Promise<void> {
        if (this.initialized) return;
        this.initialized = true;
        
        gapi.load('client', async () => {
            gapi.client.init({
                clientId: C.GoogleApiClientId,
                scope: 'https://www.googleapis.com/auth/drive',
                discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
                }).then(() => {
                    if (this.accessToken) gapi.client.setToken({access_token: this.accessToken});
                });
        });
    }

    setToken(token: string) {
        this.accessToken = token;
        if (gapi) gapi.client.setToken({access_token: token});
    }

    async login() {
        signIn('google')
    }

    async logout() {
        signOut().then(() => {
            this.setToken('')
            CommonUtil.enqueueSnackbar('Googleからログアウトしました。', { variant: C.NotificationType.SUCCESS });
        });
    }

    async createDirectoryIfNotExists() {
        gapi.client.setToken({access_token: this.accessToken});

        const query =
            'mimeType = "application/vnd.google-apps.folder"' +
            ' and name = "' +
            C.DriveFolderName +
            '"' +
            ' and trashed = false'
            ;

        let id = await gapi.client.drive.files
            .list({
                q: query,
                fields: 'files(id)',
            })
            .then((res) => {
                if (res.result.files?.length == 0) return ''
                return res.result.files?.[0].id
            })
            .catch((err) => {
                console.error(err)
                const message = 'Google Driveファイル取得エラー'
                CommonUtil.enqueueSnackbar(message, {
                    variant: C.NotificationType.ERROR,
                })
            })

        if (!id) {
            // フォルダがない
            id = await gapi.client.drive.files
                .create({
                    resource: {
                        mimeType: 'application/vnd.google-apps.folder',
                        name: 'HAKOGAKI',
                    },
                })
                .then((res) => {
                    const message = 'Google DriveにHAKOGAKIフォルダを作成しました。'
                    CommonUtil.enqueueSnackbar(message, {
                        variant: C.NotificationType.SUCCESS,
                    })
                    return res.result.id!
                })
                .catch((err) => {
                    console.error(err)
                    const message = 'Google Driveフォルダ作成エラー'
                    CommonUtil.enqueueSnackbar(message, {
                        variant: C.NotificationType.ERROR,
                    })
                })
        }

        return id
    }

    getFile(fileId: string) {
        gapi.client.setToken({access_token: this.accessToken});

        if (!fileId) {
            const message = 'Google Driveファイル情報がありません。'
            CommonUtil.enqueueSnackbar(message, {
                variant: C.NotificationType.ERROR,
            })
            return
        }

        return gapi.client.drive.files
            .get({
                fileId: fileId,
                alt: 'media',
            })
            .then((res) => {
                return res.body
            })
            .catch((err) => {
                console.error(err)
                const message = 'Google Driveファイル取得エラー'
                CommonUtil.enqueueSnackbar(message, {
                    variant: C.NotificationType.ERROR,
                })
            })
    }

    async createFile(fileName: string) {
        gapi.client.setToken({access_token: this.accessToken});

        const folderId = await this.createDirectoryIfNotExists()
        if (!folderId) return // Error

        return gapi.client.drive.files
            .create({
                resource: { name: fileName, parents: [folderId!] },
            })
            .then((res) => {
                const message = 'Google Driveにファイルを作成しました。'
                CommonUtil.enqueueSnackbar(message, {
                    variant: C.NotificationType.SUCCESS,
                })
                return res.result.id
            })
            .catch((err) => {
                console.error(err)
                const message = 'Google Driveファイル作成エラー'
                CommonUtil.enqueueSnackbar(message, {
                    variant: C.NotificationType.ERROR,
                })
            })
    }

    patchFile(fileId: string, text: string) {
        gapi.client.setToken({access_token: this.accessToken});

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

        return gapi.client
            .request({
                path: '/upload/drive/v3/files/' + fileId,
                method: 'PATCH',
                params: params,
                headers: {
                    'Content-Type': 'multipart/form-data; boundary="' + C.HttpRequestBoundary + '"',
                    Authorization: 'Bearer ' + gapi.auth.getToken().access_token,
                },
                body: multipartRequestBody,
            })
            .then((res) => {
                const message = 'Google Driveにファイルを保存しました。'
                CommonUtil.enqueueSnackbar(message, {
                    variant: C.NotificationType.SUCCESS,
                })
            })
            .catch((err) => {
                console.error(err)
                const message = 'Google Driveファイル更新エラー'
                CommonUtil.enqueueSnackbar(message, {
                    variant: C.NotificationType.ERROR,
                })
                throw new Error()
            })
    }

    async getList() {
        gapi.client.setToken({access_token: this.accessToken});

        return gapi.client.drive.files
            .list({
                q: 'fileExtension = "json"',
                orderBy: 'modifiedTime desc',
                fields: 'files(id, name, modifiedTime)',
            })
            .then((res) => {
                return res.result.files
            })
            .catch((err) => {
                console.error(err)
                const message = 'Google Driveファイル取得エラー'
                CommonUtil.enqueueSnackbar(message, {
                    variant: C.NotificationType.ERROR,
                })
            })
    }
}

export default new GoogleDriveApiDao()
