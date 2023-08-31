import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup.string().required("name is required"),
  password: yup
    .string()
    .min(8, "password must be at least 8 char")
    .required("password is required"),
});

export default validationSchema;
