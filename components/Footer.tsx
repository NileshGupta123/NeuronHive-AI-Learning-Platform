import React from 'react';
import { GithubIcon } from './icons/GithubIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { MailIcon } from './icons/MailIcon';
import { LinkIcon } from './icons/LinkIcon';

export const Footer: React.FC = () => {
  const socialLinks = [
    {
      href: 'https://unrivaled-sorbet-464e74.netlify.app/',
      icon: <LinkIcon className="h-5 w-5" />,
      label: 'Portfolio',
    },
    {
      href: 'https://github.com/NileshGupta123',
      icon: <GithubIcon className="h-5 w-5" />,
      label: 'GitHub',
    },
    {
      href: 'https://www.linkedin.com/in/nilesh-gupta-87283224a',
      icon: <LinkedInIcon className="h-5 w-5" />,
      label: 'LinkedIn',
    },
    {
      href: 'mailto:nileshgupta48224@gmail.com',
      icon: <MailIcon className="h-5 w-5" />,
      label: 'Email',
    },
  ];

  return (
    <footer className="w-full mt-auto">
      <div className="container mx-auto px-4 py-8 text-center text-gray-500">
        <div className="flex justify-center space-x-6 mb-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-gray-500 hover:text-white transition-colors"
            >
              {link.icon}
            </a>
          ))}
        </div>
        <p className="text-sm mb-2">
            Created by Nilesh Gupta
        </p>
        <p className="text-sm">
          © {new Date().getFullYear()} NeuronHive. All rights reserved.
        </p>
      </div>
    </footer>
  );
};