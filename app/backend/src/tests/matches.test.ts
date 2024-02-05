import * as sinon from  'sinon';
import * as chai from 'chai';

const chaiHttp = require('chai-http');

import { app } from '../app';

const { expect } = chai;

chai.use(chaiHttp)