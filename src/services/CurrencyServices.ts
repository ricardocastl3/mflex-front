export type CurrencyCode =
  | "USD"
  | "BRL"
  | "EUR"
  | "RUB"
  | "JPY"
  | "CNY"
  | "SAR"
  | "KRW"
  | "GBP"
  | "DKK"
  | "SEK"
  | "NOK"
  | "PLN"
  | "CZK"
  | "TRY"
  | "MXN"
  | "INR"
  | "ZAR"
  | "NZD"
  | "SGD"
  | "THB"
  | "MYR"
  | "IDR"
  | "VND"
  | "PHP"
  | "ILS"
  | "AED"
  | "BDT"
  | "UAH"
  | "HUF"
  | "BGN"
  | "RON"
  | "HRK"
  | "AUD"
  | "CAD"
  | "AOA";

class CurrencyServices {
  private locale = typeof window != "undefined" ? navigator.language : "USD";

  private getCurrencyFromLocale = (): CurrencyCode => {
    const localeToCurrency: Record<string, CurrencyCode> = {
      "en-US": "USD", // Estados Unidos
      "pt-BR": "BRL", // Brasil
      "es-ES": "EUR", // Espanha
      "fr-FR": "EUR", // França
      "de-DE": "EUR", // Alemanha
      "it-IT": "EUR", // Itália
      "ru-RU": "RUB", // Rússia
      "ja-JP": "JPY", // Japão
      "zh-CN": "CNY", // China
      "ar-SA": "SAR", // Arábia Saudita
      "ko-KR": "KRW", // Coreia do Sul
      "en-GB": "GBP", // Reino Unido
      "da-DK": "DKK", // Dinamarca
      "sv-SE": "SEK", // Suécia
      "no-NO": "NOK", // Noruega
      "pl-PL": "PLN", // Polônia
      "cs-CZ": "CZK", // República Tcheca
      "tr-TR": "TRY", // Turquia
      "nl-NL": "EUR", // Países Baixos
      "el-GR": "EUR", // Grécia
      "en-AU": "AUD", // Austrália
      "en-CA": "CAD", // Canadá
      "es-MX": "MXN", // México
      "pt-PT": "EUR", // Portugal
      "en-IN": "INR", // Índia
      "en-ZA": "ZAR", // África do Sul
      "en-NZ": "NZD", // Nova Zelândia
      "en-SG": "SGD", // Singapura
      "th-TH": "THB", // Tailândia
      "ms-MY": "MYR", // Malásia
      "id-ID": "IDR", // Indonésia
      "vi-VN": "VND", // Vietnã
      "fil-PH": "PHP", // Filipinas
      "he-IL": "ILS", // Israel
      "ar-AE": "AED", // Emirados Árabes Unidos
      "hi-IN": "INR", // Índia (Hindi)
      "bn-BD": "BDT", // Bangladesh
      "uk-UA": "UAH", // Ucrânia
      "hu-HU": "HUF", // Hungria
      "fi-FI": "EUR", // Finlândia
      "bg-BG": "BGN", // Bulgária
      "lt-LT": "EUR", // Lituânia
      "lv-LV": "EUR", // Letônia
      "et-EE": "EUR", // Estônia
      "mt-MT": "EUR", // Malta
      "sk-SK": "EUR", // Eslováquia
      "ro-RO": "RON", // Romênia
      "sl-SI": "EUR", // Eslovênia
      "hr-HR": "HRK", // Croácia
      // Adicione mais conforme necessário
    };

    return localeToCurrency[this.locale] || "USD";
  };

  private currency = this.getCurrencyFromLocale();

  formatWithCurrencyValue(value: number, currency: string) {
    return new Intl.NumberFormat(this.locale, {
      style: "currency",
      currency: currency,
      currencyDisplay: "narrowSymbol",
    }).format(value);
  }

  formatCurrency = (value: number) => {
    return new Intl.NumberFormat(this.locale, {
      style: "currency",
      currency: "USD",
      currencyDisplay: "narrowSymbol",
    }).format(value);
  };

  decimal(value: number) {
    return new Intl.NumberFormat(this.locale, {
      style: "decimal",
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(value);
  }
}

export default new CurrencyServices();
