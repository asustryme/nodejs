var path = require('path');
var express = require('express');
var app = express();
//app.use(express.static(__dirname));
//Serve static content for the app from the "public" directory in the application directory.

app.use('/', express.static(__dirname + '/'));

// Mount the middleware at "/static" to serve static content only when their request path is prefixed with "/static".

    // GET /static/style.css etc.
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/assets/css', express.static(__dirname + '/assets/css'));



var Warrior = require('./warrior');
var Priest = require('./priest');
var Battle = require('./battle');
var Weapon = require('./weapon');
var Heroes = [];

//Heroes.push(new Warrior(Heroes.length,30));
//Heroes.push(new Priest(Heroes.length,20));

app.get('/', function(req, res) {
  
 // app.use(express.static('/'));
  res.sendFile('./index.html', { root: path.join(__dirname) });
});

app.get('/heroes', function(req, res) {
	html = "{ ";
	for (index = 0; index < Heroes.length; ++index) {
      html+= '"'+index+'": '+Heroes[index].print()+',';
	}
	html = html.substring(0, html.length - 1);
	html+=" }";
  res.send(html);
});

app.get('/addhero', function(req, res) {
	if( req.query.type && req.query.life ){
	  if( req.query.type == "warrior"){
	  	Heroes.push(new Warrior(Heroes.length,req.query.life));
	  }else{
	  	Heroes.push(new Priest(Heroes.length,req.query.life));
	  }
	  res.send('{ "status" : true }');
	}else{
	  res.send("Hero add: ?type=warrior/priest&life=<number 1..30>");
	}

});

app.get('/addweapon', function(req, res) {
	if( req.query.weapon == "sword" ){
		var weapon = new Weapon("sword",7,2);
	}else if( req.query.weapon == "dagger" ){
		var weapon = new Weapon("dagger",5,4);
	}else if( req.query.weapon == "staff" ){
		var weapon = new Weapon("staff",8,1);
	}else{
		res.send("Weapon add: hero=0/1/2..?weapon=sword/dagger/staff");
		res.end();
		return;
	}
	if( req.query.hero ){
	  if( Heroes[req.query.hero] ){
	  	Heroes[req.query.hero].addWeapon(weapon);
	  	res.send('{ "status" : true }');
	  }else{
	  	res.send("This warrior just doesn't exists!");
	  }
	}else{
	  res.send("Weapon add: hero=0/1/2..?weapon=sword/dagger/staff");
	}
});

app.get('/revive', function(req, res) {
  if(req.query.hero1){
  	if( Heroes[req.query.hero1] ){
	  Heroes[req.query.hero1].revive();
	  res.send("Warrior #"+req.query.hero1+" revived!");
  	}else{
  	  res.send("This warrior just doesn't exists!");
  	}
  }else{
	res.send("Parameter needed: ?hero1=<warrior number>");
  }
});

app.get('/battle', function(req, res) {
  //var battle = new Battle(John,Theon);
  if(req.query.hero1 && req.query.hero2){
  	if( req.query.hero1 != req.query.hero2 ){
  	  if( Heroes[req.query.hero1] && Heroes[req.query.hero2] ){
		var battle = new Battle(Heroes[req.query.hero1],Heroes[req.query.hero2]);	
		var a = "";
		a = battle.getLog();
		a = a+"<hr/>A nyertes: "+Heroes[battle.getWinner()].print();
		res.send(a);
  	  	//res.send(battle.getWinner());
  	  }else{
  	  	res.send("Az egyik harcos nem létezik!");
  	  }
  	}else{
      res.send("A harcos nem harcolhat saját maga ellen!");
  	}
  }else{
	res.send("A harchoz szukseg van a kovetkezo parameterekre: hero1=<harcos szama>&hero2=<harcos szama>");
  }
});

app.listen(3000);