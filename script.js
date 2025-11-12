let canvas = document.getElementById("imageCanvas");
let ctx = canvas.getContext("2d");
let img = new Image();

let clickPoints = [];
let mmPerPixel = null;

document.getElementById("imageInput").addEventListener("change", function (e) {
    let file = e.target.files[0];
    if (!file) return;

    let reader = new FileReader();
    reader.onload = function (evt) {
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        };
        img.src = evt.target.result;
    };
    reader.readAsDataURL(file);
});

canvas.addEventListener("click", function (event) {
    if (!img.src) return;

    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    clickPoints.push({ x, y });
    drawMarker(x, y);

    if (clickPoints.length === 2) {
        computeScale();
    } else if (clickPoints.length === 4) {
        computeFinger();
    }
});

function drawMarker(x, y) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
}

function computeScale() {
    let p1 = clickPoints[0];
    let p2 = clickPoints[1];

    let dx = p2.x - p1.x;
    let dy = p2.y - p1.y;
    let pixelDistance = Math.sqrt(dx * dx + dy * dy);

    let mmInOneInch = 25.4;
    mmPerPixel = mmInOneInch / pixelDistance;

    showMessage("Scale set: " + mmPerPixel.toFixed(5) + " mm per pixel");
}

function computeFinger() {
    if (mmPerPixel === null) {
        showMessage("Scale not set yet.");
        return;
    }

    let p3 = clickPoints[2];
    let p4 = clickPoints[3];

    let dx = p4.x - p3.x;
    let dy = p4.y - p3.y;
    let fingerPixelWidth = Math.sqrt(dx * dx + dy * dy);

    let fingerWidthMM = fingerPixelWidth * mmPerPixel;
    let circumference = fingerWidthMM * Math.PI;

    showMessage(
        "Finger width: " + fingerWidthMM.toFixed(2) + " mm<br>" +
        "Circumference: " + circumference.toFixed(2) + " mm<br>" +
        "(Hook in ring size lookup here.)"
    );
}

function showMessage(html) {
    document.getElementById("results").innerHTML = html;
}
