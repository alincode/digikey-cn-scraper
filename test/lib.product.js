import fs from 'fs';
import path from 'path';

import {
  ProductFields, ProductFields2, ProductFullFields
}
from './field';

var Digikey = require('../lib/product').default;

function checklist(result) {
  result.sku.should.be.a('string');
  result.amount.should.be.a('number');
  result.mfs.should.be.a('string');
  result.pn.should.be.a('string');
  result.description.should.be.a('string');
  result.currency.should.be.a('string');
  result.lead.should.be.a('boolean');
  result.rohs.should.be.a('boolean');
  result.attributes.should.be.a('array');
  result.attributes.length.should.above(0);
  result.attributes[0].should.have.keys(['key', 'value']);
  result.priceStores.should.be.a('array');
  result.priceStores.length.should.above(0);
  result.priceStores[0].should.have.keys(['amount', 'unitPrice']);
  result.priceStores[0].amount.should.be.a('number');
}

function getHtml(fileName) {
  return new Promise(function(resolve, reject) {
    fs.readFile(path.join(__dirname, fileName), function(err, data) {
      if (err) return console.log(err);
      resolve(data.toString());
    })
  });
}

describe('product page', function() {
  it('case 1', async(done) => {
    try {
      let html = await getHtml(
        'sample.html'
      );
      let digikey = new Digikey(html,
        'http://www.digikey.com.cn/search/zh/MAX30100EFD-/MAX30100EFD-ND?recordId=5020894'
      );
      let result = await digikey.getResult();
      result.should.have.keys(ProductFields);
      checklist(result);
      done();
    } catch (e) {
      done(e);
    }
  });

  it('case 2', async(done) => {
    try {
      let html = await getHtml(
        'sample2.html'
      );
      let digikey = new Digikey(html,
        'http://www.digikey.com.cn/search/zh/AFP85151/1110-3837-ND?recordId=5267788'
      );
      let result = await digikey.getResult();
      result.should.have.keys(ProductFields2);
      checklist(result);
      done();
    } catch (e) {
      done(e);
    }
  });

  it('case 3', async(done) => {
    try {
      let html = await getHtml(
        'sample3.html'
      );
      let digikey = new Digikey(html,
        'http://www.digikey.com.cn/search/zh/LM358ADGKR/296-18455-6-ND?recordId=1849660'
      );
      let result = await digikey.getResult();
      result.should.have.keys(ProductFullFields);
      checklist(result);
      result.documents.should.be.a('array');
      result.documents.length.should.above(0);
      done();
    } catch (e) {
      done(e);
    }
  });

  it('case 4', async(done) => {
    try {
      let html = await getHtml(
        'sample4.html'
      );
      let digikey = new Digikey(html,
        'http://www.digikey.com.cn/search/zh/LM358ADT/497-1590-1-ND?recordId=592082'
      );
      let result = await digikey.getResult();
      result.should.have.keys(ProductFullFields);
      checklist(result);
      result.documents.should.be.a('array');
      result.documents.length.should.above(0);
      done();
    } catch (e) {
      done(e);
    }
  });
});
