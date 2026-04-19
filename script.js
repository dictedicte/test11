


/*HIDE EMPTY DAYS AND MONTHS*/
// Function to update container visibility
function updateDayOverlay() {
  const containers = document.querySelectorAll('.day-overlay');

  containers.forEach(container => {
    const childrenExceptFirst = Array.from(container.children).slice(1);

    if (childrenExceptFirst.length === 0) return;

    const allHidden = childrenExceptFirst.every(child => {
      return window.getComputedStyle(child).display === 'none';
    });

    container.style.display = allHidden ? 'none' : '';
  });
}

// Attach change listeners to all checkboxes
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', updateDayOverlay);
});

// Wait until the browser has applied CSS to accurately detect visibility
window.addEventListener('load', () => {
  // Use requestAnimationFrame to ensure styles are applied
  requestAnimationFrame(updateDayOverlay);
});



// Function to update container visibility
function updateMonthOverlay() {
  const containers = document.querySelectorAll('.month-overlay');

  containers.forEach(container => {
    const childrenExceptFirst = Array.from(container.children).slice(1);

    if (childrenExceptFirst.length === 0) return;

    const allHidden = childrenExceptFirst.every(child => {
      return window.getComputedStyle(child).display === 'none';
    });

    container.style.display = allHidden ? 'none' : '';
  });
}

// Attach change listeners to all checkboxes
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', updateMonthOverlay);
});

// Wait until the browser has applied CSS to accurately detect visibility
window.addEventListener('load', () => {
  // Use requestAnimationFrame to ensure styles are applied
  requestAnimationFrame(updateMonthOverlay);
});





/*lazy load*/
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("loaded");
      obs.unobserve(entry.target);
    }
  });
});

document.querySelectorAll(".icon").forEach(el => {
  observer.observe(el);
});




// Get all containers
const containers = document.querySelectorAll('.timeline, .month-overlay, .day-overlay');

// Store original order indices for restoring
containers.forEach(container => {
  Array.from(container.children).forEach((child, i) => {
    child.dataset.index = i;
    child.classList.add('visible'); // ensures starting visibility
  });
});

// Function to update order
function updateOrder(reverse, animate = true) {
  containers.forEach(container => {
    const children = Array.from(container.children);
    const first = children.shift();
    let rest = reverse
      ? children.reverse()
      : children.sort((a, b) => a.dataset.index - b.dataset.index);

    if (animate) {
      // Animate fade-out → reorder → fade-in
      container.classList.add('flipping');
      children.forEach(child => child.classList.remove('visible'));

      setTimeout(() => {
        container.innerHTML = '';
        container.appendChild(first);
        rest.forEach(el => container.appendChild(el));

        requestAnimationFrame(() => {
          container.classList.remove('flipping');
          Array.from(container.children).forEach(el => el.classList.add('visible'));
        });
      }, 1);
    } else {
      // No animation (used for initial page load)
      container.innerHTML = '';
      container.appendChild(first);
      rest.forEach(el => container.appendChild(el));
    }
  });
}

// Radio listeners
document.getElementById('newestfirst').addEventListener('change', e => {
  if (e.target.checked) updateOrder(false);
});
document.getElementById('oldestfirst').addEventListener('change', e => {
  if (e.target.checked) updateOrder(true);
});

// ✅ On page load: detect which radio is selected, apply order (no animation)
window.addEventListener('DOMContentLoaded', () => {
  const oldestfirstChecked = document.getElementById('oldestfirst').checked;
  updateOrder(oldestfirstChecked, false); // no animation on first render
});



/*SEARCH */
function filterItems() {
  const input = document.getElementById("search").value.toLowerCase();
  const items = document.querySelectorAll(".entry-overlay");

  items.forEach(item => {
    const pText = item.querySelector("p")?.textContent.toLowerCase() || "";
    const h5Text = item.querySelector("h5")?.textContent.toLowerCase() || "";

    if (pText.includes(input) || h5Text.includes(input)) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
}