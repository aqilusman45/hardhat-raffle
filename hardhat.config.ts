import "@nomicfoundation/hardhat-toolbox"
import "@nomicfoundation/hardhat-chai-matchers"
import "dotenv/config"
import "hardhat-deploy"

import { HardhatUserConfig } from "hardhat/config"
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const {
    ALCHEMY_MAINNET_RPC_URL,
    MAINNET_RPC_URL = ALCHEMY_MAINNET_RPC_URL ||
        "https://eth-mainnet.alchemyapi.io/v2/<API_KEY>",
    RINKEBY_RPC_URL = "https://eth-rinkeby.alchemyapi.io/v2/<API_KEY>",
    KOVAN_RPC_URL = "https://eth-kovan.alchemyapi.io/v2/<API_KEY>",
    POLYGON_MAINNET_RPC_URL = "https://polygon-mainnet.alchemyapi.io/v2/",
    PRIVATE_KEY,
    MNEMONIC = "your mnemonic",
    // Your API key for Etherscan, obtain one at https://etherscan.io/
    ETHERSCAN_API_KEY = "",
    COINMARKETCAP_API_KEY = "",
    POLYGONSCAN_API_KEY = "Your polygonscan API key",
    REPORT_GAS = false,
} = process.env

const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            // // If you want to do some forking, uncomment this
            // forking: {
            //   url: MAINNET_RPC_URL
            // }
            chainId: 31337,
        },
        localhost: {
            chainId: 31337,
        },
        kovan: {
            url: KOVAN_RPC_URL,
            accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
            //accounts: {
            //     mnemonic: MNEMONIC,
            // },
            saveDeployments: true,
            chainId: 42,
        },
        rinkeby: {
            url: RINKEBY_RPC_URL,
            accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
            //   accounts: {
            //     mnemonic: MNEMONIC,
            //   },
            saveDeployments: true,
            chainId: 4,
        },
        mainnet: {
            url: MAINNET_RPC_URL,
            accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
            //   accounts: {
            //     mnemonic: MNEMONIC,
            //   },
            saveDeployments: true,
            chainId: 1,
        },
        polygon: {
            url: POLYGON_MAINNET_RPC_URL,
            accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
            saveDeployments: true,
            chainId: 137,
        },
    },
    etherscan: {
        // npx hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
        apiKey: {
            rinkeby: ETHERSCAN_API_KEY,
            kovan: ETHERSCAN_API_KEY,
            polygon: POLYGONSCAN_API_KEY,
        },
    },
    gasReporter: {
        enabled: false,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        // coinmarketcap: COINMARKETCAP_API_KEY,
    },
    namedAccounts: {
        deployer: {
            default: 0, // here this will by default take the first account as deployer
            1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.8.8",
            },
            {
                version: "0.4.24",
            },
        ],
    },
    mocha: {
        timeout: 200000, // 200 seconds max for running tests
    },
}

export default config
