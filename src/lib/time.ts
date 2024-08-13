import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const timeAgo = (unixTimestamp: number): string => {
    return dayjs.unix(unixTimestamp).fromNow();
}
