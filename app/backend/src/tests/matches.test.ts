import * as sinon from  'sinon';
import * as chai from 'chai';

import SequelizeMatches from '../database/models/SequelizeMatches' 

const chaiHttp = require('chai-http');

import { app } from '../app';
import { matchesInProgress, matchesListMock, matchesNotInProgress } from './mocks/matches/matches.mock';
import { invalidHeaderRequest, validHeaderRequest } from './mocks/users/users.mocks';

const { expect } = chai;

chai.use(chaiHttp)

describe('Testando endpoint "/matches"', function() {
  
  describe('Testando endpoint GET "/matches"', function() {

    afterEach(() => sinon.restore() )

    it('Verifica se ao fazer requisição para o enpoint GET "/matches" deve retornar uma lista de partidas', async function() {

      sinon.stub(SequelizeMatches, 'findAll').resolves(matchesListMock as unknown as SequelizeMatches[])

      const response = await chai.request(app).get('/matches')

      expect(response.status).to.be.equal(200)
      expect(response.body).to.be.deep.equal(matchesListMock)

    })

    it('Verifica se ao fazer requisição para o enpoint GET "/matches?inProgress=true" deve retornar uma lista de partidas que estão em andamento', async function() {

      sinon.stub(SequelizeMatches, 'findAll').resolves(matchesInProgress as unknown as SequelizeMatches[])

      const response = await chai.request(app).get('/matches?inProgress=true')

      expect(response.status).to.be.equal(200)
      expect(response.body).to.be.deep.equal(matchesInProgress)

    })

    it('Verifica se ao fazer requisição para o enpoint GET "/matches?inProgress=false" deve retornar uma lista de partidas que não estão em andamento', async function() {

      sinon.stub(SequelizeMatches, 'findAll').resolves(matchesNotInProgress as unknown as SequelizeMatches[])

      const response = await chai.request(app).get('/matches?inProgress=false')

      expect(response.status).to.be.equal(200)
      expect(response.body).to.be.deep.equal(matchesNotInProgress)

    })

  })

  describe('Testando endpoint patch "/matches/:id/finish"',function() {
    
    afterEach(() => sinon.restore())

      it('Testando endpoint patch "/matches/:id/finish" caso não seja passado um token deve retornar um status 401 e uma mensagem de erro', async function() {

      const response = await chai.request(app).patch('/matches/46/finish')

      expect(response.status).to.be.equal(401)
      expect(response.body).to.be.deep.equal({ message: "Token not found" })
    })

      it('Testando endpoint patch "/matches/:id/finish" caso seja passado um token inválido deve retornar um status 401 e uma mensagem de erro', async function() {

        const response = await chai.request(app).patch('/matches/46/finish')
          .set({...invalidHeaderRequest})

        expect(response.status).to.be.equal(401)
        expect(response.body).to.be.deep.equal({ message: "Token must be a valid token" })
    })

      it('Testando endpoint patch "/matches/:id/finish" caso seja passado um token válido deve retornar um status 200 e uma mensagem de partida finalizada', async function() {
        sinon.stub(SequelizeMatches, 'update').resolves([1])

        const response = await chai.request(app).patch('/matches/46/finish')
          .set({...validHeaderRequest})

        expect(response.status).to.be.equal(200)
        expect(response.body).to.be.deep.equal({ message: "Finished" })
    })

  })

  describe('Testando endpoint patch "/matches/:id"', function() {
    
    afterEach(() => sinon.restore())

    it('Testando endpoint patch "/matches/:id"  caso não seja passado um token deve retornar um status 401 e uma mensagem de erro', async function() {
      
      const response = await chai.request(app).patch('/matches/1')

      expect(response.status).to.be.equal(401)
      expect(response.body).to.be.deep.equal({ message: "Token not found" })

    })

    it('Testando endpoint patch "/matches/:id"  caso não seja passado um token inválido deve retornar um status 401 e uma mensagem de erro', async function() {
      
      const response = await chai.request(app).patch('/matches/1')
        .set({ ...invalidHeaderRequest })

      expect(response.status).to.be.equal(401)
      expect(response.body).to.be.deep.equal({ message: "Token must be a valid token" })

    })

    it('Testando endpoint patch "/matches/:id"  caso não seja passado um token válido deve retornar somente um status 200 ', async function() {
      
      const response = await chai.request(app).patch('/matches/1')
        .set({ ...validHeaderRequest })

      expect(response.status).to.be.equal(200)
      expect(response.body).to.be.deep.equal({ message: 'Updated goals' })

    })


  })

})