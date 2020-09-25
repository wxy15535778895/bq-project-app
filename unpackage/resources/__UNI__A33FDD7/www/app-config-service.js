
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/login","pages/homePage/homePage","pages/image/image","pages/uni-load/uni-load-more","pages/image1/image","pages/punch/index","pages/my/my","pages/luji/add","pages/luji/list","pages/gouzaowu/index","pages/gouzaowu/add","pages/gouzaowu/list","pages/luji/index","pages/lumian/add","pages/lumian/list","pages/lumian/index","pages/yanxian/add","pages/yanxian/list","pages/yanxian/index","pages/qiaoliang/add","pages/qiaoliang/list","pages/qiaoliang/index","pages/suidao/add","pages/suidao/list","pages/suidao/index","pages/handong/add","pages/handong/list","pages/handong/index","pages/pingding/index","pages/jiancha/index","pages/index/index","pages/sign/sign","pages/rule/rule"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#007AFF","backgroundColor":"#FFFFFF"},"tabBar":{"color":"#8a8a8a","selectedColor":"#007AFF","borderStyle":"black","backgroundColor":"#ffffff","list":[{"pagePath":"pages/homePage/homePage","text":"首页","iconPath":"static/images/homePage.png","selectedIconPath":"static/images/homePage1.png"},{"pagePath":"pages/jiancha/index","text":"桥隧涵检查","iconPath":"static/images/evaluate.png","selectedIconPath":"static/images/ins.png"},{"pagePath":"pages/pingding/index","text":"公路技术评定","iconPath":"static/images/inspect.png","selectedIconPath":"static/images/inspect1.png"},{"pagePath":"pages/my/my","text":"我的","iconPath":"static/images/my.png","selectedIconPath":"static/images/my1.png"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"高速养护","compilerVersion":"2.7.14","entryPagePath":"pages/login","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/login","meta":{"isQuit":true},"window":{"navigationBarTitleText":"登录"}},{"path":"/pages/homePage/homePage","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"首页","bounce":"none","titleNView":{"buttons":[{"text":"","fontSrc":"/static/iconfont.ttf","fontSize":"20px","float":"right"}]}}},{"path":"/pages/image/image","meta":{},"window":{"navigationBarTitleText":"桥梁二维码"}},{"path":"/pages/uni-load/uni-load-more","meta":{},"window":{"navigationBarTitleText":"加载更多"}},{"path":"/pages/image1/image","meta":{},"window":{"navigationBarTitleText":"隧道二维码"}},{"path":"/pages/punch/index","meta":{},"window":{"navigationBarTitleText":"考勤打卡","bounce":"none","titleNView":{"buttons":[{"text":"","fontSrc":"/static/iconfont.ttf","fontSize":"16px","float":"right"}]}}},{"path":"/pages/my/my","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","scrollIndicator":"none"}},{"path":"/pages/luji/add","meta":{},"window":{"navigationBarTitleText":"路基损坏调查表(SCI)"}},{"path":"/pages/luji/list","meta":{},"window":{"navigationBarTitleText":"路基损坏调查表(SCI)"}},{"path":"/pages/gouzaowu/index","meta":{},"window":{"navigationBarTitleText":"构造物损坏(BCI)"}},{"path":"/pages/gouzaowu/add","meta":{},"window":{"navigationBarTitleText":"构造物损坏调查表(BCI)"}},{"path":"/pages/gouzaowu/list","meta":{},"window":{"navigationBarTitleText":"构造物损坏调查表(BCI)"}},{"path":"/pages/luji/index","meta":{},"window":{"navigationBarTitleText":"路基损坏(SCI)"}},{"path":"/pages/lumian/add","meta":{},"window":{"navigationBarTitleText":"路面损坏调查表(PQI)"}},{"path":"/pages/lumian/list","meta":{},"window":{"navigationBarTitleText":"路面损坏调查表(PQI)"}},{"path":"/pages/lumian/index","meta":{},"window":{"navigationBarTitleText":"路面损坏(PQI)"}},{"path":"/pages/yanxian/add","meta":{},"window":{"navigationBarTitleText":"沿线损坏调查表(TCI)"}},{"path":"/pages/yanxian/list","meta":{},"window":{"navigationBarTitleText":"沿线损坏调查表(TCI)"}},{"path":"/pages/yanxian/index","meta":{},"window":{"navigationBarTitleText":"沿线设施(TCI)"}},{"path":"/pages/qiaoliang/add","meta":{},"window":{"navigationBarTitleText":"桥梁检测调查表"}},{"path":"/pages/qiaoliang/list","meta":{},"window":{"navigationBarTitleText":"桥梁检测调查表(SCI)"}},{"path":"/pages/qiaoliang/index","meta":{},"window":{"navigationBarTitleText":"桥梁检测(SCI)"}},{"path":"/pages/suidao/add","meta":{},"window":{"navigationBarTitleText":"隧道调查表"}},{"path":"/pages/suidao/list","meta":{},"window":{"navigationBarTitleText":"隧道调查表"}},{"path":"/pages/suidao/index","meta":{},"window":{"navigationBarTitleText":"隧道调查表"}},{"path":"/pages/handong/add","meta":{},"window":{"navigationBarTitleText":"涵洞调查表"}},{"path":"/pages/handong/list","meta":{},"window":{"navigationBarTitleText":"涵洞调查表"}},{"path":"/pages/handong/index","meta":{},"window":{"navigationBarTitleText":"涵洞调查表"}},{"path":"/pages/pingding/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"公路技术性评定"}},{"path":"/pages/jiancha/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"经常性检查"}},{"path":"/pages/index/index","meta":{},"window":{"navigationBarTitleText":"考勤打卡","bounce":"none","titleNView":{"buttons":[{"text":"","fontSrc":"/static/iconfont.ttf","fontSize":"16px","float":"right"}]}}},{"path":"/pages/sign/sign","meta":{},"window":{"navigationBarTitleText":"考勤打卡","scrollIndicator":"all","titleNView":{"type":"float","backgroundColor":"rgba(192,192,192,0)"}}},{"path":"/pages/rule/rule","meta":{},"window":{"navigationBarTitleText":"考勤规则","bounce":"none","titleNView":{"buttons":[{"text":"","fontSrc":"/static/iconfont.ttf","fontSize":"16px","float":"right"}]}}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
