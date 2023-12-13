// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression} from "@subql/types-core";
import assert from 'assert';



export type CallProps = Omit<Call, NonNullable<FunctionPropertyNames<Call>>| '_name'>;

export class Call implements Entity {

    constructor(
        
        id: string,
        method: string,
        success: boolean,
        block: bigint,
        timestamp: bigint,
    ) {
        this.id = id;
        this.method = method;
        this.success = success;
        this.block = block;
        this.timestamp = timestamp;
        
    }

    public id: string;
    public method: string;
    public success: boolean;
    public block: bigint;
    public timestamp: bigint;
    

    get _name(): string {
        return 'Call';
    }

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
        if (record) {
            return this.create(record as CallProps);
        } else {
            return;
        }
    }

    static async getByFields(filter: FieldsExpression<CallProps>[], options?: { offset?: number, limit?: number}): Promise<Call[]> {
        const records = await store.getByFields('Call', filter, options);
        return records.map(record => this.create(record as CallProps));
    }

    static create(record: CallProps): Call {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(
            record.id,
            record.method,
            record.success,
            record.block,
            record.timestamp,
        );
        Object.assign(entity,record);
        return entity;
    }
}
