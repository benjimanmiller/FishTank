# FishTank
Fish tank idle game. Keep as many fish alive as you can. 

Game mechanisms
    Life Management
        Fish start small and gradually grow over time. 
        Life deminishes over time. Older fish die faster. 
        Give food - Restores health
        Give pills - Removes poisoning and gives health
        Poisoning - Eating spoiled food or poop. Also if the water gets too dirty. Increases life loss per tick. 

    Tank Manangement
        Dirtiness
            Dirtiness will be a level that is tracked and can affect on your fish. 

        Spoiled food and poop 
            Make the tank get dirtier over time.
            More spoiled food or poop will make it dirtier faster. 

        Tank clean up
            Squeegy - On demand will clean all debris from tank but takes some time. 
            Tank filters - Passively sucks up food or poop near the intake(s). 
            Shrimp - Will actively eat spoiled food or poop. 
            Plants - Pasively clean water by ticking a negative to the dirtiness calculations.

    Resource Management
        Money
            You will earn a passive income at set intervals based on the amount of fish that are alive in your tank. 
            Buttons cost money to use.

        Fish Management
            Quantity
                Incentived to have more fish to gain more income. 
                Tank gets dirtier faster and fish are hard to keep alive

            Fish purchasing
                Purchasing fish will cost money. 

    RNG
        RNG will be used to add some randomness and hopefully increase the tension in a fun way. 
            Food and pills will drop at random. 
            Fish will poop at a random number of food eaten. Probably more then 5 bute less then 15. 
            Tank cleanliness - Filters may not suck up old food or shrimp may not clean them all. 

UI elements
    Players name
    Fish's names
        Setable
    Buttons
        Food
        Pills
        Squeegy
        Add fish