// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression} from "@subql/types-core";
import assert from 'assert';



export type RewardProps = Omit<Reward, NonNullable<FunctionPropertyNames<Reward>>| '_name'>;

export class Reward implements Entity {

    constructor(
        
        id: string,
        staker: string,
        contract: string,
        amount: bigint,
        block: bigint,
        era: number,
        timestamp: bigint,
    ) {
        this.id = id;
        this.staker = staker;
        this.contract = contract;
        this.amount = amount;
        this.block = block;
        this.era = era;
        this.timestamp = timestamp;
        
    }

    public id: string;
    public staker: string;
    public contract: string;
    public amount: bigint;
    public block: bigint;
    public era: number;
    public timestamp: bigint;
    

    get _name(): string {
        return 'Reward';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Reward entity without an ID");
        await store.set('Reward', id.toString(), this);
    }

    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Reward entity without an ID");
        await store.remove('Reward', id.toString());
    }

    static async get(id:string): Promise<Reward | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Reward entity without an ID");
        const record = await store.get('Reward', id.toString());
        if (record) {
            return this.create(record as RewardProps);
        } else {
            return;
        }
    }

    static async getByStaker(staker: string): Promise<Reward[] | undefined>{
      const records = await store.getByField('Reward', 'staker', staker);
      return records.map(record => this.create(record as RewardProps));
    }

    static async getByContract(contract: string): Promise<Reward[] | undefined>{
      const records = await store.getByField('Reward', 'contract', contract);
      return records.map(record => this.create(record as RewardProps));
    }

    static async getByFields(filter: FieldsExpression<RewardProps>[], options?: { offset?: number, limit?: number}): Promise<Reward[]> {
        const records = await store.getByFields('Reward', filter, options);
        return records.map(record => this.create(record as RewardProps));
    }

    static create(record: RewardProps): Reward {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(
            record.id,
            record.staker,
            record.contract,
            record.amount,
            record.block,
            record.era,
            record.timestamp,
        );
        Object.assign(entity,record);
        return entity;
    }
}
