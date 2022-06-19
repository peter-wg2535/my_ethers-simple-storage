const ethers = require("ethers")
const fs = require("fs-extra")

async function main(){
 const provider=new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545")
 let wallet = new ethers.Wallet('0ed1f667a81eb0541e6ec78fe1724426fe478b2eac7c7b9a472655a5a29e6f25', provider)
 
const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8")
const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
)
const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
console.log("Deploying, please wait...")
const contract = await contractFactory.deploy()
// const contract = await contractFactory.deploy({ gasPrice: 100000000000 })
const deploymentReceipt = await contract.deployTransaction.wait(1)
console.log(`Contract deployed to ${contract.address}`)
 
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })