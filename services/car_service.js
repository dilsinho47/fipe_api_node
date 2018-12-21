const rp = require('request-promise');
const fipe = require('./../commons/fipe');
const mock = false;

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

const mock_brands = [
  {
    brand: 'Chrysler',
    id: '12'
  }, {
    brand: 'Citroën',
    id: '13'
  }, {
    brand: 'Cross Lander',
    id: '14'
  }];
const mock_models = [
  {
    model: 'Model Beautiful car',
    id: '12'
  }, {
    model: 'Model Land Rover',
    id: '13'
  }, {
    model: 'Model Truck',
    id: '14'
  }];
const mock_years = [
  {
    year: '1998',
    id: '1998-1'
  }, {
    year: '2000',
    id: '2000-2'
  }, {
    year: '2005',
    id: '2005-2'
  }];
const mock_price = [
  { "mock": "/12/12/1998-1", "price": "R$ 32.059,00", "brand": "Chrysler", "model": "Model Beautiful Car", "year": "1998" },
  { "mock": "/12/12/2000-2", "price": "R$ 45.059,00", "brand": "Chrysler", "model": "Model Beautiful Car", "year": "2000" },
  { "mock": "/12/12/2005-2", "price": "R$ 637.059,00", "brand": "Chrysler", "model": "Model Beautiful Car", "year": "2005" },
  { "mock": "/12/13/1998-1", "price": "R$ 89.059,00", "brand": "Chrysler", "model": "Model Land Rover", "year": "1998" },
  { "mock": "/12/13/2000-2", "price": "R$ 23.059,00", "brand": "Chrysler", "model": "Model Land Rover", "year": "2000" },
  { "mock": "/12/13/2005-2", "price": "R$ 99.059,00", "brand": "Chrysler", "model": "Model Land Rover", "year": "2005" },
  { "mock": "/12/14/1998-1", "price": "R$ 789.059,00", "brand": "Chrysler", "model": "Model Truck", "year": "1998" },
  { "mock": "/12/14/2000-2", "price": "R$ 523.059,00", "brand": "Chrysler", "model": "Model Truck", "year": "2000" },
  { "mock": "/12/14/2005-2", "price": "R$ 499.059,00", "brand": "Chrysler", "model": "Model Truck", "year": "2005" },

  { "mock": "/13/12/1998-1", "price": "R$ 32.059,00", "brand": "Citroën", "model": "Model Beautiful Car", "year": "1998" },
  { "mock": "/13/12/2000-2", "price": "R$ 645.059,00", "brand": "Citroën", "model": "Model Beautiful Car", "year": "2000" },
  { "mock": "/13/12/2005-2", "price": "R$ 37.059,00", "brand": "Citroën", "model": "Model Beautiful Car", "year": "2005" },
  { "mock": "/13/13/1998-1", "price": "R$ 589.059,00", "brand": "Citroën", "model": "Model Land Rover", "year": "1998" },
  { "mock": "/13/13/2000-2", "price": "R$ 23.059,00", "brand": "Citroën", "model": "Model Land Rover", "year": "2000" },
  { "mock": "/13/13/2005-2", "price": "R$ 599.059,00", "brand": "Citroën", "model": "Model Land Rover", "year": "2005" },
  { "mock": "/13/14/1998-1", "price": "R$ 89.059,00", "brand": "Citroën", "model": "Model Truck", "year": "1998" },
  { "mock": "/13/14/2000-2", "price": "R$ 23.059,00", "brand": "Citroën", "model": "Model Truck", "year": "2000" },
  { "mock": "/13/14/2005-2", "price": "R$ 99.059,00", "brand": "Citroën", "model": "Model Truck", "year": "2005" },

  { "mock": "/14/12/1998-1", "price": "R$ 12.059,00", "brand": "Cross Lander", "model": "Model Beautiful Car", "year": "1998" },
  { "mock": "/14/12/2000-2", "price": "R$ 15.059,00", "brand": "Cross Lander", "model": "Model Beautiful Car", "year": "2000" },
  { "mock": "/14/12/2005-2", "price": "R$ 17.059,00", "brand": "Cross Lander", "model": "Model Beautiful Car", "year": "2005" },
  { "mock": "/14/13/1998-1", "price": "R$ 89.059,00", "brand": "Cross Lander", "model": "Model Land Rover", "year": "1998" },
  { "mock": "/14/13/2000-2", "price": "R$ 23.059,00", "brand": "Cross Lander", "model": "Model Land Rover", "year": "2000" },
  { "mock": "/14/13/2005-2", "price": "R$ 19.059,00", "brand": "Cross Lander", "model": "Model Land Rover", "year": "2005" },
  { "mock": "/14/14/1998-1", "price": "R$ 19.059,00", "brand": "Cross Lander", "model": "Model Truck", "year": "1998" },
  { "mock": "/14/14/2000-2", "price": "R$ 23.059,00", "brand": "Cross Lander", "model": "Model Truck", "year": "2000" },
  { "mock": "/14/14/2005-2", "price": "R$ 19.059,00", "brand": "Cross Lander", "model": "Model Truck", "year": "2005" },
];

