import React from 'react';
import './foot.css'
import telegarm from '../images/telegram.png'
import Instagram from '../images/instagram.png'
import email from '../images/email.png'
import linkedin from '../images/linkedin.png'
const Footer = () => {
  return (
    <footer className="footer">
         <h3>Contact Us:</h3>
      <ul className='ul'>
         
          <li><img src={email} alt="" /><a href="#" className='fo'>Email</a></li>
          <li><img src={linkedin} alt="" /><a href="#" className='fo'>linkedin</a></li>
          <li><img src={Instagram} alt="" /><a href="#" className='fo'>Instagram</a></li>
          <li><img src={telegarm} alt="" /><a href="#" className='fo'>Telegram</a></li>
        </ul>
        <h6>Copyright &copy 20204 LinkE.com</h6>
    </footer>
  );
};

export default Footer;