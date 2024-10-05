pragma solidity ^0.5.8;

contract ContentPlatform {
    struct Content {
        string creator;
        uint256 tips;
    }

    mapping(uint => Content) public contents;
    address public owner;

    constructor() public {
        owner = msg.sender;
    }

    // Tip a content creator
    function tipCreator(uint contentId) public payable {
        require(msg.value > 0, "Tip must be greater than 0");
        contents[contentId].tips += msg.value;
    }

    // Subscribe to the platform
    function subscribe() public payable {
        require(msg.value == 1000000, "Subscription costs 1 TRX");
    }

    // Loan NFT function
    function loanNFT(address borrower) public {
        // Incomplete: You can add NFT loaning logic here.
    }

    // Withdraw tips by content creator
    function withdrawTips(uint contentId) public {
        uint256 amount = contents[contentId].tips;
        contents[contentId].tips = 0;
        msg.sender.transfer(amount);
    }
}
