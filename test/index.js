var test = require('tape'),
    tots = require('../');

test('doggo', function(t){

    t.plan(3);

    function run(){
        return 'running at ' + this.speed;
    }

    var animal = tots.create('animal', function(){
            this.speed = 10;
        });

    var dog = tots.create('dog', function(name){
            this.name = name;
            this.legs = 4;
            this.good = true;
            this.speed = 30;
            tots.bindMethods(this, { run });
        }, [animal]);

    var fluffy = dog('fluffy');

    t.equal(fluffy.name, 'fluffy');
    t.equal(fluffy.run(), 'running at 30');
    t.ok(tots.is(fluffy, dog));
});

test('fast doggo', function(t){

    t.plan(5);

    function run(){
        return 'running at ' + this.speed;
    }

    var animal = tots.create('animal', function(){
            this.speed = 10;
        });

    var dog = tots.create('dog', function(name){
            this.name = name;
            this.legs = 4;
            this.good = true;
            this.speed = 30;
            tots.bindMethods(this, { run });
        }, [animal]);

    var grayhound = tots.create('grayhound', function(name){
            this.speed = 60;
        }, [dog]);

    var mia = grayhound('mia');

    t.equal(mia.name, 'mia');
    t.equal(mia.speed, 60);
    t.equal(mia.run(), 'running at 60');
    t.ok(tots.is(mia, dog));
    t.ok(tots.is(mia, grayhound));
});

test('strange doggos', function(t){

    t.plan(15);

    function run(){
        return 'running at ' + this.speed;
    }

    function lizardRun(){
        return 'running like a lizard at ' + this.speed;
    }

    var animal = tots.create('animal', function(){
            this.speed = 10;
        });

    var dog = tots.create('dog', function(name){
            this.name = name;
            this.legs = 4;
            this.good = true;
            this.speed = 30;
            tots.bindMethods(this, { run });
        }, [animal]);

    var lizard = tots.create('lizard', function(name){
            this.name = name;
            this.legs = 4;
            this.scaley = true;
            tots.bindMethods(this, { run: lizardRun });
        }, [animal]);

    var grayhound = tots.create('grayhound', function(name){
            this.speed = 60;
        }, [dog]);

    var lizarddog = tots.mix('lizarddog', [lizard, dog]);
    var lizardhound = tots.mix('lizardhound', [lizard, grayhound]);

    var slowWeirdo = lizarddog('weirdo');

    t.equal(slowWeirdo.name, 'weirdo');
    t.equal(slowWeirdo.speed, 30);
    t.equal(slowWeirdo.run(), 'running at 30');
    t.ok(tots.is(slowWeirdo, dog));
    t.notOk(tots.is(slowWeirdo, grayhound));
    t.ok(tots.is(slowWeirdo, lizard));
    t.ok(tots.is(slowWeirdo, lizarddog));

    var weirdo = lizardhound('weirdo');

    t.equal(weirdo.name, 'weirdo');
    t.equal(weirdo.speed, 60);
    t.equal(weirdo.run(), 'running like a lizard at 60');
    t.ok(tots.is(weirdo, dog), 'is a dog');
    t.ok(tots.is(weirdo, grayhound), 'is a grayhound');
    t.ok(tots.is(weirdo, lizard), 'is a lizard');
    t.ok(tots.is(weirdo, lizardhound), 'is a lizardhound');
    t.notOk(tots.is(weirdo, lizarddog), 'is not a lizarddog');
});

test('goanna', function(t){

    t.plan(5);

    function run(){
        return 'running at ' + this.speed;
    }

    function lizardRun(){
        return 'running like a lizard at ' + this.speed;
    }

    var animal = tots.create('animal', function(){
            this.speed = 10;
        });

    var dog = tots.create('dog', function(name){
            this.name = name;
            this.legs = 4;
            this.good = true;
            this.speed = 30;
            tots.bindMethods(this, { run });
        }, [animal]);

    var lizard = tots.create('lizard', function(name){
            this.name = name;
            this.legs = 4;
            this.scaley = true;
            tots.bindMethods(this, { run: lizardRun });
        }, [animal]);

    var dogLizard = tots.mix('dogLizard', [dog, lizard]);

    var goanna = dogLizard('goanna');

    t.equal(goanna.name, 'goanna');
    t.equal(goanna.speed, 30);
    t.equal(goanna.run(), 'running like a lizard at 30');
    t.ok(tots.is(goanna, dog), 'is a dog');
    t.ok(tots.is(goanna, lizard), 'is a lizard');
});