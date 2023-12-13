// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression} from "@subql/types-core";
import assert from 'assert';


import {
    ContractState,
} from '../enums';

export type ContractProps = Omit<Contract, NonNullable<FunctionPropertyNames<Contract>>| '_name'>;

export class Contract implements Entity {

    constructor(
        
        id: string,
        owner: string,
        state: ContractState,
        blockRegistered: bigint,
    ) {
        this.id = id;
        this.owner = owner;
        this.state = state;
        this.blockRegistered = blockRegistered;
        
    }

    public id: string;
    public owner: string;
    public state: ContractState;
    public blockRegistered: bigint;
    public blockUnregistered?: bigint;
    

    get _name(): string {
        return 'Contract';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Contract entity without an ID");
        await store.set('Contract', id.toString(), this);
    }

    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Contract entity without an ID");
        await store.remove('Contract', id.toString());
    }

    static async get(id:string): Promise<Contract | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Contract entity without an ID");
        const record = await store.get('Contract', id.toString());
        if (record) {
            return this.create(record as ContractProps);
        } else {
            return;
        }
    }

    static async getByFields(filter: FieldsExpression<ContractProps>[], options?: { offset?: number, limit?: number}): Promise<Contract[]> {
        const records = await store.getByFields('Contract', filter, options);
        return records.map(record => this.create(record as ContractProps));
    }

    static create(record: ContractProps): Contract {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(
            record.id,
            record.owner,
            record.state,
            record.blockRegistered,
        );
        Object.assign(entity,record);
        return entity;
    }
}
