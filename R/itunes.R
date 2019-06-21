#' @itunes
itunes <- function(){
url <- "https://music.apple.com/nz/playlist/official-nz-top40/pl.u-GgA5klRUZezpr9M"
page <- read_html(url)

links <- page %>%
  html_nodes(".product-hero__tracks") %>%
  html_nodes("a") %>%
  html_attr('href')

tracks <- tibble(links) %>%
  filter(str_detect(links, "i=")) %>%
  mutate(appleid = str_sub(links, -10))


track_info <- map_df(1 : 40, function(i){
  res <- fromJSON(paste0("https://itunes.apple.com/lookup?id=",tracks$appleid[i]), flatten = TRUE)$results
  if(length(res) > 0){
    return(fromJSON(paste0("https://itunes.apple.com/lookup?id=",tracks$appleid[i]), flatten = TRUE)$results %>%
      mutate(track_pos = i))
  }
})

return(toJSON(track_info))
}
