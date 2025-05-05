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