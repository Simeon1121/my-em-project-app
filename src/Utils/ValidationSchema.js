import * as yup from "yup"


// sign up validation
export const regFormSchema = yup
.object({
    email: yup.string().required("Email is required").email("invalid email format"),
  userName: yup.string().required("Username is required"),
  password: yup.string().required("Password is required").min(8, "minimum lenght of password should be at least 8 characters"),

  confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .min(8, "min lenght of password should be at least 8 characters")
      .oneOf([yup.ref("password")], "password do not match"),

})
.required()

// Sign in validation


export const SignInSchema = yup
.object({
    email: yup.string().required("Email is required").email("invalid email format"),
  password: yup.string().required("Password is required").min(8, "minimum lenght of password should be at least 8 characters"),

})
.required()

// forgot password validation


export const forgotPasswordSchema = yup
.object({
    email: yup.string().required("Email is required").email("invalid email format"),

})
.required()

// reset password validation
export const ResetPasswordSchema = yup
.object({
  password: yup.string().required("Password is required").min(8, "minimum lenght of password should be at least 8 characters"),

  confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .min(8, "min lenght of password should be at least 8 characters")
      .oneOf([yup.ref("password")], "password do not match"),

})
.required()


export const PostSchema = yup
.object({
    text: yup.string().required("Text is required")

})
.required()