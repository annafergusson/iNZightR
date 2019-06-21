#' @top40
top40 <- function(){
url <- "https://nztop40.co.nz/chart/singles"
page <- read_html(url)

calendar_date <- page %>%
  html_nodes(xpath='//*[@id="p_calendar_heading"]') %>%
  html_text() %>%
  unique() %>%
  rep(40)

this_week <- page %>%
  html_nodes(".p_this_week") %>%
  html_text() %>%
  str_squish() %>%
  head(40)

last_week <- page %>%
  html_nodes(".p_last_week") %>%
  html_text() %>%
  str_squish() %>%
  head(41)

num_weeks <- page %>%
  html_nodes(".p_weeks") %>%
  html_text() %>%
  str_squish() %>%
  head(41)

track_title <- page %>%
  html_nodes(".p_title") %>%
  html_text() %>%
  str_squish() %>%
  head(40)

track_artist <- page %>%
  html_nodes(".p_artist") %>%
  html_text() %>%
  str_squish() %>%
  head(40)

track_status <- page %>%
  html_nodes(".p_status") %>%
  html_text() %>%
  str_squish() %>%
  head(41)

track_label <- page %>%
  html_nodes(".p_label") %>%
  html_text() %>%
  str_squish() %>%
  head(40)

chart_info <- tibble(calendar_date, 
                     this_week, 
                     last_week = last_week[2:41], 
                     num_weeks = num_weeks[2:41],
                     track_title,
                     track_artist,
                     track_status = track_status[2:41],
                     track_label)

return(toJSON(chart_info))
}
