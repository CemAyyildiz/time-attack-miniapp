const hre = require("hardhat");

async function main() {
  console.log("Deploying TimeAttackGame contract to Base...");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const TimeAttackGame = await hre.ethers.getContractFactory("TimeAttackGame");
  const timeAttackGame = await TimeAttackGame.deploy(deployer.address);

  await timeAttackGame.waitForDeployment();

  const address = await timeAttackGame.getAddress();
  console.log("✅ TimeAttackGame deployed to:", address);
  
  console.log("\n📝 Add this to your .env file:");
  console.log(`VITE_TIMEATTACK_CONTRACT_ADDRESS=${address}`);
  
  console.log("\n⏳ Waiting for block confirmations...");
  await timeAttackGame.deploymentTransaction().wait(5);
  
  console.log("\n🔍 Verifying contract on Basescan...");
  try {
    await hre.run("verify:verify", {
      address: address,
      constructorArguments: [deployer.address],
    });
    console.log("✅ Contract verified!");
  } catch (error) {
    console.log("❌ Verification failed:", error.message);
  }
  
  console.log("\n🎮 Contract is ready!");
  console.log(`View on Basescan: https://basescan.org/address/${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
