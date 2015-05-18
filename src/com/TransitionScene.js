/**
 * 游戏过渡场景,主要作用是在每次进入游戏或者进入下一关卡时进行过渡,显示当前的关卡以及通过该关卡要达到的分数;
 */
var TransitionScene = ccui.Layout.extend(
{
	size:null,
	ctor:function(isNewGame)
	{
		this._super();
		this.isNewGame = isNewGame;
		this.zinit();
		this.setLabel();
		this.gotoGameMainScene();
	},
	//设置显示文本(当前关卡数,通过关卡分数)
	setLabel:function()
	{
		//当前进入关卡
		var currentLevel = new myText("level "+this.levelNumber.toString(),white, 20);
		currentLevel.x = this.size.width - currentLevel.width >> 1;//居中
		currentLevel.y = 500;
		this.addChild(currentLevel, 1);
		
		var targetTxt = new myText("target score is", white, 20);
		targetTxt.x = this.size.width - targetTxt.width >> 1;
		targetTxt.y = currentLevel.y - targetTxt.height - 10;
		this.addChild(targetTxt, 1);
		//通关分数
		var targetScore = new myText(this.standardScore.toString(), white, 20);
		targetScore.x = this.size.width - targetScore.width >> 1;
		targetScore.y = targetTxt.y - targetScore.height - 10;
		this.addChild(targetScore, 1);
	},
	//进入游戏主场景
	gotoGameMainScene:function()
	{
		//两秒后进入游戏主界面
		this.scheduleOnce(function()
		{
			var gMainScene = GameMainScene.createScene();
			cc.director.runScene(cc.TransitionFade.create(1, gMainScene));
		}, 2);
	},
	//初始化
	zinit:function()
	{
		//设置布局大小
		this.size = cc.size(480, 800);
		this.setSize(this.size);
		//实例化背景图片
		var backGround = new myImage(res.mainbacktop);
		backGround.y = this.size.height - backGround.height;
		this.addChild(backGround, 0);
		var backGround1 = new myImage(res.mainbackbottom);
		this.addChild(backGround1, 0);
		
		//初始化玩家信息
		if(this.isNewGame == true)
		{
			PlayerLocalData.deleteItem();
		}
		this.playerGameData = PlayerLocalData.getItem();
		//这里要注意,第一次进入游戏时,this.playerGameData是一个数组,之后就变成对象了,这里确保游戏中统一用对象
		if(this.playerGameData.length == true)
		{
			this.playerGameData = this.playerGameData[0];
		}
		else
		{
			this.playerGameData = this.playerGameData;
		}
		this.levelNumber = this.playerGameData.currentLevel;//当前关卡数字
		//获得当前关卡的目标分数
		for(var i = 0; i < levelData.length; i++)
		{
			if(this.levelNumber == levelData[i].level)
			{
				this.standardScore = levelData[i].standards;
				break;
			}
		}
	}
});
//实例化场景
TransitionScene.createScene = function(isNewGame)
{
	var tScene = cc.Scene.create();
	var tLayout = new TransitionScene(isNewGame);
	tScene.addChild(tLayout);
	return tScene;
};





















