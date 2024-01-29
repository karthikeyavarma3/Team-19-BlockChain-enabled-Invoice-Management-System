async function fetchWalletBalance(accountAddress) {
    try {
        const web3 = new Web3(window.ethereum);
        const balance = await web3.eth.getBalance(accountAddress);
        const balanceInEther = web3.utils.fromWei(balance, 'ether');
        return balanceInEther;
    } catch (error) {
        console.error('Error fetching wallet balance:', error.message);
        return 0;
    }
}