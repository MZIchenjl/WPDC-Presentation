require('./css/main.css')

var works = document.querySelectorAll('.works')

function loadImage(work) {
    var workURL = work.dataset['url'],
        coverSrc = work.dataset['cover'],
        workBody = work.querySelector('.work-body'),
        workCover = new Image(),
        clickCover = document.createElement('a');
    clickCover.href = workURL;
    workCover.src = coverSrc;
    workCover.onload = function () {
        clickCover.appendChild(workCover);
        clickCover.className = 'work-url';
        workCover.className = 'work-cover';
        workBody.innerHTML = '';
        workBody.appendChild(clickCover);
    }
}

for (var i = 0, len = works.length; i < len; i++) {
    loadImage(works[i]);
}
