import React from 'react'

function ModelSelector({ brand, model }) {
    return (
        <span className="model-selector">
            <span className="text-gray-700 text-sm font-bold m-2">
                Brand
                <span className="text-gray-700 text-sm font-light m-2">
                    {brand}
                </span>
            </span>

            <span className="text-gray-700 text-sm font-bold m-2">
                Model
                <span className="text-gray-700 text-sm font-light m-2">
                    {model}
                </span>
            </span>
        </span>
    )
}

export default ModelSelector
