[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amt",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_dueDate",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_comments",
				"type": "string"
			}
		],
		"name": "createInvoice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "reqInvoiceId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_status",
				"type": "string"
			}
		],
		"name": "updateInvoice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "s1",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "s2",
				"type": "string"
			}
		],
		"name": "compareStringsbyBytes",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "reqInvoiceId",
				"type": "uint256"
			}
		],
		"name": "getInvoice",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amt",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "dueDate",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "comments",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "status",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getNextUnpaidInvoice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "invoiceId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amt",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "dueDate",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "comments",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "status",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "paymentTo",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "paymentFrom",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "invoices",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "invoiceId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "dueDate",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "comments",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "status",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "payment_to",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "payment_from",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nextinvoiceId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]