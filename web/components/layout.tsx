
import React, {useState} from 'react';
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
	input_type?: string;
	set_value: (val: string) => void;
	validation?: (val: string) => boolean;
	on_error_message?: string;
};

export const TextField: React.FC<TextFieldProps> = ({ label, value, set_value, validation, on_error_message, input_type  }: TextFieldProps) => {
	const [error, set_error] = useState<string|undefined>("");

	return (
			<TextFieldContainer>
				<p>{label}</p>
				<input
					value={value}
					onChange={(event) => set_value(event.target.value) } 
					type={input_type === undefined ? "text" : input_type}
					onBlur={(event) => {
						if(validation?.(event.target.value) === false && on_error_message !== undefined) {
							set_error(on_error_message);
						} else {
							set_error(undefined);
						}
				}}
				/>
				{(error?.length !== undefined && error !== 0) && <p className="error">{error}</p>}
			</TextFieldContainer>
			);
}
