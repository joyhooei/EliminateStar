/*
 * 游戏主场景顶部显示信息
 */
var GAMETOP;
var GameTopInformation = ccui.Layout.extend(
{
	size:null,
	isPause:false,//是否暂停游戏
	maxScoreLabel:null,//最高纪录
	getScoreNum:null,//当前得分
	currentLevel:null,//当前关卡
	isPassed:false,//是否通过关卡
	ctor:function()
	{
		this._super();
		this.zinit();
		this.setInformation();
	},
	//信息设置
	setInformation:function()
	{
		var maxRecord = new myImage(res.maxrecord);
		maxRecord.x = 10;
		maxRecord.y = this.size.height - maxRecord.height - 20;
		this.addChild(maxRecord, 1);

		var maxScore = new myImage(res.maxscore);
		maxScore.x = maxRecord.x + maxRecord.width + 30;
		maxScore.y = maxRecord.y;
		this.addChild(maxScore, 1);

		this.maxScoreLabel = new myText(this.maxScore.toString(), white, 26);
		this.maxScoreLabel.x = maxScore.x+(maxScore.width - this.maxScoreLabel.width)/2;
		this.maxScoreLabel.y = maxScore.y;
		this.addChild(this.maxScoreLabel, 2);
		//暂停和继续游戏控制按钮
		var pauseGameBtn = new myButton(res.pause);
		pauseGameBtn.x = this.size.width - pauseGameBtn.width - 10;
		pauseGameBtn.y = this.maxScoreLabel.y;
		this.addChild(pauseGameBtn, 1);
		pauseGameBtn.addTouchEventListener(this.pauseGameBtnFunc, this);
		//过关text
		var guoguanImg = new myImage(res.guoguan);
		guoguanImg.x = 0;
		guoguanImg.y = maxRecord.y - guoguanImg.height - 20;
		this.addChild(guoguanImg, 1);
		//当前关卡
		var currentLevelImg = new myImage(res.level);
		currentLevelImg.x = guoguanImg.x + guoguanImg.width;
		currentLevelImg.y = guoguanImg.y;
		this.addChild(currentLevelImg, 1);
		
		this.currentLevel = new myText(this.levelNumber.toString(), white, 24);
		this.currentLevel.x = currentLevelImg.x + (currentLevelImg.width -this.currentLevel.width)/2
		this.currentLevel.y = currentLevelImg.y;
		this.addChild(this.currentLevel, 1);
		//目标分数
		var targetImg = new myImage(res.target);
		targetImg.x = currentLevelImg.x + currentLevelImg.width + 20;
		targetImg.y = currentLevelImg.y;
		this.addChild(targetImg, 1);
		
		var targetImgbg = new myImage(res.targetBar);
		targetImgbg.x = this.size.width - targetImgbg.width - 10;
		targetImgbg.y = targetImg.y;
		this.addChild(targetImgbg, 1);
		
		var targetScore = new myText(this.standardScore.toString(), white, 25);
		targetScore.x = targetImgbg.x +(targetImgbg.width - targetScore.width)/2;
		targetScore.y = targetImgbg.y;
		this.addChild(targetScore, 1);
		//得分
		var getScore = new myImage(res.defen);
		getScore.x = this.size.width - getScore.width >> 1;
		getScore.y = targetScore.y - getScore.height - 10;
		this.addChild(getScore, 1);
		
		var getScoreBg = new myImage(res.defenBar);
		getScoreBg.x = this.size.width - getScoreBg.width >> 1;
		getScoreBg.y = getScore.y - getScoreBg.height - 10;
		this.addChild(getScoreBg, 1);
		
		this.getScoreNum = new myText(this.maxScore.toFixed(0), white, 25);
		this.getScoreNum.setAnchorPoint(0.5, 0);
		this.getScoreNum.x = this.size.width/2;
		this.getScoreNum.y = getScoreBg.y;
		this.addChild(this.getScoreNum, 1);
	},
	//暂停和继续游戏控制按钮侦听函数
	pauseGameBtnFunc:function(target, state)
	{
		if(state == ccui.Widget.TOUCH_ENDED)//松开
		{
			if(!this.isPause)
			{
				target.setOpacity(255);
				this.isPause = true;
				GAMESTARLAYOUT.endGame();
			}
		}
	},
	//更新游戏得分
	updateGameScore:function(starList)
	{
		cc.log(this.scoreNumber+"  &&&&&&&&&&&&***************************")
		var num = starList.length;
		this.tempScore = 5*num*num;	
		this.intermediaryScore = this.tempScore;
		//判断是否过关
		this.jugementOverLevel();
		//一次性获得一定分数的特效显示
		this.effectOn();
		//获得分数特效1.2秒
		var score = ccui.TextField.create();
		score.setText("+"+this.tempScore.toString());
		score.setPosition(cc.p(starList[0].x, starList[0].y));
		score.setFontSize(30);
		score.setColor(cc.color(255, 0, 0));//随机颜色
		score.scale = 0.5;
		this.parent.addChild(score, 10);
		var scaleTo = cc.scaleTo(1.2, 2.2, 2.2);//放大
		var moveTo = cc.moveTo(1.2, cc.p(240, 600));//移动
		//动作播放完成的回调函数
		var callFunc = cc.CallFunc.create(function()
		{
			this.scoreNumber += this.tempScore;
			this.getScoreNum.setText(this.scoreNumber.toFixed(0));
			score.removeFromParent();
		}, this);
		var spawn = cc.Spawn.create(scaleTo, moveTo);//同时播放动作
		var sequence = cc.Sequence.create(spawn, callFunc);//按顺序播放动作
		score.runAction(sequence);
		//每次消灭星星,获得分数,都要检测游戏是否结束
		GAMESTARLAYOUT.checkGameOver();
	},
	//判断是否过关
	jugementOverLevel:function()
	{
		//过关
		if(this.scoreNumber >= this.standardScore)
		{
			if(!this.isPassed)
			{
				this.isPassed = true;
				this.passedLevelEffect(res.win);
				this.playerLevel++;
				this.saveInformation();
			}
			else
			{
				return;
			}
		}
	},
	//过关特效显示
	passedLevelEffect:function(str)
	{
		var win = new myImage(str);
		win.setAnchorPoint(0.5, 0.5);
		win.x = 480/2;
		win.y = 820;
		this.parent.addChild(win, 30);
		var moveTo = cc.moveTo(1.2,cc.p(240, 400));
		var scaleTo = cc.scaleTo(1.2, 1.3, 1.3);
		var easeOut = moveTo.clone().easing(cc.easeInOut(5.0));
		var sparn = cc.spawn(easeOut, scaleTo);
		var fadeIn = cc.FadeOut.create(1);
		var callFunc = cc.callFunc(function(){win.removeFromParent()}, this);
		var sequenct = cc.sequence(sparn, fadeIn , callFunc);
		win.runAction(sequenct);
	},
	//一次性获得一定分数的特效显示
	effectOn:function()
	{
		var imgArr = [res.bang, res.geili, res.ku, res.niu];
		//随机取一张鼓励的图
		var random = Math.floor(Math.random()*imgArr.length);
		var currentImg = imgArr[random];
		if(this.tempScore >= 180)//6个星星
		{
			var effect = new myImage(currentImg);
			effect.setAnchorPoint(0.5, 0.5);
			effect.x = 480/2;
			effect.y = 800/2;
			effect.setOpacity(0);
			this.parent.addChild(effect, 20);
			
			var fadeIn = cc.FadeIn.create(1);
			var scaleTo = cc.scaleTo(1, 1.2, 1.2);
			var spawn = cc.spawn(fadeIn, scaleTo);
			var fadeOut = cc.FadeOut.create(1.2);
			var callFunc = cc.CallFunc.create(function(){effect.removeFromParent()}, this);
			var sequence = cc.sequence(spawn, fadeOut, callFunc);
			effect.runAction(sequence);
		}
	},
	//初始化
	zinit:function()
	{
		GAMETOP = this;
		this.playerGameData = playerGameData;//给玩家信息定义一个新的实例
		this.levelNumber = this.playerGameData.currentLevel;
		this.intermediaryScore = 0;//当前分数与本次获得的分数之和
		this.tempScore = 0;//本次消除获得的分数
		this.maxScore = this.playerGameData.maxScore;//游戏最高得分
		this.scoreNumber = this.playerGameData.gameScore;//游戏界面显示的分数
		this.playerLevel = this.playerGameData.currentLevel;//关卡
		this.size = cc.size(480, 300);
		this.setSize(this.size);
		//获得当前关卡的目标分数
		for(var i = 0; i < levelData.length; i++)
		{
			if(this.levelNumber == levelData[i].level)
			{
				this.standardScore = levelData[i].standards;
				break;
			}
		}
	},
	//离开场景调用的方法
	onExit:function()
	{
		this._super();
		this.saveInformation();
	},
	saveInformation:function()
	{
		this.playerGameData = playerGameData;//给玩家信息定义一个新的实例
		this.playerGameData.gameScore = this.scoreNumber;//游戏得分
		this.playerGameData.maxScore = this.scoreNumber;//最高得分
		this.playerGameData.currentLevel = this.playerLevel;//关卡
		PlayerLocalData.setItem(this.playerGameData);
	}
});




















