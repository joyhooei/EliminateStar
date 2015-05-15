/*
 * 创建星星类(所有的星星都在这里创建,星星拥有的所有性都在这里实现)
 */
var GameCreateStar = ccui.ImageView.extend(
{
	type:0,//星星的类型(不同数字代表不同颜色的星星);
	normalType:null,//星星的类型(不同数字代表不同颜色的星星);主要作用是当两次选择的星星列表不一样时,还原初始type值
	isSelected:false,//是否选中
	col:null,//水平方向排列位置(0-9)
	row:null,//竖直方向排列位置(0-9)
	normal:null,//通常状态图片纹理
	selected:null,//选中状态图片纹理
	count:0,//纪录当前选中次数,主要作用是当选择好要消除的星星后,实现再点一次则消灭星星
	ctor:function(normal, type, selected, col, row)
	{
		this.type = type;
		this.normalType = type;
		this._super();
		this.col = col;
		this.row = row;
		this.normal = normal;
		this.selected = selected;
		this.loadTexture(normal);
		this.setAnchorPoint(0, 0);
	},
	//当点击星星的时候,加载不同状态的图片纹理
	updateTexture:function()
	{
		if(this.isSelected)
		{
			this.loadTexture(this.selected);
		}
		else
		{
			this.loadTexture(this.normal);
		}
	}
});