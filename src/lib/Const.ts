export enum ScenarioConfigMode {
    SCENARIO = 'シナリオ',
    PLOT = 'プロット',
    SMARTPHONE_SCENARIO_MEMO = 'sp全体メモ',
    SMARTPHONE_SCENARIO = 'spシナリオ',
    SMARTPHONE_MEMO = 'sp段落メモ',

}

export enum NotificationType {
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error',
}

export enum GaAction {
    SAVE = 'save',
    DUMP = 'dump',
    LOGIN = 'login',
    LOGOUT = 'logout',
}

export enum GaCategory {
    NONE = '(not set)',
}

export enum GaLabel {
    NONE = '(not set)',
}

export const TimerSaveProject = 'TimerSaveProject'

export const StorageKeyScenario = 'StorageKeyScenario'
export const StorageKeyAutoSaveCationModal = 'StorageKeyAutoSaveCationModal'

export const IntervalSaveScenario = 2 * 1000
export const DurationNotification = 5 * 1000

export const NoTitleFileName = 'タイトル未定' // ファイル名で使用

export const CurrentScenarioFormatVersion = 1

export const AppNameShort = 'HAKOGAKI(β)'

export const GoogleApiClientId = process.env.NEXT_PUBLIC_GOOGLE_API_CLIENT_ID || ''
export const GoogleApiHost = 'https://www.googleapis.com'
export const GoogleApiScope = ['https://www.googleapis.com/auth/drive.file'].join(' ')
export const GoogleApiDiscoveryDocs = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
export const DriveFolderName = 'HAKOGAKI'

export const HttpRequestBoundary = '-------314159265358979323846'
export const HttpRequestDelimiter = '\r\n--' + HttpRequestBoundary + '\r\n'
export const HttpRequestCloseDelim = '\r\n--' + HttpRequestBoundary + '--'
