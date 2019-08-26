import { Status } from "./Status";

export default class Task {
    private title: string; 
    private description : string;
    private id:number;
    private status : Status;
    private enddate ?: Date;
    constructor (options) {
        console.log(options);
        if (options === undefined) return;
        this.title = (options['title'] === undefined ?  "" : options['title']); 
        this.description = (options['description'] === undefined ? ""  : options['description']);
        this.id = (options['id'] === undefined ?  -1 : options['id']);
        this.status = (options['status'] === undefined ?  Status.PENDING : options['status']);
        this.enddate = (options['enddate'] === undefined ?  null : options['enddate']);
    }
    
    getID = () => this.id;
    getTitle = () => this.title;
    getDescription = () => this.description;
    getEndDate = () => this.enddate;
    getStatus = () => this.status;
    
    setID = (id:number) => this.id = id;
    changeStatus = (status:Status) => this.status = status;
}