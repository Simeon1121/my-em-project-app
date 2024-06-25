import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import commentImg from "../assets/comment-Img.png"
import { Form, Link } from "react-router-dom";
import { comments } from "../../Db";
import "../Styles/Comment.css";
// import toast from "react-hook-form"

const CommentModal = ({postId}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const [comments,setComments] = useState([])
  const [comment, setComment] = useState("");


  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("clientToken");

    try {
      const response = await fetch(`http://localhost:5340/api/v1/posts/comment-post/${postId}`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`,
        },
        body:JSON.stringify({text: comment}),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        toast.success(data.message);

        // onCommentAdded(postId)
      } else {
        toast.error(data.message);
      }
    } catch (error) {

    }
  };

  const fetchComments = async()=>{
    try {
      const response = await fetch(`http://localhost:5340/api/v1/posts/comments/${postId}`);
      const data = await response.json();
      console.log(data);
      if(response.ok){
        setComments(data.comments);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      
    }
  };
  useEffect(()=>{
    fetchComments();
  },[]);
  return (
    <>
      <div>
        <img src={commentImg} alt="" onClick={handleShow} className="icon" role="button" />
      </div>

      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <Form className="w-100" onSubmit={handleCommentSubmit}>
            <textarea
              name=""
              id=""
              cols="50"
              rows="10"
              placeholder="Type here..."
              value={comment}
              onChange={handleCommentChange}
              className="rounded-4 textedit border-secondary w-100 bg-light"
            ></textarea>
            <div className="d-flex justify-content-end mt-2">
              <Button
                varient="primary"
                className="btn button1 postbtn btnLength text-white  rounded-5"
                type="submit"
                onClick={handleClose}
              >
                Post
              </Button>
            </div>
            <div>
              <h5 className="fw-bold mt-3">Previous comments</h5>
              <div>
                {comments.map((comment) => {
                  const { id, title, profile, time, statusbar, description } =
                    comment;
                  return (
                    <div key={id} className="border rounded my-2 p-2">
                      <div className="d-flex justify-content-between  align-items-center">
                        <div className="d-flex gap-2">
                          <img
                            src={profile}
                            alt="profile-img"
                            className="rounded-pil1 commentImg img-fluid"
                          />
                          <div>
                            <h2 className="title">{title}</h2>
                            <h6>{time}</h6>
                          </div>
                        </div>
                        <button className="btn btn-white border rounded-5 button1 ">
                          {statusbar}
                        </button>
                      </div>

                      <p className="mt-2 ">{description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CommentModal;
