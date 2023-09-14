import {post} from './axiosSystem';
import {get} from './axiosSystem';

//함수명 기능명뒤에 API붙이기
//변수명이랑 라벨명이랑 같게 처리
export function setToken(tokenAddress,callback) {
	post('nft/setToken',
		{
            tokenAddress: tokenAddress
        }
		,callback);
}

export function mintNFT(accountPirvate, tokenURI, price, callback) {
	post('nft/mintNFT',
		{   
            accountPirvate: accountPirvate,
            tokenURI : tokenURI,
            price : price
        }
		,callback);
}

export function saleNFT(accountPirvate, tokenId, price, callback) {
	post('nft/saleNFT',
		{   
            accountPirvate: accountPirvate,
            tokenId : tokenId,
            price : price
        }
		,callback);
}

export function buyNFT(accountPirvate, tokenId, callback) {
	post('nft/buyNFT',
		{   
            accountPirvate: accountPirvate,
            tokenId : tokenId
        }
		,callback);
}

export function getAllNftList(callback) {
	post('nft/getAllNftList',
		callback);
}

export function getNftOwnerList(account, callback) {
	post('nft/getNftOwnerList',
    {   
        account: account
    },
		callback);
}

export function getSaleAllNftList(callback) {
	post('nft/getSaleAllNftList',
		callback);
}

export function getSaleOwnerNftList(account, callback) {
	post('nft/getSaleOwnerNftList',
    {   
        account: account
    },
		callback);
}

export function balanceOf(account, tokenId, callback) {
	post('nft/balanceOf',
		{      
            account: account
        }
		,callback);
}

export function transfer(accountPirvate, recipient, amount, callback) {
	post('nft/transfer',
		{      
            accountPirvate : accountPirvate,
            recipient : recipient,
            amount : amount
        }
		,callback);
}

export function approve(accountPirvate, amount, callback) {
	post('nft/approve',
		{      
            accountPirvate : accountPirvate,
            amount : amount
        }
		,callback);
}

