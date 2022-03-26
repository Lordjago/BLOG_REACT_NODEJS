import React from "react";
import PostBody from "../postBody/PostBody";
import { Link } from "react-router-dom";
export default function Post({ posts, cat }) {
  return (
    <div>
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-lg-8">
            <div className="row">
              <div className="col-xl-6 mb-xl-0 mb-4">
                <div className="card bg-transparent shadow-xl"></div>
              </div>
              <div className="col-md-12 mb-lg-0 mb-4"></div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7 mt-4">
            <div className="card">
              <div className="card-header pb-0 px-3">
                <h6 className="mb-0">Posts</h6>
              </div>
              <div className="card-body pt-4 p-3">
                <ul className="list-group">
                  {posts.map((p) => (
                    <PostBody key={p._id} post={p} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-5 mt-4">
            <div className="card h-100 mb-4">
              <div className="card-header pb-0 px-3">
                <div className="row">
                  <div className="col-md-6"></div>
                </div>
              </div>
              <div className="card-body pt-4 p-3">
                <h6 className="text-uppercase text-body text-xs font-weight-bolder mb-3">
                  Categories
                </h6>
                <ul className="list-group">
                  {cat.map((c) => (
                    <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                      <div className="d-flex align-items-center">
                        <button className="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-3 btn-sm d-flex align-items-center justify-content-center">
                          <i className="fas fa-arrow-down"></i>
                        </button>
                        <div className="d-flex flex-column">
                          <Link
                            to={`/post?cat=${c.name}`}
                            className="mb-1 text-dark text-sm"
                          >
                            {c.name}
                          </Link>
                          <span className="text-xs">
                            {new Date(c.createdAt).toDateString()}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
