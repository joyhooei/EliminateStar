/*
 * @游戏帮助说明，该帮助场景只包含一张附有说明文字的背景图和一个还回按钮，非常的简单
 */
var GameHelpLayout = ccui.Layout.extend(
{
	ctor:function()
	{
		this._super();
		this.zinit();
		this.setBackButton();
	},
	//还回按钮
	setBackButton:function()
	{
		var backButton = new myButton(res.returnBtn);
		backButton.x = 480 - backButton.width - 10;
		backButton.y = 10;
		this.addChild(backButton, 1);
		backButton.addTouchEventListener(this.backButtonFunc, this);
	},
	//
	backButtonFunc:function(target,state)
	{
		if(state == ccui.Widget.TOUCH_ENDED)
		{
			var newGameScene = GameInitializeScene.createScene();
			cc.director.runScene(cc.TransitionFade.create(1, newGameScene));
		}
	},
	zinit:function()
	{
		this.setSize(cc.size(480, 800));
		var bg = new myImage(res.helpbg);
		this.addChild(bg, 0);
	}
});

GameHelpLayout.createScene = function()
{
	var layout = new GameHelpLayout();
	var scene = cc.Scene.create();
	scene.addChild(layout);
	return scene;
}