import * as C from '../lib/Const'
import CommonUtil from 'src/lib/CommonUtil'
import GoogleSlice, { GoogleModel } from 'src/store/GoogleSlice'
import GAUtil from 'src/lib/GAUtil'

class GoogleDriveApiDao {
    initialized: boolean = false;
    auth2: gapi.auth2.GoogleAuth | null = null

    async init(): Promise<void> {
        if (this.initialized) return;
        this.initialized = true;
        
        await gapi.load("client", async () => {
            await gapi.client.init({
                apiKey: process.env.API_KEY,
                clientId: C.GoogleApiClientId,
                scope: "https://www.googleapis.com/auth/drive",
                discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"]
                });
            this.auth2 = gapi.auth2.getAuthInstance();
            if (this.auth2.isSignedIn.get()) {
                this.setUser(this.auth2.currentUser.get())
            }
        });
    }

    setUser(user: gapi.auth2.GoogleUser) {
        const profile = user.getBasicProfile();
        const payload: GoogleModel = {
            email: profile.getEmail(),
            imageUrl: profile.getImageUrl()
        }
        CommonUtil.dispatch(GoogleSlice.actions.login(payload));

        CommonUtil.enqueueSnackbar('Googleでログインしました。', { variant: C.NotificationType.SUCCESS });
        GAUtil.event(C.GaAction.LOGIN, C.GaCategory.NONE, 'google');
    }

    async login() {
        this.auth2?.signIn()
            .then(this.setUser)
            .catch(() => {
                CommonUtil.enqueueSnackbar('Googleでのログインでエラーが発生しました。', { variant: C.NotificationType.ERROR });
            })
        ;
    }

    async logout() {
        this.auth2?.signOut()
            .then(() => {
                CommonUtil.dispatch(GoogleSlice.actions.logout());
                CommonUtil.enqueueSnackbar('Googleからログアウトしました。', { variant: C.NotificationType.SUCCESS });
            })
            .catch(() => {
                CommonUtil.enqueueSnackbar('Googleからのログアウトでエラーが発生しました。', { variant: C.NotificationType.ERROR });
            })
        ;
    }

    async createDirectoryIfNotExists() {

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
