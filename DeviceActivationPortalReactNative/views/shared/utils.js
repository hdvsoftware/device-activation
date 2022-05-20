import moment from 'moment';


export function formatDateString(dateString) {
    if(dateString) {
        return moment(dateString).format('DD-MM-yyyy HH:mm');
    }
    return '-';
}