// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type StakeProps = Omit<Stake, NonNullable<FunctionPropertyNames<Stake>>>;

export class Stake implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public staker: string;

    public contract: string;

    public amount: bigint;

    public block?: bigint;

    public timestamp: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Stake entity without an ID");
        await store.set('Stake', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Stake entity without an ID");
        await store.remove('Stake', id.toString());
    }

    static async get(id:string): Promise<Stake | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Stake entity without an ID");
        const record = await store.get('Stake', id.toString());
        if (record){
            return Stake.create(record as StakeProps);
        }else{
            return;
        }
    }


    static async getByStaker(staker: string): Promise<Stake[] | undefined>{
      
      const records = await store.getByField('Stake', 'staker', staker);
      return records.map(record => Stake.create(record as StakeProps));
      
    }

    static async getByContract(contract: string): Promise<Stake[] | undefined>{
      
      const records = await store.getByField('Stake', 'contract', contract);
      return records.map(record => Stake.create(record as StakeProps));
      
    }


    static create(record: StakeProps): Stake {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new Stake(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
