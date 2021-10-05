import * as C from './Const'

declare global {
    interface Window {
        gtagPageview: any
        gtagEvent: any
    }
}

class GAUtil {
    pageview(path: string) {
        if (typeof window == 'undefined') return
        if (typeof window.gtagPageview == 'undefined') return
        window.gtagPageview(path)
    }

    event(
        action: C.GaAction,
        category: C.GaCategory,
        label: string,
        value: string = ''
    ) {
        if (typeof window == 'undefined') return
        if (typeof window.gtagEvent == 'undefined') return
        window.gtagEvent(action, category, label, value)
    }
}

export default new GAUtil()
