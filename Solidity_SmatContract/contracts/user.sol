// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract User {
    struct UserInfo {
        string username;
        string password;
    }

    mapping(string => UserInfo) users;

    function registerUser(string memory _username, string memory _password) public {
        require(bytes(_username).length > 0, "Username must not be empty");
        require(
            bytes(users[_username].username).length == 0,
            "Username already exists"
        );

        users[_username] = UserInfo(_username, _password);
    }

    function findUserByUsername(string memory _username) public view returns (string memory, string memory) {
        require(bytes(_username).length > 0, "Username must not be empty");

        UserInfo memory user = users[_username];
        require(bytes(user.username).length != 0, "User not found");

        return (user.username, user.password);
    }
}