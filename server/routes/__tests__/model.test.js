const request = require('supertest')
let { server } = require('../../index')

afterAll(async () => {
    await server.close()
})

describe('On /models', () => {
    it('with no filters/query params all result should be returned', async () => {
        const res = await request(server).get('/models').send()
        expect(res.statusCode).toEqual(200)
        expect(Array.isArray([res.body])).toBe(true)

        // get db count
        const db = require('../../db/specs.json')
        expect(res.body.length).toEqual(db.length)
    })

    it('with filter cylinders=5 should return all cars having more than or equal to 5 cylinders', async () => {
        const res = await request(server).get('/models?cylinders=5').send()
        expect(res.statusCode).toEqual(200)
        expect(Array.isArray([res.body])).toBe(true)
        const cars = res.body
        const carsWithLessThan5Cylinders = cars.filter(
            (car) => car.cylinders < 5
        )
        expect(carsWithLessThan5Cylinders.length).toEqual(0)
    })

    it('with filter horsePower=400 should return all cars having more than or equal to 5 horsePower', async () => {
        const res = await request(server).get('/models?horsePower=400').send()
        expect(res.statusCode).toEqual(200)
        expect(Array.isArray([res.body])).toBe(true)
        const cars = res.body
        const carsWithLessThan400HorsePower = cars.filter(
            (car) => car.horsePower < 400
        )
        expect(carsWithLessThan400HorsePower.length).toEqual(0)
    })

    it('with filter year=1970 should return no results', async () => {
        const res = await request(server).get('/models?year=1970').send()
        expect(res.statusCode).toEqual(200)
        expect(Array.isArray([res.body])).toBe(true)
        const cars = res.body
        expect(cars.length).toEqual(0)
    })

    it('with filter year=2020 should return more than 0 results', async () => {
        const res = await request(server).get('/models?year=2020').send()
        expect(res.statusCode).toEqual(200)
        expect(Array.isArray([res.body])).toBe(true)
        const cars = res.body
        expect(cars.length).toBeGreaterThan(0)
    })

    it('with filter origin=USA should return more than 0 results', async () => {
        const res = await request(server).get('/models?origin=USA').send()
        expect(res.statusCode).toEqual(200)
        expect(Array.isArray([res.body])).toBe(true)
        const cars = res.body
        expect(cars.length).toBeGreaterThan(0)
    })

    it('with filter origin=FAKE should return 0 results', async () => {
        const res = await request(server).get('/models?origin=FAKE').send()
        expect(res.statusCode).toEqual(200)
        expect(Array.isArray([res.body])).toBe(true)
        const cars = res.body
        expect(cars.length).toBe(0)
    })

    it('with multiple filter should return 0 results', async () => {
        const res = await request(server)
            .get('/models?origin=USA&year=2020&horsePower=600&cylinders=8')
            .send()
        expect(res.statusCode).toEqual(200)
        expect(Array.isArray([res.body])).toBe(true)
        const cars = res.body
        expect(cars.length).toBeGreaterThan(0)
    })
})
