'use strict';
var Weapon = require('./weapon');

class Warrior {

  constructor(_id,_hp) {
    if(_hp>30){
      this.hp = 30;
    }else{
      this.hp = _hp;
    }
    this.hp_original = this.hp;
    this.weapon = new Weapon('melee',1,0);
    this.id = _id;
    this.type = "Warrior";
  }
// Getters //
  getWeapon(){
    return this.weapon;
  }
  getID(){
    return this.id;
  }
  getHP(){
    return this.hp;
  }
  getType(){
    return this.type;
  }
  print(){
    return '{ "id":"'+this.id+'", "Type": "'+this.type+'", "Life":"'+this.hp+'","Weapon":"'+this.weapon.getName()+'" }';
  }
// Setters //
  setHP(_hp){
    this.hp = _hp;
  }
  revive(){
    this.hp = this.hp_original;
  }
  addWeapon(_weapon){
    this.weapon = _weapon;
  }
// Methods //
  extra(){
    return "";
  }
  attack(_victim){
    var dmg = _victim.weapon.getAbsorb()-this.weapon.getDamage();
    if( dmg < 0 ){
      _victim.setHP(_victim.getHP()+dmg);
      return this.type+" #"+this.id+" attacked "+_victim.getType()+ " #"+_victim.getID()+" with "+dmg+" dmg! ( Life: "+_victim.getHP()+" )<br/>";
    }else{
      return this.type+" #"+this.id+" attacked "+_victim.getType()+ " #"+_victim.getID()+" with 0 dmg!<br/>";
    }
  }

}

module.exports = Warrior;