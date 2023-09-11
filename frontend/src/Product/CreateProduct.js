import React, { useEffect, useState } from "react";
import { NavBar } from "../WebMain/NavBar";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import user from "../Photos/user.png";
import Form from "react-bootstrap/Form";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { getProductBiId } from "../Services/Services";
import { getCategories } from "../Services/Services";
import { getCoverTypes } from "../Services/Services";
import { createdProduct } from "../Services/Services";
import Spinner from "react-bootstrap/Spinner";
import Swal from "sweetalert2";

const schema = Yup.object().shape({
  title: Yup.string().required().min(5).max(40),
  description: Yup.string().required(),
  isbc: Yup.number("Must be a number").required(),
  author: Yup.string().required(),
  listPrice: Yup.number().required(),
  price: Yup.number().required(),
  price50: Yup.number().required(),
  price100: Yup.number().required(),
  category: Yup.string().required(),
  coverType: Yup.string().required(),
});

const token = JSON.parse(localStorage.getItem("TOKEN_KEY"));

const CreateProduct = () => {
  const [order, setOrder] = useState(false);
  const [categories, setCategories] = useState("");
  const [covers, setCovers] = useState("");
  const [product, setProduct] = useState("");
  const [imagen, setImagen] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id != null) {
      getProductBiId(window.BaseUrlGeneral + "product/ById/" + id)
        .then((response) => {
          console.log(response.data);
          setProduct(response.data);
          setOrder(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setOrder(true);
    }

    getCategories(window.BaseUrlGeneral + "category")
      .then((response) => {
        //console.log(response.data);
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getCoverTypes(window.BaseUrlGeneral + "coverType")
      .then((response) => {
        //console.log(response.data);
        setCovers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handlePhoto = (e) => {
    setImagen(e.target.files[0]);
  };

  const onSubmit = async (values, actions) => {
    console.log(values);
    // console.log(actions);
    let obj;
    if (id == null) {
      obj = {
        ...values,
      };
    } else {
      obj = {
        ...values,
        id: product.id,
      };
    }

    if (imagen == "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "The field image cannot be empty!",
      });
    } else {
      createdProduct(window.BaseUrlGeneral + "product/upset", obj, imagen)
        .then((response) => {
          if ((response.status = "200")) {
            actions.resetForm();
            return navigate("/welcome/" + token.userName);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <NavBar />
      {!order ? (
        <Spinner
          animation="border"
          variant="primary"
          className="position-absolute top-50 start-50 translate-middle fs-5"
        />
      ) : (
        <div className="container">
          <Formik
            validationSchema={schema}
            onSubmit={onSubmit}
            initialValues={{
              title: product ? product.title : "",
              description: product ? product.description : "",
              isbc: product ? product.isbc : "",
              author: product ? product.author : "",
              listPrice: product ? product.listPrice : "",
              price: product ? product.price : "",
              price50: product ? product.price50 : "",
              price100: product ? product.price100 : "",
              category: product ? product.category : "",
              coverType: product ? product.coverType : "",
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              errors,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input hidden />
                <div className="row">
                  <div className="col-10">
                    <div className="border p-3 mt-4 row">
                      <div className="col-12 pb-2">
                        <h2 className="text-primary">
                          {product ? "Update Product" : "Create Product"}
                        </h2>
                        <hr />
                      </div>
                      <div className="mb-3">
                        <label>Title</label>
                        <input
                          className="form-control"
                          id="title"
                          onChange={handleChange}
                          value={values.title}
                          onBlur={handleBlur}
                        />
                        {errors.title && touched.title && (
                          <span className="text-danger">{errors.title}</span>
                        )}
                      </div>
                      <div className="mb-3">
                        <label>Description</label>
                        <textarea
                          className="form-control"
                          id="description"
                          onChange={handleChange}
                          value={values.description}
                          onBlur={handleBlur}
                          rows="3"
                        ></textarea>
                        {errors.description && touched.description && (
                          <span className="text-danger">
                            {errors.description}
                          </span>
                        )}
                      </div>
                      <div className="mb-3 col-6">
                        <label>ISBC</label>
                        <input
                          className="form-control"
                          id="isbc"
                          onChange={handleChange}
                          value={values.isbc}
                          onBlur={handleBlur}
                        />
                        {errors.isbc && touched.isbc && (
                          <span className="text-danger">{errors.isbc}</span>
                        )}
                      </div>
                      <div className="mb-3 col-6">
                        <label>Author</label>
                        <input
                          className="form-control"
                          id="author"
                          onChange={handleChange}
                          value={values.author}
                          onBlur={handleBlur}
                        />
                        {errors.author && touched.author && (
                          <span className="text-danger">{errors.author}</span>
                        )}
                      </div>
                      <div className="mb-3 col-3">
                        <label>List Price</label>
                        <input
                          className="form-control"
                          id="listPrice"
                          onChange={handleChange}
                          value={values.listPrice}
                          onBlur={handleBlur}
                        />
                        {errors.listPrice && touched.listPrice && (
                          <span className="text-danger">
                            {errors.listPrice}
                          </span>
                        )}
                      </div>
                      <div className="mb-3 col-3">
                        <label>Price</label>
                        <input
                          className="form-control"
                          id="price"
                          onChange={handleChange}
                          value={values.price}
                          onBlur={handleBlur}
                        />
                        {errors.price && touched.price && (
                          <span className="text-danger">{errors.price}</span>
                        )}
                      </div>
                      <div className="mb-3 col-3 col-3">
                        <label>Price50</label>
                        <input
                          className="form-control"
                          id="price50"
                          onChange={handleChange}
                          value={values.price50}
                          onBlur={handleBlur}
                        />
                        {errors.price50 && touched.price50 && (
                          <span className="text-danger">{errors.price50}</span>
                        )}
                      </div>
                      <div className="mb-3 col-3">
                        <label>Price100</label>
                        <input
                          className="form-control"
                          id="price100"
                          onChange={handleChange}
                          value={values.price100}
                          onBlur={handleBlur}
                        />
                        {errors.price100 && touched.price100 && (
                          <span className="text-danger">{errors.price100}</span>
                        )}
                      </div>
                      <div className="mb-3 col-4">
                        <label>ImageUrl</label>
                        <input
                          type="file"
                          id="imageBox"
                          name="file"
                          className="form-control"
                          onChange={handlePhoto}
                          value={values.imageUrl}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className="mb-3 col-4">
                        <label>Category</label>
                        <Form.Select
                          aria-label="Default select example"
                          id="category"
                          onChange={handleChange}
                          value={values.category}
                          onBlur={handleBlur}
                        >
                          <option value="" hidden>
                            --Select Category--
                          </option>
                          {Object.keys(categories).map((item) => (
                            <option
                              key={categories[item].id}
                              className="text-dark"
                              value={categories[item].id}
                            >
                              {categories[item].name}
                            </option>
                          ))}
                        </Form.Select>
                        {errors.category && touched.category && (
                          <span className="text-danger">{errors.category}</span>
                        )}
                      </div>
                      <div className="mb-3 col-4">
                        <label>Cover Type</label>
                        <Form.Select
                          aria-label="Default select example"
                          id="coverType"
                          onChange={handleChange}
                          value={values.coverType}
                          onBlur={handleBlur}
                        >
                          <option value="" hidden>
                            --Select Cover--
                          </option>
                          {Object.keys(covers).map((item) => (
                            <option
                              value={covers[item].id}
                              key={covers[item].id}
                              className="text-dark"
                            >
                              {covers[item].name}
                            </option>
                          ))}
                        </Form.Select>
                        {errors.coverType && touched.coverType && (
                          <span className="text-danger">
                            {errors.coverType}
                          </span>
                        )}
                      </div>
                      <div className="col-12">
                        {product && (
                          <Button
                            type="submit"
                            className="btn btn-primary me-3"
                          >
                            Update
                          </Button>
                        )}
                        {!product && (
                          <Button
                            type="submit"
                            className="btn btn-primary me-3"
                            disabled={isSubmitting}
                          >
                            Created
                          </Button>
                        )}
                        <a
                          className="btn btn-secondary"
                          style={{ width: "150px" }}
                          href={"/welcome"}
                        >
                          Back to list
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-2 pt-4">
                    <img
                      width="100%"
                      style={{
                        border: "1px solid #bbb9b9",
                        borderRadius: "5px",
                      }}
                      src={
                        product
                          ? "https://localhost:44358/" + product.imageURL
                          : user
                      }
                    />
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};

export default CreateProduct;
