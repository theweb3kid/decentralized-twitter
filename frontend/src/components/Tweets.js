import React, { useState } from "react";
import styled from "styled-components";
import user from "./images/user2.png";
import wallet from "./images/wallet.png";
import like from "./images/like.png";

const Tweet = styled.div`
	width: 100vw;
	color: white;
	padding: calc(5rem + 5vw) 10vw;
	display: flex;
	align-items: start;
	justify-content: center;
	border-top: 1px solid rgba(255, 255, 255, 0.3);
	border-bottom: 1px solid rgba(255, 255, 255, 0.3);
	padding: 1rem;
	font-family: "IBM Plex Sans Thai Looped", sans-serif;

	.user {
		width: 10%;
		margin: 0;
		padding: 0;
	}

	.userImg {
		height: calc(1.6rem + 1.2vw);
		cursor: not-allowed;
	}

	.content {
		width: 80%;
		text-align: left;
	}

	h3 {
		margin: 0;
		padding: 0 5px;
		font-size: calc(1rem + 0.8vw);
		font-weight: 500;
		width: 50vw;
		overflow-x:hidden;
	}

	p {
		margin: 0;
		padding: 3px 5px;
		font-size: calc(0.8rem + 0.7vw);
		width: 70vw;
		text-align: left;
	}

	.buttons {
		display: flex;
		align-items: center;
		margin-top: 10px;
        width: 70vw;
        justify-content: space-evenly;
	}

	.buttons img {
		height: calc(1.2rem + 1vw);
		cursor: pointer;
	}

	.buttons h4 {
		margin: 0;
        font-weight: 400;
		font-size: calc(0.8rem + 0.6vw);
		color: rgba(255, 255, 255, 0.8);
	}

	button {
		color: white;
		border: none;
		height: calc(1.4rem + 1.4vh);
		width: calc(5rem + 3vw);
		border-radius: calc(0.7rem + 0.7vh);
		font-size: calc(0.8rem + 0.7vw);
		background-color: #1DA1F2;
	}
	
	input {
		font-size: calc(0.8rem + 0.6vw);
		height: auto;
		width: 20vw;
		background: transparent;
		border: none; 
		color: white;
	}

	input:focus {
		outline: none;
	}

	.tweetHead {
		display: flex;
		width: 80vw;
		justify-content: space-between;
		align-items: start;
	}

	.tweetHead h4{
		margin: auto;
		padding: auto;
		color: rgba(255,255,255,0.8);
		width: 20vw;
		align-items: center;
		overflow-x:hidden;
	}
`;

const Tweets = (props) => {
	const [tweeter, setTweeter] = useState("Tweeted By");
	const [tweetContent, setTweetContent] = useState(
		`Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
        optio, eaque rerum! Provident similique accusantium nemo autem.`,
	);
	const [likeCount, setLikeCount] = useState(0);
	const [funded, setFunded] = useState(0);
	const [date, setDate] = useState("Mon dd/mm/yy");
	const [fundAmount, setFundAmount] = useState(0);

	const liked = () => {
		console.log("Liked");
		let count = likeCount;
		count++;
		setLikeCount(count);
	};

	const fund = () => {
		console.log("Funded");
		let count = funded;
		count += 0.01;
		count = Math.round(count * 100) / 100;
		setFunded(count);
	};

	const support = () => {
		console.log(fundAmount);
	}

	const data = props.tweetData;
	const id = data[0].toNumber()
	const likes = data[4].toNumber()
	const balance = data[5].toNumber()
	const dateInfo = data[3].toString() * 1000;
	const dateConversion = new Date(dateInfo);
	const dateFormatting = dateConversion.toLocaleDateString("en-US")
	
	return (
		<Tweet>
			<div className="user">
				<img
					className="userImg"
					src={user}
					alt="user"
				/>
			</div>
			<div className="content">
				<div className="tweetHead">
				<h3>{props.tweetData[1]}</h3>
				<h4>{dateFormatting}</h4>
				</div>
				<p>{props.tweetData[2]}</p>
				<div className="buttons">
					<img
						onClick={liked}
						src={like}
						alt="user"
					/>
					<h4>{likes}</h4>
					<img
						onClick={fund}
						src={wallet}
						alt="user"
					/>
					<h4>{balance} Eth</h4>
                    <input placeholder="Enter Amount..." type={"number"} onChange={e => setFundAmount(e.target.value)}/>
					<button onClick={support}>Fund</button>
				</div>
			</div>
		</Tweet>
	);
};

export default Tweets;
