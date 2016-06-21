/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('guard'); // -> 'a thing'
 */
 
 module.exports = function (creep)
 {
    if( Attack(creep) )
        return;
    
    Patrol(creep);
}

function Attack(creep)
{
    var targets = creep.room.find(FIND_HOSTILE_CREEPS);

    if(targets.length)
    {
	    if(creep.attack(targets[0]) == ERR_NOT_IN_RANGE)
	    {
		    creep.moveTo(targets[0]);
		    return true;
        }
    }
    
    return false;
}

function Patrol(creep)
{
    creep.moveTo(Game.flags.GuardPoint2);
    return true;
}
