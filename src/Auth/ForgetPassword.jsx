import React, { useEffect } from "react";
import signUpImg from "../assets/signup-Img.svg";
import FrameImg from "../assets/Frame-Img.svg";
import sms from "../assets/sms.svg";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordSchema } from "../Utils/ValidationSchema";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  console.log(errors);
  const handleForgotPassword = async (data) => {
    console.log(5555);
    try {
      const request = await fetch("http://localhost:5340/api/v1/auth/forgotpassword",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
      });
      const response = await request.json();
      console.log(response);
      if(!response.success){
        toast.error(response.message)
      };
      if(response.success){
        toast.success(response.data)
      };
    } 
    catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    document.title = "Forget Password || Page";
  });
  return (
    <>
      <main className="container">
        <section className="d-flex justify-content-center row my-5">
          <div className="bg-light px-5 text-center py-5 d-none d-md-block col-md-6">
            <img src={signUpImg} alt="signUp-Img" className="img-fluid w-100" />
          </div>

          {/* section for form */}
          <div className="bg-white p-5 col-md-6 m-auto">
            <div className="text-center ">
              <img src={FrameImg} alt="frame-Img" />
              <h1>Welcome to EM</h1>
              <h6>Enter email address to recover password</h6>
            </div>
            <Form onSubmit={handleSubmit(handleForgotPassword)}>
              <Form.Group
                className="mb-3 position-relative"
                controlId="formBasicEmail"
              >
                <Form.Label></Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  className="shift"
                  {...register("email", { required: true })}
                />
                <p className="text-danger">{errors.email?.message} </p>
                <div className="position-absolute top-0 mt-3 start-0 translate-middle- ">
                  <img src={sms} alt="sms-img" className="ps-2 my-3 " />
                </div>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="w-100 rounded-5"
                disabled={isSubmitting}
              >
                Recover Password
              </Button>
            </Form>
          </div>
        </section>
      </main>
    </>
  );
};

export default ForgetPassword;
