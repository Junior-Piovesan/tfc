import * as sinon from  'sinon';
import * as chai from 'chai';

import SequelizeMatches from '../database/models/SequelizeMatches' 

const chaiHttp = require('chai-http');

import { app } from '../app';

import { leaderBoardAwayList, leaderBoardHomeList, matches } from './mocks/leaderBoards/leaderBoards';

const { expect } = chai;

chai.use(chaiHttp)

describe('Testando endpoint "/leaderboard/home"', function() {
    
  
  describe('Testando endpoint GET "/leaderboard/home"',function() {

    afterEach(() => sinon.restore())

    it('Testando endpoint GET "/leaderboard/home" deve retornar status 200 e uma lista com as informações de desenpenho dos times da casa', async function() {

      sinon.stub(SequelizeMatches,'findAll').resolves(matches as unknown as SequelizeMatches[])

      const response = await chai.request(app).get('/leaderboard/home')

      expect(response.status).to.be.equal(200)
      expect(response.body).to.be.deep.equal(leaderBoardHomeList)

    })

  })
})

describe('Testando endpoint "/leaderboard/away"', function() {
    
  
  describe.only('Testando endpoint GET "/leaderboard/away"',function() {

    afterEach(() => sinon.restore())

    it('Testando endpoint GET "/leaderboard/away" deve retornar status 200 e uma lista com as informações de desenpenho dos times da casa', async function() {

      sinon.stub(SequelizeMatches,'findAll').resolves(matches as unknown as SequelizeMatches[])

      const response = await chai.request(app).get('/leaderboard/away')

      expect(response.status).to.be.equal(200)
      expect(response.body).to.be.deep.equal(leaderBoardAwayList)
      
    })

  })
})