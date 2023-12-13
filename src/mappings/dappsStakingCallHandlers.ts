// Still WIP. Trying to distinguish between staker and developer rewards

import { SubstrateEvent, SubstrateExtrinsic } from "@subql/types";
import { Balance } from "@polkadot/types/interfaces";
import { Call, EraReward } from "../types/models";
import crypto from "crypto";
import { AnyTuple, CallBase } from "@polkadot/types/types";
import { Vec } from "@polkadot/types-codec";

const batchCalls = ["batch", "batchAll"];

function isBatchCall(call: CallBase<AnyTuple>): boolean {
  return call.section == "utility" && batchCalls.includes(call.method);
}

/**
 * Checks for BatchInterrupted event. If event found returns index of first failed extrinsic, otherwise null
 * @param events Call events
 */
function isBatchFailed(events: SubstrateEvent[]): number | null {
  const index = events.findIndex(
    (x) =>
      x.event.section === "utility" && x.event.method === "BatchInterrupted"
  );

  return index >= 0 ? index : null;
}

function isEthCall(call: CallBase<AnyTuple>): boolean {
  return call.section == "ethCall" && call.method === "call";
}

function isRewardCall(call: CallBase<AnyTuple>): boolean {
  return (
    call.section == "dappsStaking" &&
    (call.method === "claimStaker" || call.method === "claimDapp")
  );
}

function getCallsFromBatch(
  batchCall: CallBase<AnyTuple>
): CallBase<AnyTuple>[] {
  return batchCall.args[0] as Vec<CallBase<AnyTuple>>;
}

function isRewardEvent(event: SubstrateEvent): boolean {
  return (
    event.event.section === "dappsStaking" && event.event.method === "Reward"
  );
}

async function getEraReward(era: bigint): Promise<EraReward> {
  let eraReward = await EraReward.get(era.toString());

  if (!eraReward) {
    eraReward = new EraReward(
      era.toString(),
      era,
      BigInt(0),
      BigInt(0),
      BigInt(0)
    );
    eraReward.era = era;
    eraReward.stakerReward = BigInt(0);
    eraReward.dappReward = BigInt(0);
  }

  return eraReward;
}

async function aggreggateRewardsPerEra(
  extrinsic: SubstrateExtrinsic
): Promise<void> {
  if (!extrinsic.success) {
    return;
  }

  const rewardCalls: CallBase<AnyTuple>[] = [];
  const rewardEvents = [];
  const call: CallBase<AnyTuple> = !isEthCall(extrinsic.extrinsic.method)
    ? extrinsic.extrinsic.method
    : <CallBase<AnyTuple>>extrinsic.extrinsic.method.args[0];

  // process calls
  if (isBatchCall(call)) {
    const failedIndex = isBatchFailed(<SubstrateEvent[]>extrinsic.events);
    getCallsFromBatch(extrinsic.extrinsic.method).map(async (call) => {
      if (!failedIndex && isRewardCall(call)) {
        rewardCalls.push(call);
      }
    });
  } else if (isRewardCall(call)) {
    rewardCalls.push(call);
  }

  // process events
  extrinsic.events.forEach((e: SubstrateEvent) => {
    if (isRewardEvent(e)) {
      rewardEvents.push(e);
    }
  });

  // store data
  if (rewardCalls.length === rewardEvents.length) {
    for (let i = 0; i < rewardCalls.length; i++) {
      const {
        event: {
          data: [account, contract, era, amount],
        },
      } = rewardEvents[i];
      const eraReward = await getEraReward(era);
      eraReward.timestamp = BigInt(extrinsic.block.timestamp.getTime());

      const method = rewardCalls[i].method;
      const balance = (amount as Balance).toBigInt();
      logger.warn(`Reward ${rewardCalls[i].method} ${amount.toHuman()}`);

      if (method === "claimDapp") {
        eraReward.dappReward += balance;
      } else if (method === "claimStaker") {
        eraReward.stakerReward += balance;
      } else {
        throw new Error(`Unexpected method ${method}`);
      }

      await eraReward.save();
    }
  } else {
    // Something is seriously wrong calls and events count dont match.
    // Most likely indexer bug.
    logger.warn(rewardCalls[0].toHuman());
    throw new Error(
      `Reward calls count ${
        rewardCalls.length
      }, doesn't match reward events count ${
        rewardEvents.length
      }. Block ${extrinsic.block.block.header.number.toString()}`
    );
  }
}

export async function handleRegisterCall(
  extrinsic: SubstrateExtrinsic
): Promise<void> {
  const module = extrinsic.extrinsic.method.section;
  const method = extrinsic.extrinsic.method.method;

  logger.warn(
    `New call ${module}.${method}, idx ${extrinsic.idx}, success: ${extrinsic.success}`
  );
  await aggreggateRewardsPerEra(extrinsic);
  return;

  if (isBatchCall(extrinsic.extrinsic.method)) {
    const promises = getCallsFromBatch(extrinsic.extrinsic.method).map(
      async (call) => {
        const record = new Call(
          crypto.randomUUID(),
          call.method,
          extrinsic.success,
          extrinsic.block.block.header.number.toBigInt(),
          BigInt(extrinsic.block.timestamp.getTime())
        );

        await record.save();
      }
    );

    await Promise.all(promises);
  } else if (module === "dappsStaking") {
    const record = new Call(
      crypto.randomUUID(),
      method,
      extrinsic.success,
      extrinsic.block.block.header.number.toBigInt(),
      BigInt(extrinsic.block.timestamp.getTime())
    );
    
    await record.save();
  }
}
