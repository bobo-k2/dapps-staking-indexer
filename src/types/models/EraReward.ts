// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression} from "@subql/types-core";
import assert from 'assert';



export type EraRewardProps = Omit<EraReward, NonNullable<FunctionPropertyNames<EraReward>>| '_name'>;

export class EraReward implements Entity {

    constructor(
        
        id: string,
        era: bigint,
        timestamp: bigint,
        stakerReward: bigint,
        dappReward: bigint,
    ) {
        this.id = id;
        this.era = era;
        this.timestamp = timestamp;
        this.stakerReward = stakerReward;
        this.dappReward = dappReward;
        
    }

    public id: string;
    public era: bigint;
    public timestamp: bigint;
    public stakerReward: bigint;
    public dappReward: bigint;
    

    get _name(): string {
        return 'EraReward';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save EraReward entity without an ID");
        await store.set('EraReward', id.toString(), this);
    }

    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove EraReward entity without an ID");
        await store.remove('EraReward', id.toString());
    }

    static async get(id:string): Promise<EraReward | undefined>{
        assert((id !== null && id !== undefined), "Cannot get EraReward entity without an ID");
        const record = await store.get('EraReward', id.toString());
        if (record) {
            return this.create(record as EraRewardProps);
        } else {
            return;
        }
    }

    static async getByEra(era: bigint): Promise<EraReward[] | undefined>{
      const records = await store.getByField('EraReward', 'era', era);
      return records.map(record => this.create(record as EraRewardProps));
    }

    static async getByFields(filter: FieldsExpression<EraRewardProps>[], options?: { offset?: number, limit?: number}): Promise<EraReward[]> {
        const records = await store.getByFields('EraReward', filter, options);
        return records.map(record => this.create(record as EraRewardProps));
    }

    static create(record: EraRewardProps): EraReward {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(
            record.id,
            record.era,
            record.timestamp,
            record.stakerReward,
            record.dappReward,
        );
        Object.assign(entity,record);
        return entity;
    }
}
