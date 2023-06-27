
export const makeToast = (msg, type, setShowToast,setToastType, setToastMessage)=> {
    setToastMessage(msg);
    if(type) setToastType(type)
    setShowToast(true);
    
    setTimeout(() => {
        setShowToast(false);
        setToastMessage('');
    }, 5000); 
}
