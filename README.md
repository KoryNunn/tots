# tots

Compositional inheritance - Make little chunks of mashed together things.

## Premise

1. Factories should be composable
1. Any factory should be able to be blended with any other factory.
1. Factories should be able to be ordered arbitrarily, and produce different results

## 1. A grayhound is a doggo is an animal.

```javascript

// An animal factory
var animal = tots.create('animal', function(name){
    this.speed = 10;
});

// How a dog runs.
function run(){
    return 'running at ' + this.speed;
}

// A dog factory
var dog = tots.create('dog', function(name){
    this.name = name;
    this.legs = 4;
    this.good = true;
    this.speed = 30;
    tots.bindMethods(this, { run });
}, [animal]);

// A greyhound factory
var grayhound = tots.create('grayhound', function(name){
    this.speed = 60;
}, [dog]); // <- A greyhound is a dog!

// Make a grayhound
var mia = grayhound('mia');

mia.name -> 'mia'
mia.speed -> 60
mia.run() -> 'running at 60'
tots.is(mia, dog) -> true
tots.is(mia, grayhound) -> true
```

## 2. A goanna is a dog lizard.

```javascript

// How a lizard runs.
function lizardRun(){
    return 'running like a lizard at ' + this.speed;
}

// A Lizard factory
var lizard = tots.create('lizard', function(name){
    this.name = name;
    this.legs = 4;
    this.scaley = true;
    tots.bindMethods(this, { run: lizardRun });
}, [animal]);

// Make a dog
var fluffy = dog('fluffy'); -> looks like a dog.

// Make a lizard
var scaley = lizard('scaley'); -> looks like a lizard.

// A dogLizard factory
var dogLizard = tots.mix('dogLizard', [dog, lizard]);

// Make a dogLizard
var goanna = dogLizard('goanna'); -> looks like a goanna.

tots.is(goanna, dog) -> true // like a dog..
goanna.factory === dog -> false // .. but not.
goanna.good -> true // is a good goanna, yes you are!
goanna.scaley -> true // still scaley
```

## 3. dog lizards are not lizard dogs.

```javascript

// A dogLizard factory
var dogLizard = tots.mix('dogLizard', [dog, lizard]);

// A lizardDog factory
var lizardDog = tots.mix('lizardDog', [lizard, dog]);

// Make a lizard
var larry = lizard('larry'); -> looks like a lizard.

// Make a dogLizard
var goanna = dogLizard('goanna'); -> looks mostly like a lizard.

// Make a lizardDog
var peruvianIncaOrchid = lizardDog('peruvianIncaOrchid'); -> looks mostly like a dog.

larry.run() -> 'runs like a lizard at 10'
goanna.run() -> 'runs like a lizard at 30'
peruvianIncaOrchid.run() -> 'runs at 30'

tots.is(goanna, lizardDog) -> false // not a lizard dog
tots.is(peruvianIncaOrchid, dogLizard) -> false // not a dog lizard
```