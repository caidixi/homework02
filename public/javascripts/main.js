$("input[type = range]").mousemove(editImage).change(editImage);

function editImage() {
    let blur = $("#blur").val();
    let gs = $("#gs").val();
    $("img.detail-image").css("filter", 'grayscale(' + gs +
        '%) blur(' + blur +
        'px)');
}

const DETAIL_IMAGE_SELECTOR = '[data-image-role = "target"]';
const DETAIL_TITLE_SELECTOR = '[data-image-role = "title"]';
const WALLPAPER_LINK_SELECTOR = '[data-image-role = "trigger"]';


function setDetails(imageUrl, titleText) {
    'use strict';
    let detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    let detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromWallpaper(wallpaper) {
    'use strict';
    return wallpaper.getAttribute('data-image-url');
}

function titleFromWallpaper(wallpaper) {
    'use strict';
    return wallpaper.getAttribute('data-image-title');
}

function setDetailsFromWallpaper(wallpaper) {
    'use strict';
    setDetails(imageFromWallpaper(wallpaper), titleFromWallpaper(wallpaper));
}

function addWallpaperClickHandler(wallpaper) {
    'use strict';
    wallpaper.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromWallpaper(wallpaper);
    });
}

function getWallpaperArray() {
    'use strict';
    let wallpapers = document.querySelectorAll(WALLPAPER_LINK_SELECTOR);
    return [].slice.call(wallpapers);
}

function intializeEvents() {
    'use strict';
    let wallpapers = getWallpaperArray();
    wallpapers.forEach(addWallpaperClickHandler);
}

intializeEvents();