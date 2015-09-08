[[Scoreboard provides="block"]]
<style>
	.scoreboard{
		width: 100%;
		height: 74px;
		display: inline-block;
		margin: 0 0 10px;
		position:relative;
		font-family: 'Evogria';
		font-variant: italic;
	}

	.scores-left{
		position: absolute;
		left:0;
		top:0;
		text-align: left;
		height:100%;
		width:50%;
	}

	.scores-right{
		position: absolute;
		right:0;
		top:0;
		text-align: right;
		height:100%;
		float: right;
		width:50%;
		border-left: 1px solid lightgrey;
	}

	.score-team{
		text-align: center;
		position: absolute;
		width: 100%;
		top: 27px;
		font-size: 20px;
	}

	.score{
		font-size: 20px;
	}

	.scores-left .score{
		text-align: right;
		position: absolute;
		width: 93%;
		top: 27px;
		left:0;
	}

	.scores-right .score{
		text-align: left;
		position: absolute;
		width: 93%;
		top: 27px;
		right:0;
	}

	.scores-logo{
		width:74px;
		height: 74px;
		float:left;
	}

	.scores-right .scores-logo{
		float:right;
	}

	@media (max-width: 1109px){
		.score-team{
			position:static;
		}
		.scores-left .score{
			text-align: center;
			position: static;
			width:auto;
		}

		.scores-right .score{
			text-align: center;
			position: static;
		}
	}
</style>
<div class="scoreboard" >
	<div class="scores-left" >
		<img class="scores-logo"  src="{{Team_1_Logo default='' type='text'}}" alt="" />
		<div class="score-team" >{{Team_1_Name default='' type='text'}}</div>
		<div class="score" >{{Team_1_Score default='' type='text'}}</div>
	</div>
	<div class="scores-right" >
		<img class="scores-logo" src="{{Team_2_Logo default='' type='text'}}"  alt="" />
		<div class="score-team">{{Team_2_Name default='' type='text'}}</div>
		<div class="score" >{{Team_2_Score default='' type='text'}}</div>
	</div>
</div>