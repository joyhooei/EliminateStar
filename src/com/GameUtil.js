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
var myText = function(str, color, fontSize)
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
var myImage = function(source)
{
	var image = ccui.ImageView.create();
	image.loadTexture(source);
	image.setAnchorPoint(0, 0);
	return image;
};

/*
 * 按钮
 */
var myButton = function(texture)
{
	var btn = ccui.Button.create();
	btn.loadTextures(texture, "");
	btn.setAnchorPoint(0, 0);
	return btn;
};












