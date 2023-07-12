import {AiOutlineLoading} from 'react-icons/ai'
import { MbSpinner as SpinnerMb } from './MbSpinner'

const Spinner = () =>{
    return(
        <div className='flex flex-col items-center '>
            <h1 className=''>Getting your data...</h1>
            {/* <AiOutlineLoading  size='48px' className='animate-spin'/> */}
            <SpinnerMb />
        </div>
    )
}

export { Spinner };