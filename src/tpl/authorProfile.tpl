[[AuthorProfile provides="block"]]
<style>
    .ms_authorProfile{
        border-top: 1px solid #D5D5D5;
        margin-bottom: 20px;
    }
    .ms_authorHeadshot{
        float: left;
        max-width: 90px;
        margin: 24px 24px 24px 0;
        border: 1px solid #d5d5d5;
    }
    .ms_authorBio{
        margin: 24px 0 0 105px;
        font-size: 16px;
        line-height: 19px;
        text-align: center;
    }

    .ms_authorBio p{
        margin: 0;
    }
    .ms_authorContact{
        text-align: center;
    }
    .ms_authorContact a{
        color: inherit;
        text-decoration: none;
    }
    .ms_authorContact a:visited{
        color: inherit;
    }
    .ms_authorContact span{
        text-decoration: underline;
        color: #1B6DB5;
    }
    .ms_authorContact i{
        margin: 0 5px;
    }
    .ms_authorContact .atsign{
        text-decoration: none;
        color: #1B6DB5;
    }

</style>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
<div class="ms_authorProfile">
    <a href="http://mcgilltribune.com/a/?author={{authorName type='text'}}">
        <img src='{{authorImage type="text"}}' class="ms_authorHeadshot">
    </a>
    <div class="ms_authorBio">
        {{authorBio type='textarea' default="Meyers Alan is a fourth year arts internship office"}}
        <br/>
        <div class="ms_authorContact">
            <a href='https://twitter.com/{{authorTwitter type="text"}}'><i class="icon-twitter fa-twitter"></i><span class="atsign">@</span><span>{{authorTwitter type='text'}}</span></a> |
            <a href='mailto:{{authorEmail type="text"}}'><i class="fa-envelope"></i><span>{{authorEmail type='text'}}</span></a>
        </div>
    </div>
    <div class="clear"></div>
</div>