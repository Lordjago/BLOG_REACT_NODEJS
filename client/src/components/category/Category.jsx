import React from 'react'

export default function Category({cat}) {
  return (
    <div>
        <div className="col-md-4 mt-4">
            <div className="card h-100 mb-4">
              <div className="card-header pb-0 px-3">
                <div className="row">
                  <div className="col-md-6">
                  </div>
                  <div className="col-md-6 d-flex justify-content-end align-items-center">
                    <i className="far fa-calendar-alt me-2"></i>
                    <small>23 - 30 March 2020</small>
                  </div>
                </div>
              </div>
              <div className="card-body pt-4 p-3">
                <h6 className="text-uppercase text-body text-xs font-weight-bolder mb-3">Categories</h6>
                <ul className="list-group">
                  {cat.map(c=> (<li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                    <div className="d-flex align-items-center">
                      <button className="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-3 btn-sm d-flex align-items-center justify-content-center"><i className="fas fa-arrow-down"></i></button>
                      <div className="d-flex flex-column">
                        <h6 className="mb-1 text-dark text-sm">{c.name}</h6>
                        <span className="text-xs">{new Date(c.createdAt).toDateString()}</span>
                      </div>
                    </div>
                  </li>))}
                </ul>
              </div>
            </div>
          </div>
    </div>
  )
}
