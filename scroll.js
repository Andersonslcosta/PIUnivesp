document.addEventListener('DOMContentLoaded', function() {
  const imageWrapper = document.querySelector('.image-wrapper');
  const images = document.querySelectorAll('.image-wrapper img');
  const nextButton = document.querySelector('.next');
  const prevButton = document.querySelector('.prev');
  let currentIndex = 0;
  let totalWidth = 0;
  let intervalId;

  images.forEach(img => {
    if (img.offsetLeft + img.offsetWidth <= window.innerWidth) {
      totalWidth += img.offsetWidth;
    }
  });

  imageWrapper.style.width = totalWidth + 'px';

  window.addEventListener('resize', function() {
    totalWidth = 0;
    images.forEach(img => {
      if (img.offsetLeft + img.offsetWidth <= window.innerWidth) {
        totalWidth += img.offsetWidth;
      }
    });
    imageWrapper.style.width = totalWidth + 'px';
  });

  nextButton.addEventListener('click', function() {
    nextImage();
  });

  prevButton.addEventListener('click', function() {
    prevImage();
  });

  function nextImage() {
    if (currentIndex < images.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0; // Volta para a primeira imagem se estiver no último slide
    }
    updateCarousel();
  }

  function prevImage() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = images.length - 1; // Vai para o último slide se estiver na primeira imagem
    }
    updateCarousel();
  }

  function updateCarousel() {
    const imageWidth = images[currentIndex].offsetWidth - 20; // Considerando a margem de 20px entre as imagens
    imageWrapper.style.transform = `translateX(${-currentIndex * imageWidth}px)`;
  }

  // Função para avançar automaticamente para a próxima imagem a cada 5 segundos
  function autoAdvance() {
    intervalId = setInterval(function() {
      nextImage();
    }, 1000);
  }

  // Iniciar a animação automática quando a página é carregada
  autoAdvance();

  // Parar a animação automática quando o mouse estiver sobre as imagens
  imageWrapper.addEventListener('mouseenter', function() {
    clearInterval(intervalId);
  });

  // Retomar a animação automática quando o mouse sair das imagens
  imageWrapper.addEventListener('mouseleave', function() {
    autoAdvance();
  });
});
