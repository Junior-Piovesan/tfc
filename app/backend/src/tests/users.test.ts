import * as sinon from  'sinon';
import * as chai from 'chai';

const chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeUser from '../database/models/SequelizeUser'

import { validPassword, validEmail, validRequest, validToken, dbUser } from './mocks/users/users.mocks';
import Authentication from '../utils/validations/authentication';


chai.use(chaiHttp)

const { expect } = chai


describe('Testando endpoint "/login"', function() {

  afterEach(() => {
    sinon.restore()
  })

  it('Testando endpoint post "/login" se ao mandar a requisição falta o campo email deve retornar uma mensagem de erro com status 400', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(null)

    const response = await chai.request(app).post('/login').send({...validPassword})

    
    expect(response.status).to.be.equal(400)
    expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' })

  })

  it('Testando endpoint post "/login" se ao mandar a requisição falta o campo password deve retornar uma mensagem de erro com status 400', async function() {

    sinon.stub(SequelizeUser, 'findOne').resolves(null)

    const response = await chai.request(app).post('/login').send({...validEmail})

    
    expect(response.status).to.be.equal(400)
    expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' })
  })

  it('Testando endpoint post "/login" se ao mandar a requisição com email inválido deve retornar uma mensagem de erro com status 401', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(null)

    const response = await chai.request(app).post('/login').send({ ...validRequest })

    
    expect(response.status).to.be.equal(401)
    expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' })

  })

  it('Testando endpoint post "/login" se ao mandar a requisição correta retorna um token válido com status 200', async function() {
     const buildUser = SequelizeUser.build(dbUser as any)

    sinon.stub(SequelizeUser,'findOne').resolves(buildUser)

    sinon.stub(Authentication,'createToken').returns(validToken.token)

    const response = await chai
    .request(app).post('/login')
      
    .send({...validRequest})



      expect(response.status).to.be.equal(200)
      expect(response.body).to.be.deep.equal(validToken)
  })
})