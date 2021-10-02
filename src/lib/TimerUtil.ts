

class TimerUtil {
    timer: { [key: string]: number; } = {};
    interval: { [key: string]: number; } = {};

    setTimer(key: string, func: TimerHandler, interval: number) {
        if (typeof this.timer[key] !== 'undefined') {
            alert('システムエラーです。');
            return;
        }
        this.timer[key] = setTimeout(func, interval);
    }

    clearTimer(key: string) {
        if (typeof this.timer[key] == 'undefined') {
            alert('システムエラーです。');
            return;
        }
        clearTimeout(this.timer[key]);
    }

    setInterval(key: string, func: TimerHandler, interval: number) {
        if (typeof this.interval[key] !== 'undefined') {
            alert('システムエラーです。');
            return;
        }
        this.interval[key] = setInterval(func, interval);
    }

    clearInterval(key: string) {
        if (typeof this.interval[key] == 'undefined') {
            alert('システムエラーです。');
            return;
        }
        clearInterval(this.interval[key]);
    }
}

export default new TimerUtil();