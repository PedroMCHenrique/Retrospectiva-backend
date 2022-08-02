import * as sinon from 'sinon';
import chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import app from '../app';
import CableWay from '../database/models/CablewayModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const cableWayMock = [
	{
		id: 1,
		name: "Bondinho do Pão de Açúcar",
		price: "80.99",
		seats: 64,
		departureTime: "1995-12-17T03:24:00.000Z",
		image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/P%C3%A3o_de_A%C3%A7%C3%BAcar_-_the_only_way_to_get_there_-_panoramio.jpg/800px-P%C3%A3o_de_A%C3%A7%C3%BAcar_-_the_only_way_to_get_there_-_panoramio.jpg"
	}
]

const { expect } = chai;

describe('testando rota GET /cableway', async() => {
  let chaiHttpResponse: Response;
  describe('quando retorna todos os cableway com sucesso', async() => {
    before(async () => {
      sinon
      .stub(CableWay, "findAll")
        .resolves(cableWayMock as any);
      sinon
      .stub(CableWay, "findOne")
      .resolves(cableWayMock[0] as any);
    });
    after(() => {
      (CableWay.findAll as sinon.SinonStub).restore();
      (CableWay.findOne as sinon.SinonStub).restore();
    });
    it('retorna status 200 e todos os bondinhos', async() => {
      chaiHttpResponse = await chai.request(app).get('/cableway');

      expect(chaiHttpResponse.ok).to.be.eq(true);
      expect(chaiHttpResponse.body.length).to.be.eq(1);
      expect(chaiHttpResponse.body[0]).to.be.eql(cableWayMock[0]);
    });

    it('retorna status 200 e o bondinho do id selecionado', async() => {
      chaiHttpResponse = await chai.request(app).get('/cableway/1');

      expect(chaiHttpResponse.ok).to.be.eq(true);
      expect(chaiHttpResponse.body).to.be.eql(cableWayMock[0]);
    });
  });
});