#!/bin/bash

# Interactive Deployment Script
# Tarayıcıda MetaMask ile transaction imzalama için

echo "🚀 Time Attack Game - Interactive Deployment"
echo "============================================="
echo ""

# Contract compile
echo "📦 Compiling contract..."
npx hardhat compile

if [ $? -ne 0 ]; then
    echo "❌ Compilation failed!"
    exit 1
fi

echo "✅ Compilation successful!"
echo ""

# Contract deploy için frontend arayüzü başlat
echo "🌐 Starting deployment interface..."
echo ""
echo "📋 INSTRUCTIONS:"
echo "1. A browser window will open"
echo "2. Connect your MetaMask wallet"
echo "3. Make sure you're on Base mainnet"
echo "4. Click 'Deploy Contract' button"
echo "5. Confirm the transaction in MetaMask"
echo ""

# Simple web server for deployment
cat > deploy-interface.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Deploy Time Attack Game</title>
    <script src="https://cdn.ethers.io/lib/ethers-5.7.2.umd.min.js"></script>
    <style>
        body {
            font-family: 'Courier New', monospace;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background: #1a1a1a;
            color: #00ff00;
        }
        button {
            background: #00ff00;
            color: #000;
            border: none;
            padding: 15px 30px;
            font-size: 16px;
            cursor: pointer;
            font-family: 'Courier New', monospace;
            text-transform: uppercase;
            margin: 10px 0;
        }
        button:hover {
            background: #00cc00;
        }
        button:disabled {
            background: #666;
            cursor: not-allowed;
        }
        .info {
            background: #2a2a2a;
            padding: 15px;
            border-left: 3px solid #00ff00;
            margin: 10px 0;
        }
        .error {
            background: #2a2a2a;
            padding: 15px;
            border-left: 3px solid #ff0000;
            color: #ff0000;
        }
        .success {
            background: #2a2a2a;
            padding: 15px;
            border-left: 3px solid #00ff00;
        }
        input {
            width: 100%;
            padding: 10px;
            background: #2a2a2a;
            border: 1px solid #00ff00;
            color: #00ff00;
            font-family: 'Courier New', monospace;
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <h1>🎮 Deploy Time Attack Game</h1>
    
    <div id="status" class="info">
        <p><strong>Status:</strong> <span id="statusText">Not connected</span></p>
        <p><strong>Network:</strong> <span id="networkText">-</span></p>
        <p><strong>Address:</strong> <span id="addressText">-</span></p>
        <p><strong>Balance:</strong> <span id="balanceText">-</span></p>
    </div>
    
    <button id="connectBtn" onclick="connectWallet()">Connect MetaMask</button>
    <button id="deployBtn" onclick="deployContract()" disabled>Deploy Contract</button>
    
    <div id="result"></div>

    <script>
        let provider, signer, account;
        const BASE_CHAIN_ID = '0x2105'; // 8453 in hex

        async function connectWallet() {
            try {
                if (typeof window.ethereum === 'undefined') {
                    showError('MetaMask not found! Please install MetaMask.');
                    return;
                }

                provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                signer = provider.getSigner();
                account = await signer.getAddress();

                const network = await provider.getNetwork();
                const balance = await provider.getBalance(account);

                document.getElementById('addressText').textContent = account;
                document.getElementById('networkText').textContent = network.name + ' (' + network.chainId + ')';
                document.getElementById('balanceText').textContent = ethers.utils.formatEther(balance) + ' ETH';
                document.getElementById('statusText').textContent = 'Connected';

                if (network.chainId !== 8453) {
                    showError('Please switch to Base mainnet!');
                    try {
                        await window.ethereum.request({
                            method: 'wallet_switchEthereumChain',
                            params: [{ chainId: BASE_CHAIN_ID }],
                        });
                        location.reload();
                    } catch (e) {
                        console.error(e);
                    }
                    return;
                }

                document.getElementById('deployBtn').disabled = false;
                document.getElementById('connectBtn').textContent = 'Connected ✓';
                document.getElementById('connectBtn').disabled = true;
            } catch (error) {
                showError('Connection failed: ' + error.message);
            }
        }

        async function deployContract() {
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = '<div class="info">📦 Deploying contract... Please confirm in MetaMask</div>';
            
            try {
                // CONTRACT ABI VE BYTECODE BURAYA GELECEK
                // Bu dosya hardhat compile sonrası artifacts'ten otomatik oluşturulacak
                
                showError('Contract ABI not loaded. Please run: npm run build-deploy-interface');
                
            } catch (error) {
                showError('Deployment failed: ' + error.message);
            }
        }

        function showError(msg) {
            document.getElementById('result').innerHTML = '<div class="error">❌ ' + msg + '</div>';
        }

        function showSuccess(address) {
            document.getElementById('result').innerHTML = 
                '<div class="success">' +
                '<h3>✅ Contract Deployed Successfully!</h3>' +
                '<p><strong>Contract Address:</strong></p>' +
                '<input type="text" value="' + address + '" readonly onclick="this.select()">' +
                '<p>Copy this address to your .env file:</p>' +
                '<code>VITE_TIMEATTACK_CONTRACT_ADDRESS=' + address + '</code>' +
                '</div>';
        }
    </script>
</body>
</html>
EOF

echo "✅ Deployment interface created!"
echo ""
echo "🔧 Opening interface..."
echo "   (If browser doesn't open automatically, go to: http://localhost:8080)"
echo ""

# Start simple HTTP server
python3 -m http.server 8080 2>/dev/null || python -m SimpleHTTPServer 8080
