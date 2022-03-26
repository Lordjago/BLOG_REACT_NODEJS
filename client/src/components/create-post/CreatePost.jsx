import { useContext, useRef, useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import { axiosInstance } from "../../config";

export default function CreatePost() {
  const { user, accessToken } = useContext(Context);
  const titleRef = useRef();
  const descRef = useRef();
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const data = new FormData();
      data.append("username", user.username);
      data.append("title", titleRef.current.value);
      data.append("desc", descRef.current.value);
      data.append("image", file);
      console.log(data);
      try {
        const res = await axiosInstance({
          method: 'post',
          url: '/posts/create',
          data: data,
          headers: {
              Authorization: "Bearer " + accessToken
            }
        })
        // .post(
        //   "", {
        //     data: {data},
            
        //   }
          
        // );
        window.location.replace("/post/" + res.data.data._id);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-md-12 mt-4">
            <div className="card">
              <div className="card-header pb-0 px-3">
                <h6 className="mb-0">Create Post</h6>
              </div>
              <div className="card-body pt-4 p-3">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <input
                        type="text"
                        ref={titleRef}
                        className="form-control"
                        placeholder="Title"
                        aria-label="Name"
                        aria-describedby="email-addon"
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        ref={descRef}
                        className="form-control"
                        placeholder="Description"
                        aria-label="Email"
                        aria-describedby="email-addon"
                      />
                    </div>
                    
                    <div className="mb-3">
                      <input
                        type="file"
                        name="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="form-control"
                        placeholder="Image"
                        aria-label="Password"
                        aria-describedby="password-addon"
                      />
                    </div>
                    {file && (
                    <div className="position-relative">
                    <a className="d-block shadow-xl border-radius-xl" href='/'>
                      <img src={URL.createObjectURL(file)} alt="img-blur-shadow" className="img-fluid shadow border-radius-lg create-imgs"/>
                    </a>
                    </div>
                    )}
                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn bg-gradient-dark w-100 my-4 mb-2"
                      >
                        Create Post
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
