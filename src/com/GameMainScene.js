/**
 * 游戏主场景
 */
var playerGameData;//玩家信息
var GameMainScene = ccui.Layout.extend(
{
	ctor:function()
	{
		this._super();
		this.zinit();
		this.setTopInfor();
		this.addStarLayout();
	},
	//游戏主场景顶部显示信息
	setTopInfor:function()
	{
		var gameTopInfo = new GameTopInformation();
		gameTopInfo.y = this.size.height - gameTopInfo.height;
		this.addChild(gameTopInfo, 1);
	},
	//将星星层添加到主场景
	addStarLayout:function()
	{
		var starLayout = GameStarLayout.createLayout();
		this.addChild(starLayout, 1);
	},
	//初始化
	zinit:function()
	{
		//设置布局大小
		this.size = Def.windowSize();
		this.setSize(this.size);
		//实例化背景图片
		var backGround = new myImage(res.mainbacktop);
		backGround.y = this.size.height - backGround.height;
		this.addChild(backGround, 0);
		var backGround1 = new myImage(res.mainbackbottom);
		this.addChild(backGround1, 0);
	}
});


GameMainScene.createScene = function()
{
	var gameLayout = new GameMainScene();
	var scene = cc.Scene.create();
	scene.addChild(gameLayout);
	return scene;
};




















