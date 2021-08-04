// Currency Formatter for transaction price
export const IDRFormatter = Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export const CurrencyUnformat = (stringNumber, locale = "id-ID") => {
  let thousandSeparator = Intl.NumberFormat(locale)
    .format(11111)
    .replace(/\p{Number}/gu, "");
  let decimalSeparator = Intl.NumberFormat(locale)
    .format(1.1)
    .replace(/\p{Number}/gu, "");

  const value = parseFloat(
    stringNumber
      .replace(/[^\d.-]/g, "")
      .replace(new RegExp("\\" + thousandSeparator, "g"), "")
      .replace(new RegExp("\\" + decimalSeparator), ".")
  );
  return isNaN(value) ? value : 0;
};
