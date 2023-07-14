import  {ReactComponent as LogoSvg} from '../assets/avatar_face.svg'
import { useEffect } from 'react'

//active issues only runs once
const MbSpinnerGradient = () => {
//last path should be the last mustache guy
let lastPath = Array.from(document.querySelectorAll('#logo-mustache path'))[47]
let hairSVG = document.querySelector('#logo-hair')
let stasheSVG = document.querySelector('#logo-mustache')
let reverse = true;

const onAnimationEnd = () => {
    lastPath = Array.from(document.querySelectorAll('#logo-mustache path'))[47]
    hairSVG = document.querySelector('#logo-hair')
    stasheSVG = document.querySelector('#logo-mustache')

    if(reverse){
        reverseAnimation(hairSVG,stasheSVG, lastPath)
    }else{
        animation(hairSVG,stasheSVG,lastPath)
    }
    reverse = !reverse;
}

const animation = (hair,stashe,lastPath) =>{
    lastPath.addEventListener('animationend', onAnimationEnd)
    hair.classList.add('change-color-gradient')
    stashe.classList.add('change-color-gradient')
    hair.classList.remove('reverse-color-gradient')
    stashe.classList.remove('reverse-color-gradient')
}
const reverseAnimation = (hair,stashe,lastPath)=>{
    lastPath.addEventListener('animationend', onAnimationEnd)
    hair.classList.add('reverse-color-gradient')
    stashe.classList.add('reverse-color-gradient')
    hair.classList.remove('change-color-gradient')
    stashe.classList.remove('change-color-gradient')
}

const stasheLoader = () => {
    lastPath = Array.from(document.querySelectorAll('#logo-mustache path'))[47]
    hairSVG = document.querySelector('#logo-hair')
    stasheSVG = document.querySelector('#logo-mustache')
    animation(hairSVG,stasheSVG, lastPath)
}

useEffect(()=>{
    stasheLoader()
})

return(
    <div className='flex flex-col items-center '>
        <LogoSvg ></LogoSvg>
    </div>
)
}


export { MbSpinnerGradient };