import { Link } from "react-router-dom";

const Error = () =>{
    return(
        <div className='flex flex-col justify-center items-center'>
            <h1 className="text-xl font-bold">There was an error</h1>
            <Link to='/'><div className="text-primary-600">Go back to homepage</div></Link>
        </div>
    )
}

export {Error};