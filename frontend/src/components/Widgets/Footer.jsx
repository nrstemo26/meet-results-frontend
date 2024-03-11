import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { baseUrl, coffeeLink, buttonId, pubKey } from '../../config'
import axios from 'axios';
import InstagramIcon from './InstagramIcon'; 

const apiUrl = baseUrl+'/v1/'

const Footer = () => {
    const [accountEmail, setAccountEmail] = useState(null);
    const [accountId, setAccountId] = useState(null);
    const { user } = useSelector((state) => state.auth);
    const [coffeeURL, setCoffeeURL] = useState('');

    useEffect(() => {
        const getAccount = async () => {
          if (user) {
            const token = localStorage.getItem('token');
            const credentials = btoa(`${token}:unused`);
    
            try {
              const response = await axios.get(`${apiUrl}user/account`, {
    
                headers: {
                  Authorization: `Basic ${credentials}`,
                },
              });
    
              setAccountEmail(response.data.email);
              setAccountId(response.data.user_id);
              // console.log(accountEmail);
              const encodedEmail = encodeURIComponent(response.data.email);
              const clientRef = `&client_reference_id=${response.data.user_id}`
              console.log(`${coffeeLink}?prefilled_email=${encodedEmail}${clientRef}`);
              setCoffeeURL(`${coffeeLink}?prefilled_email=${encodedEmail}${clientRef}`);
              
            } catch (error) {
              console.error(error);
              setCoffeeURL(`${coffeeLink}`);
              setAccountEmail('');
              // Handle the error
            }
          } else {
            setCoffeeURL(`${coffeeLink}`);
            setAccountEmail('');
          }
          
        };
    
        getAccount();
      }, [user]); 

    return (
        <footer className="flex flex-col justify-center items-center m-4 p-2">
            {coffeeURL && (
            <a className="text-primary-950 hover:text-primary-500 text-xs p-2" href={coffeeURL}>
                ☕️ Buy the devs a coffee ☕️
            </a>
            )}
            <InstagramIcon />
        </footer>
    );
}

export default Footer;
