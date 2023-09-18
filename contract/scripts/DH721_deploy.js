const { ethers } = require('hardhat')

//@nation 스마트 컨트랙트 배포 함수
async function main() {
    const DH721 = await ethers.getContractFactory('DH721');
    const dh721 = await DH721.deploy();

//@notion target 베포된 스마트 컨트랙트 주소확인
    console.log('Dh721 deployed to :', dh721.target);
}

main().catch((error) => {
    console.log(error);
    process.exit(1);
})