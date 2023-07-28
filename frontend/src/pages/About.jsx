import React, { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = 'http://192.168.86.27:5000'
// const baseUrl = 'http://192.168.1.139:5000'

const About = ({isLoggedIn}) => {
  const [accountEmail, setAccountEmail] = useState(null);
  const [coffeeURL, setCoffeeURL] = useState('');
  
  useEffect(() => {
    const getAccount = async () => {
      console.log(isLoggedIn);

      const token = localStorage.getItem('token');
      const credentials = btoa(`${token}:unused`);

      try {
        const response = await axios.get(`${baseUrl}/user/account`, {

          headers: {
            Authorization: `Basic ${credentials}`,
          },
        });

        setAccountEmail(response.data.email);
        // console.log(accountEmail);
        const encodedEmail = encodeURIComponent(response.data.email);
        setCoffeeURL(`https://buy.stripe.com/test_9AQaEQ8XLdfk6UocMO?prefilled_email=${encodedEmail}`);
        
      } catch (error) {
        console.error(error);
        setCoffeeURL(`https://buy.stripe.com/test_9AQaEQ8XLdfk6UocMO`);
        // Handle the error
      }
      console.log(coffeeURL);
      
    };

    getAccount();
  }, []); // Empty dependency array to run the effect only once

  return(
    <div className="sm:w-2/3 bg-gradient-to-r from-transparent via-cyan-50 to-transparent">
      {/* <h1 className="text-primary-950 font-bold text-3xl p-2 mt-4 mx-8 leading-relaxed">About</h1> */}
      <p className="m-8 p-2 text-primary-950 leading-loose font-semibold">Lift Oracle was conceived and forged from the keyboards of Milwaukee Barbell. We are massive weightlifting nerds who have been coaching and competing in this sport for over a decade.</p>
      <p className="m-8 p-2 text-primary-950 leading-loose">One crisp spring morning early in 2023, we found ourselved reminiscing and mourning the loss of the pioneering weightlifting data site, OlyStats. Inspired to carry on and advance the spirit of OlyStats, we started on our quest to build out a modern intelligence platform for weightlifting. Athletes, competitions, advanced statistics. <span className="font-semibold">The Lift Oracle.</span></p>
      <p className="m-8 p-2 text-primary-950 leading-loose font-semibold">The core features of Lift Oracle will remain free forever.</p>
      <div className="m-8">
        <ul className="list-none m-8 p-2 text-gray-700 text-sm md:text-m space-y-2">
          <li>🏋️‍♂️ Historical Results for x,000+ athletes and counting</li>
          <li>💡 Competition results for 4,000+ local and national events.</li>
          <li>🔎 Build session watchlists to compare athletes head-to-head.</li>
          <li>👩‍💻 Basic and advanced statistics, ilterable by gender, weight class, competition, & beyond.</li>
        </ul>
      </div>
      <p className="m-8 p-2 text-primary-950 leading-loose font-semibold">If you'd like to support current and future development of this project, consider upgrading to our Lift Oracle Pro tier. For the cost of one latte per month, Pro-tier members can take advantage of the following features:</p>
      <div className="m-8">
        <ul className="list-none m-8 p-2 text-gray-700 text-sm md:text-m space-y-2">
            <li>💾 Build and save unlimited watchlists. Keep the competition at your fingertips.</li>
            <li>📲 Export watchlists and statistics to Excel. Step up your meet coaching and get an edge on the rest of your session.</li>
            <li>🏗️ & many more to come...</li>
          </ul>
          <div>
              
              {accountEmail && (<stripe-buy-button
                  buy-button-id="buy_btn_0NTsunUiMszhBUnlaOwffE0u"
                  publishable-key="pk_test_uEKFcjNO1MXNGCbFWJK1eymn"
                  customer-email={accountEmail}
                  >
              </stripe-buy-button>)}
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

