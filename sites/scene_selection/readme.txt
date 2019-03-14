Project Overview and Steps
Scene Scheduling
//FREQUENCY:
	Once
	Daily/Weekly (Display days of the week to select)
	Seasonal
		---> Humidifiers = adjust TRIP RATE *info about how to gather humidifier flow rate for deriving new trip
		      Other (e.g. travel, etc) = TIME TO ALARM *Reccommend water off if leaving for long durations and no water needed at property

//MODE:
	Will the user be...
	HOME or AWAY?
		if TTA > 4:15 in next section, default to Standby

//MAX CONTINUOUS FLOW:
	What is the maximum amount of time water is expected to flow? *Usually a shower
		--->if < 4:15 = TTA
			else Mode = STANDBY (potentially consecutive) not HOME/AWAY

//SCHEDULING:
	Once 	     - Start & End DATE w/ :30 resolution
	Daily/Weekly - Display M Tu Wed Th Fr Sa Su w/ :30 resolution

+ Notification indicating the initiation of a scheduled scene
