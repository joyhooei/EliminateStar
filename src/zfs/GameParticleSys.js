/**
 * 粒子系统
 */
var ParticleSys = function(){};

ParticleSys.addFireworks = function()
{
	var fw = cc.ParticleFireworks.create();
	var textureCache = cc.textureCache.addImage(res.sp3);
	fw.setTexture(textureCache);
	fw.setSpeed(250);
	fw.setGravity(cc.p(-50, -100));
	return fw;
};
/**
 * 粒子系统爆炸效果
 * @param xx:X轴坐标
 * @param yy:Y轴坐标
 * @param type:星星类型
 * @param num:粒子数量（默认为50个）可选参数
 * @param gravity:粒子重力（默认为300）可选参数
 * @returns
 */
ParticleSys.addExplosion = function(xx, yy, type, num, gravity)
{
	var el = cc.ParticleExplosion.createWithTotalParticles((num ? num : 50));
	gravity = gravity ? gravity : 300;
	if(type == 0)
	{
		var textureCache = cc.textureCache.addImage(res.sp1);
	}
	else if(type == 1)
	{
		var textureCache = cc.textureCache.addImage(res.sp2);
	}
	else if(type == 2)
	{
		var textureCache = cc.textureCache.addImage(res.sp3);
	}
	else if(type == 3)
	{
		var textureCache = cc.textureCache.addImage(res.sp4);
	}
	else if(type == 4)
	{
		var textureCache = cc.textureCache.addImage(res.sp5);
		
	}
	else
	{
		var textureCache = cc.textureCache.addImage(res.sp4);
	}
	el.setTexture(textureCache);
	el.setGravity(cc.p(0,-gravity));
	el.setSpeed(200);
	el.setPosition(cc.p(xx + 24,yy + 24));
	return el;
};








