[[Pullquote provides="block"]]
<style>
.pull{
    position:relative;
}

.pull::before{
     content: '\201C';
     font-family: 'Georgia';
     font-size: 70px;
     position:absolute;
     left:4%;
     top:0;
}

.pull::after{
     content: '\201D';
     font-family: 'Georgia';
     font-size: 70px;
     position:absolute;
     right:4%;
     bottom:4%;
     height:35px;
}

.pull{
   	margin: 50px 0;
	padding: 20px 10%;
	font-family: 'Roboto Slab';
    color: #999;
	font-weight: 300;
	font-size: 1.4em;
	text-align: center;
	line-height: normal;
	position:relative;
}

</style>
<div class="pull">{{Pullquote default="Defaults are cool too!" type="text"}}</div>