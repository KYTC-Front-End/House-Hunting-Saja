import * as yup from "yup";

const validationAdd = yup.object().shape({
  title: yup.string().min(8, "Title must be at least 8 char.").required(),
  description: yup
    .string()
    .min(50, "Description must be at least 50 char.")
    .required(),
  city: yup.string().required(),
  bedroom: yup.number().required().positive().integer().min(1),
  bathroom: yup.number().required().positive().integer().min(1),
  category: yup.string().required(),
  price: yup.number().required(),
  image: yup.string().required(),
});

export default validationAdd;
