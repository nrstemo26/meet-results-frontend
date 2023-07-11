import  {ReactComponent as LogoSvg} from '../assets/avatar_face.svg'

const MbSpinner = () => {
    let lastPath = Array.from(document.querySelectorAll('#logo-hair path'))[19]
    let svg = document.querySelector('#logo-hair')
    
    let reverse = true;

    const onAnimationEnd = () => {
        svg = document.querySelector('#logo-hair')
        lastPath = Array.from(document.querySelectorAll('#logo-hair path'))[19]
        
        if(reverse){
            reverseAnimation(svg, lastPath)
        }else{
            animation(svg,lastPath)
        }
        reverse = !reverse;
    }
    
    const animation = (svg,lastPath) =>{
        lastPath.addEventListener('animationend', onAnimationEnd)
        svg.classList.add('change-color')
        svg.classList.remove('reverse-color')
    }
    const reverseAnimation = (svg,lastPath)=>{
        lastPath.addEventListener('animationend', onAnimationEnd)
        svg.classList.add('reverse-color')
        svg.classList.remove('change-color')
    }

    const logoLoader = () => {
        svg = document.querySelector('#logo-hair')
        lastPath = Array.from(document.querySelectorAll('#logo-hair path'))[19]
        animation(svg, lastPath)
        let stashe = document.querySelector('#logo-mustache')
        let paths = Array.from(document.querySelectorAll('#logo-mustache path'))
        
    
        
        console.log(stashe)
    }
    
    setTimeout(logoLoader,1000)
    return(
        <div className='flex flex-col items-center '>
            <h1 className=''>Getting your data...</h1>
            <div >
                <LogoSvg ></LogoSvg>
            </div>
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