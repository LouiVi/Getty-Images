cfg.Light;
app.LoadPlugin( "Picasso" );
app.LoadPlugin( "Utils" );
app.LoadPlugin( "Support" );
//app.CopyFile( "Img/Getty Images.png", app.GetInternalFolder() + "/Download/Getty Images Pro.png" );
//count = app.LoadNumber( "count", 0, "count.txt" );
app.SaveNumber( "count", 0, "count.txt" );
//window.localStorage("count") = 0;
url = "https://www.gettyimages.com/photos/publicity?family=creative&license=rf&page=5&phrase=Cats&sort=mostpopular";
//"https://www.gettyimages.com/photos/haile-selassie?assettype=image&license=rf&alloweduse=availableforalluses&family=creative&phrase=haile%20selassie&sort=best"
//"https://www.gettyimages.com/photos/haile-selassie?family=editorial&assettype=image&phrase=haile%20selassie";
p = 1;
sor = "mostpopular";
family ="editorial";// "creative"; //editorial

//Called when application is started.
function OnStart()
{
utils = app.CreateUtils();
sup = app.CreateSupport();
  anim = sup.AnimationManager();

	//Create a layout with objects vertically centered.
	lay = app.CreateLayout( "linear", "VCenter,FillXY" );	
	lay2 = app.CreateLayout( "linear", "Horizontal,FillX" );	
	lay3 = app.CreateLayout( "linear", "Horizontal,HCenter,FillX" );	
	lay4 = app.CreateLayout( "linear", "Horizontal,VCenter,FillX" );	
	 img = sup.CreateCircleImage( "Img/Getty Images.png", 0.65 );
 img.SetBorderWidth( 2 );
 	var rColor = utils.RandomHexColor(true);
		//img.SetBackGradient( utils.GetGradientColors(rColor)[0], rColor, utils.GetGradientColors(rColor)[1]);
	img.SetCircleBackColor( rColor);

 img.SetBorderColor( rColor );


//img = app.CreateImage( "Img/Getty Images.png", 0.7875, -1);//,"ScaleCenter,async,wallpaper", "230px", "-1" );
lay.AddChild( img );
	lay.AddChild( lay3 );
lay.AddChild( lay4 );
lay.AddChild( lay2 );
txt3_1 = app.CreateText( "Sort Type:", 0.5, -1,"Bold" );
txt3_2 = app.CreateText( "Page #:", 0.5, -1, "Bold" );
txt3_1.SetTextSize( 17 );
txt3_2.SetTextSize( 17 );
lay3.AddChild( txt3_1 );
lay3.AddChild( txt3_2 );
spn4_1 = app.CreateSpinner( "Most Popular,Newest,Oldest,Best Match", 0.5, 0.1 );
spn4_2 = app.CreateSpinner( "", 0.5, 0.1 );
spn4_1.SetOnChange( spn41 );
spn4_2.SetOnChange( spn42 );
s = "";
for(c=1;c<101;c++){
	if(s=="") { s+=c; } else { s+=","+c;}
}
spn4_2.SetList( s );
lay4.AddChild( spn4_1 );
lay4.AddChild( spn4_2 );

//app.MakeFolder( '/storage/emulated/0/Monica De Gennaro' );

	txtUrl = app.CreateTextEdit( "Carmen Villalobos", 0.7, 0.1 );
lay2.AddChild( txtUrl );
btnUrl = app.CreateButton( "GET", 0.275, 0.1 );
lay2.AddChild( btnUrl );
btnUrl.SetOnTouch( btnUrl_OnTouch );
	web = app.CreateWebView( 1.0, 0.498, "Progress,IgnoreErrors" );
	web.SetBackColor( "#ffffff" )
	web.SetOnProgress( web_OnProgress );
	//web.SetOnUrl( web_OnUrl );
	//web.SetOnRequest( web_OnRequest );
	lay.AddChild( web );
	
	//Add layout to app.	
	app.AddLayout( lay );
	//app.DeleteFolder( "/sdcard/Ninel Conde/" );
	//app.DeleteFolder( "/sdcard/Ninel Conde" );
	
	//utils.ZipFolder("/sdcard/Ninel Conde/", app.GetInternalFolder() + "/Download/Ninel Conde.zip" );
	/*SU = SearchUrl();
	app.HttpRequest( "GET", SU.split("?")[0], null, SU.split("?")[1].replace("&","|").replace("&","|").replace("&","|").replace("&","|"), handleReply );*/
 sI = setInterval(AnimateLogo, 550);
}


function spn41(item,index)
{
	if(item == "Most Popular") sor = "mostpopular";
	if(item == "Newest") sor = "newest";
	if(item == "Oldest") sor = "oldest";
	if(item == "Best Match") sor = "best";
}

function spn42(item,index)
{
	p = parseInt(item);
}

function Capitalize(str)
{
//alert(typeof(str));
//app.Exit();
//	if(typeof str === "String") app.Alert( "The type of the parameter passed is: " + typeof(str), "Parameter (str): [" + str + "]","",169 );
	if(typeof(str) == "string") {
		strArr = new Array();
		for(c=0;c<str.length;c++){
			if(str[c-1] == " " || c == 0){
				strArr[c] = str[c].toUpperCase();
			} else {
				strArr[c] = str[c];
			}
		}
return strArr.join("");
	}

}

