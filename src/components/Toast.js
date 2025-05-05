/**
 * Toast Component
 *
 * Displays a notification message in a toast popup at the bottom right corner.
 * Visibility is controlled by the presence of a message.
 * @param {Object} props - Component props
 * @param {string} props.message - The notification text to display
 * @returns {JSX.Element} - Rendered toast notification
 */
function Toast({message}) {
    return (
        <div
            className={`toast text-bg-secondary position-fixed bottom-0 end-0 m-3 ${message !== '' ? 'show' : 'hide'}`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
        >
            <div className="d-flex">
                <div className="toast-body">
                    {message}
                </div>
            </div>
        </div>
    )

}
export default Toast;