 $(document).ready(function() 
   {
		$('.btn.btn-link').click(function()
		{
			$(".collapse").removeClass("show");
			$(".btn.btn-link").addClass("collapsed");
			$(this).toggleClass("collapsed"); 
			$($(this).attr("data-target")).toggleClass("show"); 	
		});
		
		document.addEventListener('DOMContentLoaded', restore_options);
		document.getElementById('save').addEventListener('click',save_options);
   restore_options();
   });
   
   // Saves options to chrome.storage
function save_options() {
  var _apiKey = document.getElementById('apiKey').value;
  var _baseUrl = document.getElementById('baseUrl').value;
  var _parentClass=document.getElementById('parentClass').value;
  var _childClass=document.getElementById('childClass').value;
  var _taskIdS=document.getElementById('taskIdS').value;
  var _taskS=document.getElementById('taskS').value;
	
  chrome.storage.local.clear(function() {
    var error = chrome.runtime.lastError;
    if (error) {
        console.error(error);
    }
});

  chrome.storage.local.set({
    apiKey: _apiKey,
	baseUrl:_baseUrl,	
	parentClass:_parentClass,
	childClass:_childClass,
	taskIdS:_taskIdS,
	taskS:_taskS
  }, function() {
    // Update status to let user know options were saved.
	
    /*var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);*/
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.local.get({
    apiKey: '',
	baseUrl:'https://api.clockify.me/api/v1',
	parentClass:'work-item-form',
	childClass:'info-text-wrapper',
	taskIdS:'.work-item-form .caption',
	taskS:'.work-item-form .info-text'
  }, function(items) {
    document.getElementById('apiKey').value = items.apiKey;
    document.getElementById('baseUrl').value = items.baseUrl;
	document.getElementById('parentClass').value = items.parentClass;
	document.getElementById('childClass').value = items.childClass;
	document.getElementById('taskIdS').value = items.taskIdS;
	document.getElementById('taskS').value = items.taskS;
  });
}

   