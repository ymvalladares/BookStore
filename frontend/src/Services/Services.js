import axios from "axios";

axios.interceptors.request.use(function (config) {
  const token = JSON.parse(localStorage.getItem("TOKEN_KEY"));
  if (token) {
    config.headers.Authorization = `bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    if (error.message === "Network Error") {
      console.log("Server is not running");
    }

    const { data, status, config, headers } = error.response;
    switch (status) {
      case 400:
        console.log("Bad Request");
        break;

      case 401:
        console.log("Unauthorized");
        console.log(data);
        break;

      case 403:
        console.log("Unauthorized  por permisos");
        localStorage.removeItem("TOKEN_KEY");
        return (window.location.href = "/login");

      case 404:
        console.log("Url is  not-working ");
      // return (window.location.href = "/*");

      case 500:
        console.log("Error de server");
        console.log(data);
        break;
    }
    return Promise.reject(error);
  }
);

//Authentication and authorization
export const create = async (url, newRecord) => {
  var query = axios.post(url, newRecord);
  return query;
};

export const login = async (url, object) => {
  var query = axios.post(url, object);
  return query;
};

export const loginGogle = async (url) => {
  var query = axios.post(url);
  return query;
};

//Users
export const getUsers = async (url) => {
  var query = axios.get(url);
  return query;
};

export const GetUserById = async (url, id) => {
  var query = axios.get(url + id);
  return query;
};

export const GetUserByUserName = async (url, userName) => {
  var query = axios.get(url + userName);
  return query;
};

export const UpdateUser = async (url, record) => {
  var query = axios.put(url, record);
  return query;
};

export const DeleteUser = async (url, id) => {
  var query = axios.delete(url + id);
  return query;
};

//roles
export const GetRolById = async (url, id) => {
  var query = axios.get(url + id);
  return query;
};

export const getRoles = (url) => {
  var query = axios.get(url);
  return query;
};

//categories
export const getCategories = (url) => {
  var query = axios.get(url);
  return query;
};
export const createdCategory = (url, object) => {
  var query = axios.post(url, object);
  return query;
};
export const getCategoryBiId = (url) => {
  var query = axios.get(url);
  return query;
};
export const UpdateCategory = (url, record) => {
  var query = axios.put(url, record);
  return query;
};

//coverTypes
export const getCoverTypes = (url) => {
  var query = axios.get(url);
  return query;
};
export const createdCoverType = (url, object) => {
  var query = axios.post(url, object);
  return query;
};
export const getCoverTypeBiId = (url) => {
  var query = axios.get(url);
  return query;
};
export const UpdateCoverType = (url, record) => {
  var query = axios.put(url, record);
  return query;
};

//products
export const getProducts = (url) => {
  var query = axios.get(url);
  return query;
};

export const createdProduct = (url, object, imagen) => {
  console.log(object);

  const fd = new FormData();
  fd.append("imagen", imagen, imagen.name);
  for (var key in object) {
    fd.append(`${key}`, `${object[key]}`);
  }
  console.log(fd.get("imagen"));

  var query = axios.post(url, fd);
  return query;
};

export const getProductBiId = (url) => {
  var query = axios.get(url);
  return query;
};

export const UpdateProduct = (url, record) => {
  var query = axios.put(url, record);
  return query;
};

export const DeleteProduct = (url) => {
  var query = axios.delete(url);
  return query;
};

//summary
export const Summary = (url, record) => {
  var query = axios.post(url, record);
  return query;
};

//cartShopping
export const getItemsCart = (url) => {
  var query = axios.get(url);
  return query;
};

//cartShopping
export const summaryPost = (url, obj) => {
  console.log(obj);
  var query = axios.post(url, obj);
  return query;
};

//payment status
export const paymentStatus = (url) => {
  var query = axios.put(url);
  return query;
};

//orders
export const getOrders = (url) => {
  var query = axios.get(url);
  return query;
};

export const getOrderById = (url) => {
  var query = axios.get(url);
  return query;
};

export const procesingOrder = (url, obj) => {
  console.log(obj);
  var query = axios.post(url, obj);
  return query;
};

export const PrintOrder = (url) => {
  var query = axios.get(url, { responseType: "blob" });
  return query;
};
