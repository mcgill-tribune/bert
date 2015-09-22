[[Profile provides="doc"]]
	<style>
		.profiles{
			text-align: center;
			margin: 0;
			padding: 0;
			transition: all 0.4s ease;
			overflow: hidden;
		}
		.profileImg{
			list-style: none;
			display: inline-block;
			width: 32%;
			overflow: hidden;
			transition: all 0.4s ease 0.4s;
			vertical-align: top;
			margin-bottom: 10px;
		}

		.profileImg.inactive{
			margin-bottom: 0;
		}

		.profiles h3{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,0.7);
			padding: calc(50% - 1em) 0;
			margin: 0;
			box-sizing: border-box;
			opacity: 0;
			color: white;
			transition: opacity 0.2s ease;
		}

		.profiles h3:hover{
			opacity: 1;
		}

		.profiles li.active h3{
			opacity: 0;
			font-size: 3em;
	    left: 100%;
	    top: 0;
			width: 200%;
		}

		.profileImgContent{
			opacity: 1;
			max-height: 500px;
			position: relative;
		}
		.profileImg img{
			width: 100%;
		}

		.readMore{
			background: none;
			border: 2px solid black;
			padding: 10px;
			display: block;
			margin: 0 auto;
			outline: 0;
		}

		.profiles li.inactive .profileImgContent{
			transform: translateX(-100%);
			transition: opacity 0.4s ease, transform 0.8s ease, max-height 0.4s ease 0.2s;
			opacity: 0;
		}

		.profiles.active li.inactive .profileImgContent{
			max-height: 0;
		}


		.profiles.active li.active .profileImgContent{
			transform: translateX(0);
			opacity: 1;
		}

		.profiles.active li.active{
			overflow: visible;
		}

		.profiles.active li.active:nth-child(3n+2){
			transform: translateX(-100%);
		}

		.profiles.active li.active:nth-child(3n+3){
			transform: translateX(-200%);
		}
		.profiles.active li.active h3{
	    position: absolute;
			opacity: 1;
			transition: opacity 0.4s ease 0.4s;
			background: transparent;
			color: black;
		}
		.content{
			max-height: 0px;
			overflow: hidden;
			transition: all 1s linear 0.5s;
			opacity: 0;
		}

		.content p:first-child{
			margin-top: 0;

		}

		.content.active{
			max-height: 1000px;
			opacity: 1;
		}
	</style>
	<div style="max-width:800px; margin:0 auto">
		<ul class="profiles">
			<li class="profileImg" data-target='{{id1 type="text"}}'>
				<div class="profileImgContent">
					<img src='{{img1 type="text"}}' alt="">
					<h3>{{name1 type="text"}}</h3>
				</div>
			</li>
			<li class="profileImg" data-target='{{id2 type="text"}}'>
				<div class="profileImgContent">
				<img src='{{img2 type="text"}}' alt="">
				<h3>{{name2 type="text"}}</h3>
			</div>
			</li>
			<li class="profileImg" data-target='{{id3 type="text"}}'>
				<div class="profileImgContent">
				<img src='{{img3 type="text"}}' alt="">
				<h3>{{name3 type="text"}}</h3>
			</div>
			</li>
			<li class="profileImg" data-target='{{id4 type="text"}}'>
				<div class="profileImgContent">
				<img src='{{img4 type="text"}}' alt="">
				<h3>{{name4 type="text"}}</h3>
			</div>
			</li>
			<li class="profileImg" data-target='{{id5 type="text"}}'>
				<div class="profileImgContent">
				<img src='{{img5 type="text"}}' alt="">
				<h3>{{name5 type="text"}}</h3>
			</div>
			</li>
			<li class="profileImg" data-target='{{id6 type="text"}}'>
				<div class="profileImgContent">
				<img src='{{img6 type="text"}}' alt="">
				<h3>{{name6 type="text"}}</h3>
			</div>
			</li>
		</ul>
			<div class="content">
			</div>
			<button class="readMore">Read about the other execs</button>
			<script type="text/html" id="{{id1 type="text"}}">
				{{content1 type="textarea"}}
			</script>
			<script type="text/html" id="{{id2 type="text"}}">
				{{content2 type="textarea"}}
			</script>
			<script type="text/html" id="{{id3 type="text"}}">
				{{content3 type="textarea"}}
			</script>
			<script type="text/html" id="{{id4 type="text"}}">
				{{content4 type="textarea"}}
			</script>
			<script type="text/html" id="{{id5 type="text"}}">
				{{content5 type="textarea"}}
			</script>
			<script type="text/html" id="{{id6 type="text"}}">
				{{content6 type="textarea"}}
			</script>
	<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
	<script type="text/javascript">
		$('.profileImg').on('click', function(){
			var self = this;
			$(this).addClass('active');
			var remove = $('.profileImg').not(this);
			var timer;
			timer = window.setInterval(function(){
				if(!remove.length){
					$(self).closest('ul').addClass('active');
					content = $('#' + $(self).data('target')).html();
					$('.content').html(content);
					$('.content').addClass('active');
					window.clearInterval(timer);
					return;
				}
				var target = Math.floor(Math.random() * remove.length);
				$(remove[target]).addClass('inactive');
				remove.splice(target, 1);
			}, 100);
		});
		$('.readMore').on('click', function(){
			var self = this;
			$(self).closest('ul').removeClass('active');
			$('.content').removeClass('active');
			$('.profileImg').removeClass('active');
			var remove = $('.profileImg').not(this);
			var timer;
			timer = window.setInterval(function(){
				if(!remove.length){
					window.clearInterval(timer);
					return;
				}
				var target = Math.floor(Math.random() * remove.length);
				$(remove[target]).removeClass('inactive');
				remove.splice(target, 1);
			}, 100);
		});
	</script>
