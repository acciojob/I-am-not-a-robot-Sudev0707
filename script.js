const imagesList = [
  "https://picsum.photos/id/1/150/150",
  "https://picsum.photos/id/2/150/150",
  "https://picsum.photos/id/3/150/150",
  "https://picsum.photos/id/4/150/150",
  "https://picsum.photos/id/5/150/150"
];

let images = [];
let selectedIndices = [];
let selectedImages = [];

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function initializeImages() {
  const duplicateIndex = Math.floor(Math.random() * imagesList.length);
  const duplicateImage = imagesList[duplicateIndex];
  
  images = [...imagesList];
  images.push(duplicateImage);
  images = shuffleArray(images);
}

function renderImages() {
  const container = document.getElementById('imageContainer');
  container.innerHTML = '';
  
  images.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.dataset.index = index;
    img.dataset.src = src;
    img.addEventListener('click', () => handleImageClick(index));
    
    if (selectedIndices.includes(index)) {
      img.classList.add('selected');
    }
    
    container.appendChild(img);
  });
}

function updateUI() {
  const resetBtn = document.getElementById('reset');
  const verifyBtn = document.getElementById('verify');
  
  if (selectedIndices.length >= 1) {
    resetBtn.style.display = 'inline-block';
  } else {
    resetBtn.style.display = 'none';
  }
  
  if (selectedIndices.length === 2) {
    verifyBtn.style.display = 'inline-block';
  } else {
    verifyBtn.style.display = 'none';
  }
}

function handleImageClick(index) {
  if (selectedIndices.includes(index)) {
    return;
  }
  
  if (selectedIndices.length >= 2) {
    return;
  }
  
  selectedIndices.push(index);
  selectedImages.push(images[index]);
  
  renderImages();
  updateUI();
}

function resetGame() {
  selectedIndices = [];
  selectedImages = [];
  
  initializeImages();
  renderImages();
  updateUI();
  
  document.getElementById('para').innerHTML = '';
  document.getElementById('h').innerHTML = 'Please click on the identical tiles to verify that you are not a robot.';
}

function verifySelection() {
  const para = document.getElementById('para');
  
  if (selectedImages[0] === selectedImages[1]) {
    para.innerHTML = 'You are a human. Congratulations!';
  } else {
    para.innerHTML = "We can't verify you as a human. You selected the non-identical tiles.";
  }
  
  selectedIndices = [];
  selectedImages = [];
  renderImages();
  
  document.getElementById('verify').style.display = 'none';
  
  if (selectedIndices.length === 0) {
    document.getElementById('reset').style.display = 'none';
  }
}

initializeImages();
renderImages();

document.getElementById('reset').addEventListener('click', resetGame);
document.getElementById('verify').addEventListener('click', verifySelection);