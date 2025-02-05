export default function formatPrice(price: number) {
  return Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "EGP",
    currencyDisplay: "symbol",
    minimumFractionDigits: 0,
  }).format(price);
}
