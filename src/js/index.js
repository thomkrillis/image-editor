class ImageSource {
  constructor(src) {
    this._data = [];
    this._src = src;
    this._type = 'image/jpeg';
  }

  get src() {
    return this._src;
  }

  set src(src) {
    this._src = src;
  }

  get data() {
    return this._data;
  }

  set data(data) {
    this._data = data;
    const blob = new Blob([data], { type: this._type });
    this._src = URL.createObjectURL(blob);
  }
}

const photoEl = document.getElementById('photo');
const downloadEl = document.getElementById('download');
const redMinSliderEl = document.getElementById('min-red');
const imageSource = new ImageSource(photoEl.src);

// TODO: convert jpeg data to rgba data for ImageSource before shenanigans
redMinSliderEl.oninput = function() {
  console.log(this.value);
  const data = imageSource.data;
  // data[5] = 255;
  // data.set([255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], 5000);
  console.log('len', data.length, data.slice(4995, 5025));
  imageSource.data = data;
  updatePhoto(imageSource.src);
}

const restoreImage = () => {
  photoEl.src = imageSource.src;
};

function loaded(e) {
  const res = new Uint8Array(e.target.result);
  const halfRes = res.slice(0, res.length/8);
  imageSource.data = halfRes;
  updatePhoto(imageSource.src);
}

const uploadImage = (event) => {
  const image = event.target.files[0];
  console.log('im', image);
  const reader = new FileReader();
  reader.readAsArrayBuffer(image);
  reader.onload = loaded;
  const imageUrl = URL.createObjectURL(image);
  updatePhoto(imageUrl);
};

const updatePhoto = (src) => {
  imageSource.src = src;
  photoEl.src = src;
  downloadEl.href = src;
};
