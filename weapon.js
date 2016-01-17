'use strict';

class Weapon {

  constructor(_name,_damage,_absorb) {
    this.name = _name;
    this.damage = _damage;
    this.absorb = _absorb;
  }

  getName(){
    return this.name;
  }

  getDamage(){
    return this.damage;
  }
  getAbsorb(){
    return this.absorb;
  }
  
}

module.exports = Weapon;