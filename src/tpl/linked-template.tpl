[[List provides="block"]]
<style>
	.listimg{
		width:300px;
	}
	.listimage-wrap{
		text-align: center;
	}

	.listheader{
		border-bottom:3px solid #333;
	}

	.listitem{
		margin-bottom: 12px;
		overflow: visible;
	}

	.whatyoulist{
		padding-left: 0px;
		overflow: visible;
	}
</style>
	<div class="listitem">
		<h3 class="listheader">{{Item_Title type="text"}}</h3>
		<div class="listimage-wrap"><<&FeaturedBlock accepts="block">></div>
		<div class="listtext">{{Item_Content type="textarea"}}</div>
	</div>