
import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import {
    InputWithActionContainer, 
    LayoutContainer, 
    PrimaryButton, 
    TopNavigationContainer, 
    TextFieldContainer
} from './styles/component';

interface ILayoutProps {

}

class Layout extends React.PureComponent {
  render() {
    return (
      <LayoutContainer>
        {this.props.children}
      </LayoutContainer>
    )
  }
}

export default Layout;


export class TopNavigation extends React.PureComponent {
  render() {
    return (
      <TopNavigationContainer>
        <div>
          <h3>Elsie Interactive</h3>
        </div>
        <div>
          <ul>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <Link href='/contact'>Contact Us</Link>
            </li>
            <li>
              <Link href='/donate'>Donate</Link>
            </li>
            <li>
              <Link href='/login'>Login</Link>
            </li>
          </ul>
        </div>
      </TopNavigationContainer>
    )
  }
}

type InputWithActionProps = {
  value: string;
  set_value: (value: string) => void;
}

export const InputWithAction: React.FC<InputWithActionProps> = () => {
  return(
    <InputWithActionContainer>
      <input type="text" placeholder="Email"/>
      <PrimaryButton>Subscribe</PrimaryButton>
    </InputWithActionContainer>
  )
}

type TextFieldProps = {
    label: string;
    value: string;
    set_value: (val: string) => void;
};

export const TextField: React.FC<TextFieldProps> = ({ label, value, set_value }: TextFieldProps) => {
    return (
    <TextFieldContainer>
        <p>{label}</p>
        <input value={value} onChange={(event) => set_value(event.target.value) }/>
    </TextFieldContainer>
   );
}
