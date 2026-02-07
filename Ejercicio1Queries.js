// 1.2.a Usuarios activos con más de 500 puntos 
db.usuarios.find({
    activo: true,
    puntos: { $gt: 500 }
})

// 1.2.b Usuarios que han comprado el producto "Producto 1" en la última semana. 
db.usuarios.find({
    historial_compras: {
        $elemMatch: {
            producto: "Producto 1",
            fecha: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
        }
    }
})

// 1.2.c Usuarios con la etiqueta "tag2" y que tienen más de 100 visitas. 
db.usuarios.find({
    visitas: { $gt: 100 },
    tags: "tag2"
})

// 1.2.d Usuarios con preferencias de color "azul" y que tienen entre 1000 y 2000 amigos
db.usuarios.find({
    cantidad_amigos: { $gte: 1000, $lte: 2000 },
    "preferencias.color": "azul"
})

// 1.3 Analizar cada consulta, pero utilizando las tools
db.usuarios.find({
    activo: true,
    puntos: { $gt: 500 }
}).explain("executionStats")

db.usuarios.find({
    historial_compras: {
        $elemMatch: {
            producto: "Producto 1",
            fecha: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
        }
    }
}).explain("executionStats")

db.usuarios.find({
    visitas: { $gt: 100 },
    tags: "tag2"
}).explain("executionStats")

db.usuarios.find({
    cantidad_amigos: { $gte: 1000, $lte: 2000 },
    "preferencias.color": "azul"
}).explain("executionStats")

// 1.4.a Cree un índice compuesto sobre esta colección en los campos activo y puntos.
db.usuarios.createIndex({
    activo: 1,
    puntos: 1
})

// 1.4.b Cree un índice compuesto sobre historial_compras.producto y historial_compras.fecha.
db.usuarios.createIndex({
    "historial_compras.producto": 1,
    "historial_compras.fecha": 1,
})

// 1.4.c Cree un índice compuesto sobre los campos de tags y visitas.
db.usuarios.createIndex({
    tags: 1,
    visitas: 1
})

// 1.4.d Cree un índice compuesto sobre el campo embebido color (preferencias) y la cantidad de amigos. 
db.usuarios.createIndex({
    "preferencias.color": 1,
    cantidad_amigos: 1
})

// 1.5 y 1.6 Realice una evaluación del rendimiento de cada consulta ahora con los índices creados
db.usuarios.find({
    activo: true,
    puntos: { $gt: 500 }
}).explain("executionStats")

db.usuarios.find({
    historial_compras: {
        $elemMatch: {
            producto: "Producto 1",
            fecha: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
        }
    }
}).explain("executionStats")

db.usuarios.find({
    visitas: { $gt: 100 },
    tags: "tag2"
}).explain("executionStats")

db.usuarios.find({
    cantidad_amigos: { $gte: 1000, $lte: 2000 },
    "preferencias.color": "azul",
}).explain("executionStats")

// 1.7 Resuelva y comente: Identifique a los usuarios que se encuentran activos, que cuentan con un puntaje superior a 500, que han realizado al menos 100 visitas a la plataforma y que tienen exactamente tres etiquetas asociadas a su perfil. No modifique los índices existentes para este inciso.
db.usuarios.find({
  activo: true,
  puntos: { $gt: 500 },
  visitas: { $gte: 100 },
  tags: { $size: 3 }
}).explain("executionStats")
