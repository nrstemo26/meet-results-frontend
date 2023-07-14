import  {ReactComponent as LogoSvg} from '../assets/avatar_face.svg'

//active issues only runs once
const MbSpinnerGradient = () => {
    let lastPath = Array.from(document.querySelectorAll('#logo-mustache path'))[47]
    let hairSVG = document.querySelector('#logo-hair')
    let stasheSVG = document.querySelector('#logo-mustache')

    const onAnimationEnd = (e) => {
        console.log(e)
        console.log('in animation end')
        lastPath = Array.from(document.querySelectorAll('#logo-mustache path'))[47]
        hairSVG = document.querySelector('#logo-hair')
        stasheSVG = document.querySelector('#logo-mustache')

        hairSVG.classList.remove('change-color-gradient')
        stasheSVG.classList.remove('change-color-gradient')
        animation(hairSVG, stasheSVG, lastPath)
        // lastPath.removeEventListener('animationend',onAnimationEnd)
    }
    

    const animation = (hair,stashe,lastPath) =>{
        console.log('in animation')
        console.log(hair.classList)
        // lastPath.removeEventListener('animationend',onAnimationEnd)
        // lastPath.addEventListener('animationend', onAnimationEnd)
        // console.log(hair)
        // console.log(stashe)
        lastPath.removeEventListener('animationend', onAnimationEnd,true)
        hair.classList.remove('change-color-gradient')
        stashe.classList.remove('change-color-gradient')
        console.log(hair.classList)
        
        hair.classList.add('change-color-gradient')
        stashe.classList.add('change-color-gradient')
        lastPath.addEventListener('animationend', onAnimationEnd)
    }
    

    const stasheLoader = () => {
        lastPath = Array.from(document.querySelectorAll('#logo-mustache path'))[47]
        hairSVG = document.querySelector('#logo-hair')
        stasheSVG = document.querySelector('#logo-mustache')
        animation(hairSVG,stasheSVG, lastPath)

    }
    
    const clearAnimation = (hair, stashe, lastPath) => {
        lastPath.removeEventListener('animationend', onAnimationEnd,true)
        hair.classList.remove('change-color-gradient')
        stashe.classList.remove('change-color-gradient')
    }
    
    // setTimeout(stasheLoader,1000)
    return(
        <div className='flex flex-col items-center '>
            <h1 className=''>Getting your data...</h1>
            <button onClick={stasheLoader}>play animation</button>
            <div >
                <LogoSvg ></LogoSvg>
            </div>
        </div>
    )
}

export { MbSpinnerGradient };
