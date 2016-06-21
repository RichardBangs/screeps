/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('harvester'); // -> 'a thing'
 */
 
 module.exports = function (creep) {

	if(creep.carry.energy < creep.carryCapacity) {
		var sources = creep.room.find(FIND_SOURCES);
		
		
		if(creep.harvest(sources[creep.memory.target]) == ERR_NOT_IN_RANGE) {
			creep.moveTo(sources[creep.memory.target]);
		}			
	}
	else {
		if(creep.transfer(Game.spawns.HQ, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
			creep.moveTo(Game.spawns.HQ);
		}			
	}
}