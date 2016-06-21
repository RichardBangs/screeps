/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('roadMonitor'); // -> 'a thing'
 */

module.exports = function()
{
    const monitor = true;
    const buildAll = true;
    
    if(!monitor)
        return;
    
    const roomSize = 50;
    
    var myRoom = Game.rooms["E19S21"];
    
    if(!myRoom.memory.trails)
    {
        myRoom.memory.trails = [];
        for( var x = 0; x < roomSize; x++ )
        {
            myRoom.memory.trails[x] = [];
            for( var y = 0; y < roomSize; y++ )
            {
                myRoom.memory.trails[x][y] = 0;
            }
        }
    }
    
    var myCreeps = myRoom.find( FIND_MY_CREEPS );
    myCreeps = _.filter( myCreeps, function(creep) { return creep.memory.role == "harvester" || creep.memory.role == "transport"; } );
    
    for( myCreep of myCreeps )
    {
        myRoom.memory.trails[ myCreep.pos.x ][ myCreep.pos.y ] += 1;
    }
    
    var maxItem = 0;
    var maxX, maxY;
    for( var x = 0; x < roomSize; x++)
    {
        for( var y = 0; y < roomSize; y++)
        {
            var myValue = myRoom.memory.trails[ x ][ y ];
            if( buildAll && myValue > 100 )
            {
                if(myRoom.lookForAt(LOOK_CONSTRUCTION_SITES, x, y).length == 0)
                    myRoom.createConstructionSite( x, y, STRUCTURE_ROAD );
            }
            
            if( myValue <= maxItem )
                continue;
            
            maxItem = myValue;
            maxX = x;
            maxY = y;
        }
    }
    
    //console.log( "HIGHEST X=" + maxX + " Y=" + maxY + " VALUE=" + maxItem);
}