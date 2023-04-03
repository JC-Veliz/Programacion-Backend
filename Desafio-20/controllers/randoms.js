import { fork } from "child_process";

const randomsGet = (req, res) => {
  res.render(`objectRandomIN`);
};

const randomsPost = (req, res) => {
  const { cantBucle } = req.body;
  process.env.CANT_BUCLE = cantBucle;

  const objectRandom = fork(`./controllers/getObjectRandom`);
  objectRandom.on(`message`, (dataRandom) => {
    return res.send(dataRandom);
  });
};

export default { randomsGet, randomsPost };
