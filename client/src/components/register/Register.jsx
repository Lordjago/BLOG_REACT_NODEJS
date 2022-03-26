
import {
  Link
} from "react-router-dom";
import { useState } from "react";
import axios from 'axios'
import { axiosInstance } from "../../config";
export default function Register() {
  const [formData, setFormData] = useState(({
    username:"",
    email:"",
    password: ""
  }))
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value

      }
    })
  }
  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log(formData)
    try {
      await axiosInstance.post('/auth/register', {
      username: formData.username,
      email: formData.email,
      password: formData.password
    })
      setMessage("Registration Successful! You can now login")
      // user.data.data && window.location.replace('/login')
    } catch (error) {
      setError(true)
    }
    
  }
  
  return (
    <div>
         {/* <section class="min-vh-100 mb-8"> */}
      <div class="page-header align-items-start pt-1 pb-11 m-3 border-radius-lg">
      </div>
      <div class="container">
        <div class="row mt-lg-n10 mt-md-n11 mt-n10">
          <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
            <div class="card z-index-0">
              <div class="card-header text-center pt-4">
                <h5>Register</h5>
              </div>
              <div class="card-body">
                  {error && <p className="error">Something went wrong</p>}
                  {message !== '' && <p className="message">{message}</p>}
                <form onSubmit={handleSubmit}>
                  <div class="mb-3">
                    <input type="text" name="username" onChange={handleChange} value={formData.username}  class="form-control" placeholder="Username" />
                  </div>
                  <div class="mb-3">
                    <input type="email" name="email" onChange={handleChange}  value={formData.email} class="form-control" placeholder="Email"/>
                  </div>
                  <div class="mb-3">
                    <input type="password" name="password" onChange={handleChange} value={formData.password} class="form-control" placeholder="Password"/>
                  </div>
                  <div class="form-check form-check-info text-left">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked/>
                    <label class="form-check-label" for="flexCheckDefault">
                      I agree the <a href="/" class="text-dark font-weight-bolder">Terms and Conditions</a>
                    </label>
                  </div>
                  <div class="text-center">
                    <button type="submit" class="btn bg-gradient-dark w-100 my-4 mb-2">Sign up</button>
                  </div>
                  <p class="text-sm mt-3 mb-0">Already have an account?
                  <Link to="/login" className="text-dark font-weight-bolder">
                        <span className="d-sm-inline d-none">Sign in</span>
                    </Link>
                    </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  )
}
