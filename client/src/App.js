import React, { useEffect, useState } from 'react'
import ComparisonTable from './components/ComparisonTable'
import ModelSelector from './components/ModelSelector'

function App() {
    const [data, setData] = useState([])
    const [filters, setFilters] = useState({
        cylinders: 4,
        horsePower: 130,
        year: null,
        origin: 'USA',
    })
    const [years, setYears] = useState([])

    const { cylinders, horsePower, year, origin } = filters

    const handleChange = (e) => {
        const target = e.target
        const name = target.name
        const state = {
            ...filters,
            [name]: target.value,
        }
        setFilters(state)
    }

    const loadModels = async () => {
        let query = `?cylinders=${cylinders}&horsePower=${horsePower}&origin=${origin}`
        if (year !== null) {
            query = `${query}&year=${year}`
        }
        try {
            const res = await fetch(
                `${process.env.REACT_APP_API_URL}/models${query}`
            )
            const filteredData = await res.json()
            const yearsData = new Set(filteredData.map((d) => d.year))
            setData(filteredData)
            if (!year) {
                setData({
                    ...data,
                    year: 1970,
                })
                setYears([1970, ...Array.from(yearsData)])
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadModels()
    }, [filters])

    return (
        <>
            <h1 className="text-3xl pt-10 text-center lg:container lg:mx-auto">
                Total Cars ({`${data.length})`}
            </h1>
            {data.length >= 3 ? (
                <h3 className="text-1xl text-center lg:container lg:mx-auto">
                    Comapring Top 3 Results
                </h3>
            ) : (
                <h3 className="text-1xl text-center lg:container lg:mx-auto text-red-300">
                    Less cars to compare
                </h3>
            )}
            <div className="lg:container lg:mx-auto pt-10">
                <div className="flex justify-between">
                    <label
                        className="text-gray-700 text-sm font-bold m-2"
                        htmlFor="cylinders"
                    >
                        Cylinders
                    </label>
                    <input
                        className="shadow appearance-none border rounded  w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        name="cylinders"
                        value={cylinders}
                        onChange={handleChange}
                        min="0"
                    />

                    <label
                        className="text-gray-700 text-sm font-bold m-2"
                        htmlFor="horsePower"
                    >
                        Horse Power
                    </label>
                    <input
                        className="shadow appearance-none border rounded  w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        name="horsePower"
                        value={horsePower}
                        onChange={handleChange}
                        min="0"
                    />

                    <label
                        className="text-gray-700 text-sm font-bold m-2"
                        htmlFor="year"
                    >
                        Year
                    </label>
                    <select
                        className="appearance-none w-auto bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        name="year"
                        onChange={handleChange}
                        defaultValue={year}
                    >
                        {years.map((y, idx) => {
                            return (
                                <option key={idx} value={y}>
                                    {y}
                                </option>
                            )
                        })}
                    </select>

                    <label
                        className="text-gray-700 text-sm font-bold m-2"
                        htmlFor="origin"
                    >
                        Origin
                    </label>
                    <input
                        className="shadow appearance-none border rounded  w-auto p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="origin"
                        value={origin}
                        onChange={handleChange}
                    />
                </div>

                {data.length >= 3 && (
                    <>
                        <div className="flex justify-between">
                            {data.slice(0, 3).map((row) => {
                                return (
                                    <span className="text-gray-700 text-sm font-bold m-2 p-2 border-solid border-2 border-teal-300 rounded">
                                        <ModelSelector {...row} />
                                    </span>
                                )
                            })}
                        </div>
                        <ComparisonTable data={data.slice(0, 3)} />
                    </>
                )}
            </div>
        </>
    )
}

export default App
