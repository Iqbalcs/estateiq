export const formatCurrency = (value, compact = false) =>
  new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    currencyDisplay: 'code',
    maximumFractionDigits: 0,
    ...(compact && { notation: 'compact', maximumFractionDigits: 1 }),
  }).format(Number(value || 0));

export const formatNumber = (value) => new Intl.NumberFormat('en-PK').format(Number(value || 0));

export const formatDate = (value, options = {}) => {
  if (!value) return '—';
  return new Intl.DateTimeFormat('en-PK', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Karachi',
    ...options,
  }).format(new Date(value));
};

export const toDateInput = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getCurrentYearRange = () => ({
  dateFrom: `${new Date().getFullYear()}-01-01`,
  dateTo: toDateInput(new Date()),
});
