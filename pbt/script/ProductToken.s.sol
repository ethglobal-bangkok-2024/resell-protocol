// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {ProductToken} from "../src/ProductToken.sol";
import {MultiBaas} from "forge-multibaas/MultiBaas.sol";

contract ProductTokenScript is Script {
    ProductToken public productToken;

    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        productToken = new ProductToken("Louis Vuitton PBT", "LVPBT");

        // MultiBaas.linkContract("ProductToken", address(productToken));

        vm.stopBroadcast();
    }
}
