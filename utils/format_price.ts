export const formatRupiah = (amount: string) => {
  const numericAmount = amount.replace(/[^0-9]/g, '')
  const number = parseFloat(numericAmount)
  if (isNaN(number)) return 'Rp 0'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number)
}
