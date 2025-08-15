$(document).ready(function () {
    const pdfViewer = $("#pdf-viewer");
    const loading = $("#loading");
    const fallback = $("#pdf-fallback");

    // Handle PDF loading
    pdfViewer.on("load", function () {
        loading.hide();
        pdfViewer.show();
        console.log("PDF loaded successfully");
    });

    pdfViewer.on("error", function () {
        loading.hide();
        fallback.show();
        console.log("PDF failed to load, showing fallback");
    });

    // Timeout fallback if PDF doesn't load within 10 seconds
    setTimeout(function () {
        if (pdfViewer.is(":hidden") && loading.is(":visible")) {
            loading.hide();
            fallback.show();
            console.log("PDF loading timeout, showing fallback");
        }
    }, 10000);

    // Back to top button
    $(window).scroll(function () {
        if ($(window).scrollTop() > 300) {
            $("#backToTop").addClass("visible");
        } else {
            $("#backToTop").removeClass("visible");
        }
    });

    $("#backToTop").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 300);
    });
});

// Print function
function printResume() {
    window.print();
}

// Share function
function shareResume() {
    if (navigator.share) {
        navigator
            .share({
                title: "Rithin Lehan - Resume",
                text: "Check out my resume - Full Stack .NET Developer",
                url: window.location.href,
            })
            .then(() => {
                console.log("Resume shared successfully");
            })
            .catch((error) => {
                console.log("Error sharing resume:", error);
                fallbackShare();
            });
    } else {
        fallbackShare();
    }
}

function fallbackShare() {
    // Copy URL to clipboard
    navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
            alert("Resume URL copied to clipboard!");
        })
        .catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement("textarea");
            textArea.value = window.location.href;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            alert("Resume URL copied to clipboard!");
        });
}

// Fullscreen function
function toggleFullscreen() {
    const pdfViewer = document.getElementById("pdf-viewer");

    if (!document.fullscreenElement) {
        if (pdfViewer.requestFullscreen) {
            pdfViewer.requestFullscreen();
        } else if (pdfViewer.mozRequestFullScreen) {
            pdfViewer.mozRequestFullScreen();
        } else if (pdfViewer.webkitRequestFullscreen) {
            pdfViewer.webkitRequestFullscreen();
        } else if (pdfViewer.msRequestFullscreen) {
            pdfViewer.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

// Alternative PDF loading method if embed fails
function loadPDFAlternative() {
    const container = document.querySelector(".pdf-container");
    const iframe = document.createElement("iframe");
    iframe.src = "rithin.pdf";
    iframe.className = "pdf-viewer";
    iframe.style.display = "block";

    // Replace the embed with iframe
    const embed = document.getElementById("pdf-viewer");
    container.replaceChild(iframe, embed);

    document.getElementById("loading").style.display = "none";
}

// Try alternative loading method if main method fails
window.addEventListener("load", function () {
    setTimeout(function () {
        const loading = document.getElementById("loading");
        const pdfViewer = document.getElementById("pdf-viewer");

        if (
            loading.style.display !== "none" &&
            pdfViewer.style.display === "none"
        ) {
            console.log("Trying alternative PDF loading method...");
            loadPDFAlternative();
        }
    }, 8000);
});