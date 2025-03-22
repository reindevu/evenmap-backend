import { array, number, object } from "yup";

export const schema = object().shape({
  sw: array()
    .of(number().required("Координата обязательна"))
    .length(2, "Должно быть две координаты: [долгота, широта]")
    .required("Координаты обязательны"),
  ne: array()
    .of(number().required("Координата обязательна"))
    .length(2, "Должно быть две координаты: [долгота, широта]")
    .required("Координаты обязательны"),
});
