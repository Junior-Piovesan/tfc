import * as sinon from  'sinon';
import * as chai from 'chai';

const chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeTeam from '../database/models/SequelizeTeam';
import { allTeams } from './mocks/Teams/teams.mocks';

chai.use(chaiHttp);
const { expect } = chai

describe("Testando endpoint '/teams'.",function() {
  afterEach(() => {
    sinon.restore()
  })
  
  it("Testando endpoint GET '/teams', deve retornar uma lista com todos os times", async function() {
    const buildListTeams = SequelizeTeam.bulkBuild(allTeams as any);

    sinon.stub(SequelizeTeam,'findAll').resolves(buildListTeams);

    const teamsList = await chai.request(app).get('/teams')

    expect(teamsList.body).to.be.deep.equal(allTeams)
  })

  it("Testando endpoint GET '/teams/2', deve retornar o time com id 2", async function() {
    const buildListTeams = SequelizeTeam.build(allTeams[1] as any);

    sinon.stub(SequelizeTeam,'findByPk').resolves(buildListTeams);

    const teamsList = await chai.request(app).get('/teams/2')

    expect(teamsList.body).to.be.deep.equal(allTeams[1])
  })

  it("Testando endpoint GET '/teams', ao passar um id que não existe deve retornar uma mensagem de erro", async function() {

    sinon.stub(SequelizeTeam,'findByPk').resolves(null);

    const teamsList = await chai.request(app).get('/teams/100')

    expect(teamsList.body).to.be.deep.equal({message:'Time não encontrado'})
  })
})