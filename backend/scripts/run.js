const main = async () => {
    const deTwitterContractFactory = await hre.ethers.getContractFactory("DeTwitter");
    const deTwitter = await deTwitterContractFactory.deploy();
    await deTwitter.deployed();

    const [owner, randomPerson] = await hre.ethers.getSigners();

    console.log("Contract Deployed At: ", deTwitter.address);
    console.log("Contract Deployed By: ", owner.address);

    let tweet;
    tweet = await deTwitter.tweet("My First Tweet");
    tweet = await deTwitter.connect(randomPerson).tweet("My Second Tweet")

    let like;
    like = await deTwitter.like(1);
    like = await deTwitter.like(0);

    let allTweets;
    allTweets = await deTwitter.getAllTweets();
    
    console.log(allTweets);
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runMain()