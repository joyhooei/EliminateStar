
var HelloWorldLayer = cc.Layer.extend({
    ctor:function () 
    {
    	this._super();
    	cc.log(1, 2, 3);
    }  
});

var HelloWorldScene = cc.Scene.extend(
{
    onEnter:function () 
    {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

