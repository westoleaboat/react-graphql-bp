import React from 'react';

import GitHub from '../components/social/icons8-github-30.png'
import LinkedIn from '../components/social/icons8-linkedin-circled-30.png'



const Footer = () => {

  const socialLinks = [
    {name:'github', icon: GitHub },
    {name:'linkedin', icon: LinkedIn  }
];
    
    
  return (
    <footer>
      <div class="container">

      <p>&copy; {new Date().getFullYear()} MINDSCAPE CHRONICLES & perennial philosofy.</p>
      {/* <p>&copy; {new Date().getFullYear()} <a href='/'><img src='https://26159260.fs1.hubspotusercontent-eu1.net/hubfs/26159260/personalBlog/MINDSCAPEClogoHEAD.svg' /></a></p> */}

        <ul>
            {socialLinks.map(({ name, icon }, index) => (

            <li key={index}>
                <a href='#' title={name} class="icon"><img src={icon} /></a>

            </li>
            ))}
        </ul>

      </div>

    </footer>
  );
};


export default Footer;
