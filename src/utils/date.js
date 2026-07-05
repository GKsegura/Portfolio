const formatPeriod = (period, status) => {
    if (!period?.start) return null;

    if (status === 'Concluído' && period.end) {
        return `Período: ${period.start} - ${period.end}`;
    }

    return `Em andamento desde ${period.start}`;
};

const MESES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

const formatMonthYear = (value) => {
    if (!value) return null;

    const [year, month] = value.split('-');
    return `${MESES[Number(month) - 1]} ${year}`;
};

const formatMonthRange = (inicio, fim) => {
    const inicioLabel = formatMonthYear(inicio);
    if (!inicioLabel) return '';

    return `${inicioLabel} - ${fim ? formatMonthYear(fim) : 'Atual'}`;
};

export { formatMonthRange, formatPeriod };
