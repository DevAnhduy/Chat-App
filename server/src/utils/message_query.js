const fs = require('fs');
const AppError = require('src/utils/app_error');
const path = require('path')
class Message_Query {
    constructor(store_data,receiver_type,query_options){
        this.store_data = store_data;
        this.query_options = query_options;
        this.receiver_type = receiver_type;
    }

    paginate(){
        //Check folder of messages
        const page = parseInt(this.query_options.page) || 1
        this.data = []
        if(this.receiver_type === 'room' && this.store_data ){
             //Read folder
             const room_folder = path.join(__messages,'user_to_room',this.store_data)
             const files = fs.readdirSync(room_folder);
             //Check file exists
             const path_file = `${room_folder}/${files[page - 1]}`;
             if (fs.existsSync(path_file))
                 this.data  = require(path_file);
             return this;
        } else if(this.receiver_type === 'user'  && this.store_data){
            //Read folder user 
            const user_folder = `${__messages}/user_to_user`
            const folders = fs.readdirSync(user_folder);
            if(page > folders.length) return this;
            let skip =  1;
            for(let i = folders.length - 1; i >= 0 ; i--){
                const user_receiver_file = path.join(user_folder,folders[i],this.store_data[0]);
                const receiver_user_file = path.join(user_folder,folders[i],this.store_data[1]);
                // Exist file user to user 
                if(fs.existsSync(user_receiver_file)){
                    // If this file matched with page value
                    if(skip === page){
                        this.data = require(user_receiver_file);
                        return this;
                    } else skip++;
                    
                } 
                else if (fs.existsSync(receiver_user_file)){
                    // If this file matched with page value
                    if(skip === page){
                        this.data = require(receiver_user_file);
                        return this;
                    } else skip++;
                }
            }
        } else { // Not have value receiver type
            return new AppError('Need room type',500);
        }  
    }

    sort(){
        this.data.sort((a, b) => { return a.timestamp - b.timestamp })
        return this;
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
