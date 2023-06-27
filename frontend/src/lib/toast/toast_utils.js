
export const makeToast = (msg, type, setShowToast,setToastType, setToastMessage)=> {
    setToastMessage(msg);
    if(type){
        console.log('type exists')
    }
    setToastType(type)
    setShowToast(true);
    
    setTimeout(() => {
        setShowToast(false);
        setToastMessage('');
    }, 5000); 
}
