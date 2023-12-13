import { SubstrateEvent } from "@subql/types";
import { Contract, ContractState, Reward, Stake } from "../types";
import { Codec } from "@polkadot/types/types";
import { Balance } from "@polkadot/types/interfaces";
import crypto from "crypto";

function getAddress(address: Codec): string {
  const addressObject = JSON.parse(address.toString());
  return addressObject.evm ?? addressObject.wasm;
}

async function handleStake(
  account: string,
  contractAddress: string,
  amount: bigint,
  event: SubstrateEvent
): Promise<void> {
  const blockNumber = event.block.block.header.number.toBigInt();
  const timeStamp = event.block.timestamp.getTime();
  const id = crypto.randomUUID();
  const record = new Stake(
    id,
    account.toString(),
    contractAddress,
    amount,
    BigInt(timeStamp)
  );
  record.block = blockNumber;
  await record.save();
}

export async function handleNewContract(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [account, contract],
    },
  } = event;
  const blockNumber = event.block.block.header.number.toBigInt();
  const contractAddress = getAddress(contract);
  const record = new Contract(
    contractAddress,
    account.toString(),
    ContractState.Registered,
    blockNumber
  );
  await record.save();
}

export async function handleContractRemoved(
  event: SubstrateEvent
): Promise<void> {
  const {
    event: {
      data: [account, contract],
    },
  } = event;
  const blockNumber = event.block.block.header.number.toBigInt();

  const contractAddress = getAddress(contract);
  const record = await Contract.get(contractAddress);
  record.state = ContractState.Unregistered;
  record.blockUnregistered = blockNumber;
  await record.save();
}

export async function handleBondAndStake(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [account, contract, amount],
    },
  } = event;
  await handleStake(
    account.toString(),
    getAddress(contract),
    (amount as Balance).toBigInt(),
    event
  );
}

export async function handleUnbondAndUnstake(
  event: SubstrateEvent
): Promise<void> {
  const {
    event: {
      data: [account, contract, amount],
    },
  } = event;
  await handleStake(
    account.toString(),
    getAddress(contract),
    -(amount as Balance).toBigInt(),
    event
  );
}

export async function handleReward(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [account, contract, era, balance],
    },
  } = event;
  const blockNumber = event.block.block.header.number.toBigInt();
  const timeStamp = event.block.timestamp.getTime();
  const contractAddress = getAddress(contract);
  const id = crypto.randomUUID();
  const amount = (balance as Balance).toBigInt();

  const record = new Reward(
    id,
    account.toString(),
    contractAddress,
    amount,
    blockNumber,
    Number(era.toString()),
    BigInt(timeStamp)
  );
  await record.save();
}

export async function handleNominationTransfer(
  event: SubstrateEvent
): Promise<void> {
  const {
    event: {
      data: [account, originContract, amount, targetContract],
    },
  } = event;
  await handleStake(
    account.toString(),
    getAddress(originContract),
    -(amount as Balance).toBigInt(),
    event
  );
  await handleStake(
    account.toString(),
    getAddress(targetContract),
    (amount as Balance).toBigInt(),
    event
  );
}
