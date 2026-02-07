// 2.2.a Renombrar los campos de la colección a: _id, brand, model, year & price. Apóyese de la instrucción $rename.
db.vehiculos.updateMany(
  {},
  {
    $rename: {
      "Id-del-Coche": "carId",
      "Marca-del-Coche": "brand",
      "Modelo-del-Coche": "model",
      "Año-del-Coche": "year",
      "Precio-del-Coche": "price"
    }
  }
)

// 2.2.b Calcular la cantidad de modelos y precio promedio por año por marca. Apóyese de la instrucción aggregate. Exporte su resultado a un JSONArray llamado vehiculos_brand_stats.json.
db.vehiculos.updateMany(
  {},
  [
    {
      $set: {
        price: {
          $toDouble: {
            $replaceAll: {
              input: "$price",
              find: { $literal: "$" },
              replacement: ""
            }
          }
        }
      }
    }
  ]
)

db.vehiculos.aggregate([
  {
    $group: {
      _id: { brand: "$brand", year: "$year" },
      models_count: { $sum: 1 },
      avg_price: { $avg: "$price" }
    }
  },
  {
    $project: {
      _id: 0,
      brand: "$_id.brand",
      year: "$_id.year",
      models_count: 1,
      avg_price: { $round: ["$avg_price", 2] }
    }
  },
  { $out: "vehiculos_brand_stats" }
])

// 2.2.c Buscar los 20 vehículos más caros de la década de los 90s. Apóyese de la instrucción aggregate. Exportar a CSV llamado vehiculos_top_models.csv
db.vehiculos.aggregate([
  { $match: { year: { $gte: 1990, $lte: 1999 } } },
  { $sort: { price: -1 } },
  { $limit: 20 },
  {
    $project: {
      _id: 0,
      carId: 1,
      brand: 1,
      model: 1,
      year: 1,
      price: 1
    }
  },
  { $out: "vehiculos_top_90s" }
])

