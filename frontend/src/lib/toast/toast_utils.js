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
//SAMPLE USAGE
//we call this function twice

// first time we set all of the toast state
// const makeToast = makeToast_(setShowToast, setToastType, setToastMessage)
// the underscore is there to show its a curried function and we have to rename it
// this binds all future makeToast calls to the state in our component

//now we just call this to make a toast by supplying a message 
//and an optional toast type... just set type to false otherwise
// makeToast('youve successfully made an account','success')

export const makeToast_ = (setShowToast, setToastType, setToastMessage)=> {
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


// set up usage
// import Toast from '../Widgets/Toast';
// import { makeToast_ } from '../../lib/toast/toast_utils';

// const [showToast, setShowToast] = useState(false);
// const [toastMessage, setToastMessage] = useState('');
// const [toastType, setToastType] = useState('');
// const makeToast = makeToast_(setShowToast,setToastType, setToastMessage)

// actually makes the toast
// makeToast('Wrong username or password','error')

// in component return statement
// {showToast && (
//     <Toast message={toastMessage} onClose={() => setShowToast(false)} type={toastType} />
//   )}