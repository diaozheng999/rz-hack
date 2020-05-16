import numeral from "numeral";

export function val(n: number) {
  const normalised = Math.round(n / 100);
  return numeral(normalised / 100).format("0,0.00");
}
