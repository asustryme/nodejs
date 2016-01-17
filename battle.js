'use strict';

class Battle {

  constructor(_attacker,_victim) {
    this.attacker = _attacker;
    this.victim = _victim;
    this.round = 0;
    this.log = "";
    this.StartBattle();
  }

  StartBattle(){
    while(this.attacker.getHP()>0 && this.victim.getHP()>0){
      this.round++;
      this.log+="<hr/>";
      this.log+=this.round+". round started!<br/>";
      this.log+=this.attacker.extra();
      this.log+=this.victim.extra();
      this.log+=this.attacker.attack(this.victim);
      if( this.victim.getHP() > 0 ){
        this.log+=this.victim.attack(this.attacker);
      }
    }
  }
  getLog(){
    return this.log;
  }
  getWinner(){
    if( this.attacker.getHP() > 0 ){
      return this.attacker.getID();
    }else{
      return this.victim.getID();
    }
  }
}

module.exports = Battle;