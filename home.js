document.addEventListener('DOMContentLoaded', function() {
  const imageWrapper = document.querySelector('.image-wrapper');
  const images = document.querySelectorAll('.image-wrapper img');
  const nextButton = document.querySelector('.next');
  const prevButton = document.querySelector('.prev');
  let currentIndex = 0;
  const imageWidth = images[0].offsetWidth + 0; // Considerando a margem de 20px entre as imagens

  function updateCarousel() {
      imageWrapper.style.transform = `translateX(${-currentIndex * imageWidth}px)`;
  }

  nextButton.addEventListener('click', function() {
      if (currentIndex < images.length - 1) {
          currentIndex++;
      } else {
          currentIndex = 0; // Volta ao início se estiver no final
      }
      updateCarousel();
  });

  prevButton.addEventListener('click', function() {
      if (currentIndex > 0) {
          currentIndex--;
      } else {
          currentIndex = images.length - 1; // Vai para o final se estiver no início
      }
      updateCarousel();
  });

  window.addEventListener('resize', function() {
      // Recalcula a largura da imagem e atualiza o carrossel no redimensionamento da janela
      imageWidth = images[0].offsetWidth + 0;
      updateCarousel();
  });
});
