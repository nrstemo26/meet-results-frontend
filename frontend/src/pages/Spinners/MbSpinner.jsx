import  {ReactComponent as LogoSvg} from '../assets/avatar_face.svg'
import { useEffect } from 'react'

const MbSpinner = () => {
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
        hair.classList.add('change-color')
        stashe.classList.add('change-color')
        hair.classList.remove('reverse-color')
        stashe.classList.remove('reverse-color')
    }
    const reverseAnimation = (hair,stashe,lastPath)=>{
        lastPath.addEventListener('animationend', onAnimationEnd)
        hair.classList.add('reverse-color')
        stashe.classList.add('reverse-color')
        hair.classList.remove('change-color')
        stashe.classList.remove('change-color')
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

export { MbSpinner };


// for (let c = 0; c < paths.length; c++) {
    //     // paths[c].style.fill = 'red';
    //     // paths[c].style.animation = ".5s ease " + (c * 0.1) + "s 1 forwards color-change"
    
    //     //      
    //     console.log(c)   
    //     //  duration| easefn delay iteration  dir      name      
    
    //     paths[c].style.animation = ".5s ease " + (c * 0.1) + "s 1 none color-change"
    //     // paths[c].style.animation-fill-mode = ".5s ease " + (c * 0.1) + "s 1 forwards color-change"
    //     // paths[c].addEventListener('animationend',onAnimationEnd)
    // }
    
// reverseAnimation(paths)
    

// console.log('in reverse')
    // // paths[c].style.fill = 'red';
    // paths = Array.from(document.querySelectorAll('#logo-hair path'))
    // for (let c = 0; c < paths.length; c++) {
    //     console.log('reversing ',c)
    //     console.log(paths[c])
    //     paths[c].style['animation-play-state'] = 'paused';
    //     // paths[c].style.fill = 'red';
    //     // paths[c].style.animation = ".5s ease " + (c * 0.1) + " 4s 1 forwards reverse-color-change";
    //     let foo = 19 * c * .1
    //     // paths[c].style.animation = ".5s ease 2 1 forwards reverse-color-change ";
    //     // paths[c].style.animation = '';
    //     // paths[c].style.fill = '#ffa600';
    
    //     paths[c].style.animation = ".5s ease "+ foo + " 1 forwards reverse-color-change";
    //     console.log('after ', paths[c])
    //     // paths[c].style['animation-iteration-count'] = "infinite";
    // }