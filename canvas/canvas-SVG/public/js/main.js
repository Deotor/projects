var canvas = new fabric.Canvas('canvas', {
    hoverCursor: 'pointer',
    selection: true,
    new: 1
});

fabric.Image.fromURL('public/img/back.png', function(oImg) {
    oImg.set({'left': 80});
    oImg.set({'top': 200});
    canvas.add(oImg);
});
fabric.Image.fromURL('public/img/front.png', function(oImg) {
    oImg.set({'left': 550});
    oImg.set({'top': 200});
    canvas.add(oImg);
});


$(".insert-svg").click(function (e) {
    e.preventDefault();
    var url = $(this).children('img').attr('src');
    url = url.substring(0, url.lastIndexOf('.')) + '.svg';
    insertSvg(url);
    closeModal();
});

$(".remove").click(function () {
    removeObj();
});

$(".add-text").click(function () {
    insertText();
});

function insertSvg(url) {
    if(canvas.new == 1){
        canvas.clear();
        canvas.new = 0;
    }
    var setColor = $(".set-color").val();
    fabric.loadSVGFromURL(url, function(objects) {
        var svg = fabric.util.groupSVGElements(objects, {
            width: 800,
            height: 405
        });
        svg.set({
            left: 0,
            top: 0,
            scaleY: canvas.height / (svg.height * 2),
            scaleX: canvas.width / (svg.width * 2)
        });

        if (svg.isSameColor && svg.isSameColor() || !svg.paths) {
            svg.setFill(setColor);
        }
        else if (svg.paths) {
            for (var i = 0; i < svg.paths.length; i++) {
                svg.paths[i].setFill(setColor);
            }
        }
        canvas.add(svg).renderAll();
    });
}

function insertText() {
    var addedText = $('.added-text').val();
    var text = new fabric.Textbox(addedText, {
        fontFamily: 'Comic Sans'
    });
    canvas.add(text).renderAll();
}

function removeObj() {
    canvas.getActiveObject().remove();
}

function closeModal() {
    $('#pop-up').modal('hide');
}