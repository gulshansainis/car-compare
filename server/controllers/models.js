const fs = require('fs')

/**
 * Filter models by feature i.e.
 * cylinders, horsePower, year, origin
 * @param {*} req
 * @param {*} res
 */
const filterModels = async (req, res) => {
    const { cylinders, horsePower, year, origin } = req.query
    const data = JSON.parse(fs.readFileSync(`./db/specs.json`))

    let filteredData = [...data]

    // Cylinders (Anything greater than a number)
    if (cylinders) {
        filteredData = filteredData.filter((d) => d.cylinders >= cylinders)
    }

    // Horsepower (Anything greater than a number)
    if (horsePower) {
        filteredData = filteredData.filter((d) => d.horsePower >= horsePower)
    }

    // Year (Exact match)
    if (year) {
        filteredData = filteredData.filter((d) => d.year == year)
    }

    // Origin (Exact match)
    if (origin) {
        filteredData = filteredData.filter((d) => d.origin == origin)
    }

    res.json(filteredData)
}

module.exports = { filterModels }
