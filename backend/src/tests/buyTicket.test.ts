import * as sinon from 'sinon';
import chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import app from '../app';
import User from '../database/models/UserModel';

import { Response } from 'superagent';
import Cableway from '../database/models/CablewayModel';
import CablewayUser from '../database/models/cablewayUserModel';

chai.use(chaiHttp);

const { expect } = chai;

const userMock= {
  id: 1,
  name: 'fulano',
  email: 'email@email.com',
  password: 'mypassword'
};

const cablewayMock = {
  id: 1,
  name: 'Bondinho do Pão de Açúcar',
  seats: 64,
  price: 80.99,
  departureTime: 'December 17, 1995 03:24:00',
  image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/P%C3%A3o_de_A%C3%A7%C3%BAcar_-_the_only_way_to_get_there_-_panoramio.jpg/800px-P%C3%A3o_de_A%C3%A7%C3%BAcar_-_the_only_way_to_get_there_-_panoramio.jpg',
}

const ticketMock = {
  cablewayId: 1,
  userId: 1,
  quantity: 1
}

describe('testando rota POST /buyticket', async() => {
  let chaiHttpResponse: Response;
  describe('é possível comprar um ticket com sucesso', async() => {
    before(async () => {
      sinon
        .stub(User, 'findOne')
        .resolves(userMock as User);
      sinon
        .stub(Cableway, 'findByPk')
        .resolves(cablewayMock as Cableway);
      sinon
        .stub(Cableway, 'update')
        .resolves([1]);
      sinon
        .stub(CablewayUser, 'create')
        .resolves(ticketMock as CablewayUser);        
    });
    after(() => {
      (User.findOne as sinon.SinonStub).restore();
      (Cableway.findByPk as sinon.SinonStub).restore();
      (Cableway.update as sinon.SinonStub).restore();
      (CablewayUser.create as sinon.SinonStub).restore();
    });
    it('retorna status 200', async() => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'email@email.com',
        password: 'mypassword'
      });

      const token = chaiHttpResponse.body.token;

      chaiHttpResponse = await chai.request(app).post('/buyticket/1')
        .set('Authorization', token).send({
          quantity: 1
        });

      expect(chaiHttpResponse.ok).to.be.eq(true);
    });
  });
  describe('quando o bondinho não existe', async() => {
    before(async () => {
      sinon
        .stub(User, 'findOne')
        .resolves(userMock as User);
      sinon
        .stub(Cableway, 'findByPk')
        .resolves(null);
      sinon
        .stub(Cableway, 'update')
        .resolves([1]);
      sinon
        .stub(CablewayUser, 'create')
        .resolves(ticketMock as CablewayUser);        
    });
    after(() => {
      (User.findOne as sinon.SinonStub).restore();
      (Cableway.findByPk as sinon.SinonStub).restore();
      (Cableway.update as sinon.SinonStub).restore();
      (CablewayUser.create as sinon.SinonStub).restore();
    });
    it('retorna status 404', async() => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'email@email.com',
        password: 'mypassword'
      });

      const token = chaiHttpResponse.body.token;

      chaiHttpResponse = await chai.request(app).post('/buyticket/1')
        .set('Authorization', token).send({
          quantity: 1
        });

      expect(chaiHttpResponse.notFound).to.be.eq(true);
    });
  });
  describe('quando não existem assentos suficientes', async() => {
    before(async () => {
      sinon
        .stub(User, 'findOne')
        .resolves(userMock as User);
      sinon
        .stub(Cableway, 'findByPk')
        .resolves(cablewayMock as Cableway);      
    });
    after(() => {
      (User.findOne as sinon.SinonStub).restore();
      (Cableway.findByPk as sinon.SinonStub).restore();
    });
    it('retorna status 400', async() => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'email@email.com',
        password: 'mypassword'
      });

      const token = chaiHttpResponse.body.token;

      chaiHttpResponse = await chai.request(app).post('/buyticket/1')
        .set('Authorization', token).send({
          quantity: 99
        });

      expect(chaiHttpResponse.badRequest).to.be.eq(true);
    });
  });
  describe('quando é passado um quantity no formato inválido', async() => {
    before(async () => {
      sinon
        .stub(User, 'findOne')
        .resolves(userMock as User);
      sinon
        .stub(Cableway, 'findByPk')
        .resolves(cablewayMock as Cableway);
      sinon
        .stub(Cableway, 'update')
        .resolves([1]);
      sinon
        .stub(CablewayUser, 'create')
        .resolves(ticketMock as CablewayUser);        
    });
    after(() => {
      (User.findOne as sinon.SinonStub).restore();
      (Cableway.findByPk as sinon.SinonStub).restore();
      (Cableway.update as sinon.SinonStub).restore();
      (CablewayUser.create as sinon.SinonStub).restore();
    });
    it('retorna status 400', async() => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'email@email.com',
        password: 'mypassword'
      });

      const token = chaiHttpResponse.body.token;

      chaiHttpResponse = await chai.request(app).post('/buyticket/1')
        .set('Authorization', token).send({
          quantity: 'invalid'
        });

      expect(chaiHttpResponse.badRequest).to.be.eq(true);
    });
  });
});