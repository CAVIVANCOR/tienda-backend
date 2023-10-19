class  managerCRUDError extends Error{
    constructor(message,status=400, nameTable) {
        super(message);
        this.statusCode=status;
        this.nameTable=nameTable;
    };
};
module.exports = {managerCRUDError};