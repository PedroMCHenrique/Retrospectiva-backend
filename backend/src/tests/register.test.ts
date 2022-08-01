import * as sinon from 'sinon';
import chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import app from '../app';
import User from '../database/models/UserModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const userMock = {
  id: 1,
  name: 'fulano',
  email: 'email@email.com',
  password: 'mypassword'
};

describe('testando rota POST /register', async() => {
  let chaiHttpResponse: Response;
  describe('quando o usuario é cadastrado com sucesso', async() => {
    before(async () => {
      sinon
      .stub(User, "findOne")
      .resolves(null);
      sinon
      .stub(User, "create")
      .resolves(userMock as User);
    });
    after(() => {
      (User.create as sinon.SinonStub).restore();
      (User.findOne as sinon.SinonStub).restore();
    });
    it('retorna status 201 com o corpo da resposta tendo um token', async() => {
      chaiHttpResponse = await chai.request(app).post('/register').send({
        name: 'fulano',
        email: 'email@email.com',
        password: 'mypassword'
      });

      expect(chaiHttpResponse.ok).to.be.eq(true);
      expect(chaiHttpResponse.body.token).to.not.be.undefined;
    });
  });
  describe('quando é passado um email ja cadastrado', async() => {
    before(() => {
      sinon
      .stub(User, "findOne")
      .resolves(userMock as User);
    });
    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    });
    it('retorna status 400', async () => {
      chaiHttpResponse = await chai.request(app).post('/register').send({
        name: 'fulano',
        email: 'email@email.com',
        password: 'mypassword'
      });
      expect(chaiHttpResponse.badRequest).to.be.eq(true);
    });
  });
  describe('quando é passado um email no formato inválido', async() => {
    it('retorna um status 400', async() => {
      chaiHttpResponse = await chai.request(app).post('/register').send({
        name: 'fulano',
        email: 'email.invalido',
        password: 'mypassword'
      });
      expect(chaiHttpResponse.badRequest).to.be.eq(true);
    });
  });
});