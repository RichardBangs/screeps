var harvester = require('harvester');
var guardCreator = require('guardCreator');
var guard = require('guard');
var roomMonitor = require('roadMonitor');

module.exports.loop = function () {

    var canUseEnergy = !guardCreator();
    
    roomMonitor(Game.creeps);

	for(var name in Game.creeps) {
		var creep = Game.creeps[name];

		if(creep.memory.role == 'harvester') {
			harvester(creep);
		}

		if(creep.memory.role == 'builder')
		{
			if(creep.carry.energy == 0)
			{
				if(canUseEnergy && Game.spawns.HQ.transferEnergy(creep) == ERR_NOT_IN_RANGE)
				{
					creep.moveTo(Game.spawns.HQ);				
				}
			}
			else
			{
				var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
				if(targets.length)
				{
					if(creep.build(targets[0]) == ERR_NOT_IN_RANGE)
					{
						creep.moveTo(targets[0]);					
					}
				}
				else
				{
				    creep.moveTo(Game.flags.Chill);
				}
			}
		}
		
		if(creep.memory.role == 'guard')
		{
		    guard(creep);
        }
        
        if(creep.memory.role == 'transport')
        {
            var debugTransport = true;
            if(creep.carry.energy > 0 && creep.upgradeController(creep.room.controller) == OK)
            {
                if( debugTransport )
                    creep.say( "Upgrading" );
            }
            else if( creep.memory.shouldHarvest && creep.memory.shouldHarvest == true )
            {
                if( debugTransport )
                    creep.say( "Harvesting" );
                
                harvester( creep );
                
                if( creep.carry.energy == creep.carryCapacity )
                    creep.memory.shouldHarvest = false;
            }
            else if(creep.carry.energy < creep.carryCapacity)
			{
			    if( debugTransport )
			        creep.say( "HQ" );
			    
			    creep.moveTo(Game.spawns.HQ);
			    
			    if(creep.pos.getRangeTo(Game.spawns.HQ)<=2)
			    {
			        creep.memory.waiting += 1;
			        
			        creep.say( "Waiting " + creep.memory.waiting );
			    }
			    if( creep.memory.waiting && creep.memory.waiting > 20 )
			    {
			    	creep.memory.target = 0;
				    creep.memory.shouldHarvest = true;
				    
				    creep.memory.waiting = 0;
			    }
				
				if(canUseEnergy)
				{
				    Game.spawns.HQ.transferEnergy(creep);
				}
			}
			else
			{
			    if( debugTransport )
			        creep.say( "Controller" );
			        
			    creep.memory.waiting = 0;
			    
			    creep.moveTo(creep.room.controller);
			}
        }
	}
}