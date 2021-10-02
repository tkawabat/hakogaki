

declare global {
    interface Window { gtagPageview: any; }
}

class GAUtil {
    pageview(pagename: string) {
        if (process.env.NODE_ENV !== 'production') {
            return null;
        }

        if (window.gtagPageview) {
            window.gtagPageview(pagename);
        }
    }
}

export default new GAUtil();