function AnimateLogo()
{
var rColor = utils.RandomHexColor(true);
		//img.SetBackGradient( utils.GetGradientColors(rColor)[0], rColor, utils.GetGradientColors(rColor)[1]);
	img.SetCircleBackColor( rColor);

 img.SetBorderColor( rColor );

  anima = anim.keys[utils.RandomIntegerRange(0, anim.keys.length)];
	img.Animate( anima );
}


function btnUrl_OnTouch()
{
txtUrl.ClearFocus();
fStr = Capitalize(txtUrl.GetText());
txtUrl.SetText( fStr );
	SU = SearchUrl(txtUrl.GetText());
if(!CheckRequest(SU)){
LogRequest(SU);
	app.HttpRequest( "GET", SU.split("?")[0], null, SU.split("?")[1].replace("&","|").replace("&","|").replace("&","|").replace("&","|"), handleReply );
}else{
app.Alert( "The page that you request was requested before, choose another page or sort type.", "The request is denied!","", 69 );
}
if(app.IsKeyboardShown()) app.HideKeyboard();
}

function CheckRequest(str)
{
	strTemp = app.ReadFile( app.GetAppPath() + "/Request-LogNew.txt" ).split("\n");
	for(c=0;c<strTemp.length;c++){
		if(strTemp[c] == str) {
			if(utils.Confirm("Want to browse: " + strTemp[c])) app.OpenUrl( strTemp[c] );
			return true;
		}
	}
return false;
}



function LogRequest(str)
{
	app.WriteFile( app.GetAppPath() + "/Request-LogNew.txt", str + "\n", "Append" );
}



function web_OnUrl(URL)
{
	alert("URL: " + URL);
}

function web_OnRequest(request)
{
	//alert("Request: " + request);
}


function handleReply(error, reply)
{
	if(error) alert(reply);
reply = reply.replace("</head>", "<script src='file:///android_asset/app.js'></script></head>");
web.SetVisibility( "Hide" );
	web.LoadHtml( reply);//, "https://www.gettyimages.com/");
//app.SetClipboardText( reply );
//	app.WriteFile( "Html/Loudy.html.txt", reply, "Write" );
}

function web_OnProgress(progress)
{
	if(progress == 100) web.Execute( "var gPath='" + gPath + "'; " + app.ReadFile( "OnWeb.js" ) );
}

function SearchUrl(su = '')
{
	u = su ? su : prompt("Search for: ", su ? su : '');
	if(p==0){
	//utils.ZipFolder("/sdcard/"+u+"/", app.GetInternalFolder() + "/Download/"+u+".zip" );
app.DeleteFolder( "/sdcard/"+u);//app.GetInternalFolder() + '/Download/' + u);

	}
	if(p==(7*1)){
	utils.ZipFolder("/sdcard/"+u+"/", app.GetInternalFolder() + "/Download/"+u+".zip" );
//app.Wait( 7, false );
app.Wait( 4, true );
app.DeleteFolder( "/sdcard/"+u);
app.Exit(true);
	}
app.MakeFolder( "/sdcard/"+u);//app.GetInternalFolder() + '/Download/' + u);
gPath =  u + "/";
//alert("Search "+gPath);
	u1 = u.replace(" ", "-").replace(" ", "-").replace(" ", "-").replace(" ", "-");
	u2 = u.replace(" ", "%20").replace(" ", "%20").replace(" ", "%20").replace(" ", "%20");
	ret = "https://www.gettyimages.com/photos/" + u1 + "?family=" + family + "&page=" + p + "&phrase=" + u2 + "&sort="+sor;//newest";

return ret;
}

function Again()
{
	co2 = true;//confirm("Want to Search the next page?");
if (co2) {
p++;
spn4_2.Animate( "Tada" );
spn4_2.SetText( p );
	SU = SearchUrl(u);
if(!CheckRequest(SU)){
LogRequest(SU);
	app.HttpRequest( "GET", SU.split("?")[0], null, SU.split("?")[1].replace("&","|").replace("&","|").replace("&","|").replace("&","|"), handleReply );
}
//ss = SearchUrl(u);
//SU = SearchUrl();
	//app.HttpRequest( "GET", SU.split("?")[0], null, SU.split("?")[1].replace("&","|").replace("&","|").replace("&","|"), handleReply );

//	if(ss != '') app.HttpRequest( "GET", ss.split("?")[0], null, ss.split("?")[1].replace("&","|").replace("&","|").replace("&","|").replace("&","|"), handleReply );
return;
}
	co = confirm("Want to make a new search?");
if(co) {
p = 1;
	SU = SearchUrl();
if(!CheckRequest(SU)){
LogRequest(SU);
	app.HttpRequest( "GET", SU.split("?")[0], null, SU.split("?")[1].replace("&","|").replace("&","|").replace("&","|").replace("&","|"), handleReply );
}
	//ss = SearchUrl();
	//if(ss != '') app.HttpRequest( "GET", ss.split("?")[0], null, ss.split("?")[1].replace("&","|").replace("&","|").replace("&","|").replace("&","|"), handleReply );
//app.HttpRequest( "GET", ss, null, null, handleReply );
}
}

//function dload_OnComplete () {}