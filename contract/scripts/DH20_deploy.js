const { ethers } = require('hardhat')

//@nation 스마트 컨트랙트 배포 함수
async function main() {
    const DH20 = await ethers.getContractFactory('DH20');
    const dh20 = await DH20.deploy("DebutanteHousing", "DHT");

//@notion target 베포된 스마트 컨트랙트 주소확인
    console.log('Dh20 deployed to :', dh20.target);
}

main().catch((error) => {
    console.log(error);
    process.exit(1);
})