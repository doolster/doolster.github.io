// Places 'Past Talks' header after first accordion menu
const pastTalks = document.createElement('h2');
pastTalks.textContent = 'Past Talks';
document.querySelector('.panel').insertAdjacentElement('afterend', pastTalks);


// Accordion animation
var acc = document.getElementsByClassName('accordion');
var i;
for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener('click', function() {
    this.classList.toggle('active');
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    } 
  });
}

// Show More/Less for last column
document.querySelectorAll('.panel table').forEach(function(table) {
  // For each row except the header
  table.querySelectorAll('tr').forEach(function(row, idx) {
    // Skip header row
    if (idx === 0) return;
    let cells = row.querySelectorAll('td');
    if (cells.length === 0) return;
    let lastCell = cells[cells.length - 1];
    if (!lastCell.classList.contains('show-more-processed')) {
        lastCell.classList.add('show-more-processed');
        // Wrap content in .text div
        let textDiv = document.createElement('div');
        textDiv.className = 'text';
        while (lastCell.firstChild) {
            textDiv.appendChild(lastCell.firstChild);
        }
        lastCell.appendChild(textDiv);
        // Add button
        let btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'show-more-btn';
        btn.textContent = 'Show More';
        btn.addEventListener('click', function() {
            let expanded = textDiv.classList.toggle('expanded');
            btn.textContent = expanded ? 'Show Less' : 'Show More';
            // Update panel height if inside accordion
            let panel = lastCell.closest('.panel');
            if (panel) {
                requestAnimationFrame(function() {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                });
            }
        });
        lastCell.appendChild(btn);
    }
    });
});

// Opens first accordion on start
var firstPanel = document.getElementsByClassName('panel')[0];
firstPanel.style.maxHeight = firstPanel.scrollHeight + 'px';
document.getElementsByClassName('accordion')[0].classList.toggle('active');

// Opens first 'Show More' button on start
var firstBtn = document.querySelector('.show-more-btn');
if (firstBtn) {
    var textDiv = firstBtn.previousSibling;
    if (textDiv && textDiv.classList) {
        textDiv.classList.add('expanded');
        firstBtn.textContent = 'Show Less';
        // Update panel height if inside accordion
        let panel = firstBtn.closest('.panel');
        if (panel) {
            requestAnimationFrame(function() {
                panel.style.maxHeight = panel.scrollHeight + "px";
            });
        }
    }
}

// "Expand All" button functionality
document.getElementById('expand-all-btn').addEventListener('click', function() {
  for (i = 0; i < acc.length; i++) {
    if (!acc[i].classList.contains('active')) {
      var accPanel = acc[i].nextElementSibling;
      accPanel.style.maxHeight = accPanel.scrollHeight + 'px';
      acc[i].classList.toggle('active');
    }
  }
});
