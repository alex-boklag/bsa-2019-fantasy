import React, { ReactNode, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';

type ButtonProps = {
  className?: string;
  type?: 'link' | 'button';
  href?: string;
  styling?: 'primary' | 'secondary';
  onClick?: (e: SyntheticEvent) => void;
  children: ReactNode;
};

const Button = (props: ButtonProps) => {
  const stylingClasses = {
    primary:
      'bg-primary text-secondary border-primary hover:bg-secondary hover:text-white hover:border-secondary',
    secondary:
      'bg-white border-secondary2 hover:bg-secondary hover:text-white hover:border-secondary',
  };

  const styling = props.styling || 'primary';
  const className = `border-2 font-semibold uppercase rounded px-6 py-2 ${stylingClasses[styling]} ${props.className}`;

  switch (props.type) {
    case 'link':
      if (props.href) {
        return (
          <Link to={props.href} className={className} onClick={props.onClick}>
            {props.children}
          </Link>
        );
      }
      return <div className={className}>{props.children}</div>;
    default:
      return (
        <button className={className} onClick={props.onClick}>
          {props.children}
        </button>
      );
  }
};

export default Button;