import React from 'react'

function ComparisonTable({ data }) {
    const tableHeaders = [
        'Brand',
        'Model',
        'Engine',
        'Horse Power',
        'Transmission',
        'Cylinders',
        'Origin',
        'Year',
    ]

    return (
        <>
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        {tableHeaders.map((header, idx) => {
                                            return (
                                                <th
                                                    key={idx}
                                                    className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider font-bold"
                                                >
                                                    {header}
                                                </th>
                                            )
                                        })}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {data.map((row, idx) => {
                                        const {
                                            brand,
                                            model,
                                            engine,
                                            horsePower,
                                            transmission,
                                            cylinders,
                                            origin,
                                            year,
                                        } = row
                                        return (
                                            <tr key={idx}>
                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                                    {brand}
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                                    {model}
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                                    {engine} cc
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                                    {horsePower} hp
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                                    {transmission}
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                                    {cylinders}
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                                    {origin}
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                                    {year}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        </>
    )
}

export default ComparisonTable
