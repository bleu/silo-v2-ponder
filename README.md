# Silo External Rewards API

This API provides information about external rewards and their corresponding APYs for Silo Markets. It's built using Ponder, allowing for efficient indexing and querying of on-chain data related to gauge rewards and market statistics.

## Overview

The API indexes external rewards distributed via Silo gauges. Each gauge is structured to distribute rewards to specific receipt tokens through programs, with each program defining parameters like reward token, emission rate, and end date. For price information of the reward and silo asset tokens we're using Coingecko Public API.

## Features

- Index and track gauge rewards across different markets
- Calculate APY for external incentives
- RESTful API endpoints for reward data
- GraphQL interface for flexible querying
- Built with Ponder for optimal EVM data indexing

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Edit `.env.local` with your specific configuration values.

4. Generate code:
```bash
pnpm codegen
```

5. Start the development server:
```bash
pnpm dev
```

## API Endpoints

### REST API

#### Get Reward APY
```
GET /chain/:chainId/market/:marketAddress/reward_apy
```

Returns the calculated APY for external rewards for a specific market.

Parameters:
- `chainId`: The ID of the blockchain network
- `marketAddress`: The address of the Silo market

### GraphQL

Access the GraphQL interface by visiting the base endpoint in your browser. This provides:
- Interactive GraphQL playground
- Built-in documentation
- Query builder interface

## Technical Details

The API calculates reward APYs using the following methodology:
- Indexes gauge programs and their emission rates
- Tracks total liquidity in vaults
- Converts values to USD using oracle prices
- Calculates APY based on yearly emissions relative to total pool value

## Development

The project uses Ponder to handle blockchain data indexing and API generation. Ponder provides:
- Automatic smart contract event indexing
- Type-safe database queries
- Built-in GraphQL API
- High-performance data processing

## Testing

To test the API locally:
1. Ensure your `.env.local` is properly configured
2. Start the development server
3. Test endpoints using curl, Postman, or the built-in GraphQL playground
