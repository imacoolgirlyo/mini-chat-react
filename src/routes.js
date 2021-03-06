
// Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";

// Users
const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";

// Messages 

const MESSAGES = "/messages";

const routes = {
    home : HOME,
    join  : JOIN,
    login : LOGIN,
    logout : LOGOUT,
    users : USERS,
    userDetail : USER_DETAIL,
    editProfile : EDIT_PROFILE,
    changePassword : CHANGE_PASSWORD,
    messages : MESSAGES
};

export default routes;