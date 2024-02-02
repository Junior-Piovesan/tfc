import * as sinon from  'sinon';
import * as chai from 'chai';

const chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeUser from '../database/models/SequelizeUser'

import { validPassword, validEmail, validRequest, validToken, dbUser, invalidHeaderRequest, validHeaderRequest } from './mocks/users/users.mocks';
import Authentication from '../utils/validations/authentication';


chai.use(chaiHttp)

const { expect } = chai


describe('Testando endpoint "/login"', function() {

  describe('Verificando dados vindo da requisição',function() {

    beforeEach(() => sinon.stub(SequelizeUser, 'findOne').resolves(null) )

    afterEach(() => sinon.restore() )

      it('Testando endpoint post "/login" se ao mandar a requisição falta o campo email deve retornar uma mensagem de erro com status 400', async function() {
      

        const response = await chai.request(app).post('/login').send({...validPassword})

        
        expect(response.status).to.be.equal(400)
        expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' })

    })

      it('Testando endpoint post "/login" se ao mandar a requisição falta o campo password deve retornar uma mensagem de erro com status 400', async function() {

      // sinon.stub(SequelizeUser, 'findOne').resolves(null)

        const response = await chai.request(app).post('/login').send({...validEmail})

        
        expect(response.status).to.be.equal(400)
        expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' })
    })

      it('Testando endpoint post "/login" se ao mandar a requisição com email inválido deve retornar uma mensagem de erro com status 401', async function() {
        // sinon.stub(SequelizeUser, 'findOne').resolves(null)

        const response = await chai.request(app).post('/login').send({ ...validRequest })

        
        expect(response.status).to.be.equal(401)
        expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' })

    })

  })

  describe('Verificando em caso de todos os dados estarem corretos',function() {
    
    beforeEach(() => {
      const buildUser = SequelizeUser.build(dbUser as any)
    
      sinon.stub(SequelizeUser,'findOne').resolves(buildUser)
      
      sinon.stub(Authentication,'createToken').returns(validToken.token)
    } )

    afterEach(() => sinon.restore() )

        it('Testando endpoint post "/login" se ao mandar a requisição correta retorna um token válido com status 200', async function() {

          const response = await chai
          .request(app).post('/login')
            .send({...validRequest})

          expect(response.status).to.be.equal(200)
          expect(response.body).to.be.deep.equal(validToken)
      })

  })

})

describe('Testando endpoint "/login/role"',function() {

  afterEach(() => sinon.restore() )

  it('Verificando caso o token não é informado deve retornar um status 401 e uma mensagem de não autorizado', async function() {
      const response = await chai.request(app).get('/login/role')

      expect(response.status).to.be.equal(401)
      expect(response.body).to.be.deep.equal({ "message": "Token not found" })
  })

  it('Verifica se o token informado está incorreto deve retornar um status 401 e uma mensagem de token inválido',async function() {
      const response = await chai
      .request(app).get('/login/role').set( {...invalidHeaderRequest}  )

      expect(response.status).to.be.equal(401)
      expect(response.body).to.be.deep.equal({ "message": "Token must be a valid token" })
  })

  it('Verifica se ao passar um token válido deve retornar um status 200 e um objeto com o tipo do usuário',async function() {

      const buildUser = SequelizeUser.build(dbUser as any)

      sinon.stub(SequelizeUser,'findOne').resolves(buildUser)

      const response = await chai.request(app).get('/login/role').set( { ...validHeaderRequest } )

      expect(response.status).to.be.equal(200)
      expect(response.body).to.be.deep.equal( { role:dbUser.role } )

    })

})