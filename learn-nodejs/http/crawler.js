var http = require('http')
var  cheerio = require('cheerio')

var url = 'http://www.imooc.com/learn/348'


function filterChapters (html) {
  var $ = cheerio.load(html)
  var chapters = $('.chapter') 

  // [{
  //   chapterTitle: '',
  //   videos: [{
  //     title: '',
  //     id: ''
  //   }]
  // }]

  var courseData = []
  chapters.each(function(item) {
    var chapter = $(this)
    var chapterTitle = chapter.find('h3').text()
    var videos = chapter.find('.video').children('li')
    var chapterData = {
       chapterTitle: chapterTitle.trim(),
       videos: []
    }

    videos.each(function(item) {
      var video = $(this).find('.J-media-item')
      var videoTitle = video.text()
      var id = video.attr('href').split('video/')[1]

      chapterData.videos.push({
        title: videoTitle.trim().replace(/\s/g, ''),
        id:id.trim()
      })
    })

    courseData.push(chapterData)
  })

  return courseData 
}

function printCourseInfo(courseData) { 
  courseData.forEach((item)=>{
    var chapterTitle = item.chapterTitle
    console.log(chapterTitle + '\n')

    item.videos.forEach((i)=> {
      console.log(` 【${i.id}】${i.title} \n`)
    })
  })
}

http.get(url, function(res) {
  var html = ''

  res.on('data', function(data) {
    html += data
  })

  res.on('end', function() {
    var courseData = filterChapters(html)

    printCourseInfo(courseData)
  })
}).on('error', function() {
  console.log('get html error')
})