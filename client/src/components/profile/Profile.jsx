import axios from "axios"
import { useContext, useState } from "react"
import { axiosInstance } from "../../config"
import { Context } from "../../context/Context"

export default function Profile({user}) {
  const {dispatch, accessToken} = useContext(Context)
  const [success, setSuccess] = useState(false)
  const [password, setPassword] = useState('') 
  const handleSubmit = async(e) => {
    e.preventDefault()
    dispatch({type: "UPDATE_START"})
    try {
      const res = await axiosInstance({
        method: 'put',
        url: `/users/update`,
        data: {
          userId: user._id,
          password
        },
        headers: {
          Authorization: "Bearer " + accessToken
        }
      })
      console.log(res.data.data)
      setSuccess(true)
      dispatch({type: "UPDATE_SUCCESS", payload: res.data.data})
    } catch (error) {
      console.log(error)
      dispatch({type: "UPDATE_FAILURE"})
    }

    
  }
  const handleClick = async(e) => {
    e.preventDefault()
    try {
      await axiosInstance({
        method: 'delete',
        url: `/users/${user._id}`,
        headers: {
          Authorization: "Bearer " + accessToken
        }
      })
      dispatch({type: "LOGOUT"})
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
         <div className="container-fluid">
      <div className="page-header min-height-300 border-radius-xl mt-4">
        <span className="mask bg-gradient-primary opacity-6"></span>
      </div>
      <div className="card card-body blur shadow-blur mx-4 mt-n6 overflow-hidden">
        <div className="row gx-4">
          <div className="col-auto">
            <div className="avatar avatar-xl position-relative">
              <img src="../assets/img/bruce-mars.jpg" alt="profile_image" className="w-100 border-radius-lg shadow-sm"/>
            </div>
          </div>
          <div className="col-auto my-auto">
            <div className="h-100">
              <h5 className="mb-1">
                {user.username} - <span style={{color: 'red', fontSize:'12px', cursor:'pointer'}} onClick={handleClick}>Delete Account</span>
              </h5>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">
            <div className="nav-wrapper position-relative end-0">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12 col-xl-4">
          <div className="card h-100">
            <div className="card-header pb-0 p-3">
              <div className="row">
                <div className="col-md-8 d-flex align-items-center">
                  <h6 className="mb-0">Profile Information</h6>
                </div>
              </div>
            </div>
            <div className="card-body p-3">
              <p className="text-sm">
                Hi, I’m {user.username}, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).
              </p>
              <hr className="horizontal gray-light my-4"/>
              <ul className="list-group">
                <li className="list-group-item border-0 ps-0 pt-0 text-sm"><strong className="text-dark">Username:</strong> &nbsp; {user.username}</li>
                <li className="list-group-item border-0 ps-0 text-sm"><strong className="text-dark">Mobile:</strong> &nbsp; (44) 123 1234 123</li>
                <li className="list-group-item border-0 ps-0 text-sm"><strong className="text-dark">Email:</strong> &nbsp; {user.email}</li>
                
              </ul>
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-8">
          <div className="card h-100">
            <div className="card-header pb-0 p-3">
              <h6 className="mb-0">Platform Settings</h6>
            </div>
            <div className="card-body p-3">
              <h6 className="text-uppercase text-body text-xs font-weight-bolder">Account</h6>
              
              <div className="card-body">
                {success && <p style={{color:"green"}}>Account Update Successful</p>}
                <form onSubmit={handleSubmit}>
                  <label>Username</label>
                  <div className="mb-3">
                    <input type="username" className="form-control" placeholder={user.username} aria-label="Email" aria-describedby="email-addon" disabled/>
                  </div>
                  <label>Email</label>
                  <div className="mb-3">
                    <input type="email" className="form-control" placeholder={user.email}  aria-label="Email" aria-describedby="email-addon" disabled/>
                  </div>
                  <label>Password</label>
                  <div className="mb-3">
                    <input type="password" className="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)} aria-label="Password" aria-describedby="password-addon"/>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn bg-gradient-info w-100 mt-4 mb-0">Update</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      
      </div>
    </div>
    </div>
  )
}
