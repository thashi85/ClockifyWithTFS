

 var workspaceId='';//'5e73069bc5d60e0af641be18';
// var projectId='5e8b1c0263e7035359ab2569';
 //var apiKey='XpDA7ePoQWYBK3nY';
 var userId='';
 var projects=[];
 

$(document).ready(function() {
		
	setTimeout(function(){
		setClockifyLink()		
	},1000);
	$(document).click(function(){	
			//console.log('setClockifyLink')		
		setClockifyLink()
		});
		
   function Initialize()
   {
		 chrome.storage.local.get({
			apiKey: '',
			baseUrl:'https://api.clockify.me/api/v1',
			parentClass:'',
			childClass:'',
			taskIdS:'',
			taskS:''
		  }, function(items) {
			apiKey = items.apiKey;
			baseurl = items.baseUrl;
			parentClass = items.parentClass;
			childClass = items.childClass;
			taskIdS = items.taskIdS;
			taskS = items.taskS;
		  });
		  fetch(cacheKeys.user,getUserDetils,loadUserFromAPI);	
   }
   function setClockifyLink()
   {
	   if($('#clockifyButton').length==0)
		{		
			setTimeout(function(){ 
				 alterHtmlContent();
			}, 1000);
			setTimeout(function(){ 
				 alterHtmlContent();
			}, 3000);
			setTimeout(function(){ 
				 alterHtmlContent();
			}, 5000);
			setTimeout(function(){ 
				 alterHtmlContent();
			}, 10000);
		}
		
   }
   function alterHtmlContent()
   {
	   if($('#clockifyButton').length==0)
		{
		 Initialize();
		 if(document.getElementsByClassName(parentClass) && 
			document.getElementsByClassName(parentClass)[0] &&
			document.getElementsByClassName(parentClass)[0].getElementsByClassName(classPosition)&&
			document.getElementsByClassName(parentClass)[0].getElementsByClassName(classPosition)[0])
			{
						   if($('#clockifyButton').length==0)
							{
							   document.getElementsByClassName(parentClass)[0].getElementsByClassName(classPosition)[0].innerHTML += '<div class="ctf-wrapper-dv"><div class="tags-items-container ctf dv"><select name="projects" id="projects"></select></div>' +
							   '<div class="tags-items-container ctf dv"><a title="#182 Pricing" class="clockify-button-active" id="clockifyButton" >Start timer</a></div><div>';
							   $('#clockifyButton').click(function()
							   {
								   var isStart=$('#clockifyButton').attr('class')== 'clockify-button-active';
								   if(isStart)
									   $('#clockifyButton')[0].innerText='Stop Timer';	
								   else
									   $('#clockifyButton')[0].innerText='Start Timer';
								   
								   $('#clockifyButton').toggleClass('clockify-button-inactive clockify-button-active');				   
								   addTaskToClockify(isStart);
							   });							  
							   var projOptions = "";
								projects.forEach((opt)=>{
									//var selected="";
									//if(selectedProj && opt["id"]==selectedProj[cacheKeys.defaultProject])
									//{
									//	selected="selected"
									//}
									if(opt["archived"]==false){
										projOptions += "<option value='"+opt["id"]+"' >"+opt["name"]+"</option>";
									}
								});
								document.getElementById("projects").innerHTML = projOptions;
								 
								chrome.storage.local.get([cacheKeys.defaultProject], function(result){
									if(result && result[cacheKeys.defaultProject])
									$("#projects").val(result[cacheKeys.defaultProject]);									
								});
								
								 $( "#projects" ).change(function() {
									 var obj={};
									 obj[cacheKeys.defaultProject]=this.value;
									 chrome.storage.local.get([cacheKeys.defaultProject], function(result){
											if(result && result[cacheKeys.defaultProject]){
												//result[cacheKeys.defaultProject]=obj[cacheKeys.defaultProject];
												chrome.storage.local.remove(cacheKeys.defaultProject,function(){});
											}
											{
												 chrome.storage.local.set(obj,function(){});
											}												
										});
											 
									 
									
								});
							}
		} 
		}
   }
  function getUserDetils(res)
  {
	  console.log(res);
	  workspaceId=res["defaultWorkspace"] ||res["activeWorkspace"];
	  userId=res["id"]
	  fetch(cacheKeys.projects,getProjects,LoadProjectsFromAPI);	
  }
  function loadUserFromAPI(successCallback,cacheKey,callback)
  {
	   $.ajax({
				  type: "GET",
				  url: baseurl+'/user',
				   headers: {						
								"X-Api-Key": apiKey,
								'Content-Type': 'application/json',
								'Accept': 'application/json'
							},		 
				  success: function(res)
				  {
					 successCallback(res,cacheKey,callback);
					  //console.log(res);
					  //workspaceId=res["defaultWorkspace"] ||res["activeWorkspace"];
					  //userId=res["id"]
					  //getProjects();
				  },
				  dataType: 'json'
				});
  }
  function getProjects(res)
  {
	console.log(res);
	if(res)
	{
		projects=res;				  
	}
  }
  function LoadProjectsFromAPI(successCallback,cacheKey,callback)
  {
	   $.ajax({
		  type: "GET",
		  url: baseurl+'/workspaces/'+workspaceId+'/projects',
		   headers: {						
						"X-Api-Key": apiKey,
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					},		 
		  success: function(res)
		  {
			  successCallback(res,cacheKey,callback);
			
		  },
		  dataType: 'json'
		});
  }
  function addTaskToClockify(isStart)
  {
	
	 var taskId='';
	 var taskName='';
	 if(document.querySelector(taskIdSelector))
		taskId=document.querySelector(taskIdSelector).innerText;
	if(document.querySelector(taskSelector))
		taskName=document.querySelector(taskSelector).innerText;
	if(isStart){
	  $.ajax({
		  type: "POST",
		  url: baseurl+'/workspaces/'+workspaceId+'/time-entries',
		   headers: {						
						"X-Api-Key": apiKey,
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					},
		  data: JSON.stringify({
				  "start": new Date().toISOString(),
				  "billable": "true",
				  "description": taskId +taskName,
				  "projectId": $('#projects').val(),			 
				 
				  //"taskId": "5b1e6b160cb8793dd93ec120",
				  //"end": "2018-06-12T13:50:14.000Z",
				  //"tagIds": [
				  //	"5a7c5d2db079870147fra234"
				  //]
				}),
		   //beforeSend: function (xhr) {
						/* Authorization header */						
					//	xhr.setRequestHeader("X-Api-Key", apiKey);
					//},
		  success: function(res)
		  {
			  console.log(res);
		  },
		  dataType: 'json'
		});
	}else
	{
		$.ajax({
		  type: "PATCH",
		  url: baseurl+'/workspaces/'+workspaceId+'/user/'+userId+'/time-entries',
		   headers: {						
						"X-Api-Key": apiKey,
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					},
		  data: JSON.stringify({
				  "end": new Date().toISOString()
				}),		 
		  success: function(res)
		  {
			  console.log(res);
		  },
		  dataType: 'json'
		});
	}
  }
});

function fetchLive(cacheKey,callback,loadfromAPI) {
  loadfromAPI(pushToCache,cacheKey,callback);
}
function pushToCache(data,cacheKey,callback)
{
	if(data){
		  var obj = {}
		  obj[cacheKey]=data;
		  obj['cacheTime']=Date.now();
		chrome.storage.local.set(obj, function() {
		callback(data);
		});
    }
}
function fetch(cacheKey,callback,loadfromAPI) {
  chrome.storage.local.get([cacheKey, 'cacheTime'], function(items) {
    if (items[cacheKey] && items.cacheTime && items.cacheTime) {
      if (items.cacheTime > Date.now() - 3600*1000) {
        return callback(items[cacheKey]); // Serialization is auto, so nested objects are no problem
      }
    }

    fetchLive(cacheKey,callback,loadfromAPI);
  });
}
