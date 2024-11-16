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

    uint256 private _nextTokenId;

    mapping(address => uint256) _chipAddressToTokenId;
    mapping(uint256 => address) _tokenIdToChipAddress;

    struct Offer {
        uint256 id;
        uint256 tokenId;
        uint256 amount;
        address offerer;
    }

    event OfferCreated(
        uint256 indexed offerId,
        uint256 indexed tokenId,
        uint256 indexed amount,
        address offerer
    );
    event OfferCancelled(uint256 indexed offerId);
    event OfferAccepted(uint256 indexed offerId);
    event OfferRejected(uint256 indexed offerId);

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
        string calldata data,
        bytes calldata signature
    ) public onlyOwner {
        // address recoveredSigner = verifySigAndGetAddress(data, signature);
        // require(recoveredSigner == chipAddress, "Signature is not valid");

        /// only bind after minting is successful
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);

        _chipAddressToTokenId[chipAddress] = tokenId;
        _tokenIdToChipAddress[tokenId] = chipAddress;

        emit ChipSet(tokenId, chipAddress);
    }

    function verifySigAndGetAddress(
        string calldata data,
        bytes calldata signature
    ) public view returns (address signer) {
        // Get message hash
        bytes32 messageHash = keccak256(abi.encodePacked(data));

        // Get Ethereum signed message hash
        bytes32 ethSignedMessageHash = messageHash.toEthSignedMessageHash();

        console.log("eth signed message");
        console.logBytes32(ethSignedMessageHash);

        // Recover signer
        return ethSignedMessageHash.recover(signature);
    }

    // function isChipSignatureForToken(
    //     uint256 tokenId,
    //     string calldata data,
    //     bytes calldata signature
    // ) public view returns (bool) {
    //     // all token that are inclusive within the range below should have chips attached to them.
    //     require(
    //         tokenId < 1 || tokenId >= _nextTokenId,
    //         "Token ID not paired to a chip"
    //     );

    //     address recoveredSigner = verifySigAndGetAddress(data, signature);

    //     return _chipAddressToTokenId[recoveredSigner] == tokenId;
    // }

    function transferToken(
        address to,
        address chipId,
        bytes calldata chipSignature,
        uint256 signatureTimestamp,
        bool useSafeTransferFrom,
        /// extras will just indicate payload
        string calldata extras
    ) external returns (uint256 tokenId) {
        // address recoveredSigner = verifySigAndGetAddress(extras, chipSignature);
        // require(recoveredSigner == chipId, "Signature is not valid");

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

    /// TODO: implement real logic
    function createOffer(uint256 tokenId, uint256 amount) public {
        emit OfferCreated(123, tokenId, amount, msg.sender);
    }

    /// TODO: implement real logic
    function cancelOffer(uint256 offerId) public {
        emit OfferCancelled(offerId);
    }

    /// TODO: implement real logic
    function acceptOffer(uint256 offerId) public {
        emit OfferAccepted(offerId);
    }

    /// TODO: implement real logic
    function rejectOffer(uint256 offerId) public {
        emit OfferRejected(offerId);
    }

    /// TODO: implement real logic
    /// @dev first arg is offer id, second args is amount, third arg is address
    function getOffers() public pure returns (Offer[] memory offers) {
        Offer memory firstOffer = Offer({
            id: 1,
            offerer: address(0x123),
            amount: 1000,
            tokenId: 1
        });

        Offer memory secondOffer = Offer({
            id: 2,
            offerer: address(0x987),
            amount: 1000,
            tokenId: 2
        });

        Offer[] memory returnOffer;

        returnOffer[1] = firstOffer;
        returnOffer[2] = secondOffer;

        return returnOffer;
    }

    function isChipSignatureForToken(
        uint256 tokenId,
        bytes32 data,
        bytes calldata signature
    ) external view override returns (bool) {}
}
