# Remix IDE ile Deploy (En Kolay - 2 Dakika)

## Adımlar:

### 1. Remix IDE'yi Açın
https://remix.ethereum.org

### 2. Contract'ı Yükleyin

**Sol menüde "File explorers" → "contracts" → Yeni dosya:**
- Dosya adı: `TimeAttackGame.sol`

**Aşağıdaki kodu yapıştırın:**
(Contract'ınızı buradan kopyalayın: `/Users/cemayyildiz/projects/time-attack-miniapp/contracts/TimeAttackGame.sol`)

### 3. Compile Edin

- Sol menüde "Solidity Compiler" (2. ikon)
- Compiler version: `0.8.24`
- "Compile TimeAttackGame.sol" butonuna tıklayın ✅

### 4. Deploy Edin

- Sol menüde "Deploy & Run" (3. ikon)
- **Environment:** "Injected Provider - MetaMask" seçin
- MetaMask'ınız otomatik bağlanacak
- **Network:** Base mainnet'te olduğunuzdan emin olun
- **Contract:** "TimeAttackGame" seçin
- **Deploy** butonuna tıklayın
- MetaMask'te transaction'ı onaylayın ✅

### 5. Contract Adresini Kopyalayın

- Deploy edilen contract'ın yanındaki copy ikonuna tıklayın
- Adresi `.env` dosyanıza ekleyin:
  ```env
  VITE_TIMEATTACK_CONTRACT_ADDRESS=0x...
  ```

---

## ✅ Avantajlar:
- 🚀 En hızlı yöntem (2 dakika)
- 🔐 MetaMask ile güvenli
- 💻 Kurulum gerektirmez
- ✨ Görsel interface

Remix'te sorun yaşarsanız alternatif yöntemlere bakalım!
