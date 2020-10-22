import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import ModelSelector from '../ModelSelector'

let container = null
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div')
    document.body.appendChild(container)
})

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container)
    container.remove()
    container = null
})

it('renders user data', async () => {
    const fakeCar = {
        brand: 'BMW',
        model: 'i8',
    }

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
        render(<ModelSelector {...fakeCar} />, container)
    })

    expect(
        container.querySelector(
            'span.model-selector > span:nth-child(1) > span'
        ).textContent
    ).toBe(fakeCar.brand)
    expect(
        container.querySelector(
            'span.model-selector > span:nth-child(2) > span'
        ).textContent
    ).toBe(fakeCar.model)
})
