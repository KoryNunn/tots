function create(type, thinger, otherThingers){
    var makeThingo = function(){
        var args = arguments;
        var thingo = this._type ? this : {
                _type: type,
                _types: []
            };

        otherThingers && otherThingers.forEach(function(otherThinger){
            if(~thingo._types.indexOf(otherThinger.type)){
                return;
            }

            thingo._types.push(otherThinger.type);
            otherThinger.apply(thingo, args);
        });

        thingo._types.push(type);
        thinger.apply(thingo, args);

        return thingo;
    };

    makeThingo.type = type;
    makeThingo.types = (otherThingers ? otherThingers.map(function(otherThinger){
        return otherThinger.type;
    }) : []).concat([type]);
    makeThingo.factory = thinger;

    return makeThingo;
}

function mix(type, otherThingers){
    return create(type, function(){}, otherThingers);
}

function is(thingo, typeOrThinger){
    return ~thingo._types.indexOf(typeOrThinger instanceof Function ? typeOrThinger.type : typeOrThinger);
}

function bindMethods(thingo, methods){
    for(var method in methods){
        thingo[method] = methods[method].bind(thingo);
    }
}

module.exports = {
    create: create,
    mix: mix,
    is: is,
    bindMethods: bindMethods
};