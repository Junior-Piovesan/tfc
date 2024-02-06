import * as sinon from  'sinon';
import * as chai from 'chai';

import SequelizeMatches from '../database/models/SequelizeMatches' 

const chaiHttp = require('chai-http');

import { app } from '../app';
import { matchesListMock } from './mocks/matches/matches.mock';

const { expect } = chai;

chai.use(chaiHttp)

describe('Testando endpoint "/matches"', function() {
  
  describe('Testando endpoint GET "/matches"', function() {

    afterEach(() => sinon.restore() )

    it('Verifica se ao fazer requisição para o enpoint GET "/matches" deve retornar uma lista de partidas', async function() {

      sinon.stub(SequelizeMatches, 'findAll').resolves(matchesListMock as unknown as SequelizeMatches[])

      const response = await chai.request(app).get('/matches')

      console.log(response.body)

      expect(response.status).to.be.equal(200)
      expect(response.body).to.be.deep.equal(matchesListMock)

    })
  })
})