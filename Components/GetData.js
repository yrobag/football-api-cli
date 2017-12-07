const fs = require('fs');

let GetData =
    {
        getIdByCodeOrName: function(request)
        {
            let needle = request.toLowerCase();
            let files = fs.readdirSync(__dirname+'/../Data');
                for(let file of files){
                    if(file.includes('.json')){
                        let search = require(`../Data/${file}`);
                        for(let row of search){
                            if(row.code && row.code.toLowerCase() === needle){
                                return row.id;
                            }
                            if(row.name && row.name.toLowerCase() === needle){
                                return row.id;
                            }
                        }
                    }

                }
            console.log(`No data was found for request '${request}'`)

        }
    };

module.exports = GetData;