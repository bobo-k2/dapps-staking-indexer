import {SubstrateEvent} from '@subql/types';
import {Contract, ContractState, Reward, Stake} from '../types';
import {Codec} from '@polkadot/types/types';
import {Balance} from '@polkadot/types/interfaces';
import crypto from 'crypto';

function getAddress(address: Codec): string {
    const addressObject = JSON.parse(address.toString());
    return addressObject.evm ?? addressObject.wasm ;
}

async function handleStake(account: string, contractAddress: string, amount: bigint, event: SubstrateEvent): Promise<void> {
    const blockNumber = event.block.block.header.number.toBigInt();
    const timeStamp = event.block.timestamp.getTime();
    const id = crypto.randomUUID();
    const record = new Stake(id);
    record.amount = amount;
    record.block = blockNumber;
    record.contract = contractAddress;
    record.staker = account.toString();
    record.timestamp = BigInt(timeStamp);
    await record.save();
}

export async function handleNewContract(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, contract]}} = event;
    const blockNumber = event.block.block.header.number.toBigInt();
    const contractAddress = getAddress(contract);
    const record = new Contract(contractAddress);
    record.owner = account.toString();
    record.state = ContractState.Registered;
    record.blockRegistered = blockNumber;
    await record.save();
}

export async function handleContractRemoved(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, contract]}} = event;
    const blockNumber = event.block.block.header.number.toBigInt();

    const contractAddress = getAddress(contract);
    const record = await Contract.get(contractAddress);
    record.state = ContractState.Unregistered;
    record.blockUnregistered = blockNumber;
    await record.save();
}

export async function handleBondAndStake(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, contract, amount]}} = event;
    await handleStake(account.toString(), getAddress(contract), (amount as Balance).toBigInt(), event);
}

export async function handleUnbondAndUnstake(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, contract, amount]}} = event;
    await handleStake(account.toString(), getAddress(contract), -(amount as Balance).toBigInt(), event);
}

export async function handleReward(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, contract, era, balance]}} = event;
    const blockNumber = event.block.block.header.number.toBigInt();
    const timeStamp = event.block.timestamp.getTime();
    const contractAddress = getAddress(contract);
    const id = crypto.randomUUID();
    const record = new Reward(id);
    const amount = (balance as Balance).toBigInt();

    record.amount = amount;
    record.block = blockNumber;
    record.contract = contractAddress;
    record.staker = account.toString();
    record.era = Number(era.toString());
    record.timestamp = BigInt(timeStamp);
    await record.save();
}

export async function handleNominationTransfer(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, originContract, amount, targetContract]}} = event;
    await handleStake(account.toString(), getAddress(originContract), -(amount as Balance).toBigInt(), event);
    await handleStake(account.toString(), getAddress(targetContract), (amount as Balance).toBigInt(), event);
}
