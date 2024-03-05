# Swap kSQT for SQT

::: info

If you are looking for exchanges to swap SQT to other tokens, please see [where can I get SQT](./token.md#where-is-sqt-traded).

:::

Swaps allows users to swap kSQT to SQT at a fixed rate of 1:1.83.

While kSQT will not have transfer restrictions, we do not envision it as a free-float token, hence will not provide or support liquidity. kSQT will have a controlled supply that is intended to be just enough for the minimum viable network running with limited capabilities.

## How to Swap

There are three steps for swapping kSQT to SQT and then being able to use it on the network, you can carry these actions out on the old [Kepler app](https://kepler.subquery.network/swapksqt).

1. Ensure that all remaining kSQT is unlocked and swappable
2. Swap kSQT to SQT on Polygon
3. Bridge SQT from Polygon to Ethereum
4. Bridge SQT from Ethereum to Base

![Swap UI](/assets/img/network/swap.png)

### 1. Unlock Remaining kSQT

To unlock your kSQT tokens for swapping, navigate to the `Swap` page on the old [Kepler app](https://kepler.subquery.network/swapksqt). On the left side of the swap page, you can see any remaining kSQT that you have locked in the app. This includes unclaimed rewards, delegation, staking, and pending withdrawls. Please make sure there is no remaining kSQT in each section by following in the associated instructions.

- [Claim kSQT Rewards](../node_operators/rewards.md#claiming-rewards-by-eras)
- [Undelegate kSQT](../delegators/delegating.md#how-to-undelegate-from-an-indexer)
- [Unstake kSQT](../node_operators/rewards.md#staking)
- [Complete kSQT Withdrawls](../delegators/delegating.md#how-to-withdraw-undelegated-tokens)

### 2. Swap kSQT to SQT

To swap your kSQT tokens for SQT, navigate to the `Swap` page on the old [Kepler app](https://kepler.subquery.network/swapksqt). Then on the right slide, enter an amount of kSQT that you want to swap, and click `Swap` - we recommend inputting the maximum amount.

After this step, you will now have kSQT on Polygon - the contract address of SQT on Polygon is [`0xc52F0f8361835B53A18408BB44d7f4136f0EF69D`](https://polygonscan.com/token/0xc52F0f8361835B53A18408BB44d7f4136f0EF69D#balances) - you might need to add it to your wallet as a custom token.

### 3. Bridge SQT from Polygon to Ethereum

We recommend using official bridges like [Polygon Portal](https://portal.polygon.technology/bridge). SubQuery can't be responsible for the use of any third party bridges.

You will want to brige from `Polygon POS`, not `Polygon zkEVM` - the token address for SQT on Polygon POS is [`0xc52F0f8361835B53A18408BB44d7f4136f0EF69D`](https://polygonscan.com/token/0xc52F0f8361835B53A18408BB44d7f4136f0EF69D#balances).

In the [Polygon Portal bridge](https://portal.polygon.technology/bridge), when selecting tokens, you can click `+ Add Token` and then enter the SubQuery Token Address on Polygon `0xc52F0f8361835B53A18408BB44d7f4136f0EF69D`

![Add custom token to Polygon Bridge](/assets/img/network/bridge_polygon_token_1.png)
![Add custom token to Polygon Bridge](/assets/img/network/bridge_polygon_token_2.png)

Once you have added SQT to the Polygon Bridge, you are free to bridge over your SQT to Ethereum from Polygon.

### 4. Bridge SQT from Ethereum to Base

Follow the guide on how to bridge your SQT from Ethereum Mainnet to Base [here](./bridge.md).

:::info

If you need any help, you can reach out on the `#sqt-swap-support` channel in our Discord.

:::
