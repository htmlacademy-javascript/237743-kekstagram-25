const form = document.querySelector('.img-upload__form');
const effectsList = form.querySelector('.effects__list');
const photoUploadPreview = form.querySelector('.img-upload__preview img');
const effectLevelSlider = form.querySelector('.effect-level__slider');
const effectLevelValue = form.querySelector('.effect-level__value');
const effectLevelInput = form.querySelector('.img-upload__effect-level');

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: (value) => (
      parseFloat(value)
    ),
  }
});

const LIST_PHOTO_EFFECT = {
  'effect-none': {
    filter: 'none',
    unit: '',
    class: '',
    noUiSlider: {
      range: {
        min: 0,
        max: 0
      },
      start: 0,
      step: 0,
    }
  },
  'effect-chrome': {
    filter: 'grayscale',
    unit: '',
    class: 'chrome',
    noUiSlider: {
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1,
    }
  },
  'effect-sepia': {
    filter: 'sepia',
    unit: '',
    class: 'sepia',
    noUiSlider: {
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1,
    }
  },
  'effect-marvin': {
    filter: 'invert',
    unit: '%',
    class: 'marvin',
    noUiSlider: {
      range: {
        min: 0,
        max: 100
      },
      start: 100,
      step: 1,
    }
  },
  'effect-phobos': {
    filter: 'blur',
    unit: 'px',
    class: 'phobos',
    noUiSlider: {
      range: {
        min: 0,
        max: 3
      },
      start: 3,
      step: 0.1,
    }
  },
  'effect-heat': {
    filter: 'brightness',
    unit: '',
    class: 'heat',
    noUiSlider: {
      range: {
        min: 1,
        max: 3
      },
      start: 3,
      step: 0.1,
    }
  }
};

const effectsChangeHandler = (evt) => {
  photoUploadPreview.classList = '';
  if (evt.target.id === 'effect-none') {
    effectLevelInput.classList.add('hidden');
    photoUploadPreview.style.filter = 'none';
  } else {
    effectLevelInput.classList.remove('hidden');
    effectLevelSlider.noUiSlider.updateOptions(LIST_PHOTO_EFFECT[evt.target.id].noUiSlider);
    photoUploadPreview.classList.add(`effects__preview--${LIST_PHOTO_EFFECT[evt.target.id].class}`);
  }
};

effectLevelSlider.noUiSlider.on('update', () => {
  const selectedEffect = effectsList.querySelector('input:checked').id;
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  photoUploadPreview.style.filter = `${LIST_PHOTO_EFFECT[selectedEffect].filter}(${effectLevelSlider.noUiSlider.get()}${LIST_PHOTO_EFFECT[selectedEffect].unit})`;
});

effectsList.addEventListener('change', effectsChangeHandler);
