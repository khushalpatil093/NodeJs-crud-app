import React, { useEffect, useState } from 'react'
import "../addUser/add.css"
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Edit = () => {

  const users = {
    fname: "",
    lname: "",
    email: ""
  }

  const {id} = useParams();
  const [user, setUser] = useState(users)
  const navigate = useNavigate();

  const inputChangeHandler = (e) => {
    const {name, value} = e.target;
    setUser({...user, [name]:value});
    console.log(user);
  }

  useEffect(() => {
    axios.get(`http://localhost:8000/api/getone/${id}`)
    .then((response) => {
      setUser(response.data);
    })
    .catch((error) => console.log(error));
  }, [id])

  const submitForm = async(e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8000/api/update/${id}`, user)
    .then((response) => {
      toast.success(response.data.msg, {position: "top-right"})
      navigate("/");
    })
    .catch(error => console.log(error))
  }

  return (
    <div className='addUser'>
        <Link to={"/"}>Back</Link>
        <h3>Update User</h3>
        <form className='addUserForm' onSubmit={submitForm}>
          <div className="inputGroup">
            <label htmlFor="fname">First name</label>
            <input type="text" onChange={inputChangeHandler} value={user.fname} id='fname' name='fname' autoComplete='off' placeholder='First name' />
          </div>
          <div className="inputGroup">
            <label htmlFor="lname">Last name</label>
            <input type="text" onChange={inputChangeHandler} value={user.lname} id='lname' name='lname' autoComplete='off' placeholder='Last name' />
          </div>
          <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input type="text" onChange={inputChangeHandler} value={user.email} id='email' name='email' autoComplete='off' placeholder='Email' />
          </div>
          <div className="inputGroup">
            <button type='submit'>Update User</button>
          </div>
        </form>
    </div>
  )
}

export default Edit;