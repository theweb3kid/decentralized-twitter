import React from "react";
import styled from "styled-components";
import user from "./images/user.png";
import stars from "./images/stars.png";

const Head = styled.div`
	color: white;
	width: 100vw;
	position: absolute;
	display: flex;
	align-items: center;
	padding: 1rem 0;
	font-family: "IBM Plex Sans Thai Looped", sans-serif;
	font-weight: 600;
	font-size: calc(1rem + 0.5vw);
	z-index: 3;

	.user {
		border-radius: 50%;
		height: calc(1.6rem + 1.2vw);
		margin: 0 0.5rem 0 1.5rem;
        cursor: not-allowed;
	}

	.home {
		margin: 0 calc(2vw);
        color: rgba(255,255,255, 0.8);
        cursor: pointer;
	}

    .home:hover {
        color: white;
    }

	.stars {
		border-radius: 50%;
		height: calc(1.6rem + 1.2vw);
		position: absolute;
		right: 1.5rem;
        cursor: not-allowed;
	}

	.wallet {
		max-width: 30vw;
		overflow-x: hidden;
		position: absolute;
		right: 5rem;
        cursor: pointer;
		color: rgba(29,161,242,0.6);

	}

	.wallet:hover {
		color: rgba(29,161,242,1);
	}
`;

const Header = (props) => {
	return (
		<Head>
			<img className="user" src={user} alt="user"/>
			<div className="home">Home</div>
			{!props.currentAccount ? <div className="wallet" onClick={props.connectWallet} >Connect Metamask</div> : <div className="wallet">Connected</div>}
			<img className="stars" src={stars} alt="stars"/>
		</Head>
	);
};

export default Header;
