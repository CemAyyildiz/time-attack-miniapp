const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TimeAttackGame", function () {
  let timeAttackGame;
  let owner;
  let player1;
  let player2;
  let player3;

  beforeEach(async function () {
    [owner, player1, player2, player3] = await ethers.getSigners();
    
    const TimeAttackGame = await ethers.getContractFactory("TimeAttackGame");
    timeAttackGame = await TimeAttackGame.deploy();
    await timeAttackGame.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await timeAttackGame.owner()).to.equal(owner.address);
    });

    it("Should have correct name and symbol", async function () {
      expect(await timeAttackGame.name()).to.equal("Time Attack Perfect Badge");
      expect(await timeAttackGame.symbol()).to.equal("PERFECT");
    });

    it("Should start with zero games", async function () {
      expect(await timeAttackGame.totalGames()).to.equal(0);
      expect(await timeAttackGame.totalPerfectBadges()).to.equal(0);
    });
  });

  describe("Score Submission", function () {
    it("Should submit a valid score", async function () {
      const score = 50;
      const time = 9990; // 9.99s

      await expect(timeAttackGame.connect(player1).submitScore(score, time))
        .to.emit(timeAttackGame, "ScoreSubmitted")
        .withArgs(player1.address, score, time, false, await ethers.provider.getBlock('latest').then(b => b.timestamp + 1));

      expect(await timeAttackGame.totalGames()).to.equal(1);
      expect(await timeAttackGame.playerBestScore(player1.address)).to.equal(score);
    });

    it("Should reject invalid score", async function () {
      await expect(
        timeAttackGame.connect(player1).submitScore(101, 10000)
      ).to.be.revertedWith("Invalid score");
    });

    it("Should reject invalid time", async function () {
      await expect(
        timeAttackGame.connect(player1).submitScore(50, 0)
      ).to.be.revertedWith("Invalid time");
    });

    it("Should update best score", async function () {
      await timeAttackGame.connect(player1).submitScore(30, 9500);
      expect(await timeAttackGame.playerBestScore(player1.address)).to.equal(30);

      await timeAttackGame.connect(player1).submitScore(70, 9950);
      expect(await timeAttackGame.playerBestScore(player1.address)).to.equal(70);

      // Lower score shouldn't update
      await timeAttackGame.connect(player1).submitScore(40, 9200);
      expect(await timeAttackGame.playerBestScore(player1.address)).to.equal(70);
    });
  });

  describe("Perfect Badge NFT", function () {
    it("Should mint Perfect Badge for perfect score (100)", async function () {
      await expect(timeAttackGame.connect(player1).submitScore(100, 10000))
        .to.emit(timeAttackGame, "PerfectBadgeMinted")
        .withArgs(player1.address, 1, await ethers.provider.getBlock('latest').then(b => b.timestamp + 1));

      expect(await timeAttackGame.hasPerfectBadge(player1.address)).to.be.true;
      expect(await timeAttackGame.totalPerfectBadges()).to.equal(1);
      expect(await timeAttackGame.ownerOf(1)).to.equal(player1.address);
    });

    it("Should NOT mint Perfect Badge for non-perfect score", async function () {
      await timeAttackGame.connect(player1).submitScore(99, 9990);
      expect(await timeAttackGame.hasPerfectBadge(player1.address)).to.be.false;
      expect(await timeAttackGame.totalPerfectBadges()).to.equal(0);
    });

    it("Should mint only ONE Perfect Badge per player", async function () {
      // First perfect score - mints badge
      await timeAttackGame.connect(player1).submitScore(100, 10000);
      expect(await timeAttackGame.totalPerfectBadges()).to.equal(1);

      // Second perfect score - no new badge
      await timeAttackGame.connect(player1).submitScore(100, 10000);
      expect(await timeAttackGame.totalPerfectBadges()).to.equal(1);
    });

    it("Should be soulbound (non-transferable)", async function () {
      await timeAttackGame.connect(player1).submitScore(100, 10000);
      
      await expect(
        timeAttackGame.connect(player1).transferFrom(player1.address, player2.address, 1)
      ).to.be.revertedWith("Perfect Badges are soulbound and cannot be transferred");
    });

    it("Should mint different badges for different players", async function () {
      await timeAttackGame.connect(player1).submitScore(100, 10000);
      await timeAttackGame.connect(player2).submitScore(100, 10000);
      await timeAttackGame.connect(player3).submitScore(100, 10000);

      expect(await timeAttackGame.totalPerfectBadges()).to.equal(3);
      expect(await timeAttackGame.ownerOf(1)).to.equal(player1.address);
      expect(await timeAttackGame.ownerOf(2)).to.equal(player2.address);
      expect(await timeAttackGame.ownerOf(3)).to.equal(player3.address);
    });
  });

  describe("Leaderboard", function () {
    it("Should add scores to leaderboard", async function () {
      await timeAttackGame.connect(player1).submitScore(80, 9800);
      await timeAttackGame.connect(player2).submitScore(100, 10000);
      await timeAttackGame.connect(player3).submitScore(50, 9990);

      const topScores = await timeAttackGame.getTopScores(3);
      expect(topScores[0].score).to.equal(100);
      expect(topScores[1].score).to.equal(80);
      expect(topScores[2].score).to.equal(50);
    });

    it("Should get player rank", async function () {
      await timeAttackGame.connect(player1).submitScore(80, 9800);
      await timeAttackGame.connect(player2).submitScore(100, 10000);
      await timeAttackGame.connect(player3).submitScore(50, 9990);

      expect(await timeAttackGame.getPlayerRank(player2.address)).to.equal(1);
      expect(await timeAttackGame.getPlayerRank(player1.address)).to.equal(2);
      expect(await timeAttackGame.getPlayerRank(player3.address)).to.equal(3);
    });

    it("Should return player's score history", async function () {
      await timeAttackGame.connect(player1).submitScore(50, 9990);
      await timeAttackGame.connect(player1).submitScore(80, 9950);
      await timeAttackGame.connect(player1).submitScore(100, 10000);

      const history = await timeAttackGame.getPlayerScores(player1.address);
      expect(history.length).to.equal(3);
      expect(history[0].score).to.equal(50);
      expect(history[1].score).to.equal(80);
      expect(history[2].score).to.equal(100);
    });
  });

  describe("Game Statistics", function () {
    it("Should return correct game stats", async function () {
      await timeAttackGame.connect(player1).submitScore(50, 9990);
      await timeAttackGame.connect(player2).submitScore(100, 10000);
      await timeAttackGame.connect(player3).submitScore(80, 9950);

      const stats = await timeAttackGame.getGameStats();
      expect(stats[0]).to.equal(3); // totalGames
      expect(stats[1]).to.equal(1); // totalPerfectBadges
      expect(stats[2]).to.equal(3); // leaderboardSize
    });
  });
});
