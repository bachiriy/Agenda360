import { Priority } from "./enum/priority";
import { Status } from "./enum/status";

export interface Task {
    id?: string
    title?: string
    description?: string
    priority?: Priority
    status?: Status
    category?: string

    

    // private _id?: string;
    // private _title?: string;
    // private _description?: string;
    // private _priority?: Priority;
    // private _status?: Status;

    // get id() : string | undefined { return this.id }
    // get title() : string | undefined { return this.title }
    // get description() : string | undefined { return this.description }
    // get priority() : string | undefined { return this.priority }
    // get status() : string | undefined { return this.status }
    
    
    // set id(id : string) { this._id = id }
    // set title(title : string) { this._title = title }
    // set description(description : string) { this._description = description; }
    // set priority(priority : Priority) { this._priority = priority; }
    // set status(status : Status) { this._status = status; }
    
}