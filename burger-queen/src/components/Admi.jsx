import axios from "axios";
import React, { useEffect, useState } from "react";
import CreateUser from "./CreateUser";
import { Link } from "react-router-dom";
import { Button, ContainerData} from "../style-components/components";
import {getAllProducts, deleteProduct} from '../services/products'
import DivData from '../utils/Container-Data'

const Admi = () => {
  const url = 'https://bq-api-2022.herokuapp.com/users';
  const token = localStorage.getItem("token");

  const [newUrl, setUrl] = useState(url);
  const roleUser = localStorage.getItem("role");

  const header = {
    headers: { 
    Authorization: `Bearer ${token}`,
  }
}
  const initial = {
    users: [],
  };
  
  const initialLink = {
    first:'',
    prev: '',
    next: '',
    last:''
  };
  const [page, setPage] = useState(initialLink);
  const [loading, setLoading] = useState(false)
  const [state, setSate] = useState(initial);



  useEffect(() => {
    setTimeout(() => {
      setLoading(true)
      getUsers(newUrl);
    }, 2000);
  }, []);


  const getUsers = (newUrl) => getAllProducts(newUrl)
    .then((response) =>{
      const link = response.headers.link
      const arrayLink = link.match(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi)
      setPage((old) => ({
        ...old,
        first:arrayLink[0],
        prev: arrayLink[1],
        next: arrayLink[2],
        last: arrayLink[3]
      }))
      setSate((old) => ({
        ...old,
        users: response.data,
      }))
      setLoading(false)
    }
    );
  

  const handlePagination = (e) => {
    console.log(e.target.value)
    let pageNumber = e.target.value
    getUsers(pageNumber)
    setUrl(pageNumber)
  }

  const deleteUser = (id) => {
    console.log(newUrl)
    axios
      .delete(`${url}/${id}`, header)
      .then((response) => console.log(response))
      .then(() => getUsers(newUrl));
  };

  // const deleteUser = (id) => {
  //   axios
  //     .delete(`${url}/users/${id}`, header)
  //     .then((response) => console.log(response))
  //     .then(() => getUsers())
  //     .catch((e) => console.log(e));
  // };

  return (
    <div>
      <CreateUser getUsers={getUsers}></CreateUser>
      <div className="container ">
      {loading ? "Cargando..." : ""}
        <h5>Admi</h5>
        <Button type="submit" className="btn-login" value={page.prev} onClick={handlePagination}> Prev </Button>
        <Button type="submit" className="btn-login"  value={page.next} onClick={handlePagination}> Next </Button>
        <ContainerData>
        {state.users.map((user) => (
          <DivData key={user._id} data={user}>
            <div>
                <p>{user.nameUser}</p>
                <p>{user.email}</p>
                <p>{user.roles.name}</p>
            </div>
            <button onClick={() =>{window.location.href = `/edit/${user._id}`}}>Editar</button>
            <button onClick={() => deleteUser(user._id)}>Eliminar</button>
          </DivData>
        ))}
        </ContainerData>
        {/* <table className="table table-hover">
          <tbody>
            {state.users.map((user) => (
              <tr className="table-active" key={user._id}>
                <th scope="row">
                  {user.roles.admin
                    ? "Admin"
                    : user.roles.name === "mesera"
                    ? "mesera"
                    : "cocinera"}
                </th>
                <td>{user.email}</td>
                <td>
                  <Link to={"/edit/" + user._id}>Editar</Link>
                </td>
                <td>
                  <button onClick={() => deleteUser(user._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
    </div>
  );
};

export default Admi;
