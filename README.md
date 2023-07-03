# Flowthentic

### Verified Identity for the Decentralized World

Flowthentic is a mobile application that leverages on the power of blockchain technology and facial recognition to generate verified identities in the decentralized landscape. The goal of Flowthentic is to resolve the issue of identity confirmation in the digital world, providing users with a secure and efficient way to prove they are real human beings, not bots or impersonators.

By relying on hashed user data and facial recognition, Flowthentic allows users to create a profile that verifies their identity, thereby prooving that their associated wallet belongs to a genuine human being. This not only adds an extra layer of security, but it also enhances trust and transparency in interactions across the decentralized space.

Built on the Flow blockchain, Flowthentic takes advantage of efficient smart contract interactions and secure data storage. It serves as a reliable bridge between the physical and digital worlds.

Whether you're a digital asset holder, a blockchain enthusiast, or a participant in the decentralized world, Flowthentic provides a robust solution for demonstrating that a digital wallet belongs to a genuine human user. By fostering trust and transparency, it helps to propel the growth and acceptance of decentralized applications and services.

## Features

- **Registration Flow:** A guided, step-by-step process helps users create their Flowthentic profile. This includes entering personal data and completing a facial verification step.

- **Profile Creation:** After completing the registration, a user profile is created which includes hashed personal data and an encrypted photo, both of which are securely stored on the blockchain.

- **Data Access:** Users can access their stored data at any time. However, this requires re-entering their personal information and going through another facial scan for security. The input data is then compared to the stored blockchain data to verify the user's identity.

- **Wallet Address Verification:** Users can easily verify whether a specific wallet address has a registered profile in the Flowthentic smart contract. By pasting the wallet address into the app, users will receive feedback indicating whether or not the address is verified.

- **Enhanced Security:** By combining personal data hashing and facial recognition technology, Flowthentic ensures the wallet address is associated with a real person, enhancing the overall security and trust within Web3.

## Architecture

<img width="726" alt="Screenshot 2023-07-03 at 15 26 59" src="https://github.com/claudioBarreira89/flowthentic/assets/38219726/f8304d5c-f3d5-4e5a-b24a-b5cf47ab585a">


- **Mobile App:** This is the user interface for interacting with the Flowthentic smart contract. The mobile app allows users to connect their wallets, fill in personal data, complete the facial verification process, and create their verified profiles. Once registered, users can also check their hashed personal data and encrypted photo stored on the blockchain, and verify if a wallet address has been verified on the Flowthentic smart contract. It's developed using React Native and Expo.

- **Azure Face API:** This is a cloud-based service provided by Microsoft Azure that provides advanced algorithms for face detection and recognition. In the context of Flowthentic, the Azure Face API is used to process the facial detection part of the registration flow, checking if the captured photo has a facial signatures in it. This photo is then stored on the blockchain for the facial recognition process.

- **RapidAPI - PresentID:** RapidAPI is a universal API platform that enables developers to interact with thousands of APIs. Through RapidAPI the app has access to the PresentID which is a service thar provides digital identity verification. PresentID API provides the facial recognition functionality. It is used to compare the a user photo with the photo that was stored during the registration process.

- **Smart Contract:** The smart contract in Flowthentic, written in Cadence for the Flow blockchain, is a core component of the app. It allows the storage and retrieval of user data on the blockchain. The smart contract stores hashed user data and encrypted photos, and provides functions for setting user data and verifying if a given wallet address has a profile in the system.

- **Blockchain:** The Flow blockchain is the underlying decentralized infrastructure that stores the Flowthentic smart contract and the verified user profiles. Leveraging the transparency, immutability, and security of the blockchain ensures that the user verification data is stored in a secure and tamper-proof manner. This provides trust and reliability in the verification process and the authenticity of the verified profiles.

## Local Installation

1. Clone the repository

First, you need to clone the repository

```
git clone https://github.com/claudioBarreira89/flowthentic.git
```

2. Install Dependencies

Install the project's dependencies using Yarn:

```
yarn install
```

3. Start the Project

Once all the dependencies are installed, you can start the project:

```
yarn dev
```

The project should now be accessible through expo go

## Environment Variables

This project uses environment variables for configuration. These variables should be stored in a `.env` file in the root directory of the project.

Here is an example of what your `.env` file should look like:

```
AZURE_FACE_API_KEY=YOUR_AZURE_API_KEY
AZURE_FACE_API_ENDPOINT=YOUR_AZURE_API_ENDPOINT
FACE_VERIFICATION_API_HOST=YOUR_RAPID_API_HOST
FACE_VERIFICATION_API_KEY=YOUR_RAPID_API_KEY
FACE_VERIFICATION_API_ENDPOINT=YOUR_RAPID_API_ENDPOINT
ENCRYPTION_SECRET=YOU_ENCRYPTION_SECRET
```

## Smart contract

The smart contract file `Flowthentic.cdc` contains all the blockchain interaction and is responsible for managint the user data and records. It provides the following features:

- Maintains a record of verified users
- Stores each user's hashed data and encrypted image
- Provides functions to set user data and retrieve it
- Provides a function to verify if an address is registered in the system

### Scripts

Scripts are read-only and used to fetch information from the blockchain.

- **get-user-data.cdc:** This script fetches the data of a specific user from the smart contract.
- **verify-address.cdc:** This script checks if an address is verified in the Flowthentic smart contract.

### Transactions

Transactions are used to mutate the state of the blockchain.

- **set-user-data.cdc:** This transaction is used to set the data for a user in the smart contract.

## Contribution Guidelines

Any contributions from anyone who would like to help improve the project are always welcomed.

To contribute, please follow the following steps:

- Fork the repository to your own GitHub account: https://github.com/claudioBarreira89/flowthentic.git
- Create a new branch from the main branch for your changes.
- Make your changes and commit them with clear commit messages.
- Push your changes to your forked repository.
- Open a pull request to merge your changes into the main branch.

## Acknowledgements

The successful completion of this project was possible thanks to the support of the following individuals and resources:

- **Flow Team and Community:** Their support and great dev tooling were essential. Their commitment to provide an easier environment for developers is greatly appreciated.

- **Azure and RapidAPI - PresentID:** The availability of their facial recognition/detection APIs were invaluable given the concept behind this project. These services played a crucial role and for that, I am deeply grateful.
