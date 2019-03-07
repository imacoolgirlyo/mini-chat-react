import routes from '../routes';

export const getJoin = (req, res) => res.render("join", {pageTitle : "Join"});

export const postJoin = (req, res) => {
    const {
        body : {nickname, email, password, password2}
    } = req;
    if(password !== password2){
        res.status(400);
        res,render("join", {pageTitle : "Join"});
    }else{
        // 가입시키고, 로그인하기 
        res.redirect(routes.home);
    }
}

export const login = (req , res) => res.render("login", {pageTitle : "Login"});
export const logout = (req , res) => res.render("logout", {pageTitle : "Log Out"});
export const userDetail = (req, res) => res.render("userDetail", {pageTitle : "User Detail"});
export const editProfile = (req, res) => res.render("editProfile", {pageTitle : "Edit Profile"});
export const changePassword = (req, res) => res.render(
    "changePassword", {pageTitle : "Change Password"}
);

// res.render(view [,local] [,callback] )