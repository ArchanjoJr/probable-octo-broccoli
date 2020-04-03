const { Router } = require('express');

const {
  getAllBreeds,
  getBreed,
  getBreedBytemperament,
  getBreedByOrigin,
} = require('../../controller');

const router = Router();

router.get('/cats/breed', getAllBreeds);
router.get('/cats/breed/:breedId', getBreed);
router.get('/cats/breed/temperament/:temperament', getBreedBytemperament);
router.get('/cats/breed/origin/:origin', getBreedByOrigin);

module.exports = router;
