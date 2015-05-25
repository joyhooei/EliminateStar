var playerGameData = {currentLevel:1,gameScore:0,maxScore:0};


/* 
 * win7下本地存储玩家的数据
 */
var PlayerLocalData = {};
/*
 * 玩家数据结构
 */
var playerData111 = function()
{
	var playerD = [
	{
	   currentLevel:1,		//玩家关卡
	   gameScore:0,			//游戏得分
	   maxScore:0			//游戏最高得分
	}];
	return playerD;
};
/*
 * 写入数据,将玩家数据保存在本地
 * @param jsonName传入的json数据结构的名字
 */
PlayerLocalData.setItem = function(jsonName)
{
	var playerDD= JSON.stringify(jsonName); //将json数据结构转换成字符串结构
	sys.localStorage.setItem("playerData",playerDD);//写入数据
	cc.log(jsonName);
};

/*
 * 读取玩家数据,还回json数据格式(数组)
 */
PlayerLocalData.getItem = function()
{
	//只有第一次玩家进入游戏才会写入初始玩家数据
	if( !sys.localStorage.getItem("playerDataExist") )
	{
		var playerData1 = JSON.stringify(playerData111());
		//在本地写入数据
		sys.localStorage.setItem("playerDataExist", "playerDataExist");
		sys.localStorage.setItem("playerData", playerData1);
	}
	//从本地读取数据
	var playerDataa = sys.localStorage.getItem("playerData");	
	//将字符串结构转换成json数据结构
	var playerDatab = JSON.parse(playerDataa);	
	return playerDatab;
};

/*
 * 删除数据,将玩家数据清空
 */
PlayerLocalData.deleteItem = function()
{
	sys.localStorage.removeItem("playerData");
	sys.localStorage.removeItem("playerDataExist");
	playerData111.currentLevel = 1;
	playerData111.gameScore = 0;
	playerData111.maxScore = 0;
};




