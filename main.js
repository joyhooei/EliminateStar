cc.game.onStart = function()
{
	var ww = Def.windowWidth();
	var hh = Def.windowHeight();
//    cc.view.setDesignResolutionSize(ww, hh, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.setDesignResolutionSize(ww, hh, cc.ResolutionPolicy.EXACT_FIT);
	cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.LoaderScene.preload(g_resources, function ()   
    {
    	cc.director.runScene(GameFirstScene.createScene());
//    	cc.director.runScene(GameMainScene.createScene());
    }, this);
};
cc.game.run();