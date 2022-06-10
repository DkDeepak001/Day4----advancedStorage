// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract AdvancedStorage {
    //store multiple string

    uint256[] public data;

    //function to add content to list
    function addContent(uint256 _data) public {
        data.push(_data);
    }

    //function to display one list
    function getSingle(uint256 _postion) public view returns (uint256) {
        return data[_postion];
    }

    //funtion to display all list
    function displayAllContent() public view returns (uint256[] memory) {
        return data;
    }

    //function to list length
    function length() public view returns (uint256) {
        return data.length;
    }
}
