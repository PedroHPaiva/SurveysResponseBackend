import moment from "moment";

export function transformCodeStatusInCodeMessage(statusCode: number): string | null {
  const codes: Record<number, string> = {
    1: "Válido",
    2: "Inválido",
    3: "Incompleto",
    4: "Pendente",
    5: "Aberto",
    6: "Visualizou",
  };

  return codes[statusCode] || null;
}

export function isEndDateBeforeToday(endDate: string | Date): boolean {
  const today = moment().startOf("day");
  const end = moment(endDate).startOf("day");

  return end.isBefore(today, "day");
}

export function getTodayDate(): string {
  return moment().format("YYYY-MM-DD");
}
