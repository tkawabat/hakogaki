

class StorageUtil {
    valid: boolean = false;

    constructor() {
        if (typeof window == 'undefined') return;
        if (typeof window.localStorage == 'undefined') return;
        this.valid = true;
    }

    save(key: string, value: string) {
        if (this.valid) {
            localStorage.setItem(key, value);
        }
    }

    load(key: string) {
        if (this.valid) {
            return localStorage.getItem(key);
        }
    }

    remove(key: string) {
        if (this.valid) {
            return localStorage.removeItem(key);
        }
    }

}

export default new StorageUtil();