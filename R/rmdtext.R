## This app requires OpenCPU 1.0.1 or higher !!!! 
## #https://github.com/rwebapps/markdownapp

#' @export
rmdtext <- function(text){
  writeLines(text, con="input.Rmd");
  knitr::knit2html("input.Rmd", output="output.html");
  invisible();
}
