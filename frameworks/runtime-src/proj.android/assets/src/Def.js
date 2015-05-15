

var Def = {
		windowWidth:function(){//基础窗口宽度	int
			return 480; 
		},	
		windowHeight:function(){//基础窗口高度960	int

			if(!Def._height){
				Def._height = cc.director.getWinSize().height / Def.windowScale();
			}
			return Def._height; 
		},	
		windowScale:function(){ //窗口的缩放比	float
			if(!Def._winscale){
				Def._winscale = cc.director.getWinSize().width / Def.windowWidth();
			}
			return Def._winscale;
		},
		windowSize:function(){ //窗口大小	cc.size
			return cc.size(Def.windowWidth(), Def.windowHeight());
		},
		platform:function(){ //获取平台编号 cc.sys.OS_ANDROID		string	
			return cc.sys.os;
		}
};