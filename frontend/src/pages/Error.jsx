import { Link } from "react-router-dom";

const Error = () =>{
    return(
        <div className='mt-4 flex flex-col justify-center items-center'>
            <h1 className="text-xl font-bold text-primary-950">Beep boop...</h1>
            <Link to='/'><div className="text-primary-600">Go back to homepage</div></Link>
        </div>
    )
}

export {Error};