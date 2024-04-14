// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract Cat {
    struct CatInfo {
        string id;
        string name;
        string color;
        string catType;
        uint8 age;
    }

    mapping(string => CatInfo) cats;
    string[] catIds;

    function getAllCats() public view returns (CatInfo[] memory) {
        CatInfo[] memory allCats = new CatInfo[](catIds.length);

        for (uint i = 0; i < catIds.length; i++) {
            allCats[i] = cats[catIds[i]];
        }

        return allCats;
    }

    function createCat(string memory _id, string memory _name, string memory _color, string memory _catType, uint8 _age) public {
        require(bytes(_id).length > 0, "ID must not be empty");
        require(
            bytes(cats[_id].id).length == 0,
            "Cat already exists"
        );

        catIds.push(_id);
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
        
        for (uint i = 0; i < catIds.length; i++) {
            if (
                keccak256(abi.encodePacked(catIds[i])) ==
                keccak256(abi.encodePacked(_id))
            ) {
                if (i != catIds.length - 1) {
                    catIds[i] = catIds[catIds.length - 1];
                }
                catIds.pop();
                break;
            }
        }
    }
}