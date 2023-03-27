import path from "path";
import { fileURLToPath } from "url";
import passport from "passport";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const register = (req, res) => {
  res.sendFile(path.join(__dirname, "../public/views/register.html"));
};

const registerPost = passport.authenticate("register", {
  failureRedirect: "/failregister",
  successRedirect: "/",
});

const failregister = (req, res) => {
  res.render("register-error");
};

export default { register, failregister, registerPost };
