import * as sinon from  'sinon';
import * as chai from 'chai';

const chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeUser from '../database/models/SequelizeUser'
import { validPassword, validEmail, validRequest } from './mocks/users/users.mocks';

chai.use(chaiHttp)

const { expect } = chai

describe('Testando endpoint "/login"', function() {

  afterEach(() => {
    sinon.restore()
  })

  it('Testando endpoint post "/login" se ao mandar a requisição falta o campo email deve retornar uma mensagem de erro com status 400', async function() {

    const loginResponse = await chai
    .request(app).post('/login')
      .send({...validPassword})


      expect(loginResponse.res.status).to.be.equal(400)
      expect(loginResponse.res.json).to.be.deep.equal({"message": "All fields must be filled"})
  })

  it('Testando endpoint post "/login" se ao mandar a requisição falta o campo password deve retornar uma mensagem de erro com status 400', async function() {

    const loginResponse = await chai
    .request(app).post('/login')
      .send({...validEmail})


      expect(loginResponse.res.status).to.be.equal(400)
      expect(loginResponse.res.json).to.be.deep.equal({"message": "All fields must be filled"})
  })

  it('Testando endpoint post "/login" se ao mandar a requisição correta retorna um token válido com status 200', async function() {

    const loginResponse = await chai
    .request(app).post('/login')
      .send({...validRequest})


      expect(loginResponse.res.status).to.be.equal(400)
      expect(loginResponse.res.json).to.be.deep.equal({"message": "All fields must be filled"})
  })
})