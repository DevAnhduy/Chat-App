const fs = require('fs');
const AppError = require('src/utils/app_error');
class Message_Query {
    constructor(path_folder_files,receiver_type,query_options){
        this.path_folder_files = path_folder_files;
        this.query_options = query_options;
        this.receiver_type = receiver_type;
    }

    paginate(){
        //Check folder of messages
        const page = this.query_options.page || 1
        if(fs.existsSync(this.path_folder_files)){
            //Read folder
            const files = fs.readdirSync(this.path_folder_files);
            //Check file exists
            const path_file = `${this.path_folder_files}/${files[page - 1]}`;
            if (fs.existsSync(path_file))
                this.data = this.data = require(path_file);
            else
                this.data = [];
            return this;
        }
    }

    sort(){
        if(this.query_options.sort === 'date'){
            this.data.sort((a,b) => {return a-b})
            return this;
        }
    }

    limit() {
        if(this.query_options.limit){
            const data_length = this.data.length;
            const skip = data_length - this.query_options.limit;
            if(data_length > skip)
                this.data = this.data.slice(skip, data_length)

            return this;
        }
        else return this;
    }
}

module.exports = Message_Query;
