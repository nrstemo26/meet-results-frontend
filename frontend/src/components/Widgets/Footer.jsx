import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { baseUrl, coffeeLink, buttonId, fetchStripeConfig } from '../../config'
import axios from 'axios';
import InstagramIcon from './InstagramIcon'; 
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation

const apiUrl = baseUrl + '/v1/';

const Footer = () => {
    const [accountEmail, setAccountEmail] = useState(null);
    const [accountId, setAccountId] = useState(null);
    const { user } = useSelector((state) => state.auth);
    const [coffeeURL, setCoffeeURL] = useState('');
    const [stripeConfig, setStripeConfig] = useState({
        buttonId: '',
        coffeeLink: '',
        proLink: ''
    });
    
    // Load Stripe config once on component mount
    useEffect(() => {
        const loadStripeConfig = async () => {
            try {
                const config = await fetchStripeConfig();
                setStripeConfig(config);
            } catch (error) {
                console.error('Error loading Stripe config:', error);
            }
        };
        
        loadStripeConfig();
    }, []); // Empty dependency array means this runs once on mount
    
    // Handle account info separately with proper dependencies
    useEffect(() => {
        const getAccount = async () => {
            if (!user) {
                setCoffeeURL(stripeConfig.coffeeLink || coffeeLink);
                setAccountEmail('');
                return;
            }
            
            // UPDATED: Use cookies instead of localStorage token
            try {
                const response = await axios.get(`${apiUrl}user/account`, {
                    withCredentials: true,  // Send auth cookie
                });
    
                setAccountEmail(response.data.email);
                setAccountId(response.data.user_id);
              
                const encodedEmail = encodeURIComponent(response.data.email);
                const clientRef = `&client_reference_id=${response.data.user_id}`;
                setCoffeeURL(`${stripeConfig.coffeeLink || coffeeLink}?prefilled_email=${encodedEmail}${clientRef}`);
            } catch (error) {
                console.error(error);
                setCoffeeURL(stripeConfig.coffeeLink || coffeeLink);
                setAccountEmail('');
            }
        };
    
        // Only run this effect if we have stripe config values and user changes
        if (stripeConfig.coffeeLink || coffeeLink) {
            getAccount();
        }
    }, [user, stripeConfig.coffeeLink]); // Only depend on user and coffeeLink

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
