class MongoDB_Query {
    constructor(query, query_string){
        this.query = query;
        this.query_string = query_string;
    }

    filter(){
        const query_obj = {...this.query_string};
        const excluded_fields = ['page','sort','limit','fields'];
        excluded_fields.forEach(field => delete query_obj[field]);

        let query_string = JSON.stringify(query_obj);
        query_string = query_string.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(query_string));

        return this;
    }

    sort(){
        if (this.query_string.sort){
            const sort_by = this.query_string.sort.split(',').join(' ');
            this.query = this.query.sort(sort_by);
        } else {
            this.query = this.query.sort('-createdAt');
        }
        
        return this;
    }

    limit_fields(){
        if(this.query_string.fields){
            const fields = this.query_string.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }
        return this;
    }

    paginate(){
        const page = this.query_string.page * 1 || 1;
        const limit = this.query_string.limit * 1 || 100;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

module.exports = MongoDB_Query;