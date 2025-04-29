import {Link} from "react-router-dom";

function NotFoundPage(){
    return (
        <div className="container text-center mt-5">
            <h1 className="display-4">404 - Page Not Found</h1>
            <p className="lead">Sorry, the page you're looking for doesn't exist.</p>
            <Link to="/" className="btn btn-outline-dark mt-3">
                Go Back Home
            </Link>
        </div>
    );
}

export default NotFoundPage;