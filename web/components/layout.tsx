
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
import {LIGHT_GREY, SURFACE, BACKGROUND_ALT, SHADOW_COLOR, PRIMARY_COLOR} from './styles/theme';

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
						<h3>Elsie Interactive</h3>
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
									<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
								</div>
								<div className="account-menu" >
									<Link href='/login'>Login</Link>
									<Link href='/sign_up'>Register</Link>
									<Link href={{pathname: "/sign_up/", query: { acc: 'psy' }}}>Register Psychiatrist</Link>
								</div>
							</li>
					</ul>
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
	className?: string;
	input_type?: string;
	set_value: (val: string) => void;
	validation?: (val: string) => boolean;
	on_error_message?: string;
	on_focus?: () => void;
};

export const TextField: React.FC<TextFieldProps> = ({ className, label, value, set_value, validation, on_error_message, input_type, on_focus  }: TextFieldProps) => {
	const [error, set_error] = useState<string|undefined>("");

	return (
			<TextFieldContainer className={className}>
				<p>{label}</p>
				<input
					value={value}
					onChange={(event) => set_value(event.target.value) } 
					type={input_type === undefined ? "text" : input_type}
					onFocus={on_focus}
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

export const TextAreaStyle = styled.textarea`
	border: 2pt solid ${LIGHT_GREY};
`;

type TextAreaProps = {
	value: string;
	set_value: (val: string) => void;
}

export const TextArea: React.FC<TextAreaProps> = ({value, set_value}) => {
	return <TextAreaStyle 
		value={value} 
		onChange={(event) => set_value(event.target.value)}
	/>
}


export const DropDownMenuStyle =  styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	width: 100%;
	box-sizing: border-box;
	margin-bottom: 8pt;

	.item {
		border: 1pt solid ${LIGHT_GREY};
		width: 100%;
		padding: 10pt 8pt;
		background-color: ${SURFACE};
		box-sizing: border-box;
	}

	.menu {
		display: flex;
		flex-direction: column;
		position: absolute;
		top: 100%;
		width: 100%;
		background-color: ${SURFACE};
		padding: 4pt;
		border-radius: 8pt;
		box-sizing: border-box;
		box-shadow: 4pt 4pt 8pt ${SHADOW_COLOR};

		span {
			display: flex;
			width: 100%;
			padding: 10pt 8pt;
			cursor: pointer;
			box-sizing: border-box;
		}

		span:hover {
			background-color: ${BACKGROUND_ALT};
		}
	}

`

type DropDownMenuProps = {
	items: string[]
	value?: number;
	on_item_select: (id: number) => void;
}

export const DropDownMenu: React.FC<DropDownMenuProps> = ({ items, on_item_select, value }) => {
	const [selected_item, set_selected] = useState(value ?? 0);
	const [show_menu, set_show_menu] = useState(false);

	return <DropDownMenuStyle className="drop-down">
		<span className="item" onClick={() => set_show_menu(!show_menu)}>{items[selected_item]}</span>
		{show_menu && <div className="menu">
			{items.map((val: string, index: number) => {
			 	return <span 
				 key={index} 
				 onClick={() => {
					 set_selected(index); 
					 set_show_menu(false)
					 on_item_select(index)
					}}>{val}</span>
			})
			}
		</div>}
	</DropDownMenuStyle>
}



const RadioButtonStyles = styled.div<{is_clicked: boolean}>`
	height:24pt;
	width: 24pt;
	border: ${ (props) =>  props.is_clicked ? "none"  :  `1pt solid ${LIGHT_GREY}`};
	border-radius: 50%;

	background-color: ${(props) => props.is_clicked ? PRIMARY_COLOR : "white"};
`;

export const RadioButton: React.FC<{is_clicked?: boolean, on_click: () => void}> = ({is_clicked, on_click}) => {
	return <RadioButtonStyles is_clicked={is_clicked === true} onClick={on_click}>
		
	</RadioButtonStyles>;
}