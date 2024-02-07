import * as sinon from  'sinon';
import * as chai from 'chai';

import SequelizeMatches from '../database/models/SequelizeMatches' 

const chaiHttp = require('chai-http');

import { app } from '../app';
import { matchesInProgress, matchesListMock, matchesNotInProgress } from './mocks/matches/matches.mock';

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

})