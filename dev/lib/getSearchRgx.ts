export function getSearchRgx(search: string) {
  const esc = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(esc, "i");
  return regex;
}
