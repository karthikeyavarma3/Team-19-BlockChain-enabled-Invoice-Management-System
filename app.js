// app.js

const Web3 = require('web3');
const fs = require('fs');

let web3;
let contractInstance;
let isInitialized = false;

async function init() {
    
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            /
            await window.ethereum.request({ method: "eth_requestAccounts" });
        } catch (error) {
            console.error("User denied account access");
        }
    }


    
    else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
    }
    
    else {
        web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

        isInitialized = true;

        bindEvents();
    }

    
    const contractABI = JSON.parse(fs.readFileSync('name.abi', 'utf8'));

    
    const contractAddress = '0xFe6Dd2D95F072B4402E1487F95d7D1D76FC71C4b';

    
    contractInstance = new web3.eth.Contract(contractABI, contractAddress);

    
    web3.eth.getAccounts(function (error, accounts) {
        if (!error) {
            document.getElementById('walletAddress').innerHTML = accounts[0];
        }
    });

    
    bindEvents();
}


function bindEvents() {
    document.querySelector('.create-invoice').addEventListener('click', createInvoice);
    document.querySelector('.get-invoice').addEventListener('click', getInvoiceDetails);
    document.querySelector('.pay-invoice').addEventListener('click', payInvoice);
}


async function createInvoice() {

    if (!isInitialized) {
        console.error('Web3 is not yet initialized. Please wait for initialization to complete.');
        return;
    }

    const customer_wallet = document.getElementById('inputCustomer').value;
    const invoice_amount = document.getElementById('inputAmount').value;
    const invoice_comments = document.getElementById('inputComments').value;
    const invoice_due_date_gregorian = document.getElementById('inputDueDate').value;
    const invoice_due_date_unix = (new Date(invoice_due_date_gregorian).getTime()) / 1000;

    
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    try {
        const result = await contractInstance.methods.createInvoice(customer_wallet, invoice_amount, invoice_due_date_unix, invoice_comments).send({ from: account });
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}


async function getInvoiceDetails() {
    const invoiceId = document.getElementById('inputInvoiceId').value;

    try {
        const result = await contractInstance.methods.getInvoice(invoiceId).call();
        console.log(result);
        
    } catch (error) {
        console.error(error);
    }
}


async function payInvoice() {
    const invoiceId = document.getElementById('inputInvoiceId').value;
    const paymentAmount = document.getElementById('inputPaymentAmount').value;

    
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    try {
        const result = await contractInstance.methods.payInvoice(invoiceId).send({
            from: account,
            value: web3.utils.toWei(paymentAmount, 'ether')
        });
        console.log(result);
        
    } catch (error) {
        console.error(error);
    }
}

window.onload = init;
