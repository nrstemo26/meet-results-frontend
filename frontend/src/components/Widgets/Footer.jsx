import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { baseUrl, coffeeLink, buttonId, fetchStripeConfig } from '../../config'
import axios from 'axios';
import InstagramIcon from './InstagramIcon'; 

const apiUrl = baseUrl+'/v1/'

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
            
            const token = localStorage.getItem('token');
            if (!token) {
                setCoffeeURL(stripeConfig.coffeeLink || coffeeLink);
                setAccountEmail('');
                return;
            }
            
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
