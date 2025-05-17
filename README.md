# EPO

**Product Overview**

EPO is an alternative use case for ENS, enabled through integration with Coinbase Smart Wallet, that allows anyone to easily build an on-chain profile. Users can obtain their own unique ENS-based ID on Layer 2 (Base) without complex procedures or needing to prepare ETH beforehand. Based on this ID, users can build a multifunctional profile featuring: aggregation of multiple links (similar to Linktree or Bento), on-chain evaluation and verification of skills and portfolios, publishing decentralized blogs utilizing IPFS, displaying verified personal information (such as age, nationality) via Self Protocol, and privacy-preserving sending.

---

**Problem**

Existing services that utilize ENS mainly for resolving address. We'll try real-world use cases. This process is complex and daunting, especially for blockchain beginners. Furthermore, services like eth.limo require technical knowledge regarding IPFS after obtaining an ENS domain, and the content configuration and upload procedures are cumbersome. Due to these factors, building on-chain profiles and using them for self-expression and information sharing is not straightforward for many users.

---

**Solution and Key Features**

<img src="https://github.com/user-attachments/assets/8aac0a68-60a9-45f3-9d98-c915509fa6d4" alt="drawing" width="70%"/>

- **Create Account**
  EPO utilizes ENS Subnames and Coinbase Smart Wallet features to provide a mechanism for easily and quickly creating ENS accounts. Users first obtain an Ethereum address via Coinbase Smart Wallet, and by simply entering their desired username, it is instantly registered as an ENS subdomain on the Base Sepolia (L2) network. In this mechanism, the L2Registrar contract directly links the user's wallet address to the ENS name, and the L2ReverseResolver contract establishes a bidirectional link between the wallet address and the ENS name.
- **Profile Links**
  Similar to standard ENS features, users can aggregate and display various information, such as links to X accounts and wallet addresses for other blockchains (e.g., Solana, Bitcoin).
- **Privacy-Preserving Money Transfer**
  Additionally, EPO features a privacy sending function integrated with Fluidkey. By registering a stealth address in their ENS profile, privacy-protected sending becomes possible for users.
- **Verified Profile**

  **Skills & Portfolio:** Users can list their skill sets and portfolios, and other EPO users can evaluate this content on-chain. As the evaluator's wallet address and ENS name are recorded, this provides transparent and trustworthy proof of achievements.

- **Writing**
  It provides a decentralized blog function utilizing IPFS. When the "Start Blog" button is pressed, a user-specific group (Group ID) is generated. When an article in Markdown format is uploaded via the "New" button, that article is saved and published on IPFS.
