// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type CallProps = Omit<Call, NonNullable<FunctionPropertyNames<Call>>>;

export class Call implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public method: string;

    public success: boolean;

    public block: bigint;

    public timestamp: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Call entity without an ID");
        await store.set('Call', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Call entity without an ID");
        await store.remove('Call', id.toString());
    }

    static async get(id:string): Promise<Call | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Call entity without an ID");
        const record = await store.get('Call', id.toString());
        if (record){
            return Call.create(record as CallProps);
        }else{
            return;
        }
    }



    static create(record: CallProps): Call {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new Call(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
