import React from 'react';

import GitHub from '../components/social/icons8-github-30.png'
import LinkedIn from '../components/social/icons8-linkedin-circled-30.png'

import { Link } from 'react-router-dom';



const Footer = () => {

  const socialLinks = [
    {name:'github', icon: GitHub, link: 'https://github.com/westoleaboat/react-graphql-bp' },
    {name:'linkedin', icon: LinkedIn, link: 'https://www.linkedin.com/in/tomas-chacon-76560993/'  }
];
    
    
  return (
    <footer>

      <div class="container">

        <p>&copy; {new Date().getFullYear()} MINDSCAPE CHRONICLES & perennial philosofy.</p>

        <ul>
            {socialLinks.map(({ name, icon, link }, index) => (

            <li key={index}>
                <Link to={link} title={name} class="icon" target="_blank" rel="noopener noreferrer"><img src={icon} /></Link>

            </li>
            ))}
        </ul>

      </div>

    </footer>
  );
};


export default Footer;
