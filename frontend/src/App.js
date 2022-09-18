import "./App.css";
import styled from "styled-components";
import Header from "./components/Header";
import Tweets from "./components/Tweets";
import TweetInput from "./components/TweetInput";
import ABI from "./components/DeTwitter.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

const Background = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	position: fixed;
	z-index: -1;
	background-color: black;
`;

const Main = styled.div`
	top: 0;
	position: absolute;
	left: 0;
	right: 0;
	height: auto;
`;

const Warn = styled.div`
	position: absolute;
	left: 0;
	right: 0;
	width: 60vw;
	padding: 40vh 20vw;
	color: rgba(29, 161, 242, 0.8);
	font-size: calc(1rem + 0.5vw);
	font-weight: 600;
`;

function App() {
	const contractAddress =
		"0x6192408509F8427898f404bFB6d527286BBB618D";

	const contractABI = ABI.abi;

	const [currentAccount, setCurrentAccount] =
		useState("");

	const [gotAllTweets, setGotAllTweets] = useState([]);

	const checkIfWalletIsConnected = async () => {
		try {
			const { ethereum } = window;

			if (!ethereum) {
				console.log("You Need Metamask");
			} else {
				console.log(
					"Ethereum Object Found: ",
					ethereum,
				);
			}

			const accounts = await ethereum.request({
				method: "eth_accounts",
			});

			if (accounts.length !== 0) {
				const account = accounts[0];
				console.log(
					"Valid Account Found: ",
					account,
				);
				setCurrentAccount(account);
				getAllTweets();
			} else {
				console.log("No Account Found");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const connectWallet = async () => {
		try {
			const { ethereum } = window;

			const accounts = await ethereum.request({
				method: "eth_requestAccounts",
			});

			console.log("Connected: ", accounts[0]);
			setCurrentAccount(accounts[0]);
		} catch (error) {
			console.log(error);
		}
	};

	const tweet = async (message) => {
		const { ethereum } = window;

		const provider = new ethers.providers.Web3Provider(
			ethereum,
		);
		const signer = provider.getSigner();

		const deTwitterContract = new ethers.Contract(
			contractAddress,
			contractABI,
			signer,
		);

		let tweeting = await deTwitterContract.tweet(
			message,
		);
		console.log("Mining...", tweeting.hash);
		tweeting.wait();
		console.log("Mined...", tweeting.hash);
	};

	const like = async (id) => {
		const { ethereum } = window;

		const provider = new ethers.providers.Web3Provider(
			ethereum,
		);
		const signer = provider.getSigner();

		const deTwitterContract = new ethers.Contract(
			contractAddress,
			contractABI,
			signer,
		);

		let like = await deTwitterContract.like(id);
		console.log("Mining...", like.hash);
		like.wait();
		console.log("Mined...", like.hash);
	};

	const support = async (id, amount) => {
		const { ethereum } = window;

		const provider = new ethers.providers.Web3Provider(
			ethereum,
		);
		const signer = provider.getSigner();

		const deTwitterContract = new ethers.Contract(
			contractAddress,
			contractABI,
			signer,
		);

		let support = await deTwitterContract.support(
			id,
			amount,
		);
		console.log("Mining...", support.hash);
		support.wait();
		console.log("Mined...", support.hash);
	};

	const getAllTweets = async () => {
		const { ethereum } = window;

		const provider = new ethers.providers.Web3Provider(
			ethereum,
		);
		const signer = provider.getSigner();

		const deTwitterContract = new ethers.Contract(
			contractAddress,
			contractABI,
			signer,
		);

		let allTweets =
			await deTwitterContract.getAllTweets();

		console.log(allTweets);
		setGotAllTweets(allTweets);
	};

	useEffect(() => {
		checkIfWalletIsConnected();
	}, []);

	return (
		<div className="App">
			<Background />
			<Header
				currentAccount={currentAccount}
				connectWallet={connectWallet}
			/>
			<Main>
				{!currentAccount ? "" :<TweetInput tweet={tweet} />}
				{!currentAccount ? (
					<Warn>
						
							Connect Your Metamask Account At
							Top Right Corner To Access Full
							Funtionality Of Decentralized
							Twitter
						
					</Warn>
				) : (
					
					gotAllTweets.map((tweet, id) => {
						return (
							<Tweets
								key={id}
								tweetData={tweet}
								like={like}
								support={support}
							/>
						);
					})
				)}
			</Main>
		</div>
	);
}

export default App;
