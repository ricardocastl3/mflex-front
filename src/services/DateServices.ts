import { langByCookies } from "@/http/axios/api";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import { ptBR } from "date-fns/locale/pt-BR";

class DateServices {
  normalize(date: Date | string | number) {
    return formatDistanceToNow(date, {
      locale: langByCookies == "en" ? enUS : ptBR,
    });
  }
  dateWithBars(dateValue: string) {
    const dateDefault = dateValue.toString().split("T")[0].split("-");

    const year = dateDefault[0];
    const month = dateDefault[1];
    const day = dateDefault[2];

    const dateFormatted = `${day}/${month}/${year}`;

    return dateFormatted;
  }
}

export default new DateServices();
