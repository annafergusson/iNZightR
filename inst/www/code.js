//ocpu.seturl("//cloud.opencpu.org/ocpu/apps/annafergusson/iNZightR/R")
//need line above for CORS
oldRmd = "";

$(function(){  
  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/r");
  editor.getSession().setUseWrapMode(true);
  editor.setFontSize("14px");
  editor.setShowPrintMargin(false);
  
  function domarkdown(e){
    var textMod = editor.getSession().getValue();
    var hack = textMod.split("\n");
    var newText = [];
    //set defaults for knitr
    newText.push("```{r include = FALSE}");
    newText.push("knitr::opts_chunk$set(tidy = TRUE)");
    newText.push("```");
    
    var chunkHead = "";
    var skip = -1;
    for(var i=0; i<hack.length; i++)
    {
      if(hack[i].substring(0,5) == "```{r")
      {
        chunkHead = hack[i]; 
      }
      
      if(hack[i].substring(0, 12) == "iNZightPlot(")
      {
         //get any fig.width or fig.height details
         //that's all for now for this workaround!
         //will need to address the other options for code chunk
         //with respect to iNZightPlots..... future
         var figWidth = 800; //8
         var figHeight = 500; //5
         var chunkOptions = chunkHead.split("```{r ");
         if(chunkOptions.length > 1)
         {
            var params = chunkOptions[1].split(" ").join("").split(","); 
            for(var p=0; p<params.length; p++)
            {
              if(params[p].substring(0,9) == "fig.width")
              {
                var dimension = params[p].split("=");
                var justNumber = dimension[1].split("}");
                figWidth = Number(justNumber[0])*100;
              }
              if(params[p].substring(0,10) == "fig.height")
              {
                var dimension = params[p].split("=");
                var justNumber = dimension[1].split("}");
                figHeight = Number(justNumber[0])*100;
              }
            }
         }
         
         var ts = Date.now() + Math.random();
         newText.push("```");
         newText.push("```{r echo=2, results='hide'}");
         newText.push("png('" + ts + ".png', width=" + figWidth + ",height=" + figHeight + ")");
         newText.push(hack[i]);
         newText.push("dev.off()");
         newText.push("```");
         newText.push("![](" + ts + ".png)");
		 newText.push(chunkHead);
      }
      else
      {
          newText.push(hack[i]); 
      }
    }
    textMod = newText.join("\n");
	
		if(oldRmd !== editor.getSession().getValue())
		{
			oldRmd = editor.getSession().getValue();
			var req = ocpu.call("rmdtext", {
			  text : textMod
			}, function(session){
			 var interimURL = session.getFileURL("output.html");
			  $("iframe").attr('src', interimURL);  
			  $("iframe").on("load", function() {
					$("#render").show();
				});
			}).fail(function(text){
			  alert("Error: " + req.responseText);
			});
		}
		else
		{
			$("#render").show();
		}
  }
  
 //update when Run code button clicked
$("#runCode").click(function() {
 if($("#runCode").val() == "Edit R Markdown")
	  {
		$("#runCode").val("Knit R Markdown");
		$("#editor").show();
		$("#render").hide();
		$("#dummy").hide();
		$("#loader").hide();
		editor.focus(); 
		editor.gotoLine(1); 
	  }
	  else
	  {
		domarkdown();
		$("#runCode").val("Edit R Markdown");
		$("#editor").hide();
		$("#dummy").show();
		$("#loader").show();
		editor.resize();
	  }
});  
 
  //init on start
  domarkdown();  
});
