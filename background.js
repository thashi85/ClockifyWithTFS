chrome.storage.local.clear(function() {
    var error = chrome.runtime.lastError;
    if (error) {
        console.error(error);
    }
});
/*
chrome.management.getAll(function(dt){
	if(dt){
		dt.forEach((d)=>{
			//alert(d["name"])
				if(d["name"]=="Clockify Time Tracker"){
				//alert(JSON.stringify(d))
				chrome.management.get(d["id"],(ext)=>{
					//alert(JSON.stringify(ext))
					chrome.storage.sync.get(['userEmail'], function(result) {
					  alert(result.key);
					});
				})
				}
		});
	}
});
*/