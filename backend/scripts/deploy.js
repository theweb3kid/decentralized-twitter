const main = async () => {
    const deTwitterContractFactory = await hre.ethers.getContractFactory("DeTwitter");
    const deTwitter = await deTwitterContractFactory.deploy();
    await deTwitter.deployed();

    console.log("Contract Deployed To: ", deTwitter.address);

    const [owner] = await hre.ethers.getSigners();

    console.log("Contact Deployed By: ", owner.address);

}

const runMain = async () => {
    try{
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runMain()