import moment from 'moment'

export default interface DriveListItemModel {
    fileId: string
    title: string
    updatedAt: moment.Moment
}
