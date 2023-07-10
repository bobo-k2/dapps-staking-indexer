// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type RewardProps = Omit<Reward, NonNullable<FunctionPropertyNames<Reward>>>;

export class Reward implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public staker: string;

    public contract: string;

    public amount: bigint;

    public block: bigint;

    public era: number;

    public timestamp: bigint;


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
        if (record){
            return Reward.create(record as RewardProps);
        }else{
            return;
        }
    }


    static async getByStaker(staker: string): Promise<Reward[] | undefined>{
      
      const records = await store.getByField('Reward', 'staker', staker);
      return records.map(record => Reward.create(record as RewardProps));
      
    }

    static async getByContract(contract: string): Promise<Reward[] | undefined>{
      
      const records = await store.getByField('Reward', 'contract', contract);
      return records.map(record => Reward.create(record as RewardProps));
      
    }


    static create(record: RewardProps): Reward {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new Reward(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
