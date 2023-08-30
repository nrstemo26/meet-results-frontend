import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { baseUrl, coffeeLink, buttonId, pubKey } from '../config'
import axios from 'axios';

const apiUrl = baseUrl+'/v1/'

const About = () => {
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
  }, [user]); // Empty dependency array to run the effect only once

  return(
    <div className="sm:w-2/3 bg-gradient-to-r from-transparent via-cyan-50 to-transparent">
      {/* <h1 className="text-primary-950 font-bold text-3xl p-2 mt-4 mx-8 leading-relaxed">About</h1> */}
      <p className="m-8 p-2 text-primary-950 leading-loose font-semibold">Lift Oracle was conceived and forged from the keyboards of Milwaukee Barbell. We are massive weightlifting nerds who have been coaching and competing in this sport for over a decade.</p>
      <p className="m-8 p-2 text-primary-950 leading-loose">One crisp spring morning early in 2023, we found ourselves reminiscing and mourning the loss of the pioneering weightlifting data site, OlyStats. Inspired to carry on and advance the spirit of OlyStats, we started on our quest to build out a modern intelligence platform for weightlifting. Athletes, competitions, advanced statistics. <span className="font-semibold">The Lift Oracle.</span></p>
      <p className="m-8 p-2 text-primary-950 leading-loose font-semibold">The core features of Lift Oracle will remain free forever.</p>
      <div className="m-8">
        <ul className="list-none m-8 p-2 text-gray-700 text-sm md:text-m space-y-2">
          <li>🏋️‍♂️ Historical results for 51,000+ athletes and counting</li>
          <li>💡 Competition results for 4,000+ local and national events.</li>
          <li>🔎 Build session watchlists to compare athletes head-to-head.</li>
          <li>👩‍💻 Basic and advanced statistics by athlete, competition, & beyond.</li>
          <li>🛗 Remote coach board. Shop smarter for a new coach with verified listings and reviews. (Coming Soon)</li>
          <li>🌍 International competition results and statistics. (Coming Soon)</li>
        </ul>
      </div>
      <p className="m-8 p-2 text-primary-950 leading-loose font-semibold">If you'd like to support current and future development of this project, consider upgrading to our Lift Oracle Pro tier. For the cost of one latte per month, Pro-tier members can take advantage of the following features:</p>
      <div className="m-8">
        <ul className="list-none m-8 p-2 text-gray-700 text-sm md:text-m space-y-2">
            <li>💾 Build and save unlimited watchlists. Keep the competition at your fingertips.</li>
            <li>📲 Export watchlists and athlete statistics to Excel or Google Sheets. Step up your meet coaching and get an edge on the rest of your session.</li>
            <li>🔢 Automated meet coaching cards. Warm up your athletes on time, every time. (Coming soon)</li>
            <li>🔢 User-defined queries and analytics. Slice and dice to your hearts content. (Coming soon)</li>
            <li>🏗️ & many more to come...</li>
          </ul>
          <div>
              <stripe-buy-button
                  buy-button-id={buttonId}
                  publishable-key={pubKey}
                  customer-email={accountEmail}
                  client-reference-id={accountId}
                  >
              </stripe-buy-button> {/* add link to annual under this? */}
          </div>
      </div>
      <p className="m-8 p-2 text-primary-950 leading-loose font-semibold">You can also support Lift Oracle by:</p>
      <div className="m-8">
        <ul className="list-none m-8 p-2 text-gray-700 text-sm md:text-m space-y-2">
          <li>🎽 Scooping some gear at the <a className="url" href="https://milwaukeebarbell.com/gear">Milwaukee Barbell Gear Shop</a></li>
          <li>
            {coffeeURL && (
              <a className="url" href={coffeeURL}>
                ☕️ Buying us a coffee.
              </a>
            )}
          </li>
          <li>📨 Signing up for our weekly newsletter, <a className="url" href="https://milwaukeebarbell.com/links">Five Lift Friday</a>.</li>
          <li>🤝 Following Lift Oracle & Milwaukee Barbell around the web.</li>
        </ul>
      </div>
      <p className="ml-8 mb-8 mt-2 p-2 text-primary-950 leading-loose font-semibold">Cheers!</p>
    </div>
  )
};

export default About;

