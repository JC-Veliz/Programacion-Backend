process.on('exit', () => {
    console.log('hilo terminado: ' + process.pid);
});

process.on('message', msg => {
    const cantidad = parseInt(msg);
    console.log('hilo iniciado: ' + process.pid);
    const numerosSalidos = {};

    function generarNumeroAleatorio() {
        return parseInt(Math.random() * 1000) + 1;
    };

    for (let i = 1; i <= cantidad; i++) {
        const numero = generarNumeroAleatorio();
        if (!numerosSalidos[numero]) {
            numerosSalidos[numero] = 0;
        };
    
        numerosSalidos[numero]++;
    };
    process.send(numerosSalidos);
    process.exit();
});

process.send('listo');