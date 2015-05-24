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
		this.setVisible();
		this.setLabel();
		this.gotoGameMainScene();
		this.setParticleSys();//粒子特效
		this.schedule(this.playExplosion, 1);//定时器、控制粒子特效的播放
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
			PlayerDate.level = 1;
			PlayerDate.score = 0;
//			PlayerLocalData.deleteItem();
		}
//		this.playerGameData = PlayerLocalData.getItem();
		//这里要注意,第一次进入游戏时,this.playerGameData是一个数组,之后就变成对象了,这里确保游戏中统一用对象
//		if(this.playerGameData.length == true)
//		{
//			this.playerGameData = this.playerGameData[0];
//		}
//		else
//		{
//			this.playerGameData = this.playerGameData;
//		}
//		this.levelNumber = this.playerGameData.currentLevel;//当前关卡数字
	},
	setVisible:function()
	{
		this.level = PlayerDate.level;//当前关卡
		//获得当前关卡的目标分数
		for(var i = 0; i < levelData.length; i++)
		{
			if(this.level == levelData[i].level)
			{
				this.sScore = levelData[i].standards;
				break;
			}
		}
	},
	//设置显示文本(当前关卡数,通过关卡分数)
	setLabel:function()
	{
		//当前进入关卡
		var currentLevel = new myText("level "+this.level.toString(),white, 20);
		currentLevel.x = this.size.width - currentLevel.width >> 1;//居中
		currentLevel.y = 500;
		this.addChild(currentLevel, 1);
		
		var targetTxt = new myText("target score is", white, 20);
		targetTxt.x = this.size.width - targetTxt.width >> 1;
		targetTxt.y = currentLevel.y - targetTxt.height - 10;
		this.addChild(targetTxt, 1);
		//通关分数
		var targetScore = new myText(this.sScore.toString(), white, 20);
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
		}, 4);
	},
	//添加粒子特效是游戏更炫丽
	setParticleSys:function()
	{
		this.playExplosion();
	},
	//粒子系统爆炸效果
	playExplosion:function()
	{
		//随机设置粒子特效的位置，大概在场景的上半部分出现
		var xx = (Math.random()*this.width - 40) + 20, yy = (Math.random()*this.height - 20) + this.height/3, type = Math.floor(Math.random()*5);
		var sys = this.addExplosion(xx, yy, type, 80, 200);
		this.addChild(sys, 100);
		//这里一次实例化两个，看起来更加合理，更加不同审美可以自由设定一次性实例化数量
		var xx = (Math.random()*this.width - 40) + 20, yy = (Math.random()*this.height - 20) + this.height/3, type = Math.floor(Math.random()*5);
		var sys = this.addExplosion(xx, yy, type, 80, 200);
		this.addChild(sys, 100);
	},
	/**
	 * 粒子系统爆炸效果
	 * @param xx:X轴坐标
	 * @param yy:Y轴坐标
	 * @param type:星星类型
	 * @param num:粒子数量（默认为50个）可选参数
	 * @param gravity:粒子重力（默认为300）可选参数
	 * @returns
	 */
	addExplosion:function(xx, yy, type, num, gravity)
	{
		//实例化一个带粒子数量的爆炸效果的粒子特效
		var el = cc.ParticleExplosion.createWithTotalParticles((num ? num : 50));
		gravity = gravity ? gravity : 300;
		//生成粒子贴图纹理
		switch ( type) 
		{
		case 0:
			var textureCache = cc.textureCache.addImage(res.sp1);
			break;

		case 1:
			var textureCache = cc.textureCache.addImage(res.sp2);
			break;

		case 2:
			var textureCache = cc.textureCache.addImage(res.sp3);
			break;

		case 3:
			var textureCache = cc.textureCache.addImage(res.sp4);
			break;

		case 4:
			var textureCache = cc.textureCache.addImage(res.sp5);
			break;

		default:
			var textureCache = cc.textureCache.addImage(res.sp4);
		break;
		}
		//为粒子设置贴图纹理
		el.setTexture(textureCache);
		//设置粒子重力
		el.setGravity(cc.p(0,-gravity));
		//设置粒子移动速度
		el.setSpeed(200);
		el.setPosition(cc.p(xx + 24,yy + 24));
		return el;
	},
	onEnter:function()
	{
		this._super();
		Music.playFire();
	},
	onExitTransitionDidStart:function()
	{
		this._super();
		Music.stopMusic();
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





















