/* =================================================================
   Dra. Thayná Gazola — comportamento da página

   1. Menu mobile
   2. Filtros dos casos clínicos
   3. Ampliação de imagem (modal)
   ================================================================= */

(function () {

    'use strict';

    /* ------------------------ 1. Menu mobile ----------------------- */

    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('nav');

    if (toggle && nav) {

        toggle.addEventListener('click', function () {

            var open = nav.classList.toggle('is-open');

            toggle.setAttribute('aria-expanded', String(open));
            toggle.setAttribute(
                'aria-label',
                open ? 'Fechar menu' : 'Abrir menu'
            );

        });

        nav.addEventListener('click', function (event) {

            if (event.target.tagName === 'A') {

                nav.classList.remove('is-open');

                toggle.setAttribute('aria-expanded', 'false');
                toggle.setAttribute('aria-label', 'Abrir menu');

            }

        });

    }


    /* ------------------ 2. Filtros dos casos ----------------------- */

    var chips = document.querySelectorAll('.chip');
    var cases = document.querySelectorAll('#case-grid .case');

    chips.forEach(function (chip) {

        chip.addEventListener('click', function () {

            var filter = chip.dataset.filter;

            // Remove o ativo dos outros filtros
            chips.forEach(function (other) {

                other.classList.toggle(
                    'is-active',
                    other === chip
                );

            });

            // Mostra/esconde os casos
            cases.forEach(function (item) {

                var cats = (item.dataset.cat || '').split(' ');

                item.hidden =
                    filter !== 'todos' &&
                    cats.indexOf(filter) === -1;

            });

        });

    });


    /* ------------------ 3. Ampliação de imagem --------------------- */

    var modal = document.getElementById('modal');

    if (modal) {

        var modalImg = modal.querySelector('img');
        var closeBtn = modal.querySelector('.modal-close');
        var lastFocused = null;


        /* Abrir modal */

        function openModal(source) {

            if (!source || !modalImg || !closeBtn) {
                return;
            }

            lastFocused = document.activeElement;

            modalImg.src = source.src;
            modalImg.alt = source.alt || 'Imagem ampliada';

            modal.hidden = false;

            document.body.style.overflow = 'hidden';

            closeBtn.focus();

        }


        /* Fechar modal */

        function closeModal() {

            modal.hidden = true;

            modalImg.removeAttribute('src');
            modalImg.alt = '';

            document.body.style.overflow = '';

            if (lastFocused) {
                lastFocused.focus();
            }

        }


        /* ---------------------------------------------------------
           Clique nas imagens

           .ba img
           = imagens de antes/depois dos resultados

           .harmony-photo img
           = novas imagens da seção Harmonização
           --------------------------------------------------------- */

        document.addEventListener('click', function (event) {

            var img = event.target.closest(
                '.ba img, .harmony-photo img'
            );

            if (img) {
                openModal(img);
            }

        });


        /* Botão X */

        closeBtn.addEventListener('click', function () {

            closeModal();

        });


        /* Clique fora da imagem */

        modal.addEventListener('click', function (event) {

            if (event.target === modal) {
                closeModal();
            }

        });


        /* Tecla ESC */

        document.addEventListener('keydown', function (event) {

            if (event.key === 'Escape' && !modal.hidden) {
                closeModal();
            }

        });

    }

})();