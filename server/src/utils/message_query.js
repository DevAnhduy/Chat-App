class Message_Query {
    constructor(query,query_options){
        this.query = query;
        this.query_options = query_options
    }

    sort(){
        if(this.query_options.sort){
            const sort_by = this.query_options.sort.split(',').join(' ');
            this.query = this.query.sort(sort_by);
        } else {
            this.query = this.query.sort('')
        }
    }

    paginate() {
        const page = this.query_options.page * 1 || 1;
        const limit = this.query_options.limit * 1 || 100;
        
        
    }
}