
import React, {useState} from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import {
		InputWithActionContainer, 
		LayoutContainer, 
		PrimaryButton, 
		TopNavigationContainer, 
		TextFieldContainer,
		SecondaryButton
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

type TopNavState = {
	show_avatar_menu: boolean;
}

export class TopNavigation extends React.PureComponent<{}, TopNavState> {

	constructor(props: {}) {
		super(props);
		this.state ={
			show_avatar_menu: false,
		};
	}

	on_avatar_click = () => {
		this.setState({ ...this.state, show_avatar_menu: !this.state.show_avatar_menu});
	}

	render() {
		return (
				<TopNavigationContainer show_url={this.state.show_avatar_menu}>
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
								<div className="avatar" onClick={this.on_avatar_click}>
								</div>
								<div className="account-menu" >
									<Link href='/login'>Login</Link>
									<Link href='/sign_up'>Register</Link>
									<Link href={{pathname: "/sign_up/", query: { acc: 'psy' }}}>Register Psychiatrist</Link>
								</div>
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
				{(error?.length !== 0) && <p className="error">{error}</p>}
			</TextFieldContainer>
			);
}
