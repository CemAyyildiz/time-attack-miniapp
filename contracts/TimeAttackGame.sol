// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title TimeAttackGame
 * @dev On-chain Time Attack game with score recording and Perfect Badge NFT
 */
contract TimeAttackGame is ERC721, Ownable {
    // Pricing (in wei)
    uint256 public constant PERFECT_BADGE_FEE = 0.00003 ether; // ~$0.10
    
    // Payment recipient
    address public constant PAYMENT_RECIPIENT = 0xcf87bf72d82a60A6b700130cA05188bDD89dA501;
    
    // Score entry structure
    struct ScoreEntry {
        address player;
        uint256 score;
        uint256 time; // Time in milliseconds
        uint256 timestamp;
        bool isPerfect; // True if exactly 10.00 seconds
    }

    // State variables
    uint256 public totalGames;
    uint256 public totalPerfectBadges;
    uint256 private nextBadgeId;
    
    // Mappings
    mapping(address => ScoreEntry[]) public playerScores;
    mapping(address => uint256) public playerBestScore;
    mapping(address => bool) public hasPerfectBadge;
    mapping(uint256 => address) public badgeOwner;
    
    // Leaderboard (top 100 scores)
    ScoreEntry[] public globalLeaderboard;
    uint256 public constant MAX_LEADERBOARD_SIZE = 100;
    
    // Events
    event ScoreSubmitted(
        address indexed player,
        uint256 score,
        uint256 time,
        bool isPerfect,
        uint256 timestamp
    );
    
    event PerfectBadgeMinted(
        address indexed player,
        uint256 indexed tokenId,
        uint256 timestamp
    );
    
    event LeaderboardUpdated(address indexed player, uint256 rank);

    constructor() ERC721("Time Attack Perfect Badge", "PERFECT") Ownable(msg.sender) {
        nextBadgeId = 1;
    }

    /**
     * @dev Submit a game score
     * @param _score Points earned (0-100)
     * @param _time Time stopped in milliseconds
     */
    function submitScore(uint256 _score, uint256 _time) external payable {
        require(_score <= 100, "Invalid score");
        require(_time > 0, "Invalid time");
        
        // Calculate current day (days since epoch)
        bool isPerfect = _score == 100;
        
        // If perfect score and wants to mint badge, require fee
        if (isPerfect && !hasPerfectBadge[msg.sender]) {
            require(msg.value >= PERFECT_BADGE_FEE, "Perfect Badge mint fee required");
            
            // Send fee directly to payment recipient using call pattern
            if (msg.value > 0) {
                (bool success, ) = payable(PAYMENT_RECIPIENT).call{value: msg.value}("");
                require(success, "Payment transfer failed");
            }
        }
        
        ScoreEntry memory entry = ScoreEntry({
            player: msg.sender,
            score: _score,
            time: _time,
            timestamp: block.timestamp,
            isPerfect: isPerfect
        });
        
        // Add to player's scores
        playerScores[msg.sender].push(entry);
        totalGames++;
        
        // Update best score
        if (_score > playerBestScore[msg.sender]) {
            playerBestScore[msg.sender] = _score;
        }
        
        // Update leaderboard
        _updateLeaderboard(entry);
        
        // Mint Perfect Badge if perfect score and doesn't have one
        if (isPerfect && !hasPerfectBadge[msg.sender]) {
            _mintPerfectBadge(msg.sender);
        }
        
        emit ScoreSubmitted(msg.sender, _score, _time, isPerfect, block.timestamp);
    }

    /**
     * @dev Mint Perfect Badge NFT for achieving perfect score
     */
    function _mintPerfectBadge(address player) private {
        uint256 tokenId = nextBadgeId;
        nextBadgeId++;
        
        _safeMint(player, tokenId);
        hasPerfectBadge[player] = true;
        badgeOwner[tokenId] = player;
        totalPerfectBadges++;
        
        emit PerfectBadgeMinted(player, tokenId, block.timestamp);
    }

    /**
     * @dev Update global leaderboard
     */
    function _updateLeaderboard(ScoreEntry memory entry) private {
        // If leaderboard is not full, add entry
        if (globalLeaderboard.length < MAX_LEADERBOARD_SIZE) {
            globalLeaderboard.push(entry);
            _sortLeaderboard();
            emit LeaderboardUpdated(entry.player, globalLeaderboard.length);
            return;
        }
        
        // Check if score qualifies for leaderboard
        if (entry.score > globalLeaderboard[MAX_LEADERBOARD_SIZE - 1].score) {
            globalLeaderboard[MAX_LEADERBOARD_SIZE - 1] = entry;
            _sortLeaderboard();
            
            // Find rank
            for (uint256 i = 0; i < globalLeaderboard.length; i++) {
                if (globalLeaderboard[i].player == entry.player) {
                    emit LeaderboardUpdated(entry.player, i + 1);
                    break;
                }
            }
        }
    }

    /**
     * @dev Sort leaderboard by score (descending)
     */
    function _sortLeaderboard() private {
        uint256 length = globalLeaderboard.length;
        for (uint256 i = 0; i < length; i++) {
            for (uint256 j = i + 1; j < length; j++) {
                if (globalLeaderboard[i].score < globalLeaderboard[j].score) {
                    ScoreEntry memory temp = globalLeaderboard[i];
                    globalLeaderboard[i] = globalLeaderboard[j];
                    globalLeaderboard[j] = temp;
                }
            }
        }
    }

    /**
     * @dev Get player's score history
     */
    function getPlayerScores(address player) external view returns (ScoreEntry[] memory) {
        return playerScores[player];
    }

    /**
     * @dev Get top N scores from leaderboard
     */
    function getTopScores(uint256 count) external view returns (ScoreEntry[] memory) {
        uint256 returnCount = count > globalLeaderboard.length ? globalLeaderboard.length : count;
        ScoreEntry[] memory topScores = new ScoreEntry[](returnCount);
        
        for (uint256 i = 0; i < returnCount; i++) {
            topScores[i] = globalLeaderboard[i];
        }
        
        return topScores;
    }

    /**
     * @dev Get player's rank on leaderboard (0 if not on leaderboard)
     */
    function getPlayerRank(address player) external view returns (uint256) {
        for (uint256 i = 0; i < globalLeaderboard.length; i++) {
            if (globalLeaderboard[i].player == player && 
                globalLeaderboard[i].score == playerBestScore[player]) {
                return i + 1;
            }
        }
        return 0;
    }

    /**
     * @dev Get game statistics
     */
    function getGameStats() external view returns (
        uint256 _totalGames,
        uint256 _totalPerfectBadges,
        uint256 _leaderboardSize
    ) {
        return (totalGames, totalPerfectBadges, globalLeaderboard.length);
    }

    /**
     * @dev Override tokenURI to return badge metadata
     */
    function tokenURI(uint256 /* tokenId */) public pure override returns (string memory) {
        return string(abi.encodePacked(
            "data:application/json;base64,",
            "eyJuYW1lIjogIlBlcmZlY3QgVGltZSBBdHRhY2sgQmFkZ2UiLCAiZGVzY3JpcHRpb24iOiAiQWNoaWV2ZWQgcGVyZmVjdCAxMC4wMCBzZWNvbmRzIGluIFRpbWUgQXR0YWNrISIsICJpbWFnZSI6ICJpcGZzOi8vUW1QZXJmZWN0QmFkZ2UiLCAiYXR0cmlidXRlcyI6IFt7InRyYWl0X3R5cGUiOiAiQWNoaWV2ZW1lbnQiLCAidmFsdWUiOiAiUGVyZmVjdCAxMC4wMHMifV19"
        ));
    }

    /**
     * @dev Prevent transfers of Perfect Badge (soulbound)
     */
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal virtual override returns (address) {
        address from = _ownerOf(tokenId);
        
        // Allow minting (from == address(0))
        // Prevent transfers (from != address(0))
        require(from == address(0), "Perfect Badges are soulbound and cannot be transferred");
        
        return super._update(to, tokenId, auth);
    }
}
