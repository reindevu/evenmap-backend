import { array, date, number, object, ref, string } from "yup";

export const schema = object().shape({
  name: string().required("Название обязательно"),
  typeMnemocode: string().required("Тип обязателен"),
  description: string().required("Описание обязательно"),

  dateFrom: string()
    .default("")
    .required("Дата начала обязательна")
    .typeError("Неверный формат даты"),

  dateTo: string()
    .default("")
    .required("Дата окончания обязательна")
    .typeError("Неверный формат даты"),

  lngLat: array()
    .of(number().required("Координата обязательна"))
    .length(2, "Должно быть две координаты: [долгота, широта]")
    .required("Координаты обязательны"),
});
