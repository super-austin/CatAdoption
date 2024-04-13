// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Cat {
    struct CatInfo {
        string id;
        string name;
        string color;
        string catType;
        uint8 age;
    }

    mapping(string => CatInfo) cats;

    function createCat(string memory _id, string memory _name, string memory _color, string memory _catType, uint8 _age) public {
        require(bytes(_id).length > 0, "ID must not be empty");
        require(
            bytes(cats[_id].id).length == 0,
            "Cat already exists"
        );

        cats[_id] = CatInfo(_id, _name, _color, _catType, _age);
    }

    function findCatById(string memory _id) public view returns (string memory, string memory, string memory, string memory, uint8) {
        require(bytes(_id).length > 0, "ID must not be empty");

        CatInfo memory cat = cats[_id];
        require(bytes(cat.id).length != 0, "Cat not found");

        return (cat.id, cat.name, cat.color, cat.catType, cat.age);
    }

    function updateCat(string memory _id, string memory _name, string memory _color, string memory _catType, uint8 _age) public {
        require(bytes(_id).length > 0, "ID must not be empty");

        
        CatInfo storage cat = cats[_id];
        require(bytes(cat.id).length != 0, "Cat not found");

        cat.name = _name;
        cat.color = _color;
        cat.catType = _catType;
        cat.age = _age;
    }

    function deleteCat(string memory _id) public {
        require(bytes(_id).length > 0, "ID must not be empty");

        CatInfo storage cat = cats[_id];
        require(bytes(cat.id).length != 0, "Cat not found");

        delete cats[_id];
    }
}