// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DH721 is ERC721URIStorage, Ownable, ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    IERC20 token;
    struct NFTdata {
        uint256 tokenId;
        string tokenURI;
        uint256 price;
    }
    //@notion nft 가격
    mapping (uint256 => uint256) public nftPrice;
    //@notion nft 판매중인지 여부
    mapping (uint256 => bool) public IsSale;

    constructor () payable ERC721("DHNFT", "NFT") {}


    //@notion nft를 거래할 ERC20토큰 매칭
    function setToken (address _tokenAddress) public onlyOwner returns (bool) {
        require(_tokenAddress != address(0x0));
        token = IERC20(_tokenAddress);
        return true;
    }

    //@notion nft 거래함수
    //@params from 보내는 사람
    //@params to 받는 사람
    //@params tokenId 보낼 nftid
    //@params batchSize 특정동작에서 처리되는 데이터 크기 0이면 hock실행 안함
    function _beforeTokenTransfer(
        address _from,
        address _to,
        uint256 _tokenId,
        uint256 _batchSize
    ) internal override (ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(_from,_to,_tokenId,_batchSize);
    }

    //@notion nft를 소각하는 함수
    //@params tokenId 없앨 nftid
    function _burn(
        uint256 _tokenId
    ) internal override(ERC721, ERC721URIStorage){
        super._burn(_tokenId);
    }


    //@notion 인터페이스 지원여부 확인 함수
    //params interfaceId인터페이스 식별자
    function supportsInterface(bytes4 interfaceId) public view 
        override(ERC721URIStorage, ERC721Enumerable)
        returns (bool){
            return super.supportsInterface(interfaceId);
        }

    //@notion 특정 nft에 메타데이터 링크를 가져오는 함수
    //@params tokenId 메타데이터를 가져올 nftid
    function tokenURI(uint256 _tokenId)public view
        override (ERC721, ERC721URIStorage) returns (string memory){
            return super.tokenURI(_tokenId);
        }
    

    //@notion nft를 발행하는 함수
    //@params recipient nft를 받는 사람
    //@params tokenURI nft 메타데이터 링크
    //@params price nft가격
    function mintNFT(address _recipient, string memory _tokenURI, uint _price) public returns (uint256, uint256){
        _tokenIds.increment();


        uint256 newItemId = _tokenIds.current();
        //nft발행
        _mint(_recipient, newItemId);
        //nft 권한 721컨트랙트에게 위임
        approve(address(this), newItemId);
        //nft metadata URI설정
        _setTokenURI(newItemId, _tokenURI);
        //nft 가격설정
        nftPrice[newItemId] = _price;
        //nft 판매여부 설정
        IsSale[newItemId] = false;
        return (newItemId, nftPrice[newItemId]);
    }

    function saleNFT(uint256 _tokenId, uint256 _price) public {
        IsSale[_tokenId] = true;
        nftPrice[_tokenId] = _price;
    }

    function buyNFT(uint256 _tokenId) public {
        require(IsSale[_tokenId] == true, "Is not Sale");
        uint256 price = nftPrice[_tokenId];
        require(price > 0, "Invalid NFT price");
        require(
            token.allowance(msg.sender, address(this)) >= price,
            "Token allowance not set"
        );
        address seller = ownerOf(_tokenId);
        require(
            token.transferFrom(msg.sender, seller, price),
            "Token transfer failed"
        );
        IERC721(address(this)).safeTransferFrom(seller, msg.sender, _tokenId);
        //nft 판매여부 설정
        IsSale[_tokenId] = false;
    }


    //@notion 모든 nft리스트
    // @return nft의 id와 메타데이터 URI, price 담긴 배열 
    function getAllNftList() public view returns (NFTdata[] memory){
        uint256 nftLength = _tokenIds.current();
        NFTdata[] memory nftData = new NFTdata[](nftLength);

        for(uint256 i = 0; i < nftLength; i++){
            uint256 nftId = i + 1;
            string memory nftURI = tokenURI(nftId);
            uint256 nfrPrice = nftPrice[nftId];

            nftData[i] = NFTdata(nftId, nftURI, nfrPrice);
        }

        return nftData;
    }
    //@notion _owner가 갖고있는 모든 nft 리스트
    //@params _owner nft 소유자 계정
    //@retrun _owner nft의 id와 메타데이터 URI, price 담긴 배열 
    function getNftOwnerList(address _owner) public view returns (NFTdata[] memory){
        uint256 nftOwnerLength = balanceOf(_owner);
        NFTdata[] memory nftData = new NFTdata[](nftOwnerLength);

        for(uint256 i = 0; i < nftOwnerLength; i++){
            uint256 nftId =tokenOfOwnerByIndex(_owner, i);
            string memory nftURI = tokenURI(nftId);
            uint256 nfrPrice = nftPrice[nftId];

            nftData[i] = NFTdata(nftId, nftURI, nfrPrice);
        }

        return nftData;
    }

    function getSaleAllNftList() public view returns (NFTdata[] memory) {
        // 현재 발행된 NFT의 총 개수를 얻습니다.
        uint256 nftLength = _tokenIds.current();
        // 판매 중인 NFT의 개수를 카운트하기 위한 변수입니다.
        uint256 saleNftCount = 0;

        // 판매 중인 NFT의 개수를 세기 위한 루프
        for (uint256 i = 1; i <= nftLength; i++) {
            // 만약 i번째 NFT가 판매 중이라면
            if (IsSale[i]) {
                // 판매 중인 NFT 개수를 증가시킵니다.
                saleNftCount++;
            }
        }

        // 판매 중인 NFT 정보를 저장할 배열을 생성합니다.
        NFTdata[] memory saleNftData = new NFTdata[](saleNftCount);
        // 판매 중인 NFT 배열의 인덱스를 나타내는 변수입니다.
        uint256 saleNftIndex = 0;

        // 판매 중인 NFT의 정보를 배열에 추가하는 루프
        for (uint256 i = 1; i <= nftLength; i++) {
            // 만약 i번째 NFT가 판매 중이라면
            if (IsSale[i]) {
                // i번째 NFT의 메타데이터 URI를 얻습니다.
                string memory nftURI = tokenURI(i);
                // i번째 NFT의 가격을 얻습니다.
                uint256 nfrPrice = nftPrice[i];
                // 판매 중인 NFT의 정보를 배열에 저장합니다.
                saleNftData[saleNftIndex] = NFTdata(i, nftURI, nfrPrice);
                // 다음 인덱스로 이동합니다.
                saleNftIndex++;
            }
        }

        // 판매 중인 NFT 정보가 저장된 배열을 반환합니다.
        return saleNftData;
    }

    function getSaleOwnerNftList(address _owner) public view returns (NFTdata[] memory) {
        // 현재 발행된 NFT의 총 개수를 얻습니다.
        uint256 nftOwnerLength = balanceOf(_owner);
        // 판매 중인 NFT의 개수를 카운트하기 위한 변수입니다.
        uint256 saleNftCount = 0;

        // 판매 중인 NFT의 개수를 세기 위한 루프
        for (uint256 i = 1; i <= nftOwnerLength; i++) {
            // 만약 i번째 NFT가 판매 중이라면
            if (IsSale[i]) {
                // 판매 중인 NFT 개수를 증가시킵니다.
                saleNftCount++;
            }
        }

        // 판매 중인 NFT 정보를 저장할 배열을 생성합니다.
        NFTdata[] memory saleNftData = new NFTdata[](saleNftCount);
        // 판매 중인 NFT 배열의 인덱스를 나타내는 변수입니다.
        uint256 saleNftIndex = 0;

        // 판매 중인 NFT의 정보를 배열에 추가하는 루프
        for (uint256 i = 1; i <= nftOwnerLength; i++) {
            // 만약 i번째 NFT가 판매 중이라면
            if (IsSale[i]) {
                // i번째 NFT의 메타데이터 URI를 얻습니다.
                string memory nftURI = tokenURI(i);
                // i번째 NFT의 가격을 얻습니다.
                uint256 nfrPrice = nftPrice[i];
                // 판매 중인 NFT의 정보를 배열에 저장합니다.
                saleNftData[saleNftIndex] = NFTdata(i, nftURI, nfrPrice);
                // 다음 인덱스로 이동합니다.
                saleNftIndex++;
            }
        }

        // 판매 중인 NFT 정보가 저장된 배열을 반환합니다.
        return saleNftData;
    }


}