/* ================================
   MOBILE MENU
================================ */

const menuBtn = document.getElementById("menuBtn");

const navMenu = document.querySelector(".nav-menu");

menuBtn.addEventListener("click", function () {
  navMenu.classList.toggle("show");
});

/* ================================
   CLOSE MENU AFTER CLICK
================================ */

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    navMenu.classList.remove("show");
  });
});

/* ================================
   DARK MODE
================================ */

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
});

// hamburgarr end


// footer

/* =================================
   FOOTER NEWSLETTER
================================= */

const newsletterForm =
    document.getElementById("newsletterForm");

const newsletterEmail =
    document.getElementById("newsletterEmail");


if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const email =
                newsletterEmail.value.trim();

            if (!email) {
                return;
            }

            alert(
                "Thanks for subscribing! " +
                "We'll send updates to " +
                email
            );

            newsletterForm.reset();

        }
    );

}

/* =================================
   BACK TO TOP
================================= */

const backToTop =
    document.getElementById("backToTop");


if (backToTop) {

    backToTop.addEventListener(
        "click",
        function() {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}