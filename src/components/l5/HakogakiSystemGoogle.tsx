import { useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { GoogleLoginResponse, GoogleLoginResponseOffline, useGoogleLogin, UseGoogleLoginProps, useGoogleLogout, UseGoogleLogoutProps } from 'react-google-login'

import GoogleSlice, { GoogleModel } from '../../store/GoogleSlice'

import * as C from '../../lib/Const'
import GoogleApiUtil from 'src/lib/GoogleApiUtil'
import GAUtil from '../../lib/GAUtil'

const App = () => {
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch()
    const clientId: string = process.env.NEXT_PUBLIC_GOOGLE_API_CLIENT_ID || '';

    const isGoogleLoginResponse = (response: any): response is GoogleLoginResponse => {
        return response.accessToken !== undefined;
    }

    const onLoginSuccess = (
        response: GoogleLoginResponse | GoogleLoginResponseOffline
    ) => {
        if(!isGoogleLoginResponse(response)) {
            return;
        }

        GoogleApiUtil.setToken(
            response.accessToken,
            response.tokenObj.expires_at,
            response.reloadAuthResponse
        );

        const payload: GoogleModel = {
            email: response.profileObj.email,
            imageUrl: response.profileObj.imageUrl,
        }
        dispatch(GoogleSlice.actions.login(payload));

        const message = 'Googleに '+payload.email+' でログインしました。'
        enqueueSnackbar(message, { variant: C.NotificationType.SUCCESS })
        GAUtil.event(C.GaAction.LOGIN, C.GaCategory.NONE, 'google')
    }

    const onLoginFailure = () => {
        const message = 'Googleへのログインに失敗しました。';
        enqueueSnackbar(message, { variant: C.NotificationType.ERROR })
    }

    const onLogoutSuccess = () => {
        dispatch(GoogleSlice.actions.logout());
        GoogleApiUtil.deleteToken();

        const message = 'Googleからログアウトしました。';
        enqueueSnackbar(message, { variant: C.NotificationType.SUCCESS })
        GAUtil.event(C.GaAction.LOGOUT, C.GaCategory.NONE, 'google')
    }

    const onLogoutFailure = () => {
        const message = 'Googleのログアウトに失敗しました。';
        enqueueSnackbar(message, { variant: C.NotificationType.ERROR })
    }

    const loginProps: UseGoogleLoginProps = {
        clientId: clientId,
        onSuccess: onLoginSuccess,
        onFailure: onLoginFailure,
        cookiePolicy: 'single_host_origin',
        scope: C.GoogleApiScope,
        // fetchBasicProfile: false,
        isSignedIn: true,
    }
    const { signIn, } = useGoogleLogin(loginProps)

    const logoutProps: UseGoogleLogoutProps = {
        clientId: clientId,
        onLogoutSuccess: onLogoutSuccess,
        onFailure: onLogoutFailure,
        cookiePolicy: 'single_host_origin',
    }
    const { signOut, } = useGoogleLogout(logoutProps)
    GoogleApiUtil.init(signIn, signOut);

    return null
}

export default App