import * as sinon from  'sinon';
import * as chai from 'chai';

const chaiHttp = require('chai-http');

import {app} from '../app';

import SequelizeTeam from '../database/models/SequelizeTeam';
import { allTeams } from './mocks/Teams/teams.mocks';
import { Iteam } from '../Interfaces/teams/Iteams';

chai.use(chaiHttp);
const { expect } = chai

describe("Testando endpoint '/teams'.",function() {
  // afterEach(() => {
  //   sinon.stub().restore()
  // })
  
  it("Testando endpoint GET '/teams', deve retornar uma lista com todos os times", async function() {
    const buildListTeams = SequelizeTeam.bulkBuild(allTeams as any);

    sinon.stub(SequelizeTeam,'findAll').resolves(buildListTeams);

    const teamsList = await chai.request(app).get('/teams')

    expect(teamsList.body).to.be.deep.equal(allTeams)
  })
})