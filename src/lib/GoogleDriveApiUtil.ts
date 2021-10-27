import * as fs from 'fs'
import ScenarioModel from 'src/store/model/ScenarioModel'
import * as C from './Const'

class GoogleDriveApiUtil {
    expiredAt: number | null = null
    reload!: () => Promise<gapi.auth2.AuthResponse>
    login!: () => void
    logout!: () => void
    
    init(
        signIn: () => void,
        signOut: () => void,
    ): void {
        this.login = signIn;
        this.logout = signOut;
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

        this.reload()
            .then(res => {
                this.setToken(res.expires_at, this.reload)
            })
            .catch(res => {
                console.error('google api token refresh error.')
                console.error(res)
            })
    }

    getFile() {
        if (!this.expiredAt) return;
        this.reloadToken();

        const id = '1SeUiInw48Hd1Pq7zaIBe32qzIIosNV1f'

        gapi.client.drive.files.get({
            fileId: id,
            alt: 'media'
        }).then((res) => {
            console.log(res)
            const scenario: ScenarioModel = JSON.parse(res.body)
            console.log(scenario)
        })
        .catch((err) => console.error(err))
    }

    createFile(fileName: string) {
        if (!this.expiredAt) return;
        this.reloadToken();

        const metaData = {
            'name': fileName,
        }

        gapi.client.drive.files.create({
            resource: metaData,
        }).then((res) => console.log(res))
        .catch((err) => console.error(err))
    }
    
    patchFile(fileId:string, text:string) {
        if (!this.expiredAt) return;
        this.reloadToken();

        const metaData = {
            mimeType: 'text/plain'
        };

        const multipartRequestBody =
            C.HttpRequestDelimiter +
            'Content-Type: application/json\r\n\r\n' +
            JSON.stringify(metaData) +
            C.HttpRequestDelimiter +
            'Content-Type: application/json\r\n\r\n' +
            text +
            C.HttpRequestCloseDelim;

        gapi.client
            .request({
                path: '/upload/drive/v3/files/' + fileId,
                method: 'PATCH',
                params: { fileId: fileId, uploadType: 'multipart' },
                headers: {
                    'Content-Type': 'multipart/form-data; boundary="'
                        + C.HttpRequestBoundary + '"',
                    Authorization: 'Bearer ' + gapi.auth.getToken().access_token
                },
                body: multipartRequestBody
            })
            .execute((file) => {
                console.log(file);
            });
    }

    getList() {
        if (!this.expiredAt) return;
        this.reloadToken();

        gapi.client.drive.files.list().then((res) => console.log(res))
    }
    
}

export default new GoogleDriveApiUtil()
