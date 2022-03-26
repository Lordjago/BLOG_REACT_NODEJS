
import { Link } from 'react-router-dom'
export default function PostBody({post}) {
  return (
    <div>
                <li className="list-group-item border-0 d-flex p-4 mb-2 mt-3 bg-gray-100 border-radius-lg">
                  <div className="d-flex flex-column">
                    <h6 className="mb-3 text-sm">{post.title}</h6>
                    <span className="mb-2 text-xs">Author: <span className="text-dark font-weight-bold ms-sm-2">{post.username}</span></span>
                    <span className="mb-2 text-xs">Published: <span className="text-dark ms-sm-2 font-weight-bold">{new Date(post.createdAt).toDateString()}</span></span>
                  </div>
                  <div className="ms-auto text-end">
                  <Link to={`/post/${post._id}`} className="btn btn-link text-dark px-3 mb-0" ><i className="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>View</Link>      
                  </div>
                </li>
    </div>
  )
}
