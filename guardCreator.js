/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('guardCreator'); // -> 'a thing'
 */
 
 module.exports = function ()
 {
    setTargets();
    return createUpdate();
}

function setTargets()
{
    var allHarvesters = _.filter(Game.creeps, {memory:{role:"harvester"}});
    for( var n = 0; n < allHarvesters.length; n++ )
    {
        allHarvesters[n].memory = { role: "harvester", target: n%2 };
    }
}

function createUpdate()
{
    const maxGuards = 0;
    const maxHarvesters = 2;
    const maxTransport = 2;
    const maxBuilders = 1;
    
    if( creepType( maxHarvesters, "harvester", [MOVE, CARRY, WORK] ) )
        return true;
    if( creepType( maxGuards, "guard", [MOVE, ATTACK, TOUGH] ) )
        return true;
    if( creepType( maxTransport, "transport", [MOVE, CARRY, WORK] ) )
        return true;
    if( creepType( maxBuilders, "builder", [MOVE, CARRY, WORK] ) )
        return true;
    
    return false;
}

var creepType = function(maxNum, myRole, actions)
{
    var num = _.filter(Game.creeps, {memory:{role:myRole}}).length;
        
    if( num >= maxNum )
        return false;
        
    var returnCode;
    var creepName = myRole + Game.spawns.HQ.memory.thingsSpawned;
        
    if( ( returnCode = Game.spawns.HQ.createCreep(actions, creepName, {role: myRole}) ) == creepName )
    {
        console.log( "Spawning: " + creepName );
        Game.spawns.HQ.memory.thingsSpawned += 1;
    }
    else
    {
        var errorDetails = returnCode;
        switch( returnCode )
        {
            case -6:
                errorDetails = "Not enough energy."
                break;
            case -4:
                errorDetails = "Spawning in Progress."
                break;
        }
        
        console.log( "Trying to Spawn " + creepName + "  ->  Error: " + errorDetails );
    }
        
    return true;
}