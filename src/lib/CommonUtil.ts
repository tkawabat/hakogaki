import { Dispatch } from 'react'
import { SnackbarMessage, OptionsObject, SnackbarKey } from 'notistack'

type EnqueueSnackbar = (
    message: SnackbarMessage,
    options?: OptionsObject | undefined
) => SnackbarKey

class CommonUtil {
    dispatch!: Dispatch<any>
    enqueueSnackbar!: EnqueueSnackbar

    init(dispatch: Dispatch<any>, enqueueSnackbar: EnqueueSnackbar) {
        this.dispatch = dispatch
        this.enqueueSnackbar = enqueueSnackbar
    }
}

export default new CommonUtil()
