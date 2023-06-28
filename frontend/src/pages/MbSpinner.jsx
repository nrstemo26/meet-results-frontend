import  {ReactComponent as LogoSvg} from '../assets/avatar_face.svg'

const MbSpinner = () =>{
    return(
        <div className='flex flex-col items-center '>
            <h1 className=''>Getting your data...</h1>
            <div className='bg-slate-400'>
                <LogoSvg  className='spinner-image'></LogoSvg>
            </div>
        </div>
    )
}

export { MbSpinner };