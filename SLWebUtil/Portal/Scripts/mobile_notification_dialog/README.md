# mobiDialog
基于jQuery的移动弹窗组件

里面提供了alert、warning、prompt、confirm四种弹窗方式
并提供了顶部、中部、底部的位置

最初目的是为了去除移动弹窗带有链接地址的title，而自己创建这样一个组件。
具体配置如下

#配置项
type : "warn", 				//消息类型，alert、confirm、prompt、warn

text : "请填写消息文本！",	//消息文本

icon : false,				//图标路径,不填或false为无图标，true为默认图标

position : "middle",		//位置 顶部，中部，底部 top middle bottom，默认为middle

delay : 1500,				//延时消失，只在alert状态下有效

lock : false,				//屏幕锁层

okText : "确定",			//确定按钮文本，只在confirm、prompt状态下有效

okImgUrl : "",					//确定按钮图标路径，只在confirm、prompt状态下有效

ok : function(){},			//确定后要执行的函数，只在confirm、prompt状态下有效

cancelText : "取消",		//取消按钮文本，只在confirm、prompt状态下有效

cancelImgUrl : "",				//取消按钮图标路径，只在confirm、prompt状态下有效

cancel : function(){}		//取消后要执行的函数，只在confirm、prompt状态下有效
