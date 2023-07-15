import { useState } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { useFormik } from "formik";

import PreviewImage from "./PreviewImage";

function CustomModal() {
  const validate = (values) => {
    const errors = {};

    if (!values.firstname) {
      errors.firstname = "Required";
    } else if (values.firstname.length > 15) {
      errors.firstname = "Must be 15 characters or less";
    }

    if (!values.lastname) {
      errors.lastname = "Required";
    } else if (values.lastname.length > 20) {
      errors.lastname = "Must be 20 characters or less";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 8) {
      errors.password = "Must be 8 characters or more";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.img) {
      errors.img = "Required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      img: "",
    },
    validate,
    onSubmit: async () => {
      // alert(JSON.stringify(values, null, 2));

      // console.log(formik.values.firstname);
      // console.log(formik.values.lastname);
      // console.log(formik.values.email);
      // console.log(formik.values.password);
      // console.log(formik.values.img);
      const firstName = formik.values.firstname;
      const lastName = formik.values.lastname;
      const email = formik.values.email;
      const password = formik.values.password;
      const img = formik.values.img;

      try {
        const formData = new FormData();
        formData.append("firstname", firstName);
        formData.append("lastname", lastName);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("img", img);

        console.log(...formData);

        // const res = await axios.post("https://httpbin.org/post", formData);
        const res = await axios({
          method: "post",
          url: "https://httpbin.org/post",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
        // console.log("values are: " + values);
        console.log(res);
        handleClose();
      } catch (e) {
        console.log(e);
      }
    },
  });

  const [show, setShow] = useState(false);

  const handleClose = () => {
    formik.resetForm();
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const imgStyle = {
    width: "300px",
    maxHeight: "100px",
    margin: "auto",
    display: "block",
  };

  const divStyle = {
    width: "300px",
    height: "100px",
    textAlign: "center",
    margin: "auto",
    display: "block",
    backgroundColor: "gray",
    color: "white",
    borderRadius: "10px",
    lineHeight: "100px",
  };

  return (
    <>
      <div style={{ lineHeight: "100vh" }}>
        <Button variant="primary" onClick={handleShow}>
          Add a new user
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Enter your info, please!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.firstname}
                placeholder="First name"
                aria-label="firstname"
                name="firstname"
              />
            </InputGroup>
            {formik.errors.firstname ? (
              <div style={{ color: "red" }}>{formik.errors.firstname}</div>
            ) : null}

            <InputGroup className="mb-3">
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.lastname}
                placeholder="Last name"
                aria-label="lastname"
                name="lastname"
              />
            </InputGroup>
            {formik.errors.lastname ? (
              <div style={{ color: "red" }}>{formik.errors.lastname}</div>
            ) : null}

            <InputGroup className="mb-3">
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.email}
                type="email"
                placeholder="Email address"
                aria-label="email"
                name="email"
              />
            </InputGroup>
            {formik.errors.email ? (
              <div style={{ color: "red" }}>{formik.errors.email}</div>
            ) : null}

            <InputGroup className="mb-3">
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.password}
                type="password"
                placeholder="Password"
                aria-label="password"
                name="password"
              />
            </InputGroup>
            {formik.errors.password ? (
              <div style={{ color: "red" }}>{formik.errors.password}</div>
            ) : null}

            {!formik.values.img ? (
              <div style={divStyle}>Preview image</div>
            ) : (
              <PreviewImage style={imgStyle} file={formik.values.img} />
            )}

            <Form.Group className="mb-3">
              <Form.Label>Upload an image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => formik.setFieldValue("img", e.target.files[0])}
                placeholder="Image"
                aria-label="img"
                name="img"
              />
            </Form.Group>
            {formik.errors.img ? (
              <div style={{ color: "red" }}>{formik.errors.img}</div>
            ) : null}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Add user
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default CustomModal;
