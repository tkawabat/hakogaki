import axios from 'axios'

class GoogleApiUtil {
    accessToken: string = ''
    expiredAt: number = -1
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
        accessToken: string,
        expiredAt: number,
        reload: () => Promise<gapi.auth2.AuthResponse>
    ) {
        this.accessToken = accessToken;
        this.expiredAt = expiredAt;
        this.reload = reload;
    }

    deleteToken() {
        this.accessToken = '';
        this.expiredAt = -1;
    }

    reloadToken() {
        if (!this.accessToken) return;
        if (Date.now() < this.expiredAt) return;

        this.reload()
            .then(res => {
                this.accessToken = res.access_token
                this.expiredAt = res.expires_at
            })
            .catch(res => {
                console.error('google api token refresh error.')
                console.error(res)
            })
    }

    driveList() {
        if (!this.accessToken) return;
        this.reloadToken();

        const request = {
            headers: {
                Authorization: 'Bearer ' + this.accessToken,
                Accept: 'application/json'
            }
        }

        axios.get('https://www.googleapis.com/drive/v3/files', request)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.error('google drive list api error')
                console.error(err)
            })
    }
    
}

export default new GoogleApiUtil()
