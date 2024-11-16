// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "solady/utils/ECDSA.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import "./interfaces/IERC5791.sol";
import {console} from "forge-std/console.sol";

contract ProductToken is ERC721, IERC5791, Ownable {
    using ECDSA for bytes32;
    using ECDSA for bytes;

    uint256 private _nextTokenId = 1;
    uint256 private _nextOfferId = 0;

    mapping(address => uint256) _chipAddressToTokenId;
    mapping(uint256 => address) _tokenIdToChipAddress;

    struct Offer {
        uint256 id;
        uint256 tokenId;
        uint256 amount;
        address buyer;
        bool isActive;
    }

    event OfferCreated(
        uint256 indexed offerId,
        uint256 indexed tokenId,
        uint256 indexed amount,
        address buyer,
        address owner
    );
    event OfferCancelled(uint256 indexed offerId, address buyer, address owner);
    event OfferAccepted(uint256 indexed offerId, address buyer, address owner);
    event OfferRejected(uint256 indexed offerId, address buyer, address owner);

    Offer[] public offers;
    mapping(uint256 => Offer[]) _tokenIdToOffers;

    constructor(
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) Ownable(msg.sender) {}

    function tokenIdFor(
        address _chipId
    ) external view returns (uint256 tokenId) {
        return _chipAddressToTokenId[_chipId];
    }

    function safeMintWithChip(
        address to,
        address chipAddress,
        bytes32 data,
        bytes calldata signature
    ) public onlyOwner {
        address recoveredSigner = recoverSigner(data, signature);
        require(recoveredSigner == chipAddress, "Signature is not valid");

        /// only bind after minting is successful
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);

        _chipAddressToTokenId[chipAddress] = tokenId;
        _tokenIdToChipAddress[tokenId] = chipAddress;

        emit ChipSet(tokenId, chipAddress);
    }

    /// signature methods.
    function splitSignature(
        bytes memory sig
    ) internal pure returns (uint8 v, bytes32 r, bytes32 s) {
        require(sig.length == 65);

        assembly {
            // first 32 bytes, after the length prefix.
            r := mload(add(sig, 32))
            // second 32 bytes.
            s := mload(add(sig, 64))
            // final byte (first byte of the next 32 bytes).
            v := byte(0, mload(add(sig, 96)))
        }

        return (v, r, s);
    }

    function recoverSigner(
        bytes32 data,
        bytes memory sig
    ) public pure returns (address) {
        bytes32 message = prefixed(keccak256(abi.encode(data)));
        (uint8 v, bytes32 r, bytes32 s) = splitSignature(sig);
        return ecrecover(message, v, r, s);
    }

    /// builds a prefixed hash to mimic the behavior of eth_sign.
    function prefixed(bytes32 hash) internal pure returns (bytes32) {
        return
            keccak256(
                abi.encodePacked("\x19Ethereum Signed Message:\n32", hash)
            );
    }

    function isChipSignatureForToken(
        uint256 tokenId,
        bytes32 data,
        bytes calldata signature
    ) public view returns (bool) {
        // all token that are inclusive within the range below should have chips attached to them.
        require(
            tokenId < 1 || tokenId >= _nextTokenId,
            "Token ID not paired to a chip"
        );

        address recoveredSigner = recoverSigner(data, signature);

        return _chipAddressToTokenId[recoveredSigner] == tokenId;
    }

    function transferToken(
        address to,
        address chipId,
        bytes calldata chipSignature,
        uint256 signatureTimestamp,
        bool useSafeTransferFrom,
        /// extras will just indicate payload
        bytes32 extras
    ) external returns (uint256 tokenId) {
        address recoveredSigner = recoverSigner(extras, chipSignature);
        require(recoveredSigner == chipId, "Signature is not valid");

        if (useSafeTransferFrom == true) {
            safeTransferFrom(msg.sender, to, _chipAddressToTokenId[chipId]);
        } else {
            transferFrom(msg.sender, to, _chipAddressToTokenId[chipId]);
        }

        return _chipAddressToTokenId[chipId];
    }

    function transferToken(
        address to,
        address chipId,
        bytes calldata chipSignature,
        uint256 signatureTimestamp,
        bool useSafeTransferFrom,
        bytes calldata extras
    ) external override returns (uint256 tokenId) {}

    /// currently using eth
    function createOffer(uint256 tokenId) public payable {
        uint256 offerId = _nextOfferId;

        /// get the money first
        require(msg.value > 0, "not enough funds to deposit");

        Offer memory newOffer = Offer({
            id: _nextOfferId,
            tokenId: tokenId,
            amount: msg.value,
            buyer: msg.sender,
            isActive: true
        });

        offers.push(newOffer);

        emit OfferCreated(
            offerId,
            tokenId,
            msg.value,
            msg.sender,
            ownerOf(tokenId)
        );
        _nextOfferId += 1;
    }

    function cancelOffer(uint256 offerId) public {
        Offer memory selectedOffer = offers[offerId];

        require(
            msg.sender == selectedOffer.buyer,
            "function not called by offerer"
        );

        require(selectedOffer.isActive, "Offer must be active");

        /// refund
        payable(address(selectedOffer.buyer)).transfer(selectedOffer.amount);

        /// disable
        offers[offerId].isActive = false;

        /// emit event
        emit OfferCancelled(
            offerId,
            selectedOffer.buyer,
            ownerOf(selectedOffer.tokenId)
        );
    }

    function rejectOffer(uint256 offerId) public {
        Offer storage selectedOffer = offers[offerId];
        // uint256 tokenId = selectedOffer.tokenId;
        // address tokenOwner = ownerOf(tokenId);
        // require(
        //     tokenOwner == msg.sender || msg.sender == address(this),
        //     "Only owner can access this function"
        // );

        /// refund
        payable(address(selectedOffer.buyer)).transfer(selectedOffer.amount);

        /// disable
        offers[offerId].isActive = false;

        emit OfferRejected(
            offerId,
            selectedOffer.buyer,
            ownerOf(selectedOffer.tokenId)
        );
    }

    function acceptOffer(uint256 offerId) public {
        Offer storage selectedOffer = offers[offerId];
        uint256 tokenId = selectedOffer.tokenId;
        address tokenOwner = ownerOf(tokenId);

        require(
            tokenOwner == msg.sender,
            "Only owner can access this function"
        );
        require(selectedOffer.isActive, "Offer must be active");

        // Transfer the money to the NFT owner
        (bool success, ) = tokenOwner.call{value: selectedOffer.amount}("");
        require(success, "Transfer to tokenOwner failed");

        // Transfer the NFT
        safeTransferFrom(msg.sender, selectedOffer.buyer, tokenId);

        // Refund and cancel other offers for the same tokenId
        for (uint256 i = 0; i < _nextOfferId; i++) {
            Offer storage currentLoopOffer = offers[i];
            if (
                currentLoopOffer.isActive &&
                currentLoopOffer.tokenId == tokenId &&
                currentLoopOffer.id != offerId
            ) {
                // Refund the offerer
                (bool refundSuccess, ) = currentLoopOffer.buyer.call{
                    value: currentLoopOffer.amount
                }("");
                require(refundSuccess, "Refund to offerer failed");

                // Disable the offer
                currentLoopOffer.isActive = false;
            }
        }

        // Mark the accepted offer as inactive
        offers[offerId].isActive = false;

        emit OfferAccepted(
            offerId,
            selectedOffer.buyer,
            ownerOf(selectedOffer.tokenId)
        );
    }

    function getActiveOffersByTokenId(
        uint256 tokenId
    ) public view returns (Offer[] memory offersResult) {
        uint256 resultCount = 0;

        for (uint256 i = 0; i < _nextOfferId; i++) {
            Offer memory currentLoopOffer = offers[i];
            if (
                currentLoopOffer.isActive && currentLoopOffer.tokenId == tokenId
            ) {
                resultCount += 1;
            }
        }

        offersResult = new Offer[](resultCount);
        uint256 j = 0;

        for (uint256 i = 0; i < _nextOfferId; i++) {
            Offer memory currentLoopOffer = offers[i];
            if (
                currentLoopOffer.isActive && currentLoopOffer.tokenId == tokenId
            ) {
                offersResult[j] = offers[i];
                j += 1;
            }
        }

        return offersResult;
    }
}
