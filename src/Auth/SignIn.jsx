import React, { useEffect, useState } from "react";
import signUpImg from "../assets/signup-Img.svg";
import FrameImg from "../assets/Frame-Img.svg";
import lock from "../assets/lock.svg";
import sms from "../assets/sms.svg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SignInSchema } from "../Utils/ValidationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";


const SignIn = () => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn =async(data)=>{
    console.log(data);

    setIsClicked(true);

    try{
      const request = await fetch("https://em-backend-project-0fu5.onrender.com/api/v1/auth/login",{
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
      })
      const response = await request.json();
      console.log(response);
      if (!response.success){
        toast.error(response.message)
      }
      if (response.success){
        toast.success(response.message)
        localStorage.setItem("clientToken",response.user.token)
        navigate("/Hero")
      }
    } catch (error) {

    } finally {
      setIsClicked(false);
    }
  }

  console.log(errors);

  const btnText = isClicked ? "Loading..." : "Sign In";

  useEffect(() => {
    document.title = "Login | Page";
  });
  return (
    <>
      <main className="container">
        <section className="d-flex justify-content-center row my-5">
          <div className="bg-light px-5 text-center py-5 d-none d-md-block col-md-6">
            <img src={signUpImg} alt="signUp-Img" className="img-fluid" />
          </div>

          {/* FORM SECTION */}
          <div className="bg-white  p-5 col-md-6 m-auto">
            <div className="text-center ">
              <img src={FrameImg} alt="frame-Img" />
              <h1>Welcome back to EM</h1>
              <h6>Sign in to your account</h6>
            </div>
            <Form onSubmit={handleSubmit(handleSignIn)}>
              <Form.Group
                className="mb-3 position-relative"
                controlId="formBasicEmail"
              >
                <Form.Label></Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: true })}
                    className="shift"
                  />

                  <div className="position-absolute top-0 start-0 mt-2">
                    <img src={sms} alt="sms-img" className="ps-2 " />
                  </div>
                  <p className="text-danger">{errors.email?.message} </p>
                </div>
              </Form.Group>

              <Form.Group
                className="mb-3 position-relative"
                controlId="formBasicPassword"
              >
                <Form.Label></Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    {...register("password", { required: true })}
                    className="shift"
                  />
                  <div className="position-absolute top-0 start-0 translate-middle-">
                    <img src={lock} alt="lock-logo" className="ps-2 my-2" />
                  </div>
                  <p className="text-danger">{errors.password?.message} </p>
                </div>
              </Form.Group>
              <div className="d-flex justify-content-between">
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Keep me signed in" />
                </Form.Group>
                <p role="button" className="text-decoration-underline">
                  <Link to={"../ForgetPassword"}>Forgot Password?</Link>{" "}
                </p>
              </div>
              <Button
                variant="primary"
                type="submit"
                className="fs-5 w-100 rounded-5" disabled={isSubmitting}
              >
                {btnText}
              </Button>
            </Form>
            <p>
              Don't have an account yet?{" "}
              <Link to={"../SignUp"}>
                <span role="button" className="text-primary">
                  {" "}
                  sign up{" "}
                </span>
              </Link>{" "}
            </p>
            <p>
              By signing up you accept our Privacy Policy, Terms & Licensing
              Agreement. Protected by reCAPTCHA. Google Privacy Policy & Terms
              apply.
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default SignIn;
