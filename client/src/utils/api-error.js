export function getApiError(error, fallback = 'Something went wrong. Please try again.') {
  return error?.response?.data?.error?.message || error?.message || fallback;
}

export function getFieldErrors(error) {
  const details = error?.response?.data?.error?.details;
  if (!Array.isArray(details)) return {};
  return Object.fromEntries(details.map((detail) => [detail.field, detail.message]));
}
