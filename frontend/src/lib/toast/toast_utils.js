//first version
// export const makeToast = (msg, type, setShowToast,setToastType, setToastMessage)=> {
//     setToastMessage(msg);
//     if(type) setToastType(type)
//     setShowToast(true);
    
//     setTimeout(() => {
//         setShowToast(false);
//         setToastMessage('');
//     }, 5000); 
// }

///curried version
export const makeToast = (setShowToast, setToastType, setToastMessage)=> {
    return (msg, type) => {    
        setToastMessage(msg);
        if(type) setToastType(type)
        setShowToast(true);
    
        setTimeout(() => {
            setShowToast(false);
            setToastMessage('');
        }, 5000); 
    } 
}
