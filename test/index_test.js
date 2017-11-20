
const _ = require('lodash');
const Lab = require('lab');
const should = require('should');
const SpicySet = require('../lib/index');

exports.lab = Lab.script();
const lab = exports.lab;
const describe = lab.describe;
const it = lab.it;

// test data
const futureSoloAlbums = {
  beastMode: true,
  fiftySixNights: true,
  monster: true,
  WATTBA: false,
  superSlimey: false
};

const youngThugSoloAlbums = {
  slimeSeasonOne: true,
  barterSix: true,
  superSlimey: false,
  easyBreezy: true
};

describe('Spicy Set', () => {
  describe('Constructor', () => {
    it('should return a set when called with no arguments', (done) => {
      const setWithoutArguments = new SpicySet();

      should(setWithoutArguments).be.type('object');

      done();
    });
    it('should return a set when called with an array', (done) => {
      const setWithIterable = new SpicySet([
        futureSoloAlbums,
        youngThugSoloAlbums,
        _.cloneDeep(futureSoloAlbums)
      ]);

      should(setWithIterable).be.type('object');

      should(setWithIterable.has(futureSoloAlbums)).equal(true);
      should(setWithIterable.has(youngThugSoloAlbums)).equal(true);
      should(setWithIterable.size).equal(2);

      done();
    });
    it('should return a set when called with an iterable', (done) => {
      const vanillaSetWithIterable = new Set([
        futureSoloAlbums,
        youngThugSoloAlbums,
        _.cloneDeep(futureSoloAlbums)
      ]);

      const spicySetWithIterable = new SpicySet(vanillaSetWithIterable);

      should(spicySetWithIterable).be.type('object');

      should(spicySetWithIterable.has(futureSoloAlbums)).equal(true);
      should(spicySetWithIterable.has(youngThugSoloAlbums)).equal(true);
      should(spicySetWithIterable.size).equal(2);

      done();
    });
  });
  describe('hasObject', () => {
    it('should return true if object with same content is in set', (done) => {
      const set = new SpicySet();

      set.add(_.cloneDeep(futureSoloAlbums));

      should(set.hasObject(futureSoloAlbums)).equal(true);
      should(set.has(futureSoloAlbums)).equal(false);

      done();
    });
    it('should return false if object is not in set', (done) => {
      const set = new SpicySet();

      set.add(_.cloneDeep(futureSoloAlbums));

      should(set.hasObject(futureSoloAlbums)).equal(true);
      should(set.has(futureSoloAlbums)).equal(false);
      should(set.hasObject(youngThugSoloAlbums)).equal(false);
      should(set.has(youngThugSoloAlbums)).equal(false);

      done();
    });
  });
  describe('addObject', () => {
    it('should add the object if not present and return the set', (done) => {
      const set = new SpicySet();

      set.add(_.cloneDeep(futureSoloAlbums));

      // check the inventory before we add to it
      should(set.hasObject(futureSoloAlbums)).equal(true);
      should(set.has(futureSoloAlbums)).equal(false);
      should(set.hasObject(youngThugSoloAlbums)).equal(false);
      should(set.has(youngThugSoloAlbums)).equal(false);

      // add the object to the set and check the inventory
      should(set.addObject(_.cloneDeep(youngThugSoloAlbums))).equal(set);
      should(set.hasObject(youngThugSoloAlbums)).equal(true);
      should(set.has(youngThugSoloAlbums)).equal(false);

      done();
    });
    it('should not add the object if already present and return the set', (done) => {
      const set = new SpicySet();

      set.add(_.cloneDeep(futureSoloAlbums));
      set.add(_.cloneDeep(youngThugSoloAlbums));

      should(set.hasObject(futureSoloAlbums)).equal(true);
      should(set.has(futureSoloAlbums)).equal(false);
      should(set.hasObject(youngThugSoloAlbums)).equal(true);
      should(set.has(youngThugSoloAlbums)).equal(false);

      // add the object to the set and check the inventory
      should(set.addObject(_.cloneDeep(youngThugSoloAlbums))).equal(set);
      should(set.hasObject(youngThugSoloAlbums)).equal(true);
      should(set.has(youngThugSoloAlbums)).equal(false);

      done();
    });
  });
});
