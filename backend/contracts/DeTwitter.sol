// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract DeTwitter {

    struct Tweet {
        uint id;
        address payable sender;
        string message;
        uint timestamp;
        uint likes;
        uint balance;
    }

    uint id = 0;

    event Tweeted(uint id, string tweetContent, address tweetedBy, uint twittedAt);
    event Supported(uint id, address by, address to, uint amount);
    event Liked(uint id, address by, address to);

    Tweet[] Tweets;

    function tweet(string memory _message) external {
        address payable twittedBy = payable(msg.sender);
        Tweets.push(Tweet(id, twittedBy, _message, block.timestamp, 0, 0));
        emit Tweeted(id, _message, msg.sender, block.timestamp);
        id++;
    }

    function getAllTweets() external view returns (Tweet[] memory){
        return(Tweets);
    }

    function like(uint _id) external {
        Tweets[_id].likes++;
        emit Liked(_id, msg.sender, Tweets[_id].sender);
    }

    function support(uint _id, uint _amount) external payable {
        address payable to = Tweets[_id].sender;
        to.transfer(_amount);
        Tweets[_id].balance += _amount;
        emit Supported(_id, msg.sender, Tweets[_id].sender, _amount);
    }
}