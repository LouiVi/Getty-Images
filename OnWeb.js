app.LoadPlugin( "Picasso" );
app.LoadPlugin( "Utils" );

//alert(gPath);
function img_OnSaved(result, error)
{
c++;
//if(c==d) app.Execute("Again();");
  app.ShowPopup( "Result: \r\n------------------\r\n" + result + "\r\nError: \r\n------------------\r\n" + error );
}


function dload_OnCancel(file)
{
alert(file);
}

function dload_OnError(error)
{
alert(error);
}

function dload_OnComplete()
{
	app.ShowPopup( "Downloaded", "Bottom,Short" );
}
function dload_OnDownload(path)
{
//c++;
//if(c==d) app.Execute("Again();");
app.ShowPopup( "The file was downloaded to " + path, "Top,Long" );
/*
self = this;
	app.ShowPopup(self.curImg + "\n\nwas downloaded in\n\n" + path, "Top,Long" );
*/

//ToDo
//if(utils.RandomIntegerRange(0,10)<=3) app.GetThumbnail( path, path.replace(gPath, "Hot Babes"), 640, 920 );
//app.WriteFile( app.GetAppPath() + "/Pictures-Log.txt", path +"\n", "Append" );

}

utils = app.CreateUtils();
dload = new Array();//app.CreateDownloader();
//dload.SetOnComplete(dload_OnComplete);
//dload.SetOnDownload(dload_OnDownload);
//dload.SetOnCancel( dload_OnCancel );
//dload.SetOnError( dload_OnError );

var c = app.LoadNumber( "count", 0, "count.txt" );
//parseInt(localStorage("count")) : parseInt(localStorage("count")) ? 0;
var i = document.getElementsByTagName('img');
var d = i.length*2;
var s = "";
var division = 1;//parseInt(prompt("" + i.length + " % _:","8"));
for(a = 0; a < i.length/division;a++)
{
dload[a] = app.CreateDownloader();
dload[a].SetOnComplete(dload_OnComplete);
dload[a].SetOnDownload(dload_OnDownload);
		//app.ShowPopup(i[a].src);
  //if(i[a].src.replace('media.gettyimages.com', '').length != i[a].src.length && i[a].src != '')
 	if(i[a].src.replace('http', '').length != i[a].src.length && i[a].src != '')
   {
   c++;
      //app.ShowPopup(i[a].src,"Bottom");
			//curImg = i[a].src;
			//log below
			
			//app.WriteFile( app.GetAppPath() + "/Pictures-Log2.txt", i[a].src + "\n", "Append" );
      dload[a].Download(i[a].src, "/sdcard/" + gPath, gPath.replace("/","") + "_" + c + ".jpg");
			dload[a].curImg = i[a].src;
      s += '<img width=\"100%\" src=\"' + i[a].src + '\" />';
      /*s += '<img style=\"float:left\" width=\"25%\" src=\"file:///storage/emulated/0/' + gPath + "/" + gPath + "_" + a + ".png"  + '\" />';
 */

 Picasso.get()
   .load( i[a].src )
	 .transform( "rounded", 45 )
   .save(  "/sdcard/" + gPath + "GI_" + a + ".png", img_OnSaved );

   }
   else
   {
   //app.ShowPopup( "can not download" );
   }
};
//app.WriteFile( "Html/Log-Web.html", s  + "\n", "Append" );
document.body.innerHTML = s;
app.Execute( 'web.SetVisibility( "Show" ); setTimeout(Again, (1974*3));' );
//co = confirm("Want to Search again?");
//if(co) app.Execute( 'app.HttpRequest( "GET", SearchUrl(), null, null, handleReply );' ); )
app.SaveNumber( "count", c, "count.txt" );