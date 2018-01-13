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
    //set defaults for knitr-
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
         if(hack[i + 1].substring(0,3) !== "```")
          {
            newText.push(chunkHead);
          }
          else
          {
            skip = i + 1;
          }
      }
      else
      {
        if(i !== skip)
        {
          newText.push(hack[i]); 
        }
      }
    }
    textMod = newText.join("\n");
    
    var req = ocpu.call("rmdtext", {
      text : textMod
    }, function(session){
      $("iframe").attr('src', session.getFileURL("output.html")); 
	  $("iframe").on("load", function() {
			$("#render").show();
		});
    }).fail(function(text){
      alert("Error: " + req.responseText);
    });
    
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
