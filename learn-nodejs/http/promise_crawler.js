var http = require('http')
var Promise = require('promise')
var  cheerio = require('cheerio')

var baseUrl = 'http://www.imooc.com/learn/'

// var videoIds =[348, 259, 197, 134, 75]
var videoIds =[348]


function filterChapters (html) {
  var $ = cheerio.load(html)
  var chapters = $('.chapter') 
  var title = $('h2.l').text()
  var number = $('.js-learn-num').text()
  // courseData={
  //   title: '',
  //   number: '',
  //   videos:[{
  //     chapterTitle: '',
  //     videos: [{
  //       title: '',
  //       id: ''
  //     }]
  //   }]
  // }

  var courseData = {
    title: title.trim(),
    number: number,
    videos:[]
  }
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

    courseData.videos.push(chapterData)
  })

  return courseData 
}

function printCourseInfo(coursesData) { 
  coursesData.forEach(courseData => {
    console.log(` ${courseData.number} 人学过《${courseData.title}》\n`)
  })

  coursesData.forEach(courseData => {
    console.log(`### ${courseData.title}\n`)
    courseData.videos.forEach((item)=>{
      var chapterTitle = item.chapterTitle
      console.log(chapterTitle + '\n')
  
      item.videos.forEach((i)=> {
        console.log(` 【${i.id}】${i.title} \n`)
      })
    })
  })


}


function getPageAsync (url) {
  return new Promise(function(resolve, reject) {
    console.log('正在爬取 ' + url)
    http.get(url, function(res) {
      var html = ''
    
      res.on('data', function(data) {
        html += data
      })
    
      res.on('end', function() {
        resolve(html)
      })
    }).on('error', function(e) {
      reject(e)
      console.log('get html error')
    })
  })
}

var fetchCourseArray = []

videoIds.forEach(function(id) {
  fetchCourseArray.push(getPageAsync(baseUrl + id))
})

Promise
  .all(fetchCourseArray)
  .then(function(pages){
    var coursesData = []

    pages.forEach(function(html) {
      var courses = filterChapters(html)
      coursesData.push(courses)
    }) 

    coursesData.sort(function(a, b) {
      return a.number < b.number
    })

    printCourseInfo(coursesData)

  })

