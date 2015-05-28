/**
 * 创建星星类(所有的星星都在这里创建,星星拥有的所有性都在这里实现)
 */
var GameCreateStar = ccui.ImageView.extend(
{
	ctor:function(normal, type, selected, col, row)
	{
		this._super();
		this.type = type;//星星的类型(不同数字代表不同颜色的星星);
		this.normalType = type;//初始星星的类型(不同数字代表不同颜色的星星);主要作用是当两次选择的星星列表不一样时,还原初始type值,扮演一个中介者的角色
		this.col = col;//水平方向排列位置(0-9)
		this.row = row;//竖直方向排列位置(0-9)
		this.normal = normal;//未选中状态图片纹理
		this.selected = selected;//选中状态图片纹理
		this.isSelected = false;//是否选中
		this.count = 0;//纪录当前星星选中次数,如果第一次选中的同色星星数大于1，则在一次点击就消除
		this.loadTexture(normal);
		this.setAnchorPoint(0, 0);
	},
	//当点击星星的时候,加载不同状态的图片纹理
	updateTexture:function()
	{
		if(this.isSelected)
		{
			//加载选中状态图片纹理
			this.loadTexture(this.selected);
		}
		else
		{
			//加载未选中状态图片纹理
			this.loadTexture(this.normal);
		}
	}
});