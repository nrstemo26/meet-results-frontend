import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { baseUrl, coffeeLink, buttonId, fetchStripeConfig } from '../config'
import { updateMetaTags } from '../lib/seo_utils';
import axios from 'axios';
import { FiUsers, FiTrendingUp, FiList, FiBarChart2, FiSearch, FiCoffee, FiShoppingBag, FiMail, FiInstagram, FiShare2, FiPackage } from 'react-icons/fi';
import IntermediateCheckoutStep from '../components/Widgets/IntermediateCheckoutStep';

const apiUrl = baseUrl+'/v1/'

const About = () => {
  const [accountEmail, setAccountEmail] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [isPro, setIsPro] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [coffeeURL, setCoffeeURL] = useState('');
  const [stripeConfig, setStripeConfig] = useState({
    buttonId: '',
    coffeeLink: '',
    proLink: '',
    publishableKeyId: ''
  });
  const [showCheckoutStep, setShowCheckoutStep] = useState(false);
  
  const pageTitle = 'About - Lift Oracle';
  const descriptionContent = 'Lift Oracle origin story, feature breakdown, and product roadmap. From the minds of Milwaukee Barbell.';
  
  // Fetch Stripe config
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
  }, []);
  
  // Fetch user account info
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
        setIsPro(response.data.pro || false);

        const encodedEmail = encodeURIComponent(response.data.email);
        const clientRef = `&client_reference_id=${response.data.user_id}`;
        setCoffeeURL(`${stripeConfig.coffeeLink || coffeeLink}?prefilled_email=${encodedEmail}${clientRef}`);

      } catch (error) {
        console.error(error);
        setCoffeeURL(stripeConfig.coffeeLink || coffeeLink);
        setAccountEmail('');
        setIsPro(false);
      }
    };

    if (stripeConfig.coffeeLink || coffeeLink) {
      getAccount();
    }
  }, [user, stripeConfig.coffeeLink]);

  const handleUpgradeClick = () => {
    setShowCheckoutStep(true);
    
    // Track the event if analytics are available
    if (window.umami) {
      window.umami.track('Upgrade to PRO', { source: 'about_page' });
    }
  };

  const handleCloseCheckoutStep = () => {
    setShowCheckoutStep(false);
  };

  // Render Pro button or thank you message
  const renderProButton = () => {
    // Show thank you message if user is already a Pro subscriber
    if (isPro) {
      return (
        <div className="flex flex-col items-center space-y-4 p-6 bg-primary-50 rounded-lg border-2 border-primary-200">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-primary-950 mb-2">Thank you for your support!</h3>
            <p className="text-primary-800">You're already a Pro member. We appreciate you helping us build the Oracle.</p>
          </div>
        </div>
      );
    }

    if (!stripeConfig.proLink && !stripeConfig.buttonId) {
      return <p className="text-primary-800">Loading payment options...</p>;
    }

    return (
      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={handleUpgradeClick}
          className="inline-flex items-center justify-center px-8 py-3 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors text-lg font-medium"
        >
          Upgrade to Pro - $49/year
        </button>
        <p className="text-sm text-primary-700">Cancel anytime • Secure payment via Stripe</p>
      </div>
    );
  };

  return(
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {updateMetaTags(pageTitle, descriptionContent)}
      
      {/* Origin Story */}
      <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
        <h2 className="text-2xl font-bold text-primary-950 mb-6">Our Story</h2>
        <div className="space-y-6 text-primary-800">
          <p className="leading-relaxed">
            Lift Oracle was conceived and forged from the keyboards of <a className="text-primary-600 hover:text-primary-700 font-medium" href="https://milwaukeebarbell.com">Milwaukee Barbell</a>. We are massive weightlifting nerds who have been coaching and competing in this sport for over a decade.
          </p>
          <p className="leading-relaxed">
            One crisp spring morning early in 2023, we found ourselves reminiscing and mourning the loss of the pioneering weightlifting data site, OlyStats. Inspired to carry on and advance in its spirit, we started on our quest to build out a modern intelligence platform for weightlifting. Athletes, competitions, advanced statistics. <span className="font-semibold">The Lift Oracle.</span>
          </p>
        </div>
      </div>

      {/* Core Features */}
      <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
        <h2 className="text-2xl font-bold text-primary-950 mb-6">Core Features</h2>
        <p className="text-primary-800 mb-8">The core features of Lift Oracle will remain free forever.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 p-2 bg-primary-100 rounded-lg">
              <FiUsers className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-950 mb-2">Historical Results</h3>
              <p className="text-primary-800">Access data for 51,000+ athletes and counting</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 p-2 bg-primary-100 rounded-lg">
              <FiTrendingUp className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-950 mb-2">Competition Data</h3>
              <p className="text-primary-800">Results from 4,000+ local and national events</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 p-2 bg-primary-100 rounded-lg">
              <FiList className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-950 mb-2">Watchlists</h3>
              <p className="text-primary-800">Compare athletes head-to-head</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 p-2 bg-primary-100 rounded-lg">
              <FiBarChart2 className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-950 mb-2">Basic Statistics</h3>
              <p className="text-primary-800">By athlete, competition, & beyond</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pro Features */}
      <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
        <h2 className="text-2xl font-bold text-primary-950 mb-6">Pro Features</h2>
        <p className="text-primary-800 mb-8">For less than $1 per week, Pro-tier members get access to advanced features:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 p-2 bg-primary-100 rounded-lg">
              <FiSearch className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-950 mb-2">Custom Analytics</h3>
              <p className="text-primary-800">User-defined queries and data slicing</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 p-2 bg-primary-100 rounded-lg">
              <FiBarChart2 className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-950 mb-2">Advanced Stats</h3>
              <p className="text-primary-800">Gain an edge on your competition</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 p-2 bg-primary-100 rounded-lg">
              <FiList className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-950 mb-2">Unlimited Lists</h3>
              <p className="text-primary-800">Save and export watchlists</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 p-2 bg-primary-100 rounded-lg">
              <FiBarChart2 className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-950 mb-2">Meet Tools</h3>
              <p className="text-primary-800">Startlists and coaching cards</p>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          {renderProButton()}
        </div>
      </div>
      
      {/* Intermediate checkout step modal */}
      {showCheckoutStep && (
        <IntermediateCheckoutStep
          email={accountEmail}
          checkoutUrl={stripeConfig.proLink}
          hasStripeButton={Boolean(stripeConfig.buttonId && stripeConfig.publishableKeyId)}
          stripeConfig={stripeConfig}
          userId={accountId}
          onClose={handleCloseCheckoutStep}
        />
      )}

      {/* Support Section */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-bold text-primary-950 mb-6">Support Lift Oracle</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 p-2 bg-primary-100 rounded-lg">
              <FiShoppingBag className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-950 mb-2">Shop Gear</h3>
              <p className="text-primary-800"><a className="text-primary-600 hover:text-primary-700" href="https://milwaukeebarbell.com/collections/all">Pillage the Milwaukee Barbell Gear Shop</a></p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 p-2 bg-primary-100 rounded-lg">
              <FiCoffee className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-950 mb-2">Buy a Coffee</h3>
              <p className="text-primary-800">
                {coffeeURL && (
                  <a className="text-primary-600 hover:text-primary-700" href={coffeeURL}>
                    Support our development
                  </a>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 p-2 bg-primary-100 rounded-lg">
              <FiInstagram className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-950 mb-2">Follow Lift Oracle</h3>
              <p className="text-primary-800"><a className="text-primary-600 hover:text-primary-700" href="https://instagram.com/liftoracle">Updates from the devs</a></p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 p-2 bg-primary-100 rounded-lg">
              <FiInstagram className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-950 mb-2">Follow Milwaukee Barbell</h3>
              <p className="text-primary-800"><a className="text-primary-600 hover:text-primary-700" href="https://instagram.com/mkebarbell">Proud Purveyors of the Barbell Lifestyle</a></p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 p-2 bg-primary-100 rounded-lg">
              <FiShare2 className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-950 mb-2">Check out FilmPrices</h3>
              <p className="text-primary-800"><a className="text-primary-600 hover:text-primary-700" href="https://filmprices.net" target="_blank" rel="noopener noreferrer">Our sister data project for the 🎞️ community</a></p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 p-2 bg-primary-100 rounded-lg">
              <FiPackage className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-950 mb-2">Shop Momentous Supplements</h3>
              <p className="text-primary-800"><a className="text-primary-600 hover:text-primary-700" href="https://crrnt.app/MOME/pmnbzWOY" target="_blank" rel="noopener noreferrer">35% off new subscriptions, 14% entire order</a></p>
            </div>
          </div>
        </div>
      </div>

      {/* Signature */}
      <div className="text-center mt-12 text-primary-800">
        <p className="font-semibold mb-4">Cheers!</p>
        <p>
          <a href="https://murphdevane.com" target="_blank" className="text-primary-600 hover:text-primary-700">Murph</a>
          <span className="mx-2">&</span>
          <a href="https://natestemo.com" target="_blank" className="text-primary-600 hover:text-primary-700">Nate</a>
        </p>
      </div>
    </div>
  )
};

export default About;

