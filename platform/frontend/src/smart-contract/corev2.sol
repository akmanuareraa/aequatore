// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FarmContract {

    struct User {
        string uid;
        string name;
        string email;
        uint256 age;
        uint256 income;
        uint256 householdSize;
        address walletAddress;
        string farm;
        string animals;
        string livestockGoals;
        address wallet;
    }

    mapping(address => User) public users;

    // Functions to interact with the contract
    function updateUser(
        string memory _uid,
        string memory _name,
        string memory _email,
        uint256 _age,
        uint256 _income,
        uint256 _householdSize,
        string memory _farm,
        string memory _animals,
        string memory _livestockGoals
    ) external {
        // Create a new user
        User storage user = users[msg.sender];
        user.uid = _uid;
        user.name = _name;
        user.email = _email;
        user.age = _age;
        user.income = _income;
        user.householdSize = _householdSize;
        user.walletAddress = msg.sender;
        user.farm = _farm;
        user.animals = _animals;
        user.livestockGoals = _livestockGoals;
    }


    function getUser(address _walletAddress) external view returns (User memory) {
        // Get a user by their wallet address
        return users[_walletAddress];
    }

    function getUser() external view returns (User memory) {
        // Get a user by their wallet address
        return users[msg.sender];
    }

    function updateLivestockGoals(
        string memory _livestockGoals
    ) external {
        // Add a new livestock goal for the user
        User storage user = users[msg.sender];
        user.livestockGoals = _livestockGoals;
    }

    function updateFarm(string memory _farm) external {
        // Update the farm for a user
        User storage user = users[msg.sender];
        user.farm = _farm;
    }

    function updateAnimals(string memory _animals) external {
        // Update the animals for a user
        User storage user = users[msg.sender];
        user.animals = _animals;
    }
}
