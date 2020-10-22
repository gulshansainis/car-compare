import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import ComparisonTable from '../ComparisonTable'

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
    const fakeCar = [
        {
            brand: 'BMW',
            model: 'i8',
            url: 'https://www.oto.com.sg/new-cars/bmw/i8',
            name: 'BMW i8',
            engine: 1499,
            horsePower: 231,
            transmission: 'Automatic',
            cylinders: 3,
            origin: 'USA',
            year: 2020,
        },
        {
            brand: 'BMW',
            model: 'i8 Coupe',
            url: 'https://www.oto.com.sg/new-cars/bmw/i8-coupe',
            name: 'BMW i8 Coupe',
            engine: 1499,
            horsePower: 231,
            transmission: 'Automatic',
            cylinders: 3,
            origin: 'USA',
            year: 2020,
        },
        {
            brand: 'Chevrolet',
            model: 'Captiva',
            url: 'https://www.oto.com.sg/new-cars/chevrolet/captiva',
            name: 'Chevrolet Captiva',
            engine: 2384,
            horsePower: 165,
            transmission: 'Automatic',
            cylinders: 4,
            origin: 'USA',
            year: 2020,
        },
    ]
    jest.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeUser),
        })
    )

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
        render(<ComparisonTable data={fakeCar} />, container)
    })

    expect(
        container.querySelector('tr:nth-child(1) td:nth-child(1)').textContent
    ).toBe(fakeCar[0].brand)
    expect(
        container.querySelector('tr:nth-child(1) td:nth-child(2)').textContent
    ).toBe(fakeCar[0].model)

    expect(
        container.querySelector('tr:nth-child(1) td:nth-child(3)').textContent
    ).toBe(`${fakeCar[0].engine} cc`)
    expect(
        container.querySelector('tr:nth-child(1) td:nth-child(4)').textContent
    ).toBe(`${fakeCar[0].horsePower} hp`)
    expect(
        container.querySelector('tr:nth-child(1) td:nth-child(5)').textContent
    ).toBe(fakeCar[0].transmission)
    expect(
        container.querySelector('tr:nth-child(1) td:nth-child(6)').textContent
    ).toBe(`${fakeCar[0].cylinders}`)
    expect(
        container.querySelector('tr:nth-child(1) td:nth-child(7)').textContent
    ).toBe(fakeCar[0].origin)
    expect(
        container.querySelector('tr:nth-child(1) td:nth-child(8)').textContent
    ).toBe(`${fakeCar[0].year}`)

    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore()
})
