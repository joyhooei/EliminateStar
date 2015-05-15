/*
 * 游戏初始化场景的建立
 */
var GameInitializeScene = ccui.Layout.extend(
{
	size:null,
	isMusic:true,
	ctor:function()
	{
		this._super();
		this.zinit();
		this.setTopInfor();
		this.setBlinkAction();
		this.scheduleOnce(this.setGameButton, 1);//延时1s
	},
	//设置与玩家交互的按钮(新游戏、继续游戏、帮助、退出)
	setGameButton:function()
	{
		var gap = 7;
		var a = 340, b = 275, c = 210, d = 145;
		//新游戏
		var newGameBtn = new myButton(res.newgame);
		var endX = this.size.width - newGameBtn.width >> 1;
		var endY = this.size.height+100;;
		newGameBtn.name = "newGame";
		newGameBtn.x = endX;
		newGameBtn.y = endY;
		this.addChild(newGameBtn, 1);
		//action1
		var moveTo1 = cc.MoveTo.create(5, cc.p(endX, a));
		var easeOut1 = moveTo1.clone().easing(cc.easeElasticOut());
		newGameBtn.runAction(easeOut1);
		
		//继续游戏
		var continueGameBtn = new myButton(res.resume);
		continueGameBtn.name = "continueGame";
		continueGameBtn.x = endX;
		continueGameBtn.y = endY
		this.addChild(continueGameBtn, 1);
		//action2
		var moveTo2 = cc.MoveTo.create(4, cc.p(endX, b));
		var easeOut2 = moveTo2.clone().easing(cc.easeElasticOut());
		continueGameBtn.runAction(easeOut2);
		
		//帮助
		var helpGameBtn = new myButton(res.help);
		helpGameBtn.name = "helpGame";
		helpGameBtn.x = endX;
		helpGameBtn.y = endY;
		this.addChild(helpGameBtn, 1);
		//action3
		var moveTo3 = cc.MoveTo.create(3, cc.p(endX, c));
		var easeOut3 = moveTo3.clone().easing(cc.easeElasticOut());
		helpGameBtn.runAction(easeOut3);
		
		//退出
		var exitGameBtn = new myButton(res.exit);
		exitGameBtn.name = "exitGame";
		exitGameBtn.x = endX;
		exitGameBtn.y = endY;
		this.addChild(exitGameBtn, 1);
		//action4
		var moveTo4 = cc.MoveTo.create(2, cc.p(endX, d));
		var easeOut4 = moveTo4.clone().easing(cc.easeElasticOut());
		exitGameBtn.runAction(easeOut4);
		
		newGameBtn.addTouchEventListener(this.btnControlGameFunc, this);
		continueGameBtn.addTouchEventListener(this.btnControlGameFunc, this);
		helpGameBtn.addTouchEventListener(this.btnControlGameFunc, this);
		exitGameBtn.addTouchEventListener(this.btnControlGameFunc, this);
	},
	//按钮侦听函数
	btnControlGameFunc:function(target, state)
	{
		if(state == ccui.Widget.TOUCH_ENDED)//松开
		{
			switch (target.name)
			{
				case "newGame":			//进入新游戏
					var newGameScene = TransitionScene.createScene(true);
					cc.director.runScene(cc.TransitionFade.create(1, newGameScene));
					cc.log("newGame");
					break;
				case "continueGame"://继续游戏
					var newGameScene = TransitionScene.createScene(false);
					cc.director.runScene(cc.TransitionFade.create(1, newGameScene));
					break;
				case "helpGame"://游戏帮助
					var helpScene = GameHelpLayout.createScene();
					cc.director.runScene(cc.TransitionFade.create(1, helpScene));
					break;
				case "exitGame"://退出游戏
					cc.log("exitGame");
					break;
			}
		}
	},
	//设置三个Blink图片分别从屏幕左右出现动画
	setBlinkAction:function()
	{
		var blink1 = new myImage(res.blink1);
		blink1.x = -blink1.width - 20;
		blink1.y = this.size.height - blink1.height - 65;
		this.addChild(blink1, 1);
		var moveTo1 = cc.moveTo(1, cc.p((this.size.width-blink1.width)/2, blink1.y));
		blink1.runAction(moveTo1);
		
		var blink2 = new myImage(res.blink2);
		blink2.x = this.size.width + 20;
		blink2.y = blink1.y - blink2.height+40;
		this.addChild(blink2, 1);
		var moveTo2 = cc.moveTo(1, cc.p((this.size.width-blink1.width)/2 - 30, blink2.y));
		blink2.runAction(moveTo2);
		
		var blink3 = new myImage(res.blink3);
		blink3.x = blink1.x;
		blink3.y = blink2.y - blink3.height+70;
		this.addChild(blink3, 1);
		var moveTo3 = cc.moveTo(1, cc.p((this.size.width-blink1.width)/2 + 50, blink3.y));
		blink3.runAction(moveTo3);
	},
	//设置游戏初始化界面顶部显示信息(最高纪录、声音控制)
	setTopInfor:function()
	{
		var maxRecord = new myImage(res.maxrecord);
		maxRecord.x = 10;
		maxRecord.y = this.size.height - maxRecord.height - 20;
		this.addChild(maxRecord, 1);
		
		var maxScore = new myImage(res.maxscore);
		maxScore.x = maxRecord.x + maxRecord.width + 30;
		maxScore.y = maxRecord.y;
		this.addChild(maxScore, 1);
		//最高纪录
		var maxScoreLabel = new myText(this.maxScore.toString(), white, 26);
		maxScoreLabel.x = maxScore.x+(maxScore.width - maxScoreLabel.width)/2;
		maxScoreLabel.y = maxScore.y;
		this.addChild(maxScoreLabel, 2);
		//声音喇叭
		var laba = new myButton(res.labaok);
		laba.x = this.size.width - laba.width - 5;
		laba.y = maxScore.y;
		this.addChild(laba, 1);
		laba.addTouchEventListener(this.controlLabaFunc, this);
	},
	//喇叭控制响应侦听函数
	controlLabaFunc:function(target, state)
	{
		if(state == ccui.Widget.TOUCH_ENDED)//松开
		{
			if(this.isMusic)//设为静音
			{
				target.loadTextures(res.labano, "");
				this.isMusic = false;
			}
			else	//播放音乐
			{
				target.loadTextures(res.labaok, "");
				this.isMusic = true;
			}
		}
	},
	//初始化函数
	zinit:function()
	{
		//设置布局大小
		this.size =Def.windowSize();
		this.setSize(this.size);
		//实例化背景图片
		var backGround = new myImage(res.mainbacktop);
		backGround.y = this.size.height - backGround.height;
		this.addChild(backGround, 0);
		var backGround1 = new myImage(res.mainbackbottom);
		this.addChild(backGround1, 0);
		this.playerGameData = playerGameData;
		this.maxScore = this.playerGameData.maxScore;//游戏最高得分
	}
});


GameInitializeScene.createScene = function()
{
	var scene = cc.Scene.create();
	var layout = new GameInitializeScene();
	scene.addChild(layout);
	return scene;
};