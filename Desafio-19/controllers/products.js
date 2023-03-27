import ProductosRepository from "../persistence/Repositories/ProductosRepository.js";
const productosRepo = new ProductosRepository();

const admin = true;

// GET api/productos
const get = async (req, res) => {
    const { id } = req.params;
    if (id) {
        const product = await productosRepo.getById(id);

        product
            ? res.status(200).json(product)
            : res.status(400).json({ error: "producto no encontrado" });
    } else {
        const products = await productosRepo.getAll();
        res.status(200).json(products);
    }
};

// POST api/productos
const post = async (req, res, next) => {
    if (admin) {
        const { body } = req;
        console.log(body);
        const newProductId = await productosRepo.save(body);

        newProductId
            ? res
                .status(200)
                .json({ success: "Agregado ok ID: " + newProductId })
            : res
                .status(400)
                .json({ error: "Error al agregar un producto" });
    } else {
        res.json({
            error: -1,
            descripcion: "ruta /product no registrada",
        });
    }
};

// PUT api/productos/:id
const put = async (req, res, next) => {
    if (admin) {
        const { id } = req.params;
        const { body } = req;

        const wasUpdated = await productosRepo.updateById(id, body);

        wasUpdated
            ? res.status(200).json({ success: "producto actualizado ok" })
            : res.status(404).json({ error: "producto no encontrado" });
    } else {
        res.json({
            error: -1,
            descripcion: "ruta /product no registrada",
        });
    }
};

// DELETE /api/productos/:id
const del = async (req, res, next) => {
    if (admin) {
        const { id } = req.params;
        const wasDeleted = await productosRepo.deleteById(id);

        wasDeleted
            ? res.status(200).json({ success: "producto eliminado" })
            : res.status(404).json({ error: "producto no encontrado" });
    } else {
        res.json({
            error: -1,
            descripcion: "ruta /product metodo post no autorizada",
        });
    }
};

export default { get, post, put, del };