# Sovereign Identity Engine Architecture

## System Overview

Sovereign Identity Engine consists of multiple layers.

## Layers

### 1. Wallet Intelligence Layer

Responsibilities:
- Wallet scanning
- Transaction analysis
- Token analysis
- Activity tracking

### 2. Identity Layer

Responsibilities:
- Identity Score calculation
- Passport generation
- Profile creation

### 3. Reputation Layer

Responsibilities:
- Trust scoring
- Sybil detection
- Behavior analysis

### 4. Credential Layer

Responsibilities:
- Credential issuance
- ECDSA signing
- Verification

### 5. CLI Layer

Provides:

chain base wallet
chain base passport
chain base credential
chain base export

## Data Flow

Wallet
|
v
Scanner
|
v
Identity Engine
|
v
Credential Issuer
|
v
Verifier

## Current Network

Base Mainnet

## Version

V13.0.1
