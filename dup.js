app.LoadPlugin( "Support" );

function OnStart()
{
  lay = app.CreateLayout( "Linear", "VCenter,FillXY" );

  sup = app.CreateSupport();
  anim = sup.AnimationManager();

  btn = app.CreateButton( "I am test button!" );
  lay.AddChild( btn );

  lst = app.CreateList( anim.keys, 1, 0.7 );
  lst.SetOnTouch( lst_OnTouch );
  lay.AddChild( lst );

  app.AddLayout( lay );
}

function lst_OnTouch( name )
{
  sup.PlayAnim( btn, name );
}