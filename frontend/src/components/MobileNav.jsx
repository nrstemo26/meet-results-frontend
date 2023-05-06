import { useState } from "react"

function MobileNav(){
    const [burger_class, setBurgerClass] = useState("burger-bar unclicked")
    const [menu_class, setMenuClass] = useState("menu hidden")
    const [isMenuClicked, setIsMenuClicked] = useState(false)
    
    const updateMenu = () => {
        if(!isMenuClicked) {
            setBurgerClass("burger-bar clicked")
            setMenuClass("menu visible")
        }else{
            setBurgerClass('burger-bar unclicked')
            setMenuClass('menu hidden')
        }
        setIsMenuClicked(!isMenuClicked)
    }

    return(
        <>
        <div className="bg-orange-800 text-white flex justify-around p-4">
            <div className="burger-menu" onClick={updateMenu}>
                <div className={burger_class} ></div>
                <div className={burger_class} ></div>
                <div className={burger_class} ></div>
            </div>
        <div className={menu_class}></div>

      <div>
        Site Name + img
      </div>   
    
      
      </div>
        </>
    )
}

export default MobileNav