let canvas = document.getElementById("imageCanvas");
let ctx = canvas.getContext("2d");
let img = new Image();

let clickPoints = [];
let mmPerPixel = null;

const usRingData = [
{ size: '3', circumference: 44.0 },
{ size: '3.5', circumference: 45.2 },
{ size: '4', circumference: 46.5 },
{ size: '4.5', circumference: 47.8 },
{ size: '5', circumference: 49.0 },
{ size: '5.5', circumference: 50.3 },
{ size: '6', circumference: 51.5 },
{ size: '6.5', circumference: 52.8 }, //fix later...
{ size: '7', circumference: 54.0 },
{ size: '7.5', circumference: 55.3 },
{ size: '8', circumference: 56.6 },
{ size: '8.5', circumference: 57.8 },
{ size: '9', circumference: 59.1 },
{ size: '9.5', circumference: 60.3 },
{ size: '10', circumference: 61.6 },
{ size: '10.5', circumference: 62.8 },
{ size: '11', circumference: 64.1 },
{ size: '11.5', circumference: 65.3 },
{ size: '12', circumference: 66.6 },
];

const ukRingData = [
{ circumference: 37.80, size: 'A'},
{ circumference: 38.50, size: 'A 1/2'},
{ circumference: 39.10, size: 'B'},
{ circumference: 39.70, size: 'B 1/2'},
{ circumference: 40.40, size: 'C'},
{ circumference: 41.00, size: 'C 1/2'},
{ circumference: 41.70, size: 'D'},
{ circumference: 42.30, size: 'D 1/2'},
{ circumference: 42.90, size: 'E'},
{ circumference: 43.60, size: 'E 1/2'},
{ circumference: 44.20, size: 'F'},
{ circumference: 44.80, size: 'F 1/2'},
{ circumference: 45.50, size: 'G'},
{ circumference: 46.10, size: 'G 1/2'},
{ circumference: 46.80, size: 'H'},
{ circumference: 47.40, size: 'H 1/2'},
{ circumference: 48.00, size: 'I'},
{ circumference: 48.70, size: 'J'},
{ circumference: 49.30, size: 'J 1/2'},
{ circumference: 50.00, size: 'K'},
{ circumference: 50.60, size: 'K 1/2'},
{ circumference: 51.20, size: 'L'},
{ circumference: 51.90, size: 'L 1/2'},
{ circumference: 52.50, size: 'M'},
{ circumference: 53.10, size: 'M 1/2'},
{ circumference: 53.80, size: 'N'},
{ circumference: 54.40, size: 'N 1/2'},
{ circumference: 55.10, size: 'O'},
{ circumference: 55.70, size: 'O 1/2'},
{ circumference: 56.30, size: 'P'},
{ circumference: 57.00, size: 'P 1/2'},
{ circumference: 57.60, size: 'Q'},
{ circumference: 58.30, size: 'Q 1/2'},
{ circumference: 58.90, size: 'R'},
{ circumference: 59.50, size: 'R 1/2'},
{ circumference: 60.20, size: 'S'},
{ circumference: 60.80, size: 'S 1/2'},
{ circumference: 61.40, size: 'T'},
{ circumference: 62.10, size: 'T 1/2'},
{ circumference: 62.70, size: 'U'},
{ circumference: 63.40, size: 'U 1/2'},
{ circumference: 64.00, size: 'V'},
{ circumference: 64.60, size: 'V 1/2'},
{ circumference: 65.30, size: 'W'},
{ circumference: 65.90, size: 'W 1/2'},
{ circumference: 66.60, size: 'X'},
{ circumference: 67.20, size: 'X 1/2'},
{ circumference: 67.80, size: 'Y'},
{ circumference: 68.50, size: 'Z'},
{ circumference: 69.10, size: 'Z 1/2'},
{ circumference: 69.70, size: 'Z 1/2'},
{ circumference: 71.00, size: 'Z1'},
{ circumference: 72.30, size: 'Z2'},
{ circumference: 72.90, size: 'Z3'},
{ circumference: 74.20, size: 'Z4'}
]

