function e(){return(e=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e}).apply(this,arguments)}var t={version:"0.0.3",name:"views",views:{},settings:{enable:!1,basePath:"/",selector:"#app",notfound:null},loadStart:new Event("pinecone-start"),loadEnd:new Event("pinecone-end"),init:function(t,n){var i,o,r,s;if(null!=n&&null!=(i=n.middlewares)&&i.render)throw new Error("Pinecone Router "+this.name+": Cannot use views middleware along with render.");if(this.settings=e({},this.settings,null!=(o=null==n||null==(r=n.middlewares)?void 0:r[this.name])?o:{}),"body"==(null==(s=this.settings)?void 0:s.selector))throw new Error("Pinecone Router "+this.name+": Do not use body as the selector, it will cause the router component to be removed");window.PineconeRouter.settings.allowNoHandler=!0},onBeforeRouteProcessed:function(e,t,n){if(this.settings.enable){if(0==e.hasAttribute("x-view"))throw new Error("Pinecone Router "+this.name+": route must have an x-view attribute when using x-views.");var i=e.getAttribute("x-view");"/"!=this.settings.basePath&&(i=this.settings.basePath+i),"notfound"==n?this.settings.notfound=i:this.views[n]=i}},onHandlersExecuted:function(e,t,n,i){var o=this;if(this.settings.enable){var r=i?this.settings.notfound:this.views[e.path];if(null==r)return;fetch(r).then(function(e){return e.text()}).then(function(e){var t;return t=e,document.querySelector(o.settings.selector).innerHTML=t,window.dispatchEvent(o.loadEnd),!1}).catch(function(e){document.querySelector("[x-router][x-data]").dispatchEvent(new CustomEvent("fetch-error",{detail:e})),console.error("Pinecone Router "+o.name+": Fetch Error: "+e)})}},onBeforeHandlersExecuted:function(e,t,n,i){window.dispatchEvent(this.loadStart)}};null==window.PineconeRouterMiddlewares?window.PineconeRouterMiddlewares=[t]:window.PineconeRouterMiddlewares.push(t);
//# sourceMappingURL=index.module.js.map
