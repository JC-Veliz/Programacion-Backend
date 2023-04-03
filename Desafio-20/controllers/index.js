const index = (req, res) => {
  if (!res.headersSent) {
    res.redirect("/datos");
  }
};

export default { index };
