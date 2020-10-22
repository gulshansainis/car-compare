const request = require('supertest')
let { server } = require('../../index')

afterAll(async () => {
    await server.close()
})

describe('On startup /ping', () => {
    it('should respond with status 200', async () => {
        const res = await request(server).get('/ping').send()
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual('ok')
    })
})
