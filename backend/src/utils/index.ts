import { format } from "date-fns";

export const dateFormatter = (date: Date) => {
  const formattedDate = format(date, "yyyy-MM-dd");
  return new Date(formattedDate);
};
