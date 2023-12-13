// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression} from "@subql/types-core";
import assert from 'assert';



export type StakeProps = Omit<Stake, NonNullable<FunctionPropertyNames<Stake>>| '_name'>;

export class Stake implements Entity {

    constructor(
        
        id: string,
        staker: string,
        contract: string,
        amount: bigint,
        timestamp: bigint,
    ) {
        this.id = id;
        this.staker = staker;
        this.contract = contract;
        this.amount = amount;
        this.timestamp = timestamp;
        
    }

    public id: string;
    public staker: string;
    public contract: string;
    public amount: bigint;
    public block?: bigint;
    public timestamp: bigint;
    

    get _name(): string {
        return 'Stake';
    }

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
        if (record) {
            return this.create(record as StakeProps);
        } else {
            return;
        }
    }

    static async getByStaker(staker: string): Promise<Stake[] | undefined>{
      const records = await store.getByField('Stake', 'staker', staker);
      return records.map(record => this.create(record as StakeProps));
    }

    static async getByContract(contract: string): Promise<Stake[] | undefined>{
      const records = await store.getByField('Stake', 'contract', contract);
      return records.map(record => this.create(record as StakeProps));
    }

    static async getByFields(filter: FieldsExpression<StakeProps>[], options?: { offset?: number, limit?: number}): Promise<Stake[]> {
        const records = await store.getByFields('Stake', filter, options);
        return records.map(record => this.create(record as StakeProps));
    }

    static create(record: StakeProps): Stake {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(
            record.id,
            record.staker,
            record.contract,
            record.amount,
            record.timestamp,
        );
        Object.assign(entity,record);
        return entity;
    }
}
