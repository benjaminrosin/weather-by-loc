import {Link} from "react-router-dom";

/**
 * NotFoundPage Component
 *
 * Displays a 404 error page when a route is not found.
 * Includes a link to return to the home page.
 *
 * @returns {JSX.Element} - Rendered 404 page with navigation option
 */
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