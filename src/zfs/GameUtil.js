/*
 * 该类用于实现游戏中统一的控件实例化方法
 */
/*
 * 颜色
 */
var black = cc.color.BLACK;
var blue  = cc.color.BLUE;
var green = cc.color.GREEN;
var orange = cc.color.ORANGE;
var pink = cc.color(255, 0, 255, 255);//粉红
var purple = cc.color(128, 64, 246, 255);//紫色
var red = cc.color.RED;
var white = cc.color.WHITE;
var yellow = cc.color.YELLOW;

/*
 * 显示文本
 */
function myText(str, color, fontSize)
{
	var text = ccui.Text.create();
	text.setText(str);
	text.setColor(color);
	text.setFontSize(fontSize);
	text.setAnchorPoint(0, 0);
	return text;
};

/*
 * 图片
 */
function myImage(source)
{
	var image = ccui.ImageView.create();
	image.loadTexture(source);
	image.setAnchorPoint(0, 0);
	return image;
};

/*
 * 按钮
 */
function myButton(texture)
{
	var btn = ccui.Button.create();
	btn.loadTextures(texture, "");
	btn.setAnchorPoint(0, 0);
	return btn;
};


/**
 * 游戏音效
 */
function Music(){};
Music.isMusic = true;
/**
 * 爆竹声
 */
Music.playFire = function()
{
	if ( !this.isMusic ){return;}
	cc.audioEngine.playMusic("res/music/fire.mp3", true);
};

/**
 * 破碎声,消除同色星星时播放
 */
Music.playBroken = function()
{
	if ( !this.isMusic ){return;}
	cc.audioEngine.playEffect("res/music/broken.mp3", false);
};

/**
 * 按钮音效
 */
Music.playClick = function()
{
	if ( !this.isMusic ){return;}
	cc.audioEngine.playEffect("res/music/click.mp3", false);
};

/**
 * 选中音效
 */
Music.playSelected = function()
{
	if ( !this.isMusic ){return;}
	cc.audioEngine.playEffect("res/music/select.mp3", false);
};

/**
 * 全部消除音效
 */
Music.playStageClear = function()
{
	if ( !this.isMusic ){return;}
	cc.audioEngine.playEffect("res/music/stageclear.mp3", false);
};

/**
 * 过关音效
 */
Music.playWin = function()
{
	if ( !this.isMusic ){return;}
	cc.audioEngine.playEffect("res/music/win.mp3", false);
};

Music.stopMusic = function()
{
	cc.audioEngine.stopMusic();
};

var Def = {
	windowWidth:function(){//基础窗口宽度	int
		return 480; 
	},	
	windowHeight:function(){//基础窗口高度800	int
		return 800; 
	},	
	windowSize:function(){ //窗口大小	cc.size
		return cc.size(Def.windowWidth(), Def.windowHeight());
	},
	platform:function(){ //获取平台编号 cc.sys.OS_ANDROID		string	
		return cc.sys.os;
	}
};










