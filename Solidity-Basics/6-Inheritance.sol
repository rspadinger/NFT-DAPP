// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract C1 {
    function f1() private pure returns(uint) {
        return 11;
    }

    function f2() public pure virtual returns(uint) {
        return f1() + 1;
    }

    function f3() public pure virtual returns(uint) {
        return 13;
    }
}

contract C2 is C1 {
    function f3() public pure virtual override returns(uint) {
        return 23;
    }    
}

contract C3 {
    function f2() public pure virtual returns(uint) {
        return 32;
    }    
}

contract C4 is C2, C3 {   
    function f2() public pure override(C1, C3) returns(uint) {
        //return 42;
        //return  super.f2();
        return C1.f2();
    }

    function callF3() public pure returns(uint) {
        return f3(); // 23   
    } 

    function callSuperF1() public pure returns(uint) {
        return super.f3(); // 23       
    }
}