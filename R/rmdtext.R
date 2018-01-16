## This app requires OpenCPU 1.0.1 or higher !!!! 
## #https://github.com/rwebapps/markdownapp

#' @export
rmdtext <- function(text){
  writeLines(text, con="input.Rmd");
  knit2html("input.Rmd", output="output.html");
  invisible();
}

#' @export
autoplot <- function(x, y = NULL, g1 = NULL, g1.level = NULL, g2 = NULL,
  g2.level = NULL, varnames = list(), colby = NULL, sizeby = NULL,
  symbolby = NULL, extra.vars, locate = NULL, locate.id = NULL,
  locate.col = NULL, locate.extreme = NULL, highlight = NULL,
  data = NULL, design = NULL, freq = NULL, missing.info = TRUE,
  xlab = varnames$x, ylab = varnames$y, new = TRUE, inzpars = inzpar(),
  layout.only = FALSE, plot = TRUE, xaxis = TRUE, yaxis = TRUE,
  xlim = NULL, ylim = NULL, zoombars = NULL, hide.legend = FALSE, df,
  env = parent.frame()){
  iNZightPlot(x, y = NULL, g1 = NULL, g1.level = NULL, g2 = NULL,
  g2.level = NULL, varnames = list(), colby = NULL, sizeby = NULL,
  symbolby = NULL, extra.vars, locate = NULL, locate.id = NULL,
  locate.col = NULL, locate.extreme = NULL, highlight = NULL,
  data = NULL, design = NULL, freq = NULL, missing.info = TRUE,
  xlab = varnames$x, ylab = varnames$y, new = TRUE, inzpars = inzpar(),
  layout.only = FALSE, plot = TRUE, xaxis = TRUE, yaxis = TRUE,
  xlim = NULL, ylim = NULL, zoombars = NULL, hide.legend = FALSE, df,
  env = parent.frame())
  }
