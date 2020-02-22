//Initialize variables 
		var xmlhttp = new XMLHttpRequest();
		var progressId = 'progress0';
		var value = 0;	
		var limit=100;
		
		//Get response from API
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
		//convert result to JSON
		var myObj = JSON.parse(this.responseText);

		//Create Buttons
		var buttons = myObj.buttons;
		limit = myObj.limit;
		for(var i = 0; i < buttons.length; i++){
			var btn = document.createElement("button");
			btn.setAttribute('onclick', 'changeBg('+buttons[i]+')');
			var t = document.createTextNode(buttons[i]);
			btn.appendChild(t);
			document.getElementById("btnlist").appendChild(btn);
		}

		//Create drop-down list
		var bars = myObj.bars;		
		var selObj = document.forms["drop_list"].elements["process_list"];	 
		for (var i=0; i < bars.length;++i)
		{		 
			addOption(selObj, '#progress'+' '+ (i+1), bars[i]);
			value = bars[0];			 
		}		 
		function addOption(selectbox,text,value )
		{
			var optn = document.createElement("option");
			optn.onclick="chnage("+value+")";
			optn.text = text;
			optn.value = value;
			selectbox.options.add(optn);
		}

		//Create progress bars
		for (var i=0; i < bars.length;++i)
		{
			var probar=makeDiv(i,bars[i]);
			createInputBox(probar,i,bars[i]);
		}
		
		function makeDiv(id,value) {
			var probar=document.createElement("div");
			probar.setAttribute('class','bar-wrapper');	
			probar.setAttribute('id','tb'+id);
			document.getElementById("progressdiv").appendChild(probar);
			return probar;
		}
		function createInputBox(probar,boxId,value) {
			probar.innerHTML = "<div style='width:"+value+"%' type='text' class='progress-bar' id='progress" + boxId + "'><span>"+value+"%</span></div>";
		}
	}
}

function changeBg(e){
	increase(e);
};

	 //change bars when click buttons		
	 function increase(val){ 
	 	var progress = document.getElementById(progressId);
	 	value = value+val;
	 	if(value <= 0) value = 0;
	 	if(value > limit){
	 		progress.removeAttribute('progress-bar');
	 		progress.setAttribute('class','warning-progress-bar')
	 	}else{
	 		progress.setAttribute('class','progress-bar')
	 	}
	 	progress.value = value;
	 	progress.innerText=value+"%";		  
	 	progress.style.width = value + "%";
	 } 


	 xmlhttp.open("GET", "http://pb-api.herokuapp.com/bars", true);
	 xmlhttp.send();

		//Progress bars drop-down list change event
		function changeProcessList(e){
			var index= e.selectedIndex;
			value = parseInt(e.value);
			progressId = 'progress'+index;
		}