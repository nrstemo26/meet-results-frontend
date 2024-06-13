import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { baseUrl, coffeeLink, buttonId, pubKey } from '../../config';
import axios from 'axios';
import InstagramIcon from './InstagramIcon'; 
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation

const apiUrl = baseUrl + '/v1/';

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
                    const encodedEmail = encodeURIComponent(response.data.email);
                    const clientRef = `&client_reference_id=${response.data.user_id}`;
                    setCoffeeURL(`${coffeeLink}?prefilled_email=${encodedEmail}${clientRef}`);
                } catch (error) {
                    console.error(error);
                    setCoffeeURL(`${coffeeLink}`);
                    setAccountEmail('');
                }
            } else {
                setCoffeeURL(`${coffeeLink}`);
                setAccountEmail('');
            }
        };

        getAccount();
    }, [user]);

    return (
        <footer className="flex flex-col justify-center items-center m-4 mt-8 p-2">
            <div className="flex flex-row justify-around w-full max-w-screen-md mb-4">
                <div className="flex flex-col">
                    <Link to="/" className="text-primary-950 hover:text-primary-500 text-sm mb-2">Home</Link>
                    <Link to="/about" className="text-primary-950 hover:text-primary-500 text-sm mb-2">About</Link>
                    <a href="https://www.milwaukeebarbell.com/gear?tag=oracle" className="text-primary-950 hover:text-primary-500 text-sm mb-2" data-umami-event="merch" target="_blank" rel="noopener noreferrer">
                      <div>Merch</div>
                    </a>
                    {user ? (
                        <Link to="/account" className="text-primary-950 hover:text-primary-500 text-sm mb-2">Account</Link>
                    ) : (
                      <>
                        <Link to="/register" className="text-primary-950 hover:text-primary-500 text-sm mb-2">Register</Link>
                        <Link to="/login" className="text-primary-950 hover:text-primary-500 text-sm mb-2">Login</Link>
                      </>
                    )}
                </div>
                <div className="flex flex-col">
                    <Link to="/meets" className="text-primary-950 hover:text-primary-500 text-sm mb-2">Meets</Link>
                    <Link to="/athletes" className="text-primary-950 hover:text-primary-500 text-sm mb-2">Athletes</Link>
                    <Link to="/watchlist" className="text-primary-950 hover:text-primary-500 text-sm mb-2">Watchlist</Link>
                    <Link to="/query" className="text-primary-950 hover:text-primary-500 text-sm mb-2">Query</Link>
                </div>
            </div>
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
