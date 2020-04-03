const mongoose = require('mongoose');

const { CatsApi } = require('./api');
const { CatModel } = require('./model');
const { Loggly } = require('./util');
const { MONGO_API_URL, MONGO_CONFIG } = require('./config');

class CatsDatabaseGenerator {
  constructor() {
    this.logger = new Loggly();
    this.api = new CatsApi();
    // INICIA UMA CONEXAO COM O MONGODB
    mongoose.connect(MONGO_API_URL, MONGO_CONFIG);
  }

  generateDatabase() {
    return new Promise(async (resolve, reject) => {
      try {
        this.logger.log('info', 'saving all breeds');
        // salvando todas as informacoes de racas no banco
        await this.saveAllBreeds();

        this.logger.log('info', 'saving cats with sunglasses');
        // salvando fotos de gatos com oculos
        await this.saveGlassesCats();

        this.logger.log('info', 'saving cats with hats');
        // salvando foto de gatos com chapeu
        await this.saveHatCats();

        this.logger.log('info', 'closing connection');
        // fechando conexao com mongo
        this.logger.log('info', 'closing mongo connection');
        await mongoose.connection.close();

        return resolve();
      } catch (Error) {
        this.logger.log('error', { message: Error.message, stack: Error.stack });
        return reject(Error);
      }
    });
  }

  saveAllBreeds() {
    return new Promise(async (resolve, reject) => {
      try {
        // get all breeds
        const { data } = await this.api.getAllBreeds();

        for (const cat of data) {
          const {
            id, name, description, temperament, origin,
          } = cat;

          // get the cats photos
          const { data: [{ url: photo1 }, { url: photo2 }, { url: photo3 }] } = await this.api.getPhoto({ breed_id: [id] }, 3);

          const temperamentArray = temperament.split(',');
          temperamentArray.forEach((str, index) => temperamentArray[index] = str.trim());

          const catInfo = {
            id,
            name,
            description,
            origin,
            temperament: temperamentArray,
            photos: [photo1, photo2, photo3],
          };
          new CatModel(catInfo);
          // fazendo upsert no mongo (update or insert)
          await CatModel.findOneAndUpdate({ id }, catInfo, { upsert: true, useFindAndModify: false });
        }
        return resolve();
      } catch (Error) {
        return reject(Error);
      }
    });
  }

  saveHatCats() {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.api.getPhoto({ category_ids: 1 }, 3);
        for await (const catData of data) {
          const { url: photo } = catData;
          const catInfo = { photos: [photo], hats: true };
          this.logger.log('debug', catInfo);
          const cat = new CatModel(catInfo);
          cat.save((Error) => {
            if (Error) return reject(Error);
            this.logger.log('debug', `cat ${catInfo} saved`);
          });
        }
        return resolve(data);
      } catch (Error) {
        return reject(Error);
      }
    });
  }

  saveGlassesCats() {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.api.getPhoto({ category_ids: 4 }, 3);

        for await (const catData of data) {
          const { url: photo } = catData;
          const catInfo = { photos: [photo], hats: true };
          this.logger.log('debug', catInfo);
          const cat = new CatModel(catInfo);
          cat.save((Error) => {
            if (Error) return reject(Error);
            this.logger.log('debug', `cat ${catInfo} saved`);
          });
        }
        return resolve(data);
      } catch (e) {
        return reject(Error);
      }
    });
  }
}


// generating the database

// eslint-disable-next-line no-console
new CatsDatabaseGenerator().generateDatabase().then((data) => console.log(data)).catch((Reason) => console.error(Reason));