module.exports = {
  getBrands: async (req, res, next) => {
    if (mock) {
      res.send(mock_brands);
      return;
    }

    let fipeStr;
    try {
      fipeStr = await rp('http://fipeapi.appspot.com/api/1/carros/marcas.json');
    } catch (err) {
      return next({ statusCode : 500, message : 'Fipe API error: ' + err.message });
    }

    let fipeResponse;
    try {
      fipeResponse = fipe.getArrayResponse(fipeStr);
    } catch (error) {
      return next({ statusCode : 500, message : 'Fipe API error: Invalid syntax' });
    }

    const brands = fipeResponse.map(props => {
      if (!props.fipe_name || !props.id) {
        return next({ statusCode : 500, message : 'Fipe API error: Property does not exist' });
      }
      return {
        brand: props.fipe_name,
        id: props.id,
      };
    });

    await sleep(500);
    res.send(brands);
  },
  getModels: async (req, res, next) => {
    if (mock) {
      res.send(mock_models);
      return;
    }

    let fipeStr;
    try {
      fipeStr = await rp(`http://fipeapi.appspot.com/api/1/carros/veiculos/${req.params.brandId}.json`);
    } catch (err) {
      if (err.statusCode == 404) {
        return next({ statusCode : err.statusCode, message : `No Brand ID ${req.params.brandId}` });
      } else {
        return next({ statusCode : 500, message : 'Fipe API error: ' + err.message });
      }
    }

    let fipeResponse;
    try {
      fipeResponse = fipe.getArrayResponse(fipeStr);
    } catch (ex) {
      return next({ statusCode : 500, message : 'Fipe API error: Invalid syntax' });
    }

    const models = fipeResponse.map(props => {
      if (!props.fipe_name || !props.id) {
        return next({ statusCode : 500, message : 'Fipe API error: Property does not exist' });
      }
      return {
        model: props.fipe_name,
        id: props.id,
      };
    });

    await sleep(500);
    res.send(models);
  },
  getYears: async (req, res, next) => {
    if (mock) {
      res.send(mock_years);
      return;
    }

    let fipeStr;
    try {
      fipeStr = await rp(`http://fipeapi.appspot.com/api/1/carros/veiculo/${req.params.brandId}/${req.params.modelId}.json`);
    } catch (err) {
      if (err.statusCode == 404) {
        return next({ statusCode : err.statusCode, message : `No Brand ID ${req.params.brandId} and Model ID ${req.params.modelId}` });
      } else {
        return next({ statusCode : 500, message : 'Fipe API error: ' + err.message });
      }
    }

    let fipeResponse;
    try {
      fipeResponse = fipe.getArrayResponse(fipeStr);
    } catch (ex) {
      return next({ statusCode : 500, message : 'Fipe API error: Invalid syntax' });
    }

    const years = fipeResponse
      .map(props => {
        if (!props.id) {
          return next({ statusCode : 500, message : 'Fipe API error: Property does not exist' });
        }
        var index = props.id.indexOf('-');
        return {
          year: props.id.slice(0, index),
          id: props.id,
        };
      })
      .filter(props => {
        return props.year && props.year > 1800 && props.year < 2050;
      });

    await sleep(500);
    res.send(years);
  },
  getPrice: async (req, res, next) => {
    if (mock) {
      var values = mock_price.filter(obj => obj.mock === `/${req.params.brandId}/${req.params.modelId}/${req.params.yearId}`);
      res.send(values[0]);
      return;
    }

    let fipeStr;
    try {
      fipeStr = await rp(`http://fipeapi.appspot.com/api/1/carros/veiculo/${req.params.brandId}/${req.params.modelId}/${req.params.yearId}.json`);
    } catch (err) {
      if (err.statusCode == 404) {
        return next({ statusCode : err.statusCode, message : `No Brand ID ${req.params.brandId}, Model ID ${req.params.modelId} and Year ID ${req.params.yearId}` });
      } else if (err.statusCode == 403) {
        return next({ statusCode : err.statusCode, message : 'Forbidden: ' + ': ' + err.message });
      } else {
        return next({ statusCode : 500, message : 'Fipe API error: ' + err.message });
      }
    }

    let fipeResponse;
    try {
      fipeResponse = fipe.getObjectResponse(fipeStr);
    } catch (ex) {
      return next({ statusCode : 500, message : 'Fipe API error: Invalid syntax' });
    }

    if (!fipeResponse.preco || !fipeResponse.ano_modelo || !fipeResponse.veiculo || !fipeResponse.marca) {
      return next({ statusCode : 500, message : 'Fipe API error: Property does not exist' });
    }

    res.send({
      price: fipeResponse.preco,
      brand: fipeResponse.marca,
      model: fipeResponse.veiculo,
      year: fipeResponse.ano_modelo,
    });
  },
};
