/*!
 * Collapsible, jQuery Plugin
 * jquery.mobiDalog-1.0.js
 *
 * Copyright (c) 2014
 * author: Bian Kaiming (Walle)
 * @ version: 1.0.1
 *
 * Date: Fri Nov 24 15:12:11 2014
 */
 ;(function($){
	$.fn.mobiDialog = function(options){
		var defaultVal = {
			type : "warn", 				//消息类型，alert、confirm、prompt、warn
			text : "Your Message Here",	//消息文本
			icon : false,				//图标路径,不填或false为无图标，true为默认图标
			position : "middle",		//位置 顶部，中部，底部 top middle bottom，默认为middle
			delay : 1500,				//延时消失，只在alert状态下有效
			lock : false,				//屏幕锁层
			okText : "Confirm",			//确定按钮文本，只在confirm、prompt状态下有效
			okImgUrl : "",					//确定按钮图标路径，只在confirm、prompt状态下有效
			ok : function(){},			//确定后要执行的函数，只在confirm、prompt状态下有效
			cancelText : "Cancel",		//取消按钮文本，只在confirm、prompt状态下有效
			cancelImgUrl : "",				//取消按钮图标路径，只在confirm、prompt状态下有效
			cancel : function(){}		//取消后要执行的函数，只在confirm、prompt状态下有效
		};
		var options = $.extend(defaultVal,options);	
		
		return this.each(function(){
			
			var _self = $(this);
		
			var building = {//构建
				init : function(){
					var layer_html;
					switch(options.type){
						case "warn" :
							layer_html = building.build_warn();
							break;
						case "alert" :
							layer_html = building.build_alert();
							break;
						case "confirm" :
							layer_html = building.build_confirm();
							break;
						case "prompt" :
							layer_html = building.build_prompt();
							break;
						default :
							return false;
					};
					if((options.type == "warn")&&(options.lock == false)){
						//screen_lock(_self);
					}else{ 
						screen_lock(_self);
					}
					
					if($("."+options.type+"_layer",_self)){
						$("."+options.type+"_layer",_self).remove();
						$(_self).append(layer_html);		//注入
					}else{ 
						$(_self).append(layer_html);
					}
					building.position();			//排位
					$(window).resize(function(){ 
						building.position();
					});
					$("."+ options.type +"_ok").on("click",function(){//确定函数
						removeLayer();
						options.ok();
					});
					$("."+ options.type +"_cancel").on("click",function(){//取消函数
						removeLayer();
						options.cancel();
					});
				},
				stru : {
					layer_star : "<div class='"+ options.type +"_layer'>",//最外层
					info_star : "<div class='"+ options.type +"_info'>",//信息层
					text : "<span class='"+ options.type +"_text'>"+ options.text +"</span>",//文字层
					icon : "<img src='"+ options.icon +"' />",//图标
					btn_star : "<div class='"+ options.type +"_btn'>",//按钮层
					ok : function(){
						if(options.okImgUrl != ""){
							return "<button type='button' class='"+ options.type +"_ok'>"+ "<img src='"+ options.okImgUrl +"' />" + options.okText +"</button>";
						}else{ 
							return "<button type='button' class='"+ options.type +"_ok'>"+ options.okText +"</button>";
						}
					},//OK按钮
					cancel : function(){
						if(options.cancelImgUrl != ""){
							return "<button type='button' class='"+ options.type +"_cancel'>" + "<img src='"+ options.cancelImgUrl +"' />" + options.cancelText +"</button>";
						}else{ 
							return "<button type='button' class='"+ options.type +"_cancel'>"+ options.cancelText +"</button>";
						}
					},//Cancel按钮
					input : "<div class='"+ options.type +"_condiv'><input type='text' class='"+ options.type +"_input' /></div>",//文本框
					div_end : "</div>"
				},
				position : function(){
						var screenH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
						var screenW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
						var layerH = $("."+ options.type +"_layer").height();
						var layerW = $("."+ options.type +"_layer").width();
						if(options.position == "top"){
							$("."+ options.type +"_layer").attr("style","top:0px; left:0px; right:0px; border-radius:0px;");
							$("."+ options.type +"_layer").addClass("top");
						}else if(options.position == "bottom"){
							$("."+ options.type +"_layer").attr("style","bottom:0px; left:0px; right:0px; border-radius:0px;");
							$("."+ options.type +"_layer").addClass("bottom");
						}else{
							var alertTop = (screenH - layerH - 22)/2 + $(_self).scrollTop();
							var alertLeft = (screenW - layerW - 28)/2;
							$("."+ options.type +"_layer").attr("style","top:" + alertTop + "px; left:" + alertLeft + "px;");
						}
				},
				build_warn : function(){
					var layer = this.stru.layer_star + 
								this.stru.info_star;
					if(options.icon){
						layer += this.stru.icon;
					}
					layer += this.stru.text;
					layer += this.stru.div_end;
					layer += this.stru.div_end;
					return layer;
				},
				build_alert : function(){
					var layer = this.stru.layer_star + 
								this.stru.info_star;
					if(options.icon){
						layer += this.stru.icon;
					}
					layer += this.stru.text;
					layer += this.stru.div_end;
					layer += this.stru.btn_star;
					layer += this.stru.ok();
					layer += this.stru.div_end;
					layer += this.stru.div_end;
					return layer;
				},
				build_confirm : function(){
					var layer = this.stru.layer_star + 
								this.stru.info_star;
					if(options.icon){
						layer += this.stru.icon;
					}
					layer += this.stru.text;
					layer += this.stru.div_end;
					layer += this.stru.btn_star;
					layer += this.stru.ok();
					layer += this.stru.cancel();
					layer += this.stru.div_end;
					layer += this.stru.div_end;
					return layer;
				},
				build_prompt : function(){
					var layer = this.stru.layer_star + 
								this.stru.info_star;
					if(options.icon){
						layer += this.stru.icon;
					}
					layer += this.stru.text;
					layer += this.stru.div_end;
					layer += this.stru.input;
					layer += this.stru.btn_star;
					layer += this.stru.ok();
					layer += this.stru.cancel();
					layer += this.stru.div_end;
					layer += this.stru.div_end;
					return layer;
				}
			};
			//从DOM中删除
			var removeLayer = function(){
				$("."+ options.type +"_layer").fadeOut("fast",function(){
					$(this).remove();//.addClass("transition_layer");
					$("#screen_lock").remove();
				});
			};
			
			//警示框延迟
			if(options.type == "warn"){
				try{
					setTimeout(function(){
						removeLayer();
					}, options.delay);
				}catch(e){
					alert("delay参数填写错误！");
				};
			};

			//屏幕锁
			var screen_lock = function(con){ 
				//var screenH =  window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
				var scrollH = $(document).height();
				var heigh = parseFloat(scrollH);
				var lock_div = "<div id='screen_lock' style='position:absolute;top:0px;left:0px;z-index:9998;width:100%;height:"+heigh+"px;'></div>";
				$(con).append(lock_div);
			}
			
			building.init();
		});
	}
})(jQuery);