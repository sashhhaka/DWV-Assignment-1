// Global filter values for sliders
let yearMin = 1990, yearMax = 2025;
let revenueMin = 0, revenueMax = 3000000000;

// Get display elements for range values
const yearMinDisplay = document.getElementById('year-min-display');
const yearMaxDisplay = document.getElementById('year-max-display');
const revenueMinDisplay = document.getElementById('revenue-min-display');
const revenueMaxDisplay = document.getElementById('revenue-max-display');

// Custom two-handle slider initializer
function initCustomSlider(sliderId, minValue, maxValue, callback, isRevenue) {
  const container = document.getElementById(sliderId);
  const inputLeft = container.querySelector('.range-slider-input-left');
  const inputRight = container.querySelector('.range-slider-input-right');
  const valRange = container.querySelector('.range-slider-val-range');
  const handleLeft = container.querySelector('.range-slider-handle-left');
  const handleRight = container.querySelector('.range-slider-handle-right');

  // Get display elements
  const minDisplay = isRevenue ? revenueMinDisplay : yearMinDisplay;
  const maxDisplay = isRevenue ? revenueMaxDisplay : yearMaxDisplay;

  // Make sure inputs have the correct min/max values
  inputLeft.min = minValue;
  inputLeft.max = maxValue;
  inputRight.min = minValue;
  inputRight.max = maxValue;

  // Initial values
  inputLeft.value = minValue;
  inputRight.value = maxValue;

  function updateSlider() {
    let leftVal = parseInt(inputLeft.value);
    let rightVal = parseInt(inputRight.value);

    // Ensure values don't go below minimum
    leftVal = Math.max(leftVal, minValue);
    rightVal = Math.max(rightVal, minValue);

    // Prevent overlap but allow equal values
    // Changed from leftVal > rightVal - 1 to leftVal > rightVal
    if (leftVal > rightVal) {
      leftVal = rightVal;
      inputLeft.value = leftVal;
    }

    const percent = (val) => ((val - minValue) / (maxValue - minValue)) * 100;

    const leftPercent = percent(leftVal);
    const rightPercent = percent(rightVal);

    // Update the visual range
    valRange.style.left = leftPercent + "%";
    valRange.style.width = (rightPercent - leftPercent) + "%";

    // Update handles positions
    handleLeft.style.left = leftPercent + "%";
    handleRight.style.left = rightPercent + "%";

    // Update display values
    if (isRevenue) {
      minDisplay.textContent = formatRevenueBillions(leftVal);
      maxDisplay.textContent = formatRevenueBillions(rightVal);
    } else {
      minDisplay.textContent = leftVal;
      maxDisplay.textContent = rightVal;
    }

    // Call the callback with updated values
    callback(leftVal, rightVal);
  }

  // Add proper event listeners for both inputs
  inputLeft.addEventListener('input', updateSlider);
  inputRight.addEventListener('input', updateSlider);

  // Add mouse and touch events for handles
  [handleLeft, handleRight].forEach((handle, index) => {
    const input = index === 0 ? inputLeft : inputRight;
    let dragging = false;

    // Mouse events
    handle.addEventListener('mousedown', (e) => {
      dragging = true;
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (!dragging) return;

      const rect = container.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      const newValue = Math.round(minValue + pos * (maxValue - minValue));

      input.value = Math.max(minValue, Math.min(maxValue, newValue));
      updateSlider();
      e.preventDefault();
    });

    document.addEventListener('mouseup', () => {
      dragging = false;
    });

    // Touch events for mobile
    handle.addEventListener('touchstart', (e) => {
      dragging = true;
      e.preventDefault();
    });

    document.addEventListener('touchmove', (e) => {
      if (!dragging) return;

      const rect = container.getBoundingClientRect();
      const pos = (e.touches[0].clientX - rect.left) / rect.width;
      const newValue = Math.round(minValue + pos * (maxValue - minValue));

      input.value = Math.max(minValue, Math.min(maxValue, newValue));
      updateSlider();
      e.preventDefault();
    });

    document.addEventListener('touchend', () => {
      dragging = false;
    });
  });

  // Initial update
  updateSlider();
}