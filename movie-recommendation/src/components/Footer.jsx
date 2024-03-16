import React from 'react';
import './foot.css'
import telegarm from '../images/telegram.png'
import Instagram from '../images/instagram.png'
import email from '../images/email.png'
import linkedin from '../images/linkedin.png'
const Footer = () => {
  return (
    <footer className=" flex bottom-0 left-0 w-full bg-gray-800 text-white text-center py-4">
         
           <li><img src={email} alt="" /><a href="#" className='fo'>Email</a></li>
           <li><img src={linkedin} alt="" /><a href="#" className='fo'>linkedin</a></li> 
           <li><img src={Instagram} alt="" /><a href="#" className='fo'>Instagram</a></li> 
           <li><img src={telegarm} alt="" /><a href="#" className='fo'>Telegram</a></li> 
        <h6 className='flex items-center justify-center h-full ml-[50%]'>Copyright &copy Group one 2024 </h6>
    </footer>
  );
};

export default Footer;