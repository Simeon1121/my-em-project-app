import React, { useEffect, useState } from "react";
import signUpImg from "../assets/signup-Img.svg";
import FrameImg from "../assets/Frame-Img.svg";
import Form from "react-bootstrap/Form";
import sms from "../assets/sms.svg";
import userImg from "../assets/user-Img.svg";
import lock from "../assets/lock.svg";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/SignUp.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { regFormSchema } from "../Utils/ValidationSchema";
import toast from "react-hot-toast";

const SignUp = () => {
  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(regFormSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  console.log(errors);

  const onSubmit = async (data) => {
    console.log(data);
    setIsClicked(true);
    try {
      setSuccessMsg("");
      setServerError("");
      const req = await fetch("https://em-backend-project-0fu5.onrender.com/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await req.json();
      console.log(res);
      if (!res.success) {
        const errorData = await res;
        setServerError(errorData.message);
        setIsClicked(true);
      }
      if (res.success) {
        setSuccessMsg(res.message);
        toast.success(res.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsClicked(false);
    }
  };

  const btnText = isClicked ? "Loading..." : "Sign Up";

  useEffect(() => {
    document.title = "Sign Up | Page";
  });

  return (
    <>
      <main className="container">
        <section className="d-flex justify-content-center row my-5">
          <div className="bg-light px-5 text-center py-5 d-none d-md-block col-md-6">
            <img src={signUpImg} alt="signUp-Img" className="img-fluid w-100" />
          </div>

          {/* SECTION FOR FORM */}
          <div className="bg-white p-5 col-md-6 m-auto">
            <div className="text-center ">
              <img src={FrameImg} alt="frame-Img" />
              <h1>Welcome to EM</h1>
              <h6>Sign up for free</h6>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
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
                controlId="formBasicUsername"
              >
                <Form.Label></Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type="Username"
                    placeholder="Username"
                    {...register("userName", { required: true })}
                    className="shift"
                  />
                  <div className="position-absolute top-0 start-0 translate-middle-">
                    <img src={userImg} alt="user-Img" className="ps-2" />
                  </div>
                  <p className="text-danger">{errors.userName?.message} </p>
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

              <Form.Group
                className="mb-3 position-relative"
                controlId="formBasicConfirmPassword"
              >
                <Form.Label></Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    className="shift"
                    {...register("confirmPassword", { required: true })}
                  />
                  <div className="position-absolute top-0 start-0 translate-middle-">
                    <img src={lock} alt="lock-logo" className="ps-2 my-2" />
                  </div>
                  <p className="text-danger">
                    {errors.confirmPassword?.message}{" "}
                  </p>
                </div>

                {serverError && <p className="text-danger"> {serverError} </p>}
                {successMsg && <p className="text-success"> {successMsg} </p>}
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="fs-5 w-100 rounded-5"
                disabled={isSubmitting}
              >
                {btnText}
              </Button>
            </Form>

            <p>
              Already have an account{" "}
              <Link to={"/"}>
                <span role="button" className="text-primary">
                  {" "}
                  sign in{" "}
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

export default SignUp;
