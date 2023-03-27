import { User } from "../models/usuario.js";

const getUser = async (req, res) => {
  const usuario = await User.findOne({ username: req.user.username });

  return usuario;
};

export default { getUser };
