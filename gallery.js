const gallery = document.getElementById('gallery');
const mintedNFTs = JSON.parse(localStorage.getItem('mintedNFTs')) || [];
const currentUser = "Your Name";  // Set your username

console.log('Loaded NFTs from localStorage:', mintedNFTs);

function displayNFTs() {
    gallery.innerHTML = '';

    if (mintedNFTs.length === 0) {
        gallery.innerHTML = '<p>No NFTs minted yet.</p>';
        return;
    }

    mintedNFTs.forEach(nft => {
        const nftElement = document.createElement('div');
        nftElement.classList.add('nft-item');
        nftElement.innerHTML = `
            <h3>NFT #${nft.id}</h3>
            <img src="${nft.image}" alt="NFT Image">
            <p>Creator: ${nft.creator}</p>
            <p>${nft.description}</p>
            ${nft.creator !== currentUser ? `
                <button class="tip-btn" onclick="fakeTip()">Tip Creator</button>
                <button class="buy-btn" onclick="fakeBuy()">Buy</button>
            ` : `
                <button class="tip-btn" disabled>Tip Creator</button>
                <button class="sell-btn" onclick="fakeSell()">Sell</button>
            `}
        `;
        gallery.appendChild(nftElement);
    });
}

function fakeTip() {
    alert('Tipped Creator! (Fake Implementation)');
}

function fakeBuy() {
    alert('Purchased NFT! (Fake Implementation)');
}

function fakeSell() {
    alert('NFT Listed for Sale! (Fake Implementation)');
}

// Display the NFTs on page load
displayNFTs();
