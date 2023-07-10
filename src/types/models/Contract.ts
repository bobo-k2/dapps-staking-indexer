// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';



import {
    ContractState,
} from '../enums'


type ContractProps = Omit<Contract, NonNullable<FunctionPropertyNames<Contract>>>;

export class Contract implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public owner: string;

    public state: ContractState;

    public blockRegistered: bigint;

    public blockUnregistered?: bigint;


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
        if (record){
            return Contract.create(record as ContractProps);
        }else{
            return;
        }
    }



    static create(record: ContractProps): Contract {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new Contract(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