const jpRingData = [
{ size: '1', circumference: 40.84},
{ size: '1.5', circumference: 41.36},
{ size: '2', circumference: 41.89},
{ size: '2.5', circumference: 42.41},
{ size: '3', circumference: 42.94},
{ size: '3.5', circumference: 43.46},
{ size: '4', circumference: 43.98},
{ size: '4.5', circumference: 44.51},
{ size: '5', circumference: 45.03},
{ size: '5.5', circumference: 45.55},
{ size: '6', circumference: 46.08},
{ size: '6.5', circumference: 46.60},
{ size: '7', circumference: 47.12},
{ size: '7.5', circumference: 47.65},
{ size: '8', circumference: 48.17},
{ size: '8.5', circumference: 48.69},
{ size: '9', circumference: 49.22},
{ size: '9.5', circumference: 49.74},
{ size: '10', circumference: 50.27},
{ size: '10.5', circumference: 50.79},
{ size: '11', circumference: 51.31},
{ size: '11.5', circumference: 51.84},
{ size: '12', circumference: 52.36},
{ size: '12.5', circumference: 52.88},
{ size: '13', circumference: 53.41},
{ size: '13.5', circumference: 53.93},
{ size: '14', circumference: 54.45},
{ size: '14.5', circumference: 54.98},
{ size: '15', circumference: 55.50},
{ size: '15.5', circumference: 56.03},
{ size: '16', circumference: 56.55},
{ size: '16.5', circumference: 57.07},
{ size: '17', circumference: 57.60},
{ size: '17.5', circumference: 58.12},
{ size: '18', circumference: 58.64},
{ size: '18.5', circumference: 59.17},
{ size: '19', circumference: 59.69},
{ size: '19.5', circumference: 60.21},
{ size: '20', circumference: 60.74},
{ size: '20.5', circumference: 61.26},
{ size: '21', circumference: 61.78},
{ size: '21.5', circumference: 62.31},
{ size: '22', circumference: 62.83},
{ size: '22.5', circumference: 63.36},
{ size: '23', circumference: 63.88},
{ size: '23.5', circumference: 64.40},
{ size: '24', circumference: 64.93},
{ size: '24.5', circumference: 65.45},
{ size: '25', circumference: 65.97},
{ size: '25.5', circumference: 66.50},
{ size: '26', circumference: 67.02},
{ size: '26.5', circumference: 67.54},
{ size: '27', circumference: 68.07},
{ size: '27.5', circumference: 68.59},
{ size: '28', circumference: 69.11},
{ size: '28.5', circumference: 69.64},
{ size: '29', circumference: 70.16},
{ size: '29.5', circumference: 70.69},
{ size: '30', circumference: 71.21},
]

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
    if (clickPoints.length >= 4) return;
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

function findEUSize(circumference){
    return {
        euSize: Math.round(circumference * 2) / 2,
    };
}

function findUSSize(circumferenceMM) {
    let closest = usRingData[0];
    let diff = Math.abs(circumferenceMM - closest.circumference);

    for (let i = 1; i < usRingData.length; i++) {
        let d = Math.abs(circumferenceMM - usRingData[i].circumference);
        if (d < diff) {
            diff = d;
            closest = usRingData[i];
        }
    }
    return closest;
}

function findUKSize(circumferenceMM) {
    let closest = ukRingData[0];
    let diff = Math.abs(circumferenceMM - closest.circumference);

    for (let i = 1; i < usRingData.length; i++) {
        let d = Math.abs(circumferenceMM - usRingData[i].circumference);
        if (d < diff) {
            diff = d;
            closest = usRingData[i];
        }
    }
    return closest;
}

function findJPSize(circumferenceMM) {
    let closest = jpRingData[0];
    let diff = Math.abs(circumferenceMM - closest.circumference);

    for (let i = 1; i < usRingData.length; i++) {
        let d = Math.abs(circumferenceMM - usRingData[i].circumference);
        if (d < diff) {
            diff = d;
            closest = usRingData[i];
        }
    }
    return closest;
}

function buildRingSizeTable(circumferenceMM) {
    const usSize = findUSSize(circumferenceMM);
    const euSize = findEUSize(circumferenceMM);
    const ukSize = findUKSize(circumferenceMM);
    const jpSize = findJPSize(circumferenceMM);

    let html = `
        <h3>Ring Size Results</h3>
        <table border="1" cellpadding="6">
            <tr><th>System</th><th>Size</th></tr>
            <tr><td>US</td><td>${usSize.size}</td></tr>
            <tr><td>EU</td><td>${euSize}</td></tr>
            <tr><td>UK</td><td>${ukSize.size}</td></tr>
            <tr><td>JP</td><td>${jpSize.size}</td></tr>
        </table>
    `;
    return html;
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