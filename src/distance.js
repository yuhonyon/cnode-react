export default function compute(t){
	const nowTime=new Date();
	const time=nowTime-new Date(t);
	const second=Math.floor(time/1000)+'秒前';
	const min=Math.floor(time/1000/60)+'分钟前';
	const hour=Math.floor(time/1000/60/60)+'小时前';
	const day=Math.floor(time/1000/3600/24)+'天前';
	const month=Math.floor(time/1000/3600/24/30)+'月前';
	const year=Math.floor(time/1000/3600/24/365)+'年前';
	const distance=(parseInt(year,10)?year:'')
					||(parseInt(month,10)?month:'')
					||(parseInt(day,10)?day:'')
					||(parseInt(hour,10)?hour:'')
					||(parseInt(min,10)?min:'')
					||(parseInt(second,10)?second:'');
	return distance; 
}