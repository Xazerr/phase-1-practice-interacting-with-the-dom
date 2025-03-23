// DOM Elements
const counter = document.getElementById('counter');
const plusBtn = document.getElementById('plus');
const minusBtn = document.getElementById('minus');
const heartBtn = document.getElementById('heart');
const pauseBtn = document.getElementById('pause');
const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-input');
const commentsList = document.getElementById('list');
const likesList = document.querySelector('.likes');

// Counter state
let count = 0;
let timer;
let isPaused = false;

// Function to increment the counter every second
function startTimer() {
  timer = setInterval(() => {
    if (!isPaused) {
      count++;
      counter.textContent = count;
    }
  }, 1000);
}

// Start the timer when the page loads
startTimer();

// Plus button: Increment the counter
plusBtn.addEventListener('click', () => {
  if (!isPaused) {
    count++;
    counter.textContent = count;
  }
});

// Minus button: Decrement the counter
minusBtn.addEventListener('click', () => {
  if (!isPaused) {
    count--;
    counter.textContent = count;
  }
});

// Heart button: Like the current number
heartBtn.addEventListener('click', () => {
  if (!isPaused) {
    // Check if the number already has likes
    const existingLike = document.getElementById(`like-${count}`);
    if (existingLike) {
      // Increment the like count
      const likeCount = parseInt(existingLike.dataset.likes) + 1;
      existingLike.dataset.likes = likeCount;
      existingLike.textContent = `${count} has been liked ${likeCount} times`;
    } else {
      // Create a new like entry
      const newLike = document.createElement('li');
      newLike.id = `like-${count}`;
      newLike.dataset.likes = 1;
      newLike.textContent = `${count} has been liked 1 time`;
      likesList.appendChild(newLike);
    }
  }
});

// Pause button: Pause/resume the counter
pauseBtn.addEventListener('click', () => {
  if (!isPaused) {
    // Pause the counter
    clearInterval(timer);
    isPaused = true;
    pauseBtn.textContent = 'resume';
    // Disable all buttons except pause
    plusBtn.disabled = true;
    minusBtn.disabled = true;
    heartBtn.disabled = true;
  } else {
    // Resume the counter
    startTimer();
    isPaused = false;
    pauseBtn.textContent = 'pause';
    // Re-enable all buttons
    plusBtn.disabled = false;
    minusBtn.disabled = false;
    heartBtn.disabled = false;
  }
});

// Comment form: Add a comment
commentForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent form submission
  const commentText = commentInput.value.trim();
  if (commentText) {
    // Create a new comment element
    const newComment = document.createElement('p');
    newComment.textContent = commentText;
    commentsList.appendChild(newComment);
    // Clear the input field
    commentInput.value = '';
  }
});