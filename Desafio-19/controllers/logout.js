const logout = (req, res) => {
  let userLogout = req.session.usuario;
  req.session.destroy((err) => {
    if (!err) {
      console.log(`logged out`);
    } else {
      console.log(`error`);
    }
  });
  res.render("logout", { userLogout, newRoute: "/login" });
};

export default { logout };
