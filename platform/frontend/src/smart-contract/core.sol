// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FarmContract {
    struct Farm {
        string farmName;
        string farmAddress;
        string createdAt;
        string farmNumber;
        string farmOwner;
        string farmSize;
        string governmentRegistrationNumber;
        string govtRegistrationNumber;
        string licenseExpiryDate;
        string licenseNumber;
        string ownershipType;
        string regulatorName;
        string unionId;
        string unionName;
    }

    struct LivestockGoal {
        string goalName;
        string goalType;
        uint256 targetValue;
        uint256 baseValue;
        string deadlineDate;
        string comments;
    }

    struct Animal {
        string additionalNotes;
        string animalIdentification
    }

    struct User {
        string name;
        string email;
        uint256 age;
        uint256 income;
        uint256 householdSize;
        address walletAddress;
        Farm farm;
        LivestockGoal[] livestockGoals;
    }

    mapping(address => User) public users;

    // Events to log important contract actions
    event UserRegistered(address indexed userAddress, string userName);
    event FarmUpdated(address indexed userAddress, string farmName);
    event LivestockGoalAdded(address indexed userAddress, string goalName);

    // Functions to interact with the contract
    function registerUser(
        string memory _name,
        string memory _email,
        uint256 _age,
        uint256 _income,
        uint256 _householdSize
    ) external {
        // Create a new user
        User storage user = users[msg.sender];
        user.name = _name;
        user.email = _email;
        user.age = _age;
        user.income = _income;
        user.householdSize = _householdSize;
        user.walletAddress = msg.sender;

        emit UserRegistered(msg.sender, _name);
    }

    function updateFarm(
        string memory _farmName,
        string memory _farmAddress
    ) external {
        // Update farm details for the user
        User storage user = users[msg.sender];
        user.farm.farmName = _farmName;
        user.farm.farmAddress = _farmAddress;

        emit FarmUpdated(msg.sender, _farmName);
    }

    function addLivestockGoal(
        string memory _goalName,
        string memory _goalType,
        uint256 _targetValue,
        uint256 _baseValue,
        string memory _deadlineDate,
        string memory _comments
    ) external {
        // Add a new livestock goal for the user
        User storage user = users[msg.sender];
        user.livestockGoals.push(
            LivestockGoal({
                goalName: _goalName,
                goalType: _goalType,
                targetValue: _targetValue,
                baseValue: _baseValue,
                deadlineDate: _deadlineDate,
                comments: _comments
            })
        );

        emit LivestockGoalAdded(msg.sender, _goalName);
    }
}
