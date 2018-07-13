class User {
    constructor(userObj) {
        this.fullName = userObj.name;
        this.id = userObj.id;
    }
}
module.exports = User;