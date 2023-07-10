// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type EraRewardProps = Omit<EraReward, NonNullable<FunctionPropertyNames<EraReward>>>;

export class EraReward implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public era: bigint;

    public timestamp: bigint;

    public stakerReward: bigint;

    public dappReward: bigint;


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
        if (record){
            return EraReward.create(record as EraRewardProps);
        }else{
            return;
        }
    }


    static async getByEra(era: bigint): Promise<EraReward[] | undefined>{
      
      const records = await store.getByField('EraReward', 'era', era);
      return records.map(record => EraReward.create(record as EraRewardProps));
      
    }


    static create(record: EraRewardProps): EraReward {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new EraReward(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
