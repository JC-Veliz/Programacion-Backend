import path from "path";
import { fileURLToPath } from "url";
import passport from "passport";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const login = (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/datos");
  }
  const loginPagePath = path.resolve(
    __dirname,
    "..",
    "public",
    "views",
    "login.html"
  );
  res.sendFile(loginPagePath);
};

const loginPost = passport.authenticate("login", {
  failureRedirect: "/faillogin",
  successRedirect: "/datos",
});

const faillogin = (req, res) => {
  res.render("login-error");
};

export default { login, faillogin, loginPost };
