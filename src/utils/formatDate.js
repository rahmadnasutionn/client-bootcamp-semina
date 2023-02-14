export default function formatDate(date) {
    const currentDate = new Date(date);
    const dtf = new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    });

    const [{ value: mo }, , { value: da }, , { value: ye }] = dtf.formatToParts(currentDate);

    return `${da} ${mo} ${ye}`;
}