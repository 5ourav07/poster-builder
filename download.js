function downloadPoster() {
  // Create a temporary div with a white background and correct size
  const tempDiv = document.createElement("div");
  tempDiv.style.position = "fixed";
  tempDiv.style.top = "0";
  tempDiv.style.left = "0";
  tempDiv.style.width = `${posterPreview.scrollWidth}px`; // Use scrollWidth for full content width
  tempDiv.style.height = `${posterPreview.scrollHeight}px`; // Use scrollHeight for full content height
  tempDiv.style.backgroundColor = "#ffffff"; // White background
  tempDiv.style.zIndex = "-1";
  tempDiv.style.overflow = "hidden"; // Hide scrollbars
  document.body.appendChild(tempDiv);

  // Clone the posterPreview and append it to the temporary div
  const clonedPreview = posterPreview.cloneNode(true);
  clonedPreview.style.position = "absolute";
  clonedPreview.style.top = "0";
  clonedPreview.style.left = "0";
  tempDiv.appendChild(clonedPreview);

  // Use html2canvas to capture the poster preview with white background
  html2canvas(tempDiv, {
    useCORS: true,
    backgroundColor: null, // Ensure canvas background is transparent
  })
    .then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/jpeg"); // Save as JPEG
      link.download = "poster.jpg";
      link.click();

      // Clean up
      document.body.removeChild(tempDiv);
    })
    .catch((error) => {
      console.error("Error generating poster image:", error);
    });
}

document
  .getElementById("download-poster")
  .addEventListener("click", downloadPoster);
