import './css/loading.css';

const Loading = () => {
    return (
        <div className="container mt-5 text-center">
            <div className="my-4">&nbsp;</div>
            <div className="my-4">&nbsp;</div>
            <div className="my-3">&nbsp;</div>
            <div class="lds-circle"><div><img className="img img-fluid" src="/images/loading.png" alt="Loading" /></div></div>
            <p className="mt-1">Loading...</p>
        </div>
    );
}

export default Loading