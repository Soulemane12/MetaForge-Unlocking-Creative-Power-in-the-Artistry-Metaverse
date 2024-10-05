// TRON testnet URL (not needed for fake functionality but kept for minting)
const fullNode = 'https://api.nileex.io';  // Nile Testnet URL
const solidityNode = 'https://api.nileex.io';
const eventServer = 'https://api.nileex.io';

// Your contract details
const contractAddress = 'TXpD6hJrVjTUvumpqDSiGygDYvUyhvZQYe'; // Deployed contract address
const walletAddress = 'TAdJWu8AK1M1wG5HBuqnd1beSgSQE52LAf';  // Your wallet address
const privateKey = '60dfed410e86a524fcac0f01ba84e3d83bc182295707fc210bba0e9a27545370';  // Insert your private key here

console.log('Checking if TronWeb is available:', window.TronWeb);

// Wait until TronWeb is available
function initializeTronWeb() {
    if (window.tronWeb && window.tronWeb.ready) {
        console.log('Using TronLink for TronWeb');
        return window.tronWeb;
    } else if (typeof window.TronWeb !== 'undefined') {
        console.log('Using TronWeb from CDN with private key');
        return new window.TronWeb(fullNode, solidityNode, eventServer, privateKey);
    } else {
        console.error('TronWeb is not available.');
        return null;
    }
}

// Initialize TronWeb
const tronWeb = initializeTronWeb();

if (!tronWeb) {
    console.error('Failed to initialize TronWeb.');
} else {
    const contractABI = [
        {
            "constant": false,
            "inputs": [{"internalType": "address", "name": "borrower", "type": "address"}],
            "name": "loanNFT",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "name": "contents",
            "outputs": [{"internalType": "string", "name": "creator", "type": "string"}, {"internalType": "uint256", "name": "tips", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [{"internalType": "uint256", "name": "contentId", "type": "uint256"}],
            "name": "tipCreator",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "subscribe",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [{"internalType": "uint256", "name": "contentId", "type": "uint256"}],
            "name": "withdrawTips",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];

    // Check TronWeb readiness
    function checkTronWeb() {
        if (tronWeb) {
            console.log('TronWeb is ready');
        } else {
            console.error('TronWeb is not available.');
        }
    }

    checkTronWeb();

    // Minting functionality (remains the same)
    let mintedNFTs = JSON.parse(localStorage.getItem('mintedNFTs')) || [];
    console.log('Loaded NFTs from localStorage:', mintedNFTs);

    document.getElementById('mint-form').addEventListener('submit', (event) => {
        event.preventDefault();
        console.log('Mint form submitted');
        const creatorName = document.getElementById('creator-name').value;
        const description = document.getElementById('description').value;
        const imageFile = document.getElementById('image-upload').files[0];

        if (creatorName && description && imageFile) {
            const reader = new FileReader();
            reader.onloadend = function() {
                const base64Image = reader.result;
                console.log('Image converted to Base64:', base64Image);
                mintNFT(creatorName, description, base64Image);
            };
            reader.readAsDataURL(imageFile);
        } else {
            alert('Please fill in all fields.');
        }
    });

    function mintNFT(creator, description, imageBase64) {
        try {
            const newNFT = {
                id: mintedNFTs.length + 1,
                creator: creator,
                description: description,
                image: imageBase64
            };
            mintedNFTs.push(newNFT);
            localStorage.setItem('mintedNFTs', JSON.stringify(mintedNFTs));
            console.log('NFT minted and saved to localStorage:', newNFT);
            alert('NFT successfully minted!');
        } catch (error) {
            console.error('Minting failed:', error);
        }
    }
}

// Fake Loan Request
document.getElementById('loan-request-btn').addEventListener('click', () => {
    alert('Loan request submitted! (Fake Implementation)');
});

// Fake 10GB Free Storage Display
document.getElementById('storage-system').addEventListener('click', () => {
    alert('You have 10GB of free storage! (Fake Implementation)');
});
