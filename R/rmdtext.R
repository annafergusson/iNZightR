## This app requires OpenCPU 1.0.1 or higher !!!! 
## #https://github.com/rwebapps/markdownapp

#' @export
rmdtext <- function(text){
  #writeLines(text, con="input.Rmd");
  #knit2html("input.Rmd", output="output.html");
  writeLines(text, con="input.Rmd")
  t <- knit2html("input.Rmd", output="output.html")
  invisible()
  res <- readLines(t)
  unlink(sub('.html$', '*', t))
  paste(res, collapse = '\n')
}